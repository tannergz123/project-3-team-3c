"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import Provider from "./provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!(window as any).googleTranslateElementInit) {
      // Define the Google Translate initialization function globally
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: (window as any).google.translate.TranslateElement
              .InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };

      // Load the Google Translate script dynamically
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            {/* Invisible Google Translate widget */}
            <div
              id="google_translate_element"
              style={{
                position: "absolute",
                top: 0,
                right: 15,
                visibility: "hidden",
              }}
            ></div>
            {children}
          </GoogleOAuthProvider>
        </Provider>
      </body>
    </html>
  );
}
