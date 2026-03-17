"use client";

import { useCallback } from "react";
import styles from "./IntroOverlay.module.css";

type Props = {
  onEnter: () => void;
  exiting?: boolean;
  /** Image path in public folder for decorative shell frame, e.g. "/intro.png" */
  imageSrc?: string;
};

export function IntroOverlay({ onEnter, exiting = false, imageSrc = "/intro.png" }: Props) {
  const handleClick = useCallback(() => {
    onEnter();
  }, [onEnter]);

  return (
    <div className={`${styles.overlay} ${exiting ? styles.exiting : ""}`}>
      {imageSrc && (
        <div className={styles.introImage} aria-hidden>
          <img className={styles.introImageImg} src={imageSrc} alt="" />
        </div>
      )}
      <div className={styles.backdrop} aria-hidden />
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <h1 className={styles.heading}>You&apos;re Invited!</h1>
          <p className={styles.subtext}>
            Join us in making this day unforgettable!
          </p>
          <button
            type="button"
            className={styles.enterButton}
            onClick={handleClick}
          >
            Discover the details
          </button>
        </div>
      </div>
      <button
        type="button"
        className={styles.clickArea}
        onClick={handleClick}
        aria-label="Discover the details"
      />
    </div>
  );
}
