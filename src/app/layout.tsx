import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {MaximilienCura, SelenaSun} from "@/components/Authors";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "grants@stanford",
  description: "Stanford Grants Index",
  keywords: [ 'Stanford', 'grants', 'projects', 'funding' ]
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className="w-full min-h-screen flex flex-col">
          <header className="w-full">
              <h1 className="text-3xl">
                  grants@stanford
              </h1>
          </header>

          {children}

          <footer>
              Copyright &copy; 2024 <MaximilienCura /> and <SelenaSun />.
          </footer>
      </body>
      </html>
  );
}
