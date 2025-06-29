import type { Metadata, Viewport } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "مجله سعید پی | آخرین اخبار فینتک و پرداخت‌های دیجیتال",
  description: "آخرین اخبار، تحلیل‌ها و راهنماهای عملی در زمینه فینتک، پرداخت‌های دیجیتال و خدمات مالی در ایران. مرجع اطلاعات صنعت پرداخت الکترونیک.",
  keywords: [
    "اخبار فینتک",
    "پرداخت دیجیتال",
    "خدمات مالی",
    "اخبار سعید پی",
    "پرداخت آنلاین",
    "اقتصاد دیجیتال",
    "بانکداری الکترونیک",
    "تکنولوژی مالی",
    "پرداخت موبایل",
    "کیف پول دیجیتال"
  ],
  authors: [{ name: "تیم سعید پی" }],
  creator: "سعید پی",
  publisher: "سعید پی",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://saeedpay.com"),
  alternates: {
    canonical: "/news",
    languages: {
      "fa-IR": "/news",
    },
  },
  openGraph: {
    title: "مجله سعید پی | آخرین اخبار فینتک و پرداخت‌های دیجیتال",
    description: "آخرین اخبار، تحلیل‌ها و راهنماهای عملی در زمینه فینتک، پرداخت‌های دیجیتال و خدمات مالی در ایران.",
    url: "/news",
    siteName: "سعید پی",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/api/placeholder/1200/630",
        width: 1200,
        height: 630,
        alt: "مجله سعید پی - اخبار فینتک و پرداخت‌های دیجیتال",
        type: "image/jpeg",
      },
      {
        url: "/api/placeholder/800/600",
        width: 800,
        height: 600,
        alt: "سعید پی - پلتفرم پرداخت و اعتبار",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مجله سعید پی | آخرین اخبار فینتک",
    description: "آخرین اخبار، تحلیل‌ها و راهنماهای عملی در زمینه فینتک و پرداخت‌های دیجیتال در ایران.",
    creator: "@saeedpay",
    site: "@saeedpay",
    images: ["/api/placeholder/1200/630"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "اخبار و مقالات",
  classification: "اخبار تکنولوژی و خدمات مالی",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#2563eb",
      },
    ],
  },
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "سعید پی",
    "application-name": "سعید پی",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#2563eb",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Additional SEO Meta Tags */}
      <link rel="canonical" href="https://saeedpay.com/news" />
      <link rel="alternate" hrefLang="fa-ir" href="https://saeedpay.com/news" />
      
      {/* Structured Data for Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "سعید پی",
            "alternateName": "SaeedPay",
            "url": "https://saeedpay.com",
            "description": "پلتفرم پرداخت اعتباری و خرید اقساطی برای ایران",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://saeedpay.com/news?search={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "سعید پی",
              "logo": {
                "@type": "ImageObject",
                "url": "https://saeedpay.com/logo.png"
              }
            }
          })
        }}
      />

      {/* Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "سعید پی",
            "alternateName": "SaeedPay",
            "url": "https://saeedpay.com",
            "logo": "https://saeedpay.com/logo.png",
            "description": "پلتفرم پرداخت اعتباری و خرید اقساطی برای ایران",
            "foundingDate": "2024",
            "founders": [
              {
                "@type": "Person",
                "name": "بنیانگذاران سعید پی"
              }
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+98-21-XXXXXXXX",
              "contactType": "customer service",
              "availableLanguage": ["Persian", "English"]
            },
            "sameAs": [
              "https://instagram.com/saeedpay",
              "https://twitter.com/saeedpay",
              "https://linkedin.com/company/saeedpay",
              "https://t.me/saeedpay"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "خدمات سعید پی",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "پرداخت اعتباری",
                    "description": "خدمات پرداخت اعتباری و خرید اقساطی"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* Structured Data for BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "خانه",
                "item": "https://saeedpay.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "اخبار و مقالات",
                "item": "https://saeedpay.com/news"
              }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pb-16">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
} 