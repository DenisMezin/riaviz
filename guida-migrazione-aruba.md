# Guida alla Migrazione da Vercel ad Aruba Hosting

Questa guida ti accompagnerà passo dopo passo nella migrazione del sito RIAVIZ Motorsport da Vercel (dove verrà deployato per la review del cliente) al hosting Aruba.

---

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere:
- ✅ Accesso al pannello di controllo Aruba Hosting
- ✅ Credenziali FTP/SFTP fornite da Aruba
- ✅ Node.js installato localmente (versione 18 o superiore)
- ✅ Accesso al repository Git del progetto

---

## ⚠️ IMPORTANTE: Static Export Configuration

Next.js di default genera un'applicazione dinamica che richiede un server Node.js. Aruba hosting standard supporta solo **hosting statico** (HTML/CSS/JS). Dobbiamo configurare Next.js per generare un **export statico**.

---

## 🔧 Step 1: Configurare Next.js per Static Export

### 1.1 Modificare `next.config.ts`

Apri il file `next.config.ts` nella root del progetto e aggiorna la configurazione:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // ← AGGIUNGERE QUESTA RIGA
  images: {
    unoptimized: true, // ← AGGIUNGERE QUESTA RIGA (richiesto per static export)
  },
  trailingSlash: true, // ← OPZIONALE ma raccomandato per compatibilità Aruba
};

