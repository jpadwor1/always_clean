import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import CookieConsentBanner from '@/components/CookieConsent';
import Toaster from '@/components/ui/toaster';
import { GoogleAnalytics } from '@next/third-parties/google'
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Krystal Clean Pool Service | Expert Pool Cleaning in Arizona',
  description:
    'Krystal Clean Pool Service: Trusted father-and-son team offering expert pool cleaning and maintenance in Arizona. Proudly veteran-owned, delivering reliability, integrity, and top-notch quality. Contact us today for a sparkling clean pool!',
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
            'min-h-screen antialiased grainy light',
            inter.className
          )}
        >
          <Toaster />
          <Navbar />
          {children}
          <Footer />
          {/* <CookieConsentBanner /> */}
        </body>
      </Providers>
      <GoogleAnalytics gaId='G-CXG6005YVL' />
      {/* <FacebookPixelEvents /> */}
    </html>
  );
}
