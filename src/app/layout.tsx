import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import GoogleAnalytics from "./components/GoogleAnalytics";
import AnalyticsProvider from "./components/AnalyticsProvider";
import { LanguageProvider } from "./lib/useLanguage";
import { ArticleAnalyticsProvider } from "./lib/useArticleAnalytics";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Minimalist portfolio built with Next.js, Tailwind, Framer Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white font-sans antialiased cursor-none">
        <GoogleAnalytics />
        <LanguageProvider>
          <ArticleAnalyticsProvider>
            <AnalyticsProvider>
              <CustomCursor />
              {children}
            </AnalyticsProvider>
          </ArticleAnalyticsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
