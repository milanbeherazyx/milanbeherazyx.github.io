/**
 * Thin wrapper over the `motion` npm package (G1 foundations — not wired
 * into any page yet; that's G3's job once a G2 direction is approved).
 *
 * Coexists with `src/scripts/motion.ts` (Lenis smooth scroll + the existing
 * IntersectionObserver-based `[data-reveal]`/`[data-rise]` system) rather
 * than replacing it — `motion` is for new, more expressive choreography
 * (spring physics, scroll-linked animation, gestures) that plain CSS
 * transitions can't do; the existing system stays for what it already
 * handles well.
 *
 * Every export here is reduced-motion safe: if the visitor has
 * prefers-reduced-motion set, animations resolve instantly / never start,
 * matching the PRD §5 motion budget rule that reduced-motion disables all
 * of it, applied consistently everywhere `motion` gets used from G3 on.
 */
import { animate, inView, stagger, type AnimationOptions, type ElementOrSelector } from 'motion';

function prefersReducedMotion(): boolean {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Same signature as `motion`'s `animate`, but resolves the target(s) to
 * their final keyframe instantly (duration 0) when reduced-motion is set,
 * instead of skipping the animation outright — so end state is never lost.
 */
export function safeAnimate(
  target: Parameters<typeof animate>[0],
  keyframes: Parameters<typeof animate>[1],
  options?: AnimationOptions,
) {
  if (prefersReducedMotion()) {
    return animate(target, keyframes, { ...options, duration: 0 });
  }
  return animate(target, keyframes, options);
}

/**
 * Same signature as `motion`'s `inView`, but the callback fires
 * immediately (no observer) under reduced-motion, so scroll-triggered
 * content still appears without relying on visibility/intersection.
 */
export function safeInView(
  target: ElementOrSelector,
  onStart: Parameters<typeof inView>[1],
  options?: Parameters<typeof inView>[2],
) {
  if (prefersReducedMotion()) {
    const els = typeof target === 'string' ? document.querySelectorAll(target) : [target].flat();
    els.forEach((el) => onStart(el as Element, { target: el as Element } as never));
    return () => {};
  }
  return inView(target, onStart, options);
}

export { stagger };

/**
 * Count up a number from 0 to `target` once the element enters view.
 * Reduced-motion safe: sets the final value immediately instead of
 * animating. Used for the funnel/proof numerals (G2 direction: Signal).
 */
export function countUpOnView(el: HTMLElement, target: number, opts: { duration?: number } = {}) {
  const { duration = 1100 } = opts;
  const render = (v: number) => {
    el.textContent = String(Math.round(v));
  };

  if (prefersReducedMotion()) {
    render(target);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(el);
        animate(0, target, {
          duration: duration / 1000,
          ease: [0.2, 0.6, 0.2, 1],
          onUpdate: render,
        });
      }
    },
    { threshold: 0.4 },
  );
  io.observe(el);
}
