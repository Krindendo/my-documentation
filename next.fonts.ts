import { Open_Sans } from "next/font/google";
import localFont from "next/font/local"

// This configures the Next.js Font for Open Sans
// We then export a variable and class name to be used
// within Tailwind (tailwind.config.ts) and Storybook (preview.js)
export const OPEN_SANS = Open_Sans({
  weight: ["300", "400", "600", "700"],
  display: "fallback",
  subsets: ["latin"],
  variable: "--font-open-sans",
});

// This configures the Next.js Font for Cal Sans
// We then export a variable and class name to be used
// within Tailwind (tailwind.config.ts) and Storybook (preview.js)
export const CAL_SANS = localFont({
  src: "./public/static/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})