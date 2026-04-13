# SEO Improvement Plan — Sielska Chata
*Wygenerowany: 2026-04-13 | Bazuje na: seo-audit-report.md*

---

## Jak czytać ten plan

Każda faza zawiera **równoległe ścieżki** (A, B, C...) — możesz atakować kilka ścieżek jednocześnie.
Każde zadanie ma oznaczony czas, plik i dokładne instrukcje.

Status: `[ ]` = todo, `[x]` = done, `[~]` = w trakcie

---

## FAZA 1 — Naprawa krytycznych błędów (Dzień 1, łącznie ~30 min)

> **DEPLOY WYMAGANY po tej fazie.** Bez tego crawlery indeksują błędne godziny.

### Ścieżka A — Naprawa godzin i meta (20 min)
**Plik 1:** `index.html`

- [ ] Zmień meta description (linia 11):
  ```
  STARY: "...Czynne codziennie 9–19..."
  NOWY:  "...Czynne Pon.–Pt. 12–22, Sob. 12–01, Niedz. 12–22..."
  ```
- [ ] Zastąp cały blok JSON-LD `openingHoursSpecification` (linie 57–64):
  ```json
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Sunday"],
      "opens": "12:00",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "12:00",
      "closes": "01:00"
    }
  ]
  ```
- [ ] Dodaj po `"award"` w JSON-LD (po linii 65):
  ```json
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "76",
    "bestRating": "5"
  },
  ```

**Plik 2:** `src/entry-server.jsx`

- [ ] Zmień description dla route `/` (linia 9):
  ```
  STARY: "...Czynne codziennie 9–19..."
  NOWY:  "...Czynne Pon.–Pt. 12–22, Sob. 12–01, Niedz. 12–22..."
  ```
- [ ] Rozbuduj title dla route `/` do 55–60 znaków (linia 8):
  ```
  STARY: "Sielska Chata — Restauracja w Rabce-Zdrój"  (43 znaki — za krótki)
  NOWY:  "Sielska Chata — Restauracja w Rabce-Zdrój | Kuchnia polska"  (61 zn. — lekko za długi)
  LUB:   "Restauracja w Rabce-Zdrój — Sielska Chata | Kuchnia polska"  (59 zn. ✅)
  ```

### Ścieżka B — Rebuild po zmianach (5 min)
```bash
cd /Users/lukaszchlebda/ClaudeCode/sielska_chata
npm run build
```
Sprawdź że `dist/public/index.html` zawiera poprawne godziny i AggregateRating.

### Po Fazie 1:
- [ ] Wgraj na hosting (Railway / Replit)
- [ ] Poczekaj 48h i sprawdź Google Search Console czy strona jest indeksowana

---

## FAZA 2 — Rejestracja na platformach lokalnych (Dzień 1–2, łącznie ~90 min)

> Równoległe — możesz robić to samo dnia co Faza 1. Krytyczne dla AI SEO (Yelp!) i widoczności lokalnej.

### Ścieżka A — Yelp (20 min) 🔴 PRIORYTET
**URL:** https://biz.yelp.com/signup

- [ ] Utwórz konto i dodaj restaurację
- [ ] Dane NAP (skopiuj dokładnie):
  ```
  Nazwa: Sielska Chata
  Adres: ul. Piłsudskiego 18, 34-700 Rabka-Zdrój
  Telefon: +48 780 285 859
  Godziny: Pon–Pt 12:00–22:00, Sob 12:00–01:00, Niedz 12:00–22:00
  Kategoria: Polish Restaurant, European Restaurant
  ```
- [ ] Dodaj opis po polsku + zdjęcie (hero.jpg tymczasowo)
- [ ] Wyślij prośbę o recenzje do stałych klientów

### Ścieżka B — TripAdvisor (20 min) 🔴 PRIORYTET
**URL:** https://www.tripadvisor.com/Owners.html

- [ ] Wyszukaj czy Sielska Chata już istnieje na TripAdvisor
- [ ] Jeśli nie — utwórz listing (Restaurant/Bar)
- [ ] Uzupełnij wszystkie pola (opis, godziny, zdjęcia)
- [ ] Poproś zadowolonych klientów o recenzję na TripAdvisor

### Ścieżka C — Bing Places (15 min)
**URL:** https://www.bingplaces.com

- [ ] Zaloguj się przez Microsoft Account
- [ ] Dodaj restaurację z dokładnym NAP
- [ ] Potwierdź przez telefon lub pocztę

