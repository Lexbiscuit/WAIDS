import { Providers } from "./providers";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