export default nextConfig;
```

**Spiegazione:**
- `output: 'export'` - Abilita la generazione di file statici
- `images: { unoptimized: true }` - Disabilita l'ottimizzazione automatica delle immagini (non supportata in static export)
- `trailingSlash: true` - Aggiunge `/` alla fine degli URL (migliore compatibilità con server Apache di Aruba)

### 1.2 Rimuovere funzionalità non supportate

Lo **static export** NON supporta:
- ❌ API Routes (`/api/*`)
- ❌ Revalidation (ISR)
- ❌ Server Components dinamici
- ❌ Image Optimization automatica
- ❌ Middlewares con logica server-side

**Il tuo progetto è compatibile** perché:
- ✅ Usa solo Client Components (`"use client"`)
- ✅ Non ha API routes
- ✅ Gestisce i18n lato client con `LocaleContext`

---

## 🏗️ Step 2: Build del Progetto in Modalità Statica

### 2.1 Eseguire il build

Dalla root del progetto, esegui:

```bash
npm run build
```

Questo comando genererà una cartella `out/` contenente tutti i file statici (HTML, CSS, JS, immagini).

### 2.2 Verificare il build localmente

Testa il build statico localmente:

```bash
npx serve out
```

Apri il browser su `http://localhost:3000` e verifica che tutto funzioni correttamente:
- ✅ Navigazione tra le sezioni
- ✅ Switch lingua funzionante (🇮🇹 🇬🇧 🇸🇮)
- ✅ Immagini caricate
- ✅ Animazioni Framer Motion funzionanti

---

## 📦 Step 3: Preparare i File per Aruba

### 3.1 Struttura della cartella `out/`

Dopo il build, la cartella `out/` conterrà:

```
out/
├── _next/              # JS, CSS, fonts compilati
├── images/             # Immagini pubbliche
├── flags/              # SVG bandiere
├── hero_gallery/       # Immagini hero
├── riaviz.ico          # Favicon
├── index.html          # Home page
└── 404.html            # Pagina errore
```

### 3.2 File `.htaccess` per Aruba (Apache)

Crea un file `.htaccess` nella cartella `out/` per configurare:
- Redirects
- Compressione
- Cache headers
- Gestione errori 404

**Contenuto `.htaccess`:**

```apache
# Abilita RewriteEngine
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Forza HTTPS (se hai certificato SSL su Aruba)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST%}/$1 [R=301,L]

  # Gestione trailing slash
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !(.*)/$
  RewriteRule ^(.*)$ $1/ [L,R=301]

  # Redirect 404 alla home (o pagina 404 personalizzata)
  ErrorDocument 404 /404.html
</IfModule>

# Compressione Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache Headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

---

## 🚀 Step 4: Upload su Aruba via FTP/SFTP

### 4.1 Ottenere le credenziali FTP

Accedi al **Pannello di Controllo Aruba** e trova le credenziali FTP:
- **Host**: `ftp.tuosito.it` (o l'indirizzo fornito da Aruba)
- **Username**: (fornito da Aruba)
- **Password**: (fornito da Aruba)
- **Porta**: `21` (FTP) o `22` (SFTP)

### 4.2 Connessione FTP

Usa un client FTP come:
- **FileZilla** (Windows/Mac/Linux) - consigliato
- **Cyberduck** (Mac)
- **WinSCP** (Windows)

**Configurazione FileZilla:**
1. Apri FileZilla
2. Inserisci:
   - Host: `ftp.tuosito.it`
   - Username: `tuo_username`
   - Password: `tua_password`
   - Porta: `21`
3. Clicca "Connessione Rapida"

### 4.3 Upload dei file

1. **Naviga alla cartella pubblica**
   - Su Aruba, la cartella è solitamente `/public_html/` o `/htdocs/`
   
2. **Svuota la cartella pubblica** (se esistono file vecchi)
   - Elimina tutti i file esistenti

3. **Carica il contenuto di `out/`**
   - Seleziona **tutti i file e cartelle** dentro `out/`
   - Trascina nella cartella `/public_html/` su Aruba
   - ⏱️ **Tempo stimato**: 5-15 minuti (dipende dalla connessione)

4. **Verifica upload**
   - Assicurati che tutte le cartelle siano state caricate:
     - `_next/`
     - `images/`
     - `flags/`
     - `hero_gallery/`
     - `index.html`
     - `.htaccess`

---

## 🔍 Step 5: Verifica e Testing

### 5.1 Controlla il sito live

Visita il dominio Aruba (es. `https://riaviz-motorsport.it`) e verifica:

- ✅ **Home page** carica correttamente
- ✅ **Navigazione** tra le sezioni funzionante
- ✅ **Switch lingua** (🇮🇹🇬🇧🇸🇮) funzionante
- ✅ **Immagini** tutte visibili
- ✅ **Animazioni** Framer Motion attive
- ✅ **Responsive design** su mobile
- ✅ **Performance** (test con Lighthouse)

### 5.2 Test multi-browser

Testa su:
- Chrome
- Firefox
- Safari
- Edge

### 5.3 Test mobile

Testa su dispositivi reali:
- iOS (Safari)
- Android (Chrome)

---

## 🐛 Risoluzione Problemi Comuni

### Problema: Immagini non caricate

**Causa**: Path errati o maiuscole/minuscole
**Soluzione**:
- Verifica che i path siano corretti: `/images/nome.jpg`
- Aruba è **case-sensitive**: `Image.jpg` ≠ `image.jpg`

### Problema: CSS/JS non applicati

**Causa**: Path `_next/` non corretto
**Soluzione**:
- Assicurati che la cartella `_next/` sia nella root pubblica
- Controlla il file `.htaccess`

### Problema: 404 su pagine non esistenti

**Causa**: Manca gestione 404
**Soluzione**:
- Verifica che `404.html` sia nella root
- Controlla `ErrorDocument 404 /404.html` nel `.htaccess`

### Problema: Switch lingua non funziona

**Causa**: Files JSON mancanti
**Soluzione**:
- Verifica che la cartella `_next/static/` contenga i file JSON tradotti

### Problema: Certificato SSL non attivo

**Causa**: SSL non abilitato su Aruba
**Soluzione**:
1. Accedi al pannello Aruba
2. Vai in "Certificati SSL"
3. Attiva "Let's Encrypt" (gratuito) o acquista certificato
4. Rimuovi il redirect HTTPS nel `.htaccess` se non hai SSL

---

## 📝 Checklist Finale

Prima di considerare completata la migrazione, verifica:

- [ ] Build statico generato con successo (`npm run build`)
- [ ] File `.htaccess` creato e configurato
- [ ] Tutti i file caricati su Aruba via FTP
- [ ] Sito accessibile dal dominio
- [ ] Tutte le pagine funzionanti
- [ ] Switch lingua funzionante
- [ ] Immagini caricate correttamente
- [ ] Performance accettabili (Lighthouse score > 80)
- [ ] Mobile responsive
- [ ] SSL attivo (HTTPS)
- [ ] Test multi-browser completato
- [ ] Cliente ha approvato

---

## 🔄 Aggiornamenti Futuri

Per aggiornare il sito in futuro:

1. Modifica il codice localmente
2. Esegui `npm run build`
3. Carica solo i file modificati tramite FTP (o tutta la cartella `out/`)
4. Verifica le modifiche live

**Consiglio**: Usa Git per tracciare le modifiche e mantieni sempre un backup locale prima di caricare su Aruba.

---

## 📞 Supporto

In caso di problemi:
- **Aruba Support**: https://assistenza.aruba.it/
- **Documentazione Aruba Hosting**: https://guide.aruba.it/
- **Next.js Static Export**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

---

**Buona migrazione! 🚀**
