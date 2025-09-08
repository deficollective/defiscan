import { FaLinkedinIn, FaDiscord, FaGithub, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Helper function to get the correct React Icon based on the FontAwesome class
export const getSocialIcon = (iconClass: string, size = "w-4 h-4") => {
  switch (iconClass) {
    case "fa-brands fa-x-twitter":
      return <FaXTwitter className={size} />;
    case "fa-brands fa-linkedin-in":
    case "fa-brands fa-linkedin":
      return <FaLinkedinIn className={size} />;
    case "fa-brands fa-discord":
      return <FaDiscord className={size} />;
    case "fa-brands fa-github":
      return <FaGithub className={size} />;
    case "fa-solid fa-link":
    case "fa-solid fa-globe":
      return <FaGlobe className={size} />;
    default:
      return <span className={`${size} inline-block`} />;
  }
};