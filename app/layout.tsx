import { ReactElement, ReactNode } from "react";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "./_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountain and dark forests.",
};

interface IRootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({
  children,
}: IRootLayoutProps): ReactElement {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className=" max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
