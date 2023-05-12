import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'ecom-1',
  description:
    'This is an e-commerce site and this is not a great SEO optimized description.',
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold">
              ecom-1
            </Link>
            <div className="flex items-center z-10">
              <Link href="/cart" className="p-2">
                cart
              </Link>
              <Link href="/profile" className="p-2">
                profile
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright &copy; 2022 ecom-1</p>
        </footer>
      </div>
    </html>
  );
};

export default RootLayout;
