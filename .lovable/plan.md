

## Aggiornamento Meta Tags OG con Screenshot Dinamico

### Problema attuale
I meta tag OG in `index.html` puntano a un'immagine statica su Google Cloud Storage. L'obiettivo e' sostituirla con uno screenshot live della pagina `https://strategy-share-maker.lovable.app`, catturato a 1200x627 in PNG.

### Approccio: Screenshot Service

Poiche' Open Graph richiede un URL immagine diretto (non una pagina HTML), servira' un servizio di screenshot che generi un PNG al volo. Esistono diverse opzioni:

- **thum.io** (gratuito, no API key): `https://image.thum.io/get/width/1200/crop/627/png/https://strategy-share-maker.lovable.app`
- **Microlink** (gratuito con limiti): `https://api.microlink.io/?url=https://strategy-share-maker.lovable.app&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1200&viewport.height=627`
- **Servizi a pagamento** (urlbox, screenshotapi) che richiedono API key

La soluzione piu' semplice e senza costi e' **thum.io**, che non richiede chiavi API e restituisce direttamente un PNG.

### Modifiche al file `index.html`

Un'unica modifica: riscrittura pulita dei meta tag nel `<head>`, rimuovendo duplicati e tag vuoti, con il nuovo URL screenshot:

**URL OG image:**
```
https://image.thum.io/get/width/1200/crop/627/png/https://strategy-share-maker.lovable.app
```

**Meta tag finali (tutti server-rendered, gia' nell'HTML statico):**

```html
<!-- Primary Meta Tags -->
<title>Salvatore Musella | Digital Product Manager</title>
<meta name="title" content="Salvatore Musella — Turning ambiguity into actionable product strategy" />
<meta name="description" content="Digital Product Manager. Download resume." />
<meta name="author" content="Salvatore Musella" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://salvatoremusella.com/" />
<meta property="og:title" content="Salvatore Musella — Turning ambiguity into actionable product strategy" />
<meta property="og:description" content="Digital Product Manager. Download resume." />
<meta property="og:image" content="https://image.thum.io/get/width/1200/crop/627/png/https://strategy-share-maker.lovable.app" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="627" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://salvatoremusella.com/" />
<meta name="twitter:title" content="Salvatore Musella — Turning ambiguity into actionable product strategy" />
<meta name="twitter:description" content="Digital Product Manager. Download resume." />
<meta name="twitter:image" content="https://image.thum.io/get/width/1200/crop/627/png/https://strategy-share-maker.lovable.app" />
```

### Pulizia

- Rimozione di tutte le righe vuote ridondanti (linee 33-59)
- Rimozione dei meta tag duplicati in fondo al `<head>` (linee 60-63)
- Aggiunta di `og:image:width` e `og:image:height` (attualmente mancanti)

### Dettagli tecnici

- **File modificato**: solo `index.html`
- **Nessun codice JS/TS modificato**: i tag sono statici nell'HTML, quindi sono server-rendered e visibili ai crawler senza eseguire JavaScript
- **Nessuna API key necessaria**: thum.io e' gratuito e non richiede autenticazione
- **Il file `public/og-image.png` rimane** nel progetto ma non sara' piu' referenziato dai meta tag

### Nota importante

Il servizio thum.io ha un rate limit sul piano gratuito. Se il volume di condivisioni e' elevato o se il servizio risulta lento/inaffidabile, si potra' valutare in futuro di passare a un servizio a pagamento (urlbox, screenshotapi) con chiave API salvata nei secrets del progetto.

