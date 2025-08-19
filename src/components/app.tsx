import React, { PropsWithChildren } from "react";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import AnnouncementBanner from "@/components/announcement-banner";

export default function App({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="container flex-1 space-y-6 pt-6 pb-16">{children}</main>

      {/* Configuration for the announcement banner */}
      <AnnouncementBanner
        show={false} // Set to true to show the banner
        text={
          <>
            🎉 New feature: This banner shows cool information!
            <a href="/about" className="underline hover:no-underline ml-1">
              Learn more
            </a>
          </>
        }
        backgroundColor="#ffd31b" // Yellow background
        textColor="black"
      />

      <Footer />
    </div>
  );
}
