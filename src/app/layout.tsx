import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ContactModalProvider } from "@/components/ContactFormModal";
import { BookingModalProvider } from "@/components/BookingModal";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://breek-innovations.com";
const SITE_NAME = "Breek Innovations";
const TITLE =
  "Breek Innovations | Websites, apps, and AI automation for small businesses";
const DESCRIPTION =
  "One team that builds and runs the whole stack for small and mid-size businesses: websites, custom apps, AI automations, and search visibility. Fixed scope, one point of contact.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Breek Innovations",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Breek Innovations LLC", url: SITE_URL }],
  creator: "Breek Innovations LLC",
  publisher: "Breek Innovations LLC",
  keywords: [
    "web development for small business",
    "custom software for medical practices",
    "restaurant loyalty app",
    "AI automation for SMBs",
    "generative engine optimization",
    "GEO agency",
    "white label web development",
    "agency subcontractor",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon-dark.png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Breek Innovations — websites, apps, and AI automation for small businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const META_PIXEL_ID = "1700865632041267";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "Breek Innovations LLC",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-green.png`,
  email: "hello@breek-innovations.com",
  description: DESCRIPTION,
  areaServed: "US",
  knowsAbout: [
    "Web development",
    "Mobile and web application development",
    "AI workflow automation",
    "Generative Engine Optimization",
    "Search engine optimization",
    "Custom software for small and mid-size businesses",
  ],
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${bricolage.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <BookingModalProvider>
          <ContactModalProvider>{children}</ContactModalProvider>
        </BookingModalProvider>
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
