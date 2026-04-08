
import { ToastContainer } from "react-toastify";
import NavBar from "./components/Navbar";
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
        {children}

        <ToastContainer />
      </body>
    </html>
  );
}
