"use client";

import { useCallback, useEffect, useState } from "react";

const AUDIO_ID = "wedding-bg-audio";

export function AudioControl() {
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
      onClick={toggle}
      style={{
        marginTop: 12,
        padding: "10px 20px",
        background: "#1a1a1a",
        color: "#fff",
        border: "none",
        borderRadius: 999,
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {playing ? "Pause music" : "Play music"}
    </button>
  );
}
