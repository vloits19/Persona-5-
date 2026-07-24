import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { AppProvider } from "@/context/AppContext";
import AnimatedBackground from "@/components/Background/AnimatedBackground";
import FullscreenMenu from "@/components/Menu/FullscreenMenu";
import VideoTransition from "@/components/Transition/VideoTransition";
import MuteButton from "@/components/UI/MuteButton";
import Header from "@/components/UI/Header";
import CustomCursor from "@/components/Cursor/CustomCursor";

export const metadata: Metadata = {
  title: "Fawwaz | Game Developer & Web Developer",
  description: "Portfolio of Fawwaz Anggita Yumna Qotrunnada — a game developer, web developer, and UI/UX enthusiast from Banjarnegara, Indonesia.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="antialiased bg-p5-black text-p5-white selection:bg-p5-red selection:text-p5-white-pure min-h-screen relative overflow-x-hidden">
        <AppProvider>
          {/* Layered Animated Background */}
          <AnimatedBackground />

          {/* Persistent Header / Menu Trigger */}
          <Header />

          {/* Fullscreen Animated Menu */}
          <FullscreenMenu />

          {/* Chroma Key Video Transition Overlay */}
          <VideoTransition />

          {/* Audio Mute Toggle */}
          <MuteButton />

          {/* Custom PNG cursor */}
          <CustomCursor />

          {/* Main Content */}
          <main className="relative z-10">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
