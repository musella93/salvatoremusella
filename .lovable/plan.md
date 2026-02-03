
# Semplificazione Save Card: Solo VCF

## Obiettivo
Modificare il bottone "Save Card" per generare e scaricare solo il file VCF, rimuovendo completamente la generazione dell'immagine PNG.

## Modifiche da effettuare

### 1. Semplificare `src/pages/Index.tsx`
- Rimuovere l'import di `BusinessCard` e `saveBusinessCard`
- Rimuovere il `ref` e lo `useState` per la generazione
- Rimuovere il componente `BusinessCard` nascosto (hidden offscreen)
- Importare direttamente `downloadVCard` da `src/utils/generateVCard.ts`
- Semplificare `handleSaveCard` per chiamare solo `downloadVCard()`

### 2. Rimuovere file non più necessari
- Eliminare `src/components/BusinessCard.tsx`
- Eliminare `src/utils/saveBusinessCard.ts`

### 3. Aggiornare tooltip (opzionale)
- Cambiare "Salva Business Card" → "Salva Contatto" per maggiore chiarezza

## Dettagli tecnici

Il codice del bottone diventerà molto più semplice:

```text
const handleSaveCard = () => {
  downloadVCard();
};
```

Nessun state, nessun ref, nessun async - solo un click che avvia il download del file `.vcf`.

## Dipendenze da rimuovere
Le librerie `html-to-image` e `qrcode.react` potranno essere rimosse dal `package.json` dato che non saranno più utilizzate.

## Risultato finale
Al click sull'icona Download, l'utente scaricherà direttamente il file `Salvatore-Musella.vcf` che su iOS/Android aprirà automaticamente la schermata "Aggiungi contatto".
