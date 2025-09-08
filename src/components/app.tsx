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
        show={true} // Set to true to show the banner
        text={
          <>
            <a
              href="https://giveth.io/cause/defi-transparency-decentralization"
              target="_blank"
              className="underline hover:no-underline ml-1"
            >
              🌟 Support DeFiScan on Giveth !
            </a>
          </>
        }
        backgroundColor="#251d35ff" //"#5cdbd9" // colored background
        useGradientText={true}
        textColor="#434a50ff" // if no gradient, will use this text color
      />

      <Footer />
    </div>
  );
}
