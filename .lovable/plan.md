

## Aggiunta file `_redirects` per Netlify

### Cosa viene fatto

Creazione del file `public/_redirects` (senza estensione) con la regola standard per SPA React/Vite su Netlify:

```text
/*    /index.html   200
```

### Perche la regola `200` e non `301` o `302`

Con una SPA (Single Page Application), tutte le rotte sono gestite lato client da React Router. La regola `/* /index.html 200` dice a Netlify di servire sempre `index.html` con status 200, lasciando che React Router gestisca internamente il routing e mostri la pagina corretta (o la pagina NotFound gia presente nel progetto per rotte inesistenti).

Un redirect 301/302 cambierebbe l'URL nel browser, rompendo il routing interno.

### File coinvolti

- **Creato**: `public/_redirects` (1 riga)
- **Nessuna modifica** ad altri file

### Dettagli tecnici

- Vite copia automaticamente tutti i file da `public/` nella root della build, quindi `_redirects` finira nella posizione corretta per Netlify
- La pagina `NotFound.tsx` gia configurata in `App.tsx` continuera a funzionare normalmente per rotte non definite

