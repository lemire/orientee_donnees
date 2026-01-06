---
title: "Encodage des caractères Unicode"
weight: 70
---

# Encodage des caractères Unicode
  
Les fichier texte sont stockés un encodage Unicode (soit UTF-16, soit UTF-8).

## Qu'est-ce qu'Unicode ?

Unicode est un standard international qui attribue un numéro unique, appelé point de code, à chaque caractère utilisé dans les écritures du monde entier. Contrairement aux anciens systèmes d'encodage comme ASCII qui ne supportaient que 128 caractères (principalement l'anglais), Unicode peut représenter plus de 140 000 caractères, incluant des lettres, des symboles, des émojis, des caractères de contrôle et des scripts anciens. Par exemple, le caractère "A" a le point de code U+0041, tandis que l'émoji "😀" a U+1F600. Unicode assure l'interopérabilité entre différentes langues et plateformes, permettant à un document de mélanger du texte en français, chinois, arabe et emoji sans problèmes de compatibilité.

L'adoption d'Unicode a résolu les problèmes d'encodage multiples qui causaient des erreurs d'affichage, comme les caractères "�" (replacement character) lorsqu'un fichier était ouvert avec un mauvais encodage. Unicode définit également des règles pour la normalisation des caractères, comme la décomposition des caractères accentués (par exemple, "é" peut être représenté comme "e" + "´" ou comme un seul caractère U+00E9).

## UTF-8 : L'encodage variable le plus populaire

UTF-8 est l'encodage Unicode le plus largement utilisé sur le web et dans les systèmes modernes. Contrairement à UTF-16 qui utilise une taille fixe de 2 octets par caractère, UTF-8 utilise un nombre variable d'octets : 1 octet pour les caractères ASCII (U+0000 à U+007F), 2 octets pour la plupart des caractères latins accentués et cyrilliques, 3 octets pour la plupart des caractères asiatiques, et 4 octets pour les émojis et caractères rares. Cette conception permet à UTF-8 d'être rétrocompatible avec ASCII : tout fichier ASCII valide est aussi un fichier UTF-8 valide.

Par exemple, le caractère "A" (U+0041) s'encode en un seul octet : `41` en hexadécimal. Le caractère "é" (U+00E9) s'encode en deux octets : `C3 A9`. Le caractère chinois "中" (U+4E2D) s'encode en trois octets : `E4 B8 AD`. Cette variabilité rend UTF-8 efficace pour les textes principalement en anglais (économie d'espace) tout en supportant pleinement Unicode.

Un avantage majeur de UTF-8 est son absence d'endianness (ordre des octets) : les octets sont toujours dans le même ordre, éliminant les problèmes de big-endian vs little-endian. Cependant, certains systèmes ajoutent un BOM (Byte Order Mark, U+FEFF) au début des fichiers pour indiquer explicitement l'encodage UTF-8, bien que ce ne soit pas obligatoire.

## UTF-16 : L'encodage à largeur fixe

UTF-16 utilise 2 octets (16 bits) pour la plupart des caractères courants, mais peut utiliser des paires de substituts (4 octets au total) pour les caractères au-delà du Plan Multilingue de Base (BMP), comme les émojis. Par exemple, "A" s'encode en `00 41` (en little-endian) ou `41 00` (en big-endian). Le caractère "中" s'encode en `2D 4E`. Pour un émoji comme "😀" (U+1F600), qui est au-delà du BMP, UTF-16 utilise deux unités de code : `D8 3D DE 00` (little-endian).

L'endianness est cruciale en UTF-16 : les systèmes Intel (little-endian) stockent les octets dans l'ordre inverse des systèmes Motorola (big-endian). Pour éviter les confusions, un BOM peut être ajouté : `FE FF` pour big-endian, `FF FE` pour little-endian. UTF-16 était populaire dans les systèmes Windows anciens, mais UTF-8 l'a largement surpassé pour sa compatibilité web.

