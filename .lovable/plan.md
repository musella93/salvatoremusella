
# Fix "Add to contacts" per iOS e Android

## Problema identificato

L'implementazione attuale usa l'attributo `download` sul link, che:
- **iOS Safari**: Forza il download del file invece di aprire l'app Contatti
- **Android**: Il `navigator.share` potrebbe fallire silenziosamente su alcuni browser/versioni

## Soluzione

Implementare una strategia a cascata che funzioni su entrambe le piattaforme:

### Logica di esecuzione

```text
1. Prova navigator.share (Android Chrome moderno)
   ↓ se fallisce
2. iOS/Safari: Apri Data URL in nuova tab (triggers Contacts app)
   ↓ se fallisce  
3. Fallback: Link senza attributo download (apre viewer nativo)
```

### Modifiche tecniche

**File: `src/utils/generateVCard.ts`**

1. Mantenere la generazione vCard esistente (funziona bene)

2. Riscrivere `addToContacts()` con questa logica:

   - **Tentativo 1**: `navigator.share` con file VCF
     - Funziona su Android Chrome recente
     - Se l'utente annulla, esce senza fare altro
   
   - **Tentativo 2**: Data URL con `window.location.href`
     - Formato: `data:text/x-vcard;base64,<base64-encoded-vcf>`
     - iOS Safari riconosce questo formato e apre l'app Contatti
     - Più affidabile di `window.open` (che può essere bloccato)
   
   - **Fallback finale**: Link senza attributo `download`
     - Crea un `<a>` con solo `href` (niente `download`)
     - iOS/Android aprono il viewer nativo del file VCF

### Codice proposto

```typescript
export async function addToContacts(): Promise<void> {
  const vcfContent = generateVCard();
  
  const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8" });
  const file = new File([blob], "Salvatore-Musella.vcf", { 
    type: "text/vcard;charset=utf-8" 
  });

  // 1. Try Web Share API (works on Android Chrome)
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "Salvatore Musella" });
      return;
    }
  } catch (err) {
    if ((err as Error).name === "AbortError") return;
  }

  // 2. iOS/Safari: Use Data URL redirect
  // This triggers the native "Add to Contacts" UI
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  if (isIOS || isSafari) {
    const base64 = btoa(unescape(encodeURIComponent(vcfContent)));
    window.location.href = `data:text/x-vcard;base64,${base64}`;
    return;
  }

  // 3. Fallback: Open blob URL without download attribute
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  // NO download attribute - let the browser/OS handle it
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }, 100);
}
```

### Perche' funziona

| Piattaforma | Metodo usato | Risultato |
|-------------|--------------|-----------|
| Android Chrome moderno | `navigator.share` | Share sheet con opzione "Contatti" |
| Android altri browser | Link senza `download` | Apre app Contatti |
| iOS Safari | Data URL base64 | Apre direttamente "Aggiungi contatto" |
| Desktop | Link senza `download` | Download o viewer VCF |

### Nessuna modifica a

- `src/pages/Index.tsx` (icona e stile restano identici)
- `src/data/profile.ts` (dati centralizzati ok)
- Stile delle icone nel footer
