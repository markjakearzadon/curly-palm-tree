import plus from "../public/plus.svg";
import kiwi from "../public/kiwi-bird-solid.svg";
import profile from "../public/profile.png";
import cry from "../public/cry.gif";

export const options = [
  {
    title: "Account",
    description: "Manage your account settings",
    link: "/settings/account",
  },
  {
    title: "Privacy",
    description: "Control your privacy settings",
    link: "/settings/privacy",
  },
  {
    title: "Security",
    description: "Manage your security settings",
    link: "/settings/security",
  },
  {
    title: "Notifications",
    description: "Set your notifications preferences",
    link: "/settings/notifications",
  },
  {
    title: "Language",
    description: "Select your language preferences",
    link: "/settings/language",
  },
  {
    title: "Feedback",
    description: "Give us feedback",
    link: "/settings/feedback",
  },
  {
    title: "Help",
    description: "Access the help center",
    link: "/settings/help",
  },
  {
    title: "Sign Out",
    description: "Sign out of your account",
    link: "/api/auth/signout",
  },
];

export { plus, profile, kiwi };
export { cry };
