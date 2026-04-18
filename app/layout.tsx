import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Gold Price Nepal Today & Live Silver Rate (24K/Tola)',
  description: 'Track live gold price in Nepal today. Get real-time 24K Fine Gold and silver rates per tola or gram, daily market updates, and historical price trends.',
  keywords: 'gold price Nepal today, silver price Nepal today, gold rate Nepal, 24k gold price Nepal, silver rate Nepal, gold price in Nepal per tola, silver price in Nepal per tola, Nepal gold market, gold price Nepal 24 carat, nepal gold rate today, silver rate nepal today, gold and silver price nepal, current gold price nepal, today gold rate nepal, gold prices nepal, silver prices in nepal, nepal bullion market, gold rate in nepal today, gold price nepal per tola, nepal gold and silver price, gold silver rate nepal, gold price in nepal today 24k, silver price nepal today, gold value in nepal, gold rate nepal per gram, nepal gold price per gram, today silver rate in nepal, gold price in nepal market today, gold and silver rate in nepal, current price of gold in nepal, price of gold in nepal today, gold rate today nepal 24k',
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  openGraph: {
    title: 'Gold Price Nepal Today & Live Silver Rate',
    description: 'Track live gold price in Nepal today. Get real-time 24K Fine Gold and silver rates per tola or gram.',
    type: 'website',
    locale: 'en_NP',
    alternateLocale: 'ne_NP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price Nepal Today & Live Silver Rate',
    description: 'Track live gold price in Nepal today. Get real-time 24K Fine Gold and silver rates per tola.',
  },
  alternates: {
    canonical: 'https://goldsilvernepal.vercel.app',
    languages: {
      en: 'https://goldsilvernepal.vercel.app',
      ne: 'https://goldsilvernepal.vercel.app',
    },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'geo.region': 'NP',
    'geo.placename': 'Kathmandu',
    'geo.position': '27.7172;85.3240',
    'ICBM': '27.7172, 85.3240',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-[#f9f9f9] text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}