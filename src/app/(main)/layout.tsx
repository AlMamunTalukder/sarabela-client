import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import BreakingNews from "@/util/BreakingNews";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <header className="z-30">
        <Header />
      </header>

      <nav className="sticky top-0 z-40">
        <Navbar />
      </nav>

      <main className="flex-grow mb-[50px]">{children}</main>

      {/* Breaking News Ticker */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BreakingNews />
      </div>

      <footer className="relative z-30 mb-[50px]">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
