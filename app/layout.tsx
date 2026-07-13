import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://databliz.com';

export const metadata: Metadata = {
  title: {
    default: "Databliz | Business Process Automation & Optimization Consultancy",
    template: "%s | Databliz",
  },
  description: "Cut manual work and bottlenecks with Databliz. We map, simulate, and automate your business processes end-to-end — book a free consultation today.",
  keywords: [
    'business process automation',
    'process optimization',
    'workflow automation',
    'process simulation',
    'databliz',
  ],
  openGraph: {
    title: 'Databliz',
    description:
      'Cut manual work and bottlenecks with Databliz. We map, simulate, and automate your business processes end-to-end.',
    url: SITE_URL,
    siteName: 'Databliz',
    images: [
      {
        url: `${SITE_URL}/images/Dbliz.png`,
        width: 1200,
        height: 630,
        alt: 'Databliz',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Databliz',
    description:
      'Cut manual work and bottlenecks with Databliz. We map, simulate, and automate your business processes end-to-end.',
    images: [`${SITE_URL}/images/Dbliz.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Databliz',
    url: SITE_URL,
    logo: `${SITE_URL}/images/Colored-databliz-logo.png`,
    description: 'Business Process Automation & Optimization Consultancy',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${SITE_URL}/contact`,
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Databliz',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
