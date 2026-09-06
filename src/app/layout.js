import { Roboto } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { ThemeProvider } from "../context/ThemeContext";
import AuthProvider from "../components/authprovider/authprovider";
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});


export const metadata = {
  title: "Lama",
  description: "This is the description",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
