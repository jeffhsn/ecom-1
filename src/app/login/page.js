'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { getError } from '@/src/utils/getError';
import { toast } from 'react-toastify';

const LoginPage = ({ params }) => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = params;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <>
      <form
        className="mx-auto max-w-screen-md"
        e
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            {...register('email', {
              required: 'Please enter your email',
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            type="email"
            className="w-full focus:ring"
            id="email"
            autofocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 6,
                message: 'password is more than 5 chars',
              },
            })}
            type="password"
            className="w-full focus:ring"
            id="password"
            autofocus
          />
          {errors.password && (
            <div className="text-red-500">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href="/register">Register</Link>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
