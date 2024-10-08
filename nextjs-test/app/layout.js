import Navigation from "./components/Navigation";
import { NextUIProvider } from "@nextui-org/react"; 

import "./main.css";

export const metadata = {
  title: "TOWARD",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <head>
        
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Vazirmatn', sans-serif" }}>
        <NextUIProvider>
        
          <Navigation />
          <main className="mt-4">{children}</main>
        </NextUIProvider>
      </body>
    </html>
  );
}
