import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
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
        <LanguageProvider>
          <ArticleAnalyticsProvider>
            <CustomCursor />
            {children}
          </ArticleAnalyticsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
