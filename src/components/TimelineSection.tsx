"use client";

import type { ReactElement } from "react";
import { useMemo } from "react";
import styles from "../app/page.module.css";
import { RevealSection } from "./RevealSection";

type EventItem = {
  title: string;
  time: string; // "3:30 pm"
  icon: "ring" | "glass" | "dinner" | "dance" | "party" | "close";
};

const ICONS: Record<EventItem["icon"], ReactElement> = {
  ring: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2a5 5 0 0 0-5 5c0 1.8 1 3.6 2.6 4.6L12 14l2.4-2.4C16 10.6 17 8.8 17 7a5 5 0 0 0-5-5zm0 7.5A2.5 2.5 0 1 1 12 4a2.5 2.5 0 0 1 0 5.5z" fill="currentColor" />
      <path d="M4 22h16v-2H4v2z" fill="currentColor" opacity="0.35" />
    </svg>
  ),
  glass: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M7 2h10l-1 9a4 4 0 0 1-8 0L7 2z" fill="currentColor" />
      <path d="M11 13v6H7v2h10v-2h-4v-6h-2z" fill="currentColor" opacity="0.45" />
    </svg>
  ),
  dinner: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M8 2v9a2 2 0 0 0 2 2v9h2V2H8z" fill="currentColor" />
      <path d="M14 2v8h2V2h-2zm2 10h-2v10h2V12z" fill="currentColor" opacity="0.45" />
      <path d="M6 2v7H4V2H6z" fill="currentColor" opacity="0.45" />
    </svg>
  ),
  dance: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M15 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" fill="currentColor" />
      <path d="M12 7l3 2 2-1 1 2-2 1-2 5 2 2-1.5 1.5-2.6-2.4-1.4 2.9H8l2-5-2-2 1.5-1.5L11 15l1-3-2-1 1-2 1 1z" fill="currentColor" opacity="0.9" />
    </svg>
  ),
  party: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M3 21l10-4L7 3 3 21z" fill="currentColor" />
      <path d="M10 6l8 8 3-3-8-8-3 3z" fill="currentColor" opacity="0.5" />
      <path d="M15 16l2 2-2 2-2-2 2-2z" fill="currentColor" opacity="0.35" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M7 4h10v2H7V4zm0 4h10v2H7V8zm0 4h10v2H7v-2z" fill="currentColor" />
      <path d="M6 18h12v2H6v-2z" fill="currentColor" opacity="0.35" />
    </svg>
  ),
};

function parseTimeToMinutes(time: string) {
  const m = time.trim().match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (!m) return 0;
  let h = Number(m[1]);
  const min = Number(m[2]);
  const ampm = m[3].toLowerCase();
  if (ampm === "pm" && h !== 12) h += 12;
  if (ampm === "am" && h === 12) h = 0;
  return h * 60 + min;
}

export function TimelineSection() {
  const events: EventItem[] = useMemo(
    () => [
      { title: "Wedding ceremony", time: "3:30 pm", icon: "ring" },
      { title: "Cocktail hour", time: "5:00 pm", icon: "glass" },
      { title: "Dinner", time: "7:00 pm", icon: "dinner" },
      { title: "First dance", time: "8:00 pm", icon: "dance" },
      { title: "Party", time: "8:15 pm", icon: "party" },
      { title: "Closing", time: "1:45 am", icon: "close" },
    ],
    [],
  );

  const nextIndex = useMemo(() => {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const mins = events.map((e) => parseTimeToMinutes(e.time));
    const i = mins.findIndex((t) => t >= nowMin);
    return i === -1 ? mins.length - 1 : i;
  }, [events]);

  return (
    <RevealSection
      className={`${styles.timelineCard} ${styles.revealTimeline}`}
      revealedClassName={styles.revealed}
    >
      <div className={styles.timelineTab}>17 March</div>
      <div className={styles.timeline}>
        {events.map((e, idx) => {
          const isNext = idx === nextIndex;
          const isPast = idx < nextIndex;
          return (
            <div
              key={e.title}
              className={[
                styles.row,
                isNext ? styles.rowNext : "",
                isPast ? styles.rowPast : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.what}>
                <span className={styles.timelineIcon} aria-hidden>
                  {ICONS[e.icon]}
                </span>
                {e.title}
              </div>
              <div className={styles.when}>{e.time}</div>
            </div>
          );
        })}
      </div>
    </RevealSection>
  );
}

