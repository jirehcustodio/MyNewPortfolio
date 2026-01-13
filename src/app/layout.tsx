import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import AnalyticsProvider from "./components/AnalyticsProvider";
import { LanguageProvider } from "./lib/useLanguage";
import { ArticleAnalyticsProvider } from "./lib/useArticleAnalytics";

export const metadata: Metadata = {
  title: "Jireh Custodio | Full-Stack Developer",
  description: "Professional portfolio of Jireh Custodio - Full-Stack Developer specializing in Next.js, React, and TypeScript. View my projects and experience.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white font-sans antialiased">
        <GoogleAnalytics />
        <LanguageProvider>
          <ArticleAnalyticsProvider>
            <AnalyticsProvider>
              {children}
            </AnalyticsProvider>
          </ArticleAnalyticsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
