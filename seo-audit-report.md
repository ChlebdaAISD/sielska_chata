# SEO AUDIT — Sielska Chata / sielskachata.pl
*Data audytu: 2026-04-13 | Strona jeszcze niedostępna pod domeną — audyt z kodu źródłowego*

---

## Executive Summary

| | |
|---|---|
| **Overall SEO Score** | 53/100 🟠 Poor |
| **Framework** | React 19 + Vite 8 + Tailwind CSS v4 — SSR prerendering aktywny ✅ |
| **Krytyczne problemy** | 2 (rozbieżność godzin otwarcia, stary dist) |
| **Quick Wins** | Naprawa godzin + rebuild + AggregateRating w schema = +8 pkt bez kodu |
| **Timeline do top 5** | 3–5 miesięcy przy konsekwentnym wdrożeniu planu |

---

## AI Readiness Score

| Kategoria | Waga | Score | Status |
|-----------|------|-------|--------|
| CCV — On-Page SEO (42 kryteria) | 30% | 73/100 | 🟡 |
| AIO — AI Optimization (15) | 25% | 40/100 | 🔴 |
| RAG — RAG Optimization (7) | 10% | 52/100 | 🟠 |
| SC — Structured Content (8) | 10% | 56/100 | 🟠 |
| QC — Query Coverage (4) | 10% | 60/100 | 🟡 |
| CF — Content Freshness (4) | 5% | 28/100 | 🔴 |
| IG — Information Gain (5) | 5% | 54/100 | 🟠 |
| **OVERALL WEIGHTED** | 100% | **53/100** | **🟠 Poor** |
| TECH — Technical (12) [bonus] | — | 72/100 | 🟡 |
| LOCAL — Local SEO (8) [bonus] | — | 50/100 | 🟠 |

---

## 1. Technical Analysis

### Framework
- **Type:** React 19 SPA z prerendering (SSR via ReactDOMServer.renderToString)
- **Prerendering:** ✅ Aktywny — `scripts/prerender.js` generuje `dist/public/{route}/index.html`
- **Dist:** ⚠️ STALE — dist zbudowany ze starszej wersji kodu (H1 strony głównej w dist: "Dobra kuchnia," ≠ bieżące źródło "Sielska Chata —")
- **Canonical URLs:** ✅ Trailing slash wszędzie, spójne z sitemap.xml
- **Meta injection:** ✅ Działa — `updateMetaTags()` w prerender.js zastępuje tytuły, opisy, canonical per-route

### ✅ Co działa dobrze
- Prerendering zweryfikowany w dist — `<div id="root">` zawiera pełne HTML dla wszystkich 5 podstron
- Canonical z trailing slash spójny z sitemap.xml
- Restaurant JSON-LD schema kompletna: adres, telefon, godziny, geo, logo, amenityFeature, servesCuisine
- FAQPage JSON-LD schema na stronie /imprezy/ (4 pytania)
- Open Graph + Twitter Card na każdej stronie
- `robots.txt` poprawny z linkiem do sitemap
- `sitemap.xml` zawiera wszystkie 5 stron z prawidłowymi trailing slash
- `lang="pl"` w `<html>` — poprawne dla polskiego serwisu
- GSAP animacje oparte na `window !== undefined` — SSR-safe
- Jeden H1 per strona (brak duplikatów)
- CONTACT.js jako single source of truth dla NAP

### ❌ Krytyczne problemy

**KRYTYCZNY #1: Rozbieżność godzin otwarcia**

- **Problem:** `index.html` JSON-LD i meta description mówią `09:00–19:00 / "codziennie 9–19"`, ale `contact.js` (faktyczne dane wyświetlane na stronie) mówi `12:00–22:00` (pon–pt) i `12:00–01:00` (sob).
- **Gdzie:**
  - `index.html:11` — meta description: `"Czynne codziennie 9–19"`
  - `index.html:57–64` — JSON-LD: `opens: "09:00", closes: "19:00"`
  - `entry-server.jsx:9` — canonical description też mówi `"9–19"`
  - `src/data/contact.js:27` — faktyczne godziny: `12:00–22:00`
- **Wpływ:** Google może wyświetlać błędne godziny w Knowledge Panel i Maps. Użytkownicy mogą przyjechać za wcześnie. To dyskwalifikuje z funkcji "Rich Results" dla restauracji.
- **Fix:** Zaktualizuj JSON-LD w `index.html` i opisy w `entry-server.jsx` — szczegółowa instrukcja w planie naprawczym.

