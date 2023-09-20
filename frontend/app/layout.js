import { ThemeProvider } from "./components/ThemeProvider";
import SessionProvider from "@/app/components/SessionProvider";
import React from "react";
import PropTypes from 'prop-types';
import "./globals.css";

export const metadata = {
  title: "WAIDS Home",
  description: "The home page for the WAIDS project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <SessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
    children: PropTypes.node.isRequired,
};