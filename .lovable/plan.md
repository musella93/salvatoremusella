

## Sostituzione Social Image (Open Graph)

L'immagine caricata verra utilizzata direttamente come nuova social image OG, con ottimizzazione tecnica.

### Passaggi

1. **Copia dell'immagine** nel progetto come `public/og-image.png`, sovrascrivendo quella attuale.

2. **Ottimizzazione tecnica** tramite il modello di image generation per garantire:
   - Dimensioni esatte 1200x630px (standard OG)
   - Compressione PNG ottimale
   - Nitidezza e leggibilita del testo su tutte le piattaforme (LinkedIn, Twitter/X, WhatsApp, Telegram, iMessage)

3. **Nessuna modifica al codice**: i meta tag in `index.html` puntano gia a `/og-image.png` (righe 19 e 26), quindi non serve toccare nulla.

### Dettagli tecnici

- File modificato: `public/og-image.png` (sovrascrittura)
- Strumento: copia diretta del file caricato dall'utente, eventualmente rielaborato con `imagegen` per il resize esatto a 1200x630 se necessario
- Nessuna modifica a `index.html`, `src/data/profile.ts`, o altri file