**KRYTYCZNY #2: Stale dist — wymaga rebuildu**

- **Problem:** Pliki w `dist/public/` zostały zbudowane ze starszej wersji kodu. Strona główna w dist ma H1 `"Dobra kuchnia,"`, podczas gdy bieżące źródło (`Home.jsx:66`) ma `"Sielska Chata — Restauracja w Rabce-Zdrój"`. Tytuły na podstronach dist też różnią się od `entry-server.jsx`.
- **Wpływ:** To, co jest opublikowane, nie odpowiada bieżącemu stanowi kodu. Crawlery indeksują starą treść.
- **Fix:** `npm run build` (po naprawieniu godzin).

### ⚠️ Ulepszenia niekriytyczne

- Brak `AggregateRating` w JSON-LD — masz 4.7/5 z 76 recenzji, to missed opportunity na gwiazdki w SERP
- `sameAs` w schema zawiera tylko Facebook — brakuje Google Business URL
- Brak `BreadcrumbList` schema na podstronach
- Galeria w Menu.jsx: 5 × `hero.jpg` (placeholdery) — klient musi dostarczyć zdjęcia potraw
- Obrazy w galerii nie mają unikalnych alt textów opisujących konkretne dania
- Brak `<meta name="keywords">` na podstronach (tylko na homepage w index.html, nie nadpisywane przez prerender)

---

## 2. H1 ↔ Title Alignment Analysis (ze źródła — do rebuildu)

| Route | `<title>` (entry-server.jsx) | `<h1>` (JSX source) | Status |
|-------|-------------------------------|---------------------|--------|
| `/` | Sielska Chata — Restauracja w Rabce-Zdrój | Sielska Chata — Restauracja w Rabce-Zdrój | ✅ Aligned |
| `/menu/` | Menu Restauracji — Sielska Chata Rabka-Zdrój | Menu — Sielska Chata Rabka-Zdrój | 🟡 Minor divergence |
| `/imprezy/` | Imprezy Okolicznościowe Rabka-Zdrój — Sielska Chata | Imprezy Okolicznościowe w Rabce-Zdrój | ✅ Aligned |
| `/o-nas/` | O nas — Sielska Chata \| Restauracja w centrum Rabki-Zdrój | O nas — Sielska Chata Rabka-Zdrój | 🟡 Minor divergence |
| `/kontakt/` | Kontakt i Rezerwacja — Sielska Chata Rabka-Zdrój | Kontakt i Rezerwacja Sielska Chata Rabka-Zdrój | ✅ Aligned |

**Wynik:** 3/5 ✅ Aligned, 2/5 🟡 Minor divergence, 0/5 ❌ Misaligned — dobry wynik.

**Dist vs. source:** Strona główna w dist ma H1 `"Dobra kuchnia,"` — to potwierdza, że dist jest stale i wymaga rebuildu. Po rebuildu alignment będzie poprawny.

---

## 3. Content Analysis

| Strona | Szac. słowa | Status |
|--------|-------------|--------|
| Homepage (`/`) | ~570 słów | ✅ Dobry |
| O nas (`/o-nas/`) | ~450 słów | ✅ Dobry |
| Imprezy (`/imprezy/`) | ~750 słów | ✅ Bardzo dobry |
| Kontakt (`/kontakt/`) | ~350 słów | ✅ OK |
| Menu (`/menu/`) | ~150 słów tekstu + pozycje menu | ⚠️ Cienki bez opisu kategorii |

**Keyword density:**
- "Rabka-Zdrój" — wysoka częstość (kilkanaście wystąpień per strona) ✅
- "restauracja" — obecne na każdej stronie ✅
- "kuchnia polska i europejska" — 5+ wystąpień ✅
- "imprezy okolicznościowe" — bardzo dobre pokrycie na /imprezy/ ✅
- "jedzenie na wynos" — obecne na /menu/ i homepage ✅

**Braki treściowe:**
- Brak bloga / wpisów aktualności
- Strona /menu/ nie ma opisów kategorii (tylko nazwy i ceny)
- Brak strony z opiniami klientów (tylko widget na homepage)
- Brak "Dlaczego my?" porównania z konkurencją

---

## 4. Competitor Analysis

### Top 5 Konkurentów w Rabce-Zdrój

1. **Siwy Dym Restaurant**
   - Ocena: 4.6 Google / 7,914 recenzji na Restaurant Guru / #1 TripAdvisor
   - Siły: dominujące recenzje, muzyka góralska, 300 miejsc, ugruntowana marka
   - Słabości: bardziej rozrywkowy, mniej rodzinny
   - Nasza szansa: lepsze menu dla dzieci, większy parking, lokalizacja przy DK47

2. **Cafe Słodka**
   - Ocena: 4.5 Google / #2 TripAdvisor
   - Siły: wyróżnienia cukiernicze (Orły Cukiernictwa), silny w lokalnych nagrodach
   - Słabości: kawiarnia, nie restauracja
   - Nasza szansa: pełne menu obiadowe, imprezy okolicznościowe

3. **Restauracja Zdrojowa (Kawiarnia Zdrojowa)**
   - Ocena: 4.7 TripAdvisor / 4.3 Google
   - Siły: włoska kuchnia, pizza, pieczywo
   - Słabości: węższa karta niż Sielska Chata
   - Nasza szansa: szersze menu, obsługa większych grup

4. **Restauracja Przełęcz (barprzelecz.pl)**
   - Ocena: 4.2 Google
   - Siły: ma własną stronę www
   - Słabości: mniej recenzji
   - Nasza szansa: Orły Gastronomii, lepszy design strony

5. **Restauracja Hotel Wiosna**
   - Ocena: 4.1 Google (970 recenzji) / 9.2 Booking
   - Siły: masa recenzji, integracja z hotelem
   - Słabości: nie samodzielna restauracja
   - Nasza szansa: bardziej autentyczna atmosfera, niższe ceny

### Kluczowe wnioski z analizy konkurencji
- **Siwy Dym to dominujący competitor** — 7914 recenzji vs. Sielska Chata 76. Priorytet: systematyczne zbieranie recenzji Google.
- **Żaden z top-5 nie celuje w segment "przystanek DK47 w drodze Kraków–Zakopane"** — to nisza dla Sielskiej Chaty.
- **Cichy Zakątek Agroturystyka (9.7/10 Booking)** prowadzi w segmencie noclegowym — nie bezpośredni konkurent.

---

## 5. Keyword Strategy

### PRIMARY (atakować w pierwszej kolejności)
1. **"restauracja Rabka-Zdrój"** — najwyższy wolumen lokalny, core keyword
2. **"gdzie zjeść Rabka-Zdrój"** — intent transakcyjny/lokalny
3. **"obiad Rabka-Zdrój"** — intent transakcyjny

### SECONDARY (następny priorytet)
4. **"imprezy okolicznościowe Rabka-Zdrój"** — wysokie CPC, gotowi kupić
5. **"komunia Rabka-Zdrój"** — sezonowy, wysokie CPC
6. **"chrzciny restauracja Rabka-Zdrój"**
7. **"jedzenie na wynos Rabka-Zdrój"**
8. **"restauracja przy trasie Kraków Zakopane"** — nisza z potencjałem
9. **"bankiet firmowy Rabka-Zdrój"**

### LONG-TAIL (szybkie wygrane)
10. **"najlepsza restauracja Rabka-Zdrój"**
11. **"kuchnia polska Rabka-Zdrój"**
12. **"pierogi Rabka-Zdrój"**
13. **"kwaśnica Rabka-Zdrój"** — specyficzne góralskie danie
14. **"przystanek w drodze z Krakowa do Zakopanego"**
15. **"restauracja z parkingiem Rabka-Zdrój"**

### Mapowanie keyword → strona
- Homepage: #1, #2, #3 + brand
- `/imprezy/`: #4, #5, #6, #9
- `/menu/`: #7, #11, #12, #13
- `/kontakt/`: #14, #15
- Nowy post blogowy: #10, #14

---

## 6. Local SEO

### Google Business Profile
- Ocena: **4.7/5 z 76 opinii** ✅
- Profil istnieje i aktywny ✅
- Sameās w JSON-LD zawiera link do Facebook, ale nie ma Google Business URL w schema ⚠️
- Brak `AggregateRating` w JSON-LD — nie pojawią się gwiazdki w SERP

