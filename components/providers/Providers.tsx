"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import EntryProvider from "./entry-provider";

let globalAudio: HTMLAudioElement | null = null;

export function Providers({ children }: { children: React.ReactNode }) {
  const [showEntry, setShowEntry] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("hasEntered") !== "true";
  });

  const isInitialized = useRef(false);

  useEffect(() => {
    const startMusic = async () => {
      const musicEnabled = sessionStorage.getItem("musicEnabled") === "true";
      if (!musicEnabled || globalAudio || isInitialized.current) return;

      isInitialized.current = true;
      globalAudio = new Audio("/piano-bgm.mp3");
      globalAudio.loop = true;

      try {
        await globalAudio.play();
      } catch {
        // fallback: next interaction
        isInitialized.current = false;
        globalAudio = null;
      }
    };

    const onEntryComplete = () => {
      setShowEntry(false);
      startMusic();
    };

    window.addEventListener("entry-complete", onEntryComplete);
    return () => window.removeEventListener("entry-complete", onEntryComplete);
  }, []);

  useEffect(() => {
  const resumeMusicOnInteraction = () => {
    const musicEnabled = sessionStorage.getItem("musicEnabled") === "true";

    if (musicEnabled && !globalAudio) {
      globalAudio = new Audio("/piano-bgm.mp3");
      globalAudio.loop = true;
      globalAudio.play().catch(() => {});
    }

    window.removeEventListener("click", resumeMusicOnInteraction);
    window.removeEventListener("keydown", resumeMusicOnInteraction);
  };

  window.addEventListener("click", resumeMusicOnInteraction);
  window.addEventListener("keydown", resumeMusicOnInteraction);

  return () => {
    window.removeEventListener("click", resumeMusicOnInteraction);
    window.removeEventListener("keydown", resumeMusicOnInteraction);
  };
}, []);


  const content = (
    <ReactLenis root className="w-full">
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </ReactLenis>
  );

  return showEntry ? <EntryProvider>{content}</EntryProvider> : content;
}
