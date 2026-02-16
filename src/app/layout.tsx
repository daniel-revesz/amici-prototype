import type { Metadata } from "next";
import { Quattrocento, Quattrocento_Sans } from "next/font/google";
import "./globals.css";

const quattrocento = Quattrocento({
  variable: "--font-quattrocento",
  subsets: ["latin"],
  weight: ["700"],
});

const quattrocentoSans = Quattrocento_Sans({
  variable: "--font-quattrocento-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "amici — Request Flow",
  description: "Event catering request flow prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${quattrocento.variable} ${quattrocentoSans.variable} antialiased bg-dark-1 text-white font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
