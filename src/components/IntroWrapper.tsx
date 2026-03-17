"use client";

import { useCallback, useRef, useState } from "react";
import { IntroOverlay } from "./IntroOverlay";

type Props = {
  children: React.ReactNode;
  /** Intro background image path, e.g. "/intro.jpg" */
  introImage?: string;
};

const DEFAULT_INTRO_IMAGE = "/intro.png";

export function IntroWrapper({ children, introImage = DEFAULT_INTRO_IMAGE }: Props) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleEnter = useCallback(() => {
    setExiting(true);
    try {
      audioRef.current?.play();
    } catch {
      // Autoplay may be blocked
    }
    setTimeout(() => setVisible(false), 400);
  }, []);

  return (
    <>
      <audio id="wedding-bg-audio" ref={audioRef} preload="auto" loop>
        <source src="/audio.mp3" type="audio/mpeg" />
      </audio>
      {children}
      {visible && (
        <IntroOverlay onEnter={handleEnter} exiting={exiting} imageSrc={introImage} />
      )}
    </>
  );
}