Comparé à UTF-8, UTF-16 peut être plus efficace pour les textes asiatiques (moins d'octets par caractère), mais il consomme plus d'espace pour les textes occidentaux. De plus, les paires de substituts compliquent le traitement des chaînes.

## Exemples d'encodage

Voici quelques exemples concrets d'encodage de caractères en UTF-8 et UTF-16 :

- Caractère "A" (U+0041) :
  - UTF-8 : `41`
  - UTF-16 LE : `41 00`
  - UTF-16 BE : `00 41`

- Caractère "é" (U+00E9) :
  - UTF-8 : `C3 A9`
  - UTF-16 LE : `E9 00`
  - UTF-16 BE : `00 E9`

- Caractère "中" (U+4E2D) :
  - UTF-8 : `E4 B8 AD`
  - UTF-16 LE : `2D 4E`
  - UTF-16 BE : `4E 2D`

- Émoji "😀" (U+1F600) :
  - UTF-8 : `F0 9F 98 80`
  - UTF-16 LE : `3D D8 00 DE`
  - UTF-16 BE : `D8 3D DE 00`

Pour le texte "Hello 😀", l'encodage complet serait :
- UTF-8 : `48 65 6C 6C 6F 20 F0 9F 98 80`
- UTF-16 LE : `48 00 65 00 6C 00 6C 00 6F 00 20 00 3D D8 00 DE`

Ces exemples montrent comment UTF-8 économise de l'espace pour les caractères simples tandis que UTF-16 est plus prévisible en taille pour certains scripts.

## Choix de l'encodage

Le choix entre UTF-8 et UTF-16 dépend du contexte : UTF-8 est recommandé pour le web, les fichiers texte et la compatibilité maximale. UTF-16 peut être préféré dans des environnements où les caractères non-ASCII sont dominants. Dans tous les cas, spécifier l'encodage dans les déclarations (comme `<?xml version="1.0" encoding="UTF-8"?>` en XML) évite les ambiguïtés.

Il peut être intéressant de voir comment le texte est converti en données binaires sur votre disque. Saisissez du texte. Voyez les octets en UTF-8 et UTF-16. Pour distinguer les encodages, il arrive que les systèmes ajoutent quelques octets au début du contenu (appelé BOM pour Byte-Order-Mark). Le format UTF-16 comporte deux variantes : LE (little endian) et BE (big endian).



<section style="display:block; margin-bottom: 12px;">
 <label for="input" style="display:block; font-weight:600; font-size: 13px; margin-bottom:6px;">
  Texte
 </label>
 <textarea id="input" placeholder="Tapez ici…" spellcheck="false" style="display:block; width:100%; max-width: 980px; height: 160px; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 13px; line-height: 1.4; resize: vertical; background:#ffffff; color:#0f172a;"></textarea>
</section>
<section style="display:flex; flex-wrap: wrap; gap: 16px; align-items: center; margin: 10px 0 18px 0;">
 <div style="display:flex; align-items:center; gap:10px;">
  <span style="font-weight:600; font-size:13px;">
   UTF-16
  </span>
  <label style="display:inline-flex; align-items:center; gap:6px; font-size:13px; color:#334155;">
   <input checked="" name="endian" style="margin:0;" type="radio" value="le"/>
   LE
  </label>
  <label style="display:inline-flex; align-items:center; gap:6px; font-size:13px; color:#334155;">
   <input name="endian" style="margin:0;" type="radio" value="be"/>
   BE
  </label>
 </div>
 <label style="display:inline-flex; align-items:center; gap:8px; font-size:13px; color:#334155;">
  <input id="bom" style="margin:0;" type="checkbox"/>
  Inclure BOM
 </label>
 <div style="margin-left:auto; font-size:12px; color:#64748b;">
  Les valeurs sont affichées en hexadécimal (octets).
 </div>
</section>
<section style="display:grid; grid-template-columns: 1fr; gap: 16px; max-width: 980px;">
 <div style="border:1px solid #e2e8f0; border-radius:10px; padding:12px; background:#f8fafc;">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
   <strong style="font-size:14px; color:#0b1220;">
    UTF-8
   </strong>
   <span id="len8" style="font-size:12px; color:#334155;">
    0 octet
   </span>
  </div>
  <pre id="hex8" style="margin:0; white-space:pre-wrap; word-break:break-word; font-size:12px; line-height:1.45; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; color:#0f172a;">—</pre>
 </div>
 <div style="border:1px solid #e2e8f0; border-radius:10px; padding:12px; background:#f8fafc;">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
   <strong style="font-size:14px; color:#0b1220;">
    UTF-16
    <span id="endiantag" style="font-weight:600; color:#0b1220;">
     LE
    </span>
    <span id="bomtag" style="font-weight:400; color:#64748b;">
     , sans BOM
    </span>
   </strong>
   <span id="len16" style="font-size:12px; color:#334155;">
    0 octet
   </span>
  </div>
  <pre id="hex16" style="margin:0; white-space:pre-wrap; word-break:break-word; font-size:12px; line-height:1.45; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; color:#0f172a;">—</pre>
 </div>
</section>
<footer style="margin-top: 18px; font-size:12px; color:#64748b;">
 Conseils: les émojis et caractères hors BMP utilisent des paires de substituts en UTF‑16. Le comptage d’octets inclut le BOM si coché.
</footer>
<script>
 (function() {
        const $ = (id) => document.getElementById(id);
        const input = $('input');
        const len8 = $('len8');
        const hex8 = $('hex8');
        const len16 = $('len16');
        const hex16 = $('hex16');
        const bom = $('bom');
        const endiantag = $('endiantag');
        const bomtag = $('bomtag');
        const endianRadios = Array.from(document.querySelectorAll('input[name="endian"]'));
        function pluralize(n) { return n > 1 ? 'octets' : 'octet'; }
        function toHex(bytes) {
          if (!bytes || bytes.length === 0) return '—';
          const parts = [];
          for (let i = 0; i < bytes.length; i++) {
            parts.push(bytes[i].toString(16).padStart(2, '0').toUpperCase());
          }
          // Group by 16 bytes per line for readability
          const lines = [];
          for (let i = 0; i < parts.length; i += 16) {
            lines.push(parts.slice(i, i + 16).join(' '));
          }
          return lines.join('\n');
        }
        function utf16Encode(str, littleEndian = true, includeBOM = false) {
          const codeUnits = [];
          for (const ch of str) {
            const cp = ch.codePointAt(0);
            if (cp <= 0xFFFF) {
              codeUnits.push(cp);
            } else {
              const uPrime = cp - 0x10000;
              const high = 0xD800 + (uPrime >> 10);
              const low = 0xDC00 + (uPrime & 0x3FF);
              codeUnits.push(high, low);
            }
          }
          const extra = includeBOM ? 2 : 0;
          const bytes = new Uint8Array(codeUnits.length * 2 + extra);
          let offset = 0;
          if (includeBOM) {
            if (littleEndian) { bytes[offset++] = 0xFF; bytes[offset++] = 0xFE; }
            else { bytes[offset++] = 0xFE; bytes[offset++] = 0xFF; }
          }
          for (let i = 0; i < codeUnits.length; i++) {
            const cu = codeUnits[i] & 0xFFFF;
            if (littleEndian) {
              bytes[offset++] = cu & 0xFF;
              bytes[offset++] = (cu >> 8) & 0xFF;
            } else {
              bytes[offset++] = (cu >> 8) & 0xFF;
              bytes[offset++] = cu & 0xFF;
            }
          }
          return bytes;
        }
        function update() {
          const text = input.value || '';
          const littleEndian = endianRadios.find(r => r.checked)?.value !== 'be';
          const includeBOM = bom.checked;
          // UTF-8
          const utf8 = new TextEncoder().encode(text);
          len8.textContent = utf8.length + ' ' + pluralize(utf8.length);
          hex8.textContent = toHex(utf8);
          // UTF-16
          const utf16 = utf16Encode(text, littleEndian, includeBOM);
          len16.textContent = utf16.length + ' ' + pluralize(utf16.length);
          hex16.textContent = toHex(utf16);
          endiantag.textContent = littleEndian ? 'LE' : 'BE';
          bomtag.textContent = includeBOM ? ', avec BOM' : ', sans BOM';
        }
        input.addEventListener('input', update);
        bom.addEventListener('change', update);
        endianRadios.forEach(r => r.addEventListener('change', update));
        // Init
        update();
      })();
</script>
<p>
 Pour en savoir plus...
</p>
<ul>
 <li>
  <a href="https://fr.wikipedia.org/wiki/UTF-8">
   UTF-8
  </a>
  (wikipédia);
 </li>
 <li>
  <a href="https://fr.wikipedia.org/wiki/UTF-16">
   UTF-16
  </a>
  (wikipédia);
 </li>
</ul>
