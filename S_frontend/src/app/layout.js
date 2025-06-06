// src/app/layout.js
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../styles/globals.css"; // Ensure you import your global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
