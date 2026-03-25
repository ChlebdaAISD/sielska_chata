## Summary
The code is well-structured and mostly correct; there are a few real bugs and one unused import to clean up, but no critical failures.

---

## Issues

### Button.jsx

- **[low] correctness**: The `icon` prop renders inside a styled circle badge — but in `Navbar.jsx` and `Menu.jsx` the icon is passed as a **child** (e.g. `<Button href="..."><Phone size={14} />Zadzwoń</Button>`), not as the `icon` prop. This means `hasIcon` is `false`, the circle badge never renders, and the padding switches from asymmetric (`pl-7 pr-3.5`) to symmetric (`px-7`). That is likely the intended layout for those call sites, but worth confirming it is deliberate — the JSDoc comment at the top says `icon` is a separate prop for the badge, which contradicts how it is actually used in `Navbar.jsx`. No runtime error, but the visual result will differ from what the doc describes if someone later passes `icon` to those call sites.

- **[low] correctness**: The `secondary` and `secondary-dark` variants set `iconBg: null`, so when an icon badge *is* passed with those variants the badge falls back to `v.iconBg ?? 'bg-espresso/5'`. That fallback is intentional per the code, but it is not documented and could confuse a future developer.

---

### GalleryLightbox.jsx

- **[medium] correctness / memory**: `document.body.style.overflow = 'hidden'` is set inside the keyboard-handler `useEffect`, but the touch `useEffect` has its own separate cleanup. If `isOpen` goes `true → false → true` rapidly (e.g. user reopens immediately) both effects re-run but the `overflow` reset only happens in the keyboard cleanup. This is fine in practice because both `useEffect` blocks share the same `[isOpen, prev, next]` dependency, so they both run cleanup together. No actual leak — this note is just clarifying that the scroll-lock is coupled to one of two effects, which is a hidden dependency that could break if the effects are ever split.

- **[low] correctness**: `images[current]` is accessed directly in JSX (line 110, 111) while `isOpen` guards the entire lightbox block. However, if `images` is an empty array and somehow `current` is set to `0` (e.g. via a stale closure from a parent re-render that replaces `images` mid-flight), `images[current]` would be `undefined`, causing a runtime crash on `.src` and `.alt`. The `open` function is the only write path and it is only callable via the grid buttons (which only render if `images` has entries), so the risk is low — but a simple guard `images[current]?.src` would be safer.

- **[low] readability**: The `<style>` tag with the `galleryFadeIn` keyframes is injected inline and will be duplicated into the DOM on every render that includes the component. It should be moved to `index.css` or a global stylesheet. It works correctly, but each mount inserts another identical `<style>` node.

---

### App.jsx

- **[low] correctness / SSR**: `ScrollToTop` calls `useLocation()` which must be used inside `<Router>`. It is placed *inside* `<Router>` in the JSX (line 24), so this is correct. However, in an SSR context (`entry-server.jsx`) the `window.scrollTo` call is guarded by `typeof window !== 'undefined'`, which is the right approach — no issue here.

- **[low] correctness**: There are duplicate trailing-slash routes for every page (e.g. `/menu` and `/menu/`). This is a valid workaround for wouter's lack of built-in trailing-slash normalisation, but if wouter ever does match both, the second route is unreachable because `<Switch>` stops at the first match. Currently wouter does *not* normalise slashes, so both routes are useful — just worth keeping in mind if wouter is ever upgraded.

---

### Navbar.jsx

- **[low] readability**: The mobile menu items have both a Tailwind `transition-all` class (from the `className` string) and a `style` prop with `transition: 'all 0.5s ...'`. These conflict — the inline style will win, overriding the Tailwind transition class. The effect is correct because the inline style is the one actually controlling the animation, but the Tailwind class is dead and should be removed to avoid confusion.

- No unused imports. `Button` is correctly imported and used.

---

### Footer.jsx

- No issues. Clean, no unused imports, no logic bugs.

---

### Events.jsx

- **[medium] correctness**: The index badge `0{index + 1}` (line 95) hard-codes a leading zero. For the 10th event (index 9) this would render `010` instead of `10`. There are only 4 event types currently, so this will never trigger — but if `eventTypes` ever grows past 9 entries the badge breaks. A safer pattern: `String(index + 1).padStart(2, '0')`.

- No unused imports. The previously used `Link` import has been removed cleanly (it is not present in the file). `Button` is correctly used.

---

### Menu.jsx

- **[medium] unused import**: `Link` is imported from `wouter` on line 2 but is never used in the component. This should be removed.

- **[low] error handling**: The `fetch('/menu.json')` call silently swallows errors with `.catch(() => {})` (line 36). If the fetch fails, `categories` stays `[]` and the loading spinner ("Ładowanie menu…") shows forever with no user-facing feedback. This is a UX issue — consider at minimum setting an error state to show a "Nie można załadować menu" message.

- **[low] correctness**: `buildRenderList` uses `entry.id` as the `key` for menu items (line 129). If any menu item in `menu.json` is missing an `id` field, `key` will be `undefined`, causing React key warnings and potential reconciliation bugs. Since this depends on external JSON, it is a real risk. Consider falling back to `entry._index` if `entry.id` is absent.

---

## Verdict
NEEDS CHANGES — one unused import (`Link` in `Menu.jsx`) that will cause a lint/build warning, one silent error swallow that results in a broken loading state, and the index-overflow bug in `Events.jsx`. The rest of the issues are low-severity notes.
