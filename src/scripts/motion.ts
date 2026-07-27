/**
 * Site-wide motion: Lenis smooth scroll (pointer:fine only) + scroll reveals.
 * Motion budget & rationale: design/DESIGN.md. Everything here is a no-op
 * under prefers-reduced-motion (PRD §5).
 *
 * The `.js` class (which the CSS uses to gate hidden reveal/rise states) is
 * added HERE, not by an inline head script — only once this script has
 * actually run can it guarantee something will reveal that content. If the
 * script is blocked or errors before this point, elements keep their
 * default visible state instead of staying hidden forever.
 */
import Lenis from 'lenis';

document.documentElement.classList.add('js');

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

if (!reduceMotion && finePointer) {
  try {
    const lenis = new Lenis({ duration: 1.1 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch {
    // Smooth scroll is an enhancement; native scrolling still works.
  }
}

if (!reduceMotion) {
  const revealed = new WeakSet<Element>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !revealed.has(entry.target)) {
          entry.target.classList.add('is-revealed');
          revealed.add(entry.target);
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2 },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
}
