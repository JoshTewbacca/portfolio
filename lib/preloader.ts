export const PRELOADER_SESSION_KEY = "jt-preloader-shown";

/** Seconds after mount before the hero entrance starts when the preloader runs. */
export const PRELOADER_HERO_DELAY = 2.1;

/** True when the intro overlay will actually animate this page load. */
export function preloaderWillRun(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(PRELOADER_SESSION_KEY) === null;
  } catch {
    return true;
  }
}
