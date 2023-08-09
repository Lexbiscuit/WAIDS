import "./globals.css";

export const metadata = {
  title: "🥵💦WAIDS Marketing Page",
  description: "The home page for the WAIDS project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
