import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const personaMain = localFont({
  src: "../../public/assets/font/Persona5main.ttf",
  variable: "--font-persona-main",
  display: "swap",
  weight: "400",
});

export const personaMenu = localFont({
  src: "../../public/assets/font/Persona5MenuFontPrototype-Regular.ttf",
  variable: "--font-persona-menu",
  display: "swap",
  weight: "400",
});

export const expose = localFont({
  src: "../../public/assets/font/Expose-Regular.otf",
  variable: "--font-expose",
  display: "swap",
  weight: "400",
});

export const p5hatty = localFont({
  src: "../../public/assets/font/p5hatty-1.ttf",
  variable: "--font-p5hatty",
  display: "swap",
  weight: "400",
});

export const markin = localFont({
  src: "../../public/assets/font/Markin-LT-Ultra-Bold.ttf",
  variable: "--font-markin",
  display: "swap",
  weight: "700",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const fontVariables = `${personaMain.variable} ${personaMenu.variable} ${expose.variable} ${p5hatty.variable} ${markin.variable} ${inter.variable}`;
