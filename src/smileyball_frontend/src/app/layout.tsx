import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/hooks/useAuthClient";
import "../../public/fonts/fontstyle.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smiley $BALL 🙂",
  description: "$BALL to make you smile",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
