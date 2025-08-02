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
            🎉 Support us in the upcoming Gitcoin funding round
            <a
              href="https://octant.app/projects"
              target="_blank"
              className="underline hover:no-underline ml-1"
            >
              here!
            </a>
          </>
        }
        backgroundColor="#ffd34eff" // colored background
        textColor="black"
      />

      <Footer />
    </div>
  );
}
