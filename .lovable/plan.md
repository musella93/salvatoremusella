

## Redirect automatico alla Home Page per rotte inesistenti

### Cosa cambia

Il componente `NotFound.tsx` verra modificato per eseguire un redirect immediato alla home page (`/`) invece di mostrare la pagina 404. In questo modo, qualsiasi URL inesistente portera direttamente alla home senza che l'utente veda nulla.

### Dettagli tecnici

- **File modificato**: `src/pages/NotFound.tsx`
- Si sostituisce il contenuto attuale (pagina 404 visibile) con un `useEffect` + `useNavigate()` di React Router che reindirizza immediatamente a `/`
- Il componente restituira `null` (nessun contenuto visibile) durante il brevissimo istante prima del redirect
- Nessuna modifica ad `App.tsx`, `_redirects` o altri file

