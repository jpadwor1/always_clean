import { Inter } from 'next/font/google';
import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'simplebar-react/dist/simplebar.min.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Always Clean Pool Service',
  description: 'We are a father and son team, committed to providing top-notch pool services with integrity and unmatched quality. Founded by a proud veteran, we bring military precision and reliability to every job.',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  

  return (
    <html lang='en'>
      <Providers>
        <body
          className={cn(
            'min-h-screen font-sans antialiased grainy light',
            inter.className
          )}
        >
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
