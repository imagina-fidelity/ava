// The introduction shows once, on a person's first visit. Kept in the browser; if storage is blocked it shows again next time.
const KEY = "ava-intro-seen-v1";

export const introSeen = {
  get(): boolean {
    try { return !!localStorage.getItem(KEY); } catch { return false; }
  },
  set() {
    try { localStorage.setItem(KEY, "1"); } catch { /* shown again next visit */ }
  },
};
