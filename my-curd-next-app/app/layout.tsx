
import Card from "./components/Card";
import NavBar from "./components/Navbar";
import Slider from "./components/Slider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <NavBar />
        <Slider/>
        <Card/>
        {children}
      </body>
    </html>
  );
}
   