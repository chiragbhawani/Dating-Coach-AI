import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dating Coach AI",
  description:
    "A premium landing page for respectful AI-powered dating coaching."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