### NAP Consistency — PROBLEM
Dane NAP są **niespójne** pomiędzy warstwami:
- `contact.js` (wyświetlane na stronie): 12:00–22:00
- `index.html` JSON-LD + meta description: 09:00–19:00
- Konieczne ujednolicenie przed indeksowaniem

### Brakujące platformy lokalne
| Platforma | Status | Priorytet |
|-----------|--------|-----------|
| Google Business Profile | ✅ Aktywny | — |
| Facebook | ✅ Aktywny | — |
| TripAdvisor | ❓ Nieznany | 🔴 Wysoki |
| Yelp | ❌ Brak | 🔴 Wysoki (AI tools!) |
| Bing Places for Business | ❌ Brak | 🟡 Średni |
| Apple Maps Connect | ❌ Brak | 🟡 Średni |
| Panorama Firm | ❓ Nieznany | 🟡 Średni |
| pkt.pl | ❓ Nieznany | 🟡 Średni |

---

## 7. AI SEO Analysis (ChatGPT/Perplexity/Claude)

### Gotowość na AI Discovery: 40/100

| Element | Status |
|---------|--------|
| Core 30 stron | 5/30 (homepage + 4 podstrony) |
| Styl konwersacyjny | Częściowo — jest naturalny, ale mogłoby być więcej |
| Tabele porównawcze z konkurencją | ❌ Brak |
| Strona z opiniami (aggregate) | ❌ Brak — tylko widget na homepage |
| Strona z cennikiem/przedziałem cen | ⚠️ Pricerange "$" w schema, brak jawnego cennika |
| FAQ | ✅ Na /imprezy/ z FAQPage schema |
| Case studies / "zrealizowaliśmy X imprez" | ❌ Brak |
| Strony miasto+usługa | ❌ Brak (/restauracja-rabka/ itp.) |
| Blog / aktualności | ❌ Brak |
| Porównanie z konkurencją | ❌ Brak |
| Yelp (krytyczne dla AI) | ❌ Brak |
| Wzmianki "najlepsza restauracja" | ❌ Brak |

### Konkretne luki AI SEO
ChatGPT i Perplexity rekomendują restauracje głównie na podstawie:
1. Recenzji z Yelp i TripAdvisor — obie platformy nieobecne
2. Wzmianek w artykułach "najlepsze restauracje w X"
3. Strukturalnych danych (FAQ, cennik, godziny) — częściowo ok
4. Świeżych treści (blog, aktualności) — brak

---

## 8. Szczegółowe wyniki CCV (On-Page SEO, kluczowe pozycje)

| ID | Element | Score | Notes |
|----|---------|-------|-------|
| CCV-001 | Title 50-60 znaków | 80/100 | `/`: 42 zn. (za krótki), `/menu/`: 44 zn., `/imprezy/`: 51 zn. ✅ |
| CCV-002 | Meta description 150-160 zn. | 85/100 | Wszystkie w zakresie, z CTA ✅ |
| CCV-003 | Jeden H1 per strona | 100/100 | Każda strona ma dokładnie jeden H1 ✅ |
| CCV-004 | H1 zawiera primary keyword | 90/100 | Wszystkie H1 zawierają "Sielska Chata" / "Rabka-Zdrój" |
| CCV-005 | H1 ↔ Title alignment | 80/100 | 3/5 ✅ Aligned, 2/5 🟡 Minor divergence |
| CCV-006 | Hierarchia nagłówków (H1→H2→H3) | 85/100 | Poprawna na wszystkich stronach |
| CCV-007 | Canonical tag | 90/100 | Trailing slash, spójne z sitemap ✅ |
| CCV-008 | Open Graph kompletne | 85/100 | og:title, og:description, og:image, og:url ✅ |
| CCV-009 | Twitter Card | 85/100 | summary_large_image, wszystkie pola ✅ |
| CCV-010 | JSON-LD Schema | 65/100 | Restaurant schema obecna, ale brak AggregateRating, złe godziny! |
| CCV-011 | Godziny w schema spójne z serwisem | 0/100 | **KRYTYCZNY**: schema 09:00–19:00 ≠ contact.js 12:00–22:00 |
| CCV-012 | robots.txt | 90/100 | Allow: /, Sitemap: URL ✅ |
| CCV-013 | sitemap.xml | 85/100 | 5 stron, trailing slash, lastmod ✅ |
| CCV-014 | Alt text na obrazach | 55/100 | Hero img ma dobry alt, galeria: "Danie restauracji Sielska Chata 1-5" (generic) |
| CCV-015 | Obrazy — realne zdjęcia | 20/100 | Galeria: 5 × `hero.jpg` — placeholder! Klient nie dostarczył zdjęć |
| CCV-016 | Treść min. 500 słów (homepage) | 85/100 | ~570 słów ✅ |
| CCV-017 | Treść min. 300 słów (podstrony) | 70/100 | /menu/ jest cienka (150 słów) |
| CCV-018 | Prerendering / SSR | 90/100 | Działa, zweryfikowane w dist ✅, ale dist stale ⚠️ |
| CCV-019 | lang="pl" na HTML | 100/100 | ✅ |
| CCV-020 | Favicon | 90/100 | logo.jpg jako favicon ✅ |

