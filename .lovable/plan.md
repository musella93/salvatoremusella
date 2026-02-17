

## Inversione posizione CTA

Scambio semplice della posizione dei due blocchi CTA, mantenendo intatti stili, classi CSS, link e icone di ciascuno.

### Cosa cambia

- Il blocco "View Credentials" (righe 121-133) viene spostato prima del blocco "Schedule a Quick Call" (righe 107-119)
- Ogni CTA mantiene il proprio stile originale (classi CSS `cta-secondary` e `cta-tertiary` restano associate agli stessi bottoni)

### Risultato

L'ordine nella pagina diventerà:
1. Download Resume (invariato)
2. View Credentials (era terzo)
3. Schedule a Quick Call (era secondo)

### Dettagli tecnici

Modifica in `src/pages/Index.tsx`: i due blocchi `<a>` vengono semplicemente scambiati di posizione nel JSX, senza toccare classi, attributi o contenuti.

