import '@/src/styles/globals.css';
import Navbar from '@/src/components/Navbar';
import Providers from '@/src/components/Providers';
import ClientOnly from '@/src/components/ClientOnly';

export const metadata = {
  title: 'ecom-1',
  description:
    'This is an e-commerce site and this is not a great SEO optimized description.',
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <Providers>
            <div className="flex min-h-screen flex-col justify-between">
              <header>
                <Navbar />
              </header>
              <main className="container m-auto mt-4 px-4">
                {children}
              </main>
              <footer className="flex h-10 justify-center items-center shadow-inner">
                <p>Copyright &copy; 2022 ecom-1</p>
              </footer>
            </div>
          </Providers>
        </ClientOnly>
      </body>
    </html>
  );
};

export default RootLayout;