**CCV średnia: ~73/100**

---

## 9. Szczegółowe wyniki AIO (AI Optimization)

| ID | Element | Score | Notes |
|----|---------|-------|-------|
| AIO-001 | Core 30 pages structure | 17/100 | 5 stron z 30 ❌ |
| AIO-002 | Conversational tone | 65/100 | Dobry ton, ale mało osobistych historii |
| AIO-003 | FAQ page z schematem | 65/100 | Tylko na /imprezy/, brak globalnej FAQ |
| AIO-004 | Comparison tables | 0/100 | Brak ❌ |
| AIO-005 | Reviews aggregate page | 15/100 | Widget na homepage, brak dedykowanej strony |
| AIO-006 | Transparent pricing | 55/100 | priceRange "$$" w schema, brak przedziałów kwotowych |
| AIO-007 | Local context depth | 70/100 | Kraków–Zakopane, Park Zdrojowy, Rabkoland ✅ |
| AIO-008 | Service+city pages | 15/100 | Brak osobnych stron per usługa+miasto |
| AIO-009 | "Best of" mentions | 0/100 | Nowy biznes, brak wzmianek |
| AIO-010 | Yelp presence | 0/100 | Nie znaleziono profilu ❌ |
| AIO-011 | TripAdvisor presence | 20/100 | Niepotwierdzone ❌ |
| AIO-012 | Blog / świeże treści | 0/100 | Brak ❌ |
| AIO-013 | Case studies | 20/100 | 3 testimoniale, brak case studies |
| AIO-014 | Structured award info | 75/100 | Orły Gastronomii 8.9 + Google 4.7 ✅ |
| AIO-015 | Brand NAP consistency | 40/100 | Niespójne godziny ❌ |

**AIO średnia: ~40/100**

---

## 10. Quick Wins (top 12 po ROI)

| # | ID | Element | Effort | Impact | Akcja |
|---|----|---------|--------|--------|-------|
| 1 | CCV-011 | Godziny w JSON-LD | 10 min | 🔥🔥🔥 | Zmień `opens: "12:00"`, `closes: "22:00"` w index.html + utwórz oddzielny rekord dla Soboty |
| 2 | CCV-018 | Rebuild dist | 5 min | 🔥🔥🔥 | `npm run build` po naprawieniu godzin |
| 3 | CCV-010 | AggregateRating w JSON-LD | 15 min | 🔥🔥🔥 | Dodaj `"aggregateRating": {"@type":"AggregateRating","ratingValue":"4.7","reviewCount":"76"}` |
| 4 | AIO-010 | Rejestracja Yelp | 20 min | 🔥🔥🔥 | Utwórz profil na biz.yelp.com (krytyczne dla AI tools) |
| 5 | AIO-011 | Rejestracja TripAdvisor | 20 min | 🔥🔥🔥 | Utwórz listing restauracji |
| 6 | LOCAL | Bing Places for Business | 20 min | 🔥🔥 | Zarejestruj na bingplaces.com |
| 7 | LOCAL | Apple Maps Connect | 20 min | 🔥🔥 | Zarejestruj na mapsconnect.apple.com |
| 8 | CCV-001 | Rozbuduj tytuł `/` | 5 min | 🔥🔥 | `Sielska Chata — Restauracja w Rabce-Zdrój \| Kuchnia polska i europejska` (60 zn.) |
| 9 | SC | Dedykowana strona opinii | 2h | 🔥🔥 | Nowa podstrona `/opinie/` z embedem Google Reviews + TripAdvisor |
| 10 | AIO-004 | Tabela porównawcza | 1h | 🔥🔥 | Sielska Chata vs Siwy Dym vs Zdrojowa — na stronie /o-nas/ |
| 11 | CCV-015 | Realne zdjęcia galerii | 30 min (po dostarczeniu) | 🔥🔥 | Zastąp 5 × hero.jpg prawdziwymi zdjęciami potraw z unikalnymi alt |
| 12 | CF | Pierwszy post na bloga | 3h | 🔥🔥 | "5 powodów, żeby się zatrzymać w Rabce-Zdrój w drodze z Krakowa do Zakopanego" |

