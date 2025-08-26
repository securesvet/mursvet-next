import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LoadingProvider } from "@/context";

export const metadata: Metadata = {
  title: "Mursvet",
  description: "Sviatoslav Murzin's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/github-dark.min.css"
        />
      </head>
      <body className={`antialiased`}>
        <LoadingProvider>
          <Header />
          <main className="min-h-[var(--screen-no-header-no-footer)] p-[var(--main-content-padding)]">
            {children}
          </main>
          <Footer />
        </LoadingProvider>
      </body>
    </html >
  );
}
