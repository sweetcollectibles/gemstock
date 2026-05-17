# 🎴 TCG Tracker - Guida Completa

## 🚀 COSA HAI

Una **Progressive Web App (PWA)** che funziona su:
- 📱 **iPhone / iPad** (Safari)
- 💻 **Windows / Mac** (Chrome, Edge, Brave)
- 🤖 **Android** (Chrome)

**Caratteristiche:**
- ✅ Si installa come app nativa con icona sulla home
- ✅ Funziona **offline** (i tuoi dati restano sempre disponibili)
- ✅ Tutti i dati salvati **sul tuo dispositivo** (privacy totale)
- ✅ Link diretto eBay per ogni carta (ultimi venduti)
- ✅ Pronta per integrare l'API quando arriverà l'approvazione

---

## 📦 STEP 1 — METTERE L'APP ONLINE

L'app deve essere su un server per essere installabile. Usiamo **Vercel** (gratis, 5 minuti).

### Opzione A — Vercel (consigliata)

1. Vai su **vercel.com** → registrati con email o GitHub
2. Clicca **"Add New" → "Project"**
3. Trascina la cartella `tcg-pwa` (oppure carica lo ZIP)
4. Clicca **Deploy**
5. Ti darà un URL tipo `tcg-tracker-xxx.vercel.app`

### Opzione B — Netlify (alternativa)

1. Vai su **netlify.com** → registrati
2. Drag & drop della cartella `tcg-pwa` nella loro home
3. Stesso risultato

### Opzione C — GitHub Pages (richiede account GitHub)

1. Crea un repository su GitHub
2. Carica i file
3. Settings → Pages → enable

---

## 📱 STEP 2 — INSTALLARE COME APP

### Su **iPhone / iPad**:

1. Apri l'URL in **Safari** (NON Chrome, deve essere Safari)
2. Tocca il pulsante **Condividi** (icona in basso)
3. Scorri e tocca **"Aggiungi alla schermata Home"**
4. Conferma → l'icona appare sulla home! 🎉

### Su **Windows / Mac (Chrome o Edge)**:

1. Apri l'URL nel browser
2. Cerca l'icona **⊕ Installa** nella barra degli indirizzi
3. Oppure: menu (⋮) → **"Installa TCG Tracker"**
4. Si apre come app desktop dedicata! 🎉

### Su **Android**:

1. Apri l'URL in Chrome
2. Menu (⋮) → **"Installa app"**
3. Icona aggiunta all'app drawer 🎉

---

## 💡 COME USARE L'APP

### Aggiungere una carta
- Tocca il pulsante **+** (in basso a destra)
- Compila i campi (nome, grading, prezzo acquisto)
- Salva

### Aggiornare un prezzo (manuale)
- Tocca la carta nella lista
- Clicca **"🔗 Apri Ultimi Venduti su eBay"** → ti porta direttamente alla ricerca eBay
- Copia l'ultimo prezzo venduto
- Torna nell'app → inserisci nel campo "Aggiorna Prezzo"
- Salva (tutto resta nello storico)

### Filtri rapidi
- **In Profitto** → carte con valore > acquisto
- **In Perdita** → carte sotto acquisto
- **Da aggiornare** → carte non aggiornate da X giorni

### Backup
- ⚙ Impostazioni → **Esporta JSON** (salva tutto in un file)
- Per ripristinare: ⚙ → **Importa JSON**

---

## 🔄 FUTURO — INTEGRAZIONE API

Quando arriverà l'approvazione di **eBay Marketplace Insights API**:

1. Mi mandi un messaggio
2. Ti preparo la versione aggiornata
3. Aggiungiamo un pulsante **"🔄 Aggiorna Tutti"**
4. Premi → l'app aggiorna automaticamente tutti i prezzi in pochi secondi

I tuoi dati attuali resteranno tutti — l'upgrade è trasparente.

---

## 🛠 PROBLEMI?

- **App non si installa su iPhone** → assicurati di usare Safari, non Chrome
- **Manifest non carica** → verifica che tutti i file siano nello stesso URL
- **Dati persi** → usa sempre Esporta JSON per backup periodici!
- **Vuoi modificare qualcosa?** → scrivimi qui, ti preparo la versione nuova in 5 min

---

## 📁 FILE INCLUSI

- `index.html` → L'app
- `manifest.json` → Config per installazione
- `sw.js` → Service worker (offline)
- `icon-192.png` `icon-512.png` → Icone app
- `apple-touch-icon.png` → Icona iOS
