"use client";

import { useEffect, useMemo, useState } from "react";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

function clampNonNegativeInt(n: number) {
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.floor(n);
}

function computeCountdown(targetMs: number, nowMs: number): CountdownParts {
  const diffMs = targetMs - nowMs;
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const totalSeconds = clampNonNegativeInt(diffMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isComplete: false };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown({
  targetIsoLocal,
  label = "The event starts in:",
  variant = "default",
}: {
  /**
   * Local-time target (no timezone suffix), e.g. "2025-03-17T15:30:00"
   * This matches how many wedding sites treat "event time" (viewer-local).
   */
  targetIsoLocal: string;
  label?: string;
  variant?: "default" | "overlay";
}) {
  const targetMs = useMemo(() => {
    // Interpret as local time.
    const d = new Date(targetIsoLocal);
    return d.getTime();
  }, [targetIsoLocal]);

  const [parts, setParts] = useState<CountdownParts>(() =>
    computeCountdown(targetMs, Date.now()),
  );

  useEffect(() => {
    const tick = () => setParts(computeCountdown(targetMs, Date.now()));
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [targetMs]);

  if (variant === "overlay") {
    return (
      <div className="countdownOverlayRoot">
        <div className="countdownOverlayLabel">{label}</div>
        {parts.isComplete ? (
          <div className="countdownOverlayDone">It&apos;s time — see you there.</div>
        ) : (
          <>
            <div className="countdownOverlayNumbers" aria-live="polite">
              {pad2(parts.days)}:{pad2(parts.hours)}:{pad2(parts.minutes)}:{pad2(parts.seconds)}
            </div>
            <div className="countdownOverlayUnits">
              <span>Days</span>
              <span>Hours</span>
              <span>Minutes</span>
              <span>Seconds</span>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="countdownLabel">{label}</div>
      <div className="countdownGrid" aria-live="polite">
        <div className="countdownCell">
          <div className="countdownValue">{pad2(parts.days)}</div>
          <div className="countdownUnit">Days</div>
        </div>
        <div className="countdownSep">:</div>
        <div className="countdownCell">
          <div className="countdownValue">{pad2(parts.hours)}</div>
          <div className="countdownUnit">Hours</div>
        </div>
        <div className="countdownSep">:</div>
        <div className="countdownCell">
          <div className="countdownValue">{pad2(parts.minutes)}</div>
          <div className="countdownUnit">Minutes</div>
        </div>
        <div className="countdownSep">:</div>
        <div className="countdownCell">
          <div className="countdownValue">{pad2(parts.seconds)}</div>
          <div className="countdownUnit">Seconds</div>
        </div>
      </div>

      {parts.isComplete ? (
        <div className="countdownDone">It’s time — see you there.</div>
      ) : null}
    </div>
  );
}

