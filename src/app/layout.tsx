import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { OffersProvider } from "./context/OfferContext";
import "./globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Discover your city",
  description: "Discover the city with pulse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <OffersProvider>{children}</OffersProvider>
      </body>
    </html>
  );
}
