# 🍬 Sweethome

App PWA per tracciare un portfolio di carte Pokémon gradate (PSA, BGS, CGC) e prodotti sigillati.

## Cos'è
Sweethome (nome in codice: gemstock) è una Progressive Web App installabile su:
- 📱 iPhone / iPad (Safari → Aggiungi a schermata Home)
- 💻 Windows / Mac (Chrome / Edge → Installa)
- 🤖 Android (Chrome → Installa app)

## Funzionalità
- Catalogo carte gradate con foto, grado, certificato PSA, prezzo d'acquisto e storico
- Prodotti sigillati (sealed) con quantità
- Wishlist con prezzi target
- Registro attività: vendite e spese per anno, con P&L
- Scan PSA (lettura certificato + immagini)
- Vetrina delle 3 carte preferite
- Export PDF/Excel di liste e registro
- Ordinamento e filtri per casa di grading

## Architettura
- `index.html` — app completa (HTML + CSS + JS)
- `sw.js` — service worker (cache offline)
- `manifest.json` — manifest PWA
- Backend: Supabase (database + storage + auth + edge functions)

## Sviluppo
File singolo, vanilla JS. Deploy via GitHub → Vercel.