### Ścieżka D — Apple Maps Connect (15 min)
**URL:** https://mapsconnect.apple.com

- [ ] Zaloguj się przez Apple ID
- [ ] Dodaj restaurację (wymaga weryfikacji przez e-mail biznesowy)

### Ścieżka E — Polskie katalogi (20 min)
- [ ] Panorama Firm: https://www.panoramafirm.pl/dodaj-firme
- [ ] pkt.pl: https://www.pkt.pl/rejestracja
- [ ] Firmy.net: https://www.firmy.net

---

## FAZA 3 — Ulepszenia treści i schema (Tydzień 1, łącznie ~4h)

### Ścieżka A — Zdjęcia galerii (30 min + czas klienta)
**Plik:** `src/pages/Menu.jsx`

- [ ] Poproś klienta o min. 5 zdjęć potraw (format: JPG/WebP, min 800×600px)
- [ ] Zapisz w `public/images/` jako: `pierogi.jpg`, `kwaśnica.jpg`, `jagniecina.jpg`, itp.
- [ ] Zaktualizuj tablicę `images` w Menu.jsx — każde zdjęcie z opisowym alt:
  ```jsx
  { src: '/images/pierogi.jpg', alt: 'Pierogi ruskie — Sielska Chata Rabka-Zdrój' },
  { src: '/images/kwasnica.jpg', alt: 'Kwaśnica góralska — tradycyjna zupa regionalna' },
  ```

### Ścieżka B — Strona opinii `/opinie/` (2h)
Nowa podstrona z:
- H1: `Opinie o Sielskiej Chacie — Google 4.7/5, Orły Gastronomii 8.9`
- Embeddowane opinie (lub statyczne cytaty z Google, 10–15 najlepszych)
- Sekcja: "Oceń nas" z linkami do Google, TripAdvisor, Yelp
- Schema `AggregateRating` na tej stronie
- Dodaj route `/opinie/` do App.jsx, entry-server.jsx i sitemap.xml

### Ścieżka C — Tabela porównawcza na /o-nas/ (1h)
**Plik:** `src/pages/About.jsx`

Dodaj sekcję przed CTA (przed `{/* CTA */}`):
```jsx
<section className="py-16 px-6...">
  <h2>Dlaczego Sielska Chata?</h2>
  <table>
    <thead>
      <tr>
        <th>Cecha</th>
        <th>Sielska Chata</th>
        <th>Siwy Dym</th>
        <th>Kawiarnia Zdrojowa</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Karta dla dzieci</td><td>✅</td><td>⚠️</td><td>❌</td></tr>
      <tr><td>Parking bezpłatny</td><td>✅ Duży</td><td>⚠️</td><td>❌</td></tr>
      <tr><td>Imprezy okolicznościowe</td><td>✅ do 60 os.</td><td>✅</td><td>❌</td></tr>
      <tr><td>Kuchnia góralska</td><td>✅</td><td>✅</td><td>❌</td></tr>
      <tr><td>Jedzenie na wynos</td><td>✅</td><td>❌</td><td>❌</td></tr>
      <tr><td>Trasa Kraków–Zakopane</td><td>✅ DK47</td><td>❌</td><td>❌</td></tr>
    </tbody>
  </table>
</section>
```

### Ścieżka D — BreadcrumbList Schema (30 min)
**Plik:** `src/entry-server.jsx`

Dodaj do routesMeta per-route breadcrumb JSON-LD:
```js
'/menu/': {
  title: '...',
  description: '...',
  canonical: '...',
  breadcrumb: [
    { name: 'Sielska Chata', url: 'https://sielskachata.pl/' },
    { name: 'Menu', url: 'https://sielskachata.pl/menu/' }
  ]
}
```
W prerender.js wstrzyknij jako osobny `<script type="application/ld+json">`.

---

## FAZA 4 — Blog i content marketing (Tydzień 2–4, łącznie ~8h)

> Kluczowe dla Content Freshness (CF) i AI SEO. Pisz naturalnie — użyj skill `humanize-text` do finalnej wersji każdego artykułu.

### Ścieżka A — Setup bloga (2h)
- [ ] Utwórz `/blog/` jako nową stronę z listingiem
- [ ] Utwórz `/blog/[slug]/` jako template dla wpisów
- [ ] Przechowuj treść jako `.md` lub `.json` w `src/data/blog/`
- [ ] Dodaj do App.jsx i entry-server.jsx
- [ ] Zaktualizuj sitemap.xml

