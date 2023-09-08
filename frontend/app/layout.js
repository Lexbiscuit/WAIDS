import "./globals.css";

export const metadata = {
  title: "WAIDS Marketing Page",
  description: "The home page for the WAIDS project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>{children}</body>
    </html>
  );
}
