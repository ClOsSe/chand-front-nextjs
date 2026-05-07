import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/providers/app";

export const metadata: Metadata = {
  title: "Chand",
  description: "Modern financial market tracking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
