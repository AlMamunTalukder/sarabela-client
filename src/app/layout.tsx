import type { Metadata } from "next";
import "./globals.css";
import { Tiro_Bangla } from 'next/font/google';
import Providers from "@/lib/Provider";
import { Toaster } from 'react-hot-toast';

const tiro_Bangla = Tiro_Bangla({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sarabelanews24.com'),
  title: {
    default: 'সারাবেলা | Sarabela',
    template: '%s | সারাবেলা'
  },
  description: 'সারাবেলা - বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ, ব্রেকিং নিউজ, রাজনীতি, অর্থনীতি, খেলা, বিনোদন এবং সকল সর্বশেষ খবর',
  keywords: ['সারাবেলা', 'bangla news', 'bangladesh news', 'sarabela', 'sarabelanews24', 'breaking news'],
  authors: [{ name: 'Sarabela' }],
  creator: 'Sarabela',
  publisher: 'Sarabela',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
    shortcut: '/favicon-16x16.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: 'https://sarabelanews24.com',
    siteName: 'সারাবেলা',
    title: 'সারাবেলা | Sarabela',
    description: 'সারাবেলা - বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'সারাবেলা',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'সারাবেলা | Sarabela',
    description: 'সারাবেলা - বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ',
    images: ['/twitter-image.jpg'],
    creator: '@sarabelanews24',
    site: '@sarabelanews24',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sarabelanews24.com',
    languages: {
      'bn-BD': 'https://sarabelanews24.com',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // Add other verification codes if needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <Providers>
        <body className={`bg-white dark:bg-gray-800 dark:text-white ${tiro_Bangla.className}`}>
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}