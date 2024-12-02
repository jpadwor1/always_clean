import { Inter } from 'next/font/google';
import './globals.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Krystal Clean Pool Service',
  description:
    'We are a father and son team, committed to providing top-notch pool services with integrity and unmatched quality. Founded by a proud veteran, we bring military precision and reliability to every job.',
};

const CookieConsentBanner = dynamic(
  () => import('@/components/CookieConsent'),
  {
    ssr: false,
  }
);

const Toaster = dynamic(() => import('@/components/ui/toaster'), {
  ssr: false,
});

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
            'min-h-screen antialiased grainy light',
            inter.className
          )}
        >
          <Toaster />
          <Navbar />
          {children}
          <Footer />
          <CookieConsentBanner />
        </body>
      </Providers>
      {/* <GoogleAnalytics gaId='G-CXG6005YVL' /> */}
      {/* <FacebookPixelEvents /> */}
    </html>
  );
}
