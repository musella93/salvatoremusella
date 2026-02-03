
# Miglioramento Esperienza VCF su Android

## Problema
Su iOS il file VCF si apre direttamente nell'app Contatti, mentre su Android viene solo scaricato senza aprire la schermata "Aggiungi contatto".

## Soluzione
Utilizzeremo la **Web Share API** (`navigator.share()`) come metodo primario per condividere il file VCF. Su Android moderno (Chrome 75+), questa API permette di condividere file e apre un menu di condivisione dove l'utente può scegliere direttamente l'app Contatti.

## Comportamento previsto

| Dispositivo | Comportamento |
|-------------|---------------|
| **iOS Safari** | Apre direttamente "Aggiungi Contatto" |
| **Android Chrome** | Mostra menu condivisione → l'utente seleziona Contatti |
| **Browser desktop** | Fallback: download diretto del file |

## Modifiche tecniche

### File: `src/utils/generateVCard.ts`

Modificheremo la funzione `downloadVCard()` per:

1. **Creare un oggetto File** (non solo Blob) con il contenuto VCF
2. **Verificare supporto Web Share API** con `navigator.canShare()`
3. **Tentare `navigator.share()`** con il file VCF
4. **Fallback al download tradizionale** se la Share API non è supportata o fallisce

```text
export async function downloadVCard(): Promise<void> {
  const vcfContent = generateVCard();
  
  // Crea un File object (richiesto per navigator.share)
  const file = new File([vcfContent], "Salvatore-Musella.vcf", {
    type: "text/vcard"
  });
  
  // Prova Web Share API (funziona bene su Android e iOS)
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: "Salvatore Musella - Contatto"
      });
      return; // Condivisione riuscita
    } catch (error) {
      // L'utente ha annullato o errore: fallback al download
      if ((error as Error).name === 'AbortError') {
        return; // L'utente ha annullato, non fare nulla
      }
    }
  }
  
  // Fallback: download tradizionale
  const blob = new Blob([vcfContent], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Salvatore-Musella.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
```

### File: `src/pages/Index.tsx`

Aggiornare la chiamata a `downloadVCard()` per gestire la Promise (la funzione diventa async):

```text
const handleSaveCard = async () => {
  await downloadVCard();
};
```

## Risultato finale
- **Android**: Si aprirà il menu di condivisione nativo, l'utente potrà selezionare "Contatti" e il contatto verrà aggiunto direttamente
- **iOS**: Comportamento invariato (già funzionante)
- **Desktop**: Download del file come fallback

## Note
- Non servono nuove dipendenze
- La Web Share API è supportata su Chrome Android 75+, Safari iOS 12.2+
- Su browser non supportati, il comportamento rimane quello attuale (download)
