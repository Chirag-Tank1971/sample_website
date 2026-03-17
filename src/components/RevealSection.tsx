"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
  revealedClassName?: string;
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function RevealSection({
  className,
  revealedClassName,
  children,
  threshold = 0.12,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((e) => e.isIntersecting);
        // Ensure initial (hidden) styles paint before revealing,
        // otherwise the browser may skip the transition.
        requestAnimationFrame(() => setRevealed(isIntersecting));

        if (once && isIntersecting) obs.disconnect();
      },
      { threshold, rootMargin },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once, rootMargin, threshold]);

  const cls = [
    className ?? "",
    revealed && revealedClassName ? revealedClassName : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={cls}>
      {children}
    </div>
  );
}

