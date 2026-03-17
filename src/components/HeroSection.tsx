"use client";

import { useEffect, useMemo, useRef } from "react";
import styles from "../app/page.module.css";

type Props = {
  dateText: string;
  placeText: string;
  scrollTargetId: string;
};

export function HeroSection({ dateText, placeText, scrollTargetId }: Props) {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = heroEl.getBoundingClientRect();
        const vh = Math.max(1, window.innerHeight);
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        const px = Math.round(progress * 60); // subtle but visible parallax
        heroEl.style.setProperty("--heroParallax", `${px}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const particles = useMemo(() => Array.from({ length: 10 }), []);

  return (
    <header className={styles.hero} ref={heroRef}>
      <div className={styles.heroImageWrap} aria-hidden="true" />
      <div className={styles.heroGradient} aria-hidden="true" />
      <div className={styles.heroGrain} aria-hidden="true" />
      <div className={styles.heroParticles} aria-hidden="true">
        {particles.map((_, i) => (
          <span key={i} className={styles.heroParticle} style={{ ["--i" as any]: i }} />
        ))}
      </div>

      <div className={styles.heroContent}>
        <div className={styles.topMeta}>
          <div className={styles.topItem}>
            <div className={styles.topRuleShort} aria-hidden />
            <div className={styles.topValue}>{dateText}</div>
            <div className={styles.topLabel}>date</div>
          </div>
          <div className={styles.topItem}>
            <div className={styles.topRuleShort} aria-hidden />
            <div className={styles.topValue}>{placeText}</div>
            <div className={styles.topLabel}>place</div>
          </div>
        </div>
        <div className={styles.heroInner}>
          <div className={styles.scriptTitle}>Thanu &amp; Jathu</div>
          <h1 className={styles.mainHeading}>We are inviting you to our reception!</h1>
          <p className={styles.lead}>Let’s celebrate the best day of our life together!</p>
        </div>
      </div>

      <button
        type="button"
        className={styles.scrollCue}
        onClick={() => document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll"
      >
        <span className={styles.scrollCueChevron} aria-hidden />
      </button>
    </header>
  );
}