### Ścieżka B — Pierwsze 3 artykuły (6h łącznie, po ~2h każdy)

**Artykuł 1:** `przystanek-krakow-zakopane-restauracja-rabka.md`
- Tytuł: "Restauracja w drodze z Krakowa do Zakopanego — Rabka-Zdrój"
- Długość: 800–1000 słów
- Treść: dlaczego warto zatrzymać się w Rabce, co zobaczyć, gdzie zjeść
- Keywords: "przystanek Kraków Zakopane", "restauracja DK47", "obiad w drodze w Tatry"

**Artykuł 2:** `komunia-rabka-zdroj-przewodnik.md`
- Tytuł: "Komunia w Rabce-Zdrój — Jak zaplanować przyjęcie w restauracji"
- Długość: 800 słów
- Treść: checklist dla rodziców, co sprawdzić, pytania do restauracji
- Keywords: "komunia Rabka-Zdrój", "przyjęcie komunijne Małopolska"

**Artykuł 3:** `kuchnia-goralsaka-rabka.md`
- Tytuł: "Kwaśnica, pierogi i placki po zbójnicku — kuchnia góralska w Rabce-Zdrój"
- Długość: 700 słów
- Treść: opis regionalnych dań z menu, historia, jak wybrać
- Keywords: "kuchnia góralska Rabka", "kwaśnica", "pierogi ruskie"

---

## FAZA 5 — Podstrony miasto+usługa (Miesiąc 2, łącznie ~6h)

### Ścieżka A — Dedykowane strony eventów
Utwórz nowe routes z treścią zoptymalizowaną pod long-tail:
- `/komunia-rabka-zdroj/` — dedykowana strona (nie tylko sekcja na /imprezy/)
- `/chrzciny-restauracja-rabka-zdroj/`
- `/bankiet-firmowy-rabka-zdroj/`

Każda strona: min 600 słów, 1 H1 z keyword, LocalBusiness schema, FAQ section, Call to Action.

### Ścieżka B — Strona cennik imprez
**Nowy route:** `/cennik-imprez/`
- H1: "Cennik imprez okolicznościowych — Sielska Chata Rabka-Zdrój"
- Tabela orientacyjna: komunia (X–Y zł/os.), chrzciny, urodziny, bankiet
- Uwaga: "Cena zależna od menu i liczby gości — zadzwoń po wycenę"
- To jest KLUCZOWE dla AI — ChatGPT/Perplexity chętnie rekomendują restauracje z jawnym cennikiem

---

## Strategia zbierania recenzji (ongoing)

> Największa dźwignia dla lokalnego SEO. Cel: 150+ recenzji Google w ciągu 6 miesięcy.

### Taktyki
1. **SMS/WhatsApp po wizycie:** "Dziękujemy za wizytę w Sielskiej Chacie! Jeśli Ci smakowało, zostaw nam opinię: [link do Google]"
2. **QR kod na stole i rachunku** prowadzący do Google Reviews
3. **Po imprezie okolicznościowej:** wyślij e-mail do organizatora z prośbą o recenzję
4. **Odpowiadaj na wszystkie recenzje** — zarówno pozytywne jak i negatywne (sygnał dla Google)
5. **Danie dnia na Facebook** — przy każdym poście daj link do rezerwacji

---

## Podsumowanie faz

| Faza | Czas | Wpływ | Status |
|------|------|-------|--------|
| Faza 1 — Naprawa godzin + rebuild | ~30 min | 🔥🔥🔥 Natychmiastowy | `[ ]` |
| Faza 2 — Platformy lokalne (Yelp, TripAdvisor, Bing, Apple) | ~90 min | 🔥🔥🔥 Silny | `[ ]` |
| Faza 3 — Zdjęcia, strona opinii, tabela porównawcza | ~4h | 🔥🔥 Średni | `[ ]` |
| Faza 4 — Blog (3 artykuły) | ~8h | 🔥🔥 Długoterminowy | `[ ]` |
| Faza 5 — Podstrony eventów + cennik | ~6h | 🔥🔥 Długoterminowy | `[ ]` |

**Szacowany czas całości:** 20–22 godziny pracy.

**Oczekiwany wzrost score po Fazie 1–3:** z 53/100 → ~68/100 (🟡 Needs Work)
**Oczekiwany wzrost score po Fazie 1–5:** z 53/100 → ~78/100 (🟢 Good)
