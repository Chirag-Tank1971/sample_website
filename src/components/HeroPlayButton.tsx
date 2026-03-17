"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./HeroPlayButton.module.css";

const AUDIO_ID = "wedding-bg-audio";

export function HeroPlayButton() {
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    const el = document.getElementById(AUDIO_ID) as HTMLAudioElement | null;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true));
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const el = document.getElementById(AUDIO_ID) as HTMLAudioElement | null;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    setPlaying(!el.paused);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <button
      type="button"
      className={styles.playButton}
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
    >
      {playing ? (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
