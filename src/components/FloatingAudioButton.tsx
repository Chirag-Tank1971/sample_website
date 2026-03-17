"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./FloatingAudioButton.module.css";

const AUDIO_ID = "wedding-bg-audio";

export function FloatingAudioButton() {
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const wrapRef = useRef<HTMLDivElement>(null);

  const label = useMemo(() => (playing ? "Now playing" : "Music paused"), [playing]);

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

  const setAudioVolume = useCallback((v: number) => {
    const el = document.getElementById(AUDIO_ID) as HTMLAudioElement | null;
    if (!el) return;
    el.volume = Math.min(1, Math.max(0, v));
  }, []);

  useEffect(() => {
    const el = document.getElementById(AUDIO_ID) as HTMLAudioElement | null;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    setPlaying(!el.paused);
    setVolume(Number.isFinite(el.volume) ? el.volume : 0.7);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    setAudioVolume(volume);
  }, [setAudioVolume, volume]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const root = wrapRef.current;
      if (!root) return;
      if (e.target instanceof Node && root.contains(e.target)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      {open ? (
        <div className={styles.popover} role="dialog" aria-label="Music controls">
          <div className={styles.popoverHeader}>
            <div className={styles.nowPlaying}>{label}</div>
            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close">
              ×
            </button>
          </div>
          <div className={styles.controlsRow}>
            <button type="button" className={styles.playPause} onClick={toggle}>
              {playing ? "Pause" : "Play"}
            </button>
            <label className={styles.volume}>
              <span className={styles.volumeLabel}>Volume</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
              />
            </label>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className={styles.fab}
        onClick={() => setOpen((v) => !v)}
        aria-label="Music controls"
        title="Music"
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
      {playing ? <div className={styles.badge}>Now playing</div> : null}
    </div>
  );
}