---

## 11. Expected Results

| Timeframe | Efekt |
|-----------|-------|
| 2 tygodnie | Poprawne godziny w Google Knowledge Panel, gwiazdki w SERP (AggregateRating) |
| 1 miesiąc | Indeksowanie po rebuild, pierwsze pozycje dla brand + long-tail |
| 2 miesiące | Top 10 dla "restauracja Rabka-Zdrój" przy zbieraniu recenzji |
| 3 miesiące | Pojawienie się w TripAdvisor / Yelp rankingach |
| 6 miesięcy | Top 3–5 dla primary keywords przy regularnym blogu i recenzjach |

---

## Appendix A — Poprawiony JSON-LD dla index.html

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Sielska Chata",
  "description": "Restauracja z kuchnią polską i europejską w centrum Rabki-Zdrój. Szeroka karta dań — od tradycyjnych pierogów i żurku po jagnięcinę, sandacza i krewetki. Imprezy okolicznościowe, jedzenie na wynos.",
  "url": "https://sielskachata.pl",
  "telephone": "+48780285859",
  "priceRange": "$$",
  "acceptsReservations": true,
  "servesCuisine": ["Polish", "European"],
  "hasMenu": "https://sielskachata.pl/menu/",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Piłsudskiego 18",
    "addressLocality": "Rabka-Zdrój",
    "postalCode": "34-700",
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.60580,
    "longitude": 19.96110
  },
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
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "76",
    "bestRating": "5"
  },
  "award": "Orły Gastronomii 2026 — ocena 8.9",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Bezpłatny parking", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Menu dla dzieci", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Jedzenie na wynos", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Imprezy okolicznościowe", "value": true }
  ],
  "image": ["https://sielskachata.pl/images/hero.jpg"],
  "logo": {
    "@type": "ImageObject",
    "url": "https://sielskachata.pl/images/logo.jpg"
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61584598020581"
  ]
}
```

---

## Appendix B — Implementation Checklist

### Natychmiastowe (< 30 min)
- [ ] Napraw godziny w `index.html` JSON-LD (opens/closes)
- [ ] Napraw meta description w `index.html` — zmień "9–19" na "12–22"
- [ ] Napraw meta description w `entry-server.jsx` route `/` — zmień "9–19" na "12–22"
- [ ] Dodaj `aggregateRating` do JSON-LD w `index.html`
- [ ] Rozbuduj title na `/` do 58-60 znaków (dodaj `| Kuchnia polska i europejska`)
- [ ] Uruchom `npm run build` po zmianach
- [ ] Zarejestruj na Yelp (biz.yelp.com)
- [ ] Zarejestruj na TripAdvisor
- [ ] Zarejestruj na Bing Places for Business
- [ ] Zarejestruj na Apple Maps Connect

### Ten tydzień (2–8h)
- [ ] Zastąp galerię w Menu.jsx prawdziwymi zdjęciami (po dostarczeniu przez klienta)
- [ ] Dodaj stronę `/opinie/` z opiniami Google + statystyki
- [ ] Dodaj tabelę porównawczą na `/o-nas/`
- [ ] Stwórz profil na Panorama Firm i pkt.pl
- [ ] Dodaj `BreadcrumbList` schema do podstron

### Ten miesiąc
- [ ] Napisz i opublikuj 3 posty na bloga
- [ ] Stwórz podstrony `komunia-rabka-zdroj` i `chrzciny-rabka-zdroj`
- [ ] Przygotuj stronę z cennikiem orientacyjnym imprez
- [ ] Systematyczne zbieranie recenzji Google (cel: 100+ recenzji)
