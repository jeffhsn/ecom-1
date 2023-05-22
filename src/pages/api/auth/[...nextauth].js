import NextAuth from 'next-auth/next';
import CredentialsProviders from 'next-auth/providers/credentials';
import User from '@/src/models/User';
import db from '@/src/utils/db';
import bcrypt from 'bcryptjs';

export default NextAuth({
  session: { strategy: 'jwt' },
  callbacks: {
    async session(token, user) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProviders({
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({ email: credentials.email });
        await db.disconnect();
        if (
          user &&
          bcrypt.compareSync(credentials.password, user.password)
        ) {
          return {
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
          };
        }
        throw new Error('Invalid email or password');
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
