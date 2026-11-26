# codeABC

Write **ABC music notation**, see clean sheet music, and hear it on a sampled concert grand piano. It's a sibling of mdnotes, with the same layout, themes and typefaces, built for music and made for iPad.

## Features
- **Write** page: ABC code with syntax highlighting in every theme's colours, line numbers, an insert bar of ABC symbols, auto-closing `[ ]` `{ }` `" "`, and red line numbers on lines with errors.
- **Score** page: engraved sheet music (abcjs) with play / pause, stop, a timeline you can drag, tempo from 40 to 200%, loop, a count-in, and notes that light up as they play. Tap a note to play from it.
- **Piano**: Salamander Grand Piano V3 (Yamaha C5), 3 velocity layers, stereo 44.1 kHz, concert-hall reverb. Dynamics pick the layer.
- **Export**: `.abc`, vector **PDF** sheet music, `.midi`, and `.wav` (a 16-bit stereo recording of the piano).
- Folders, search, pinning, multi-select, a tunebook export, JSON backup, transposition (semitone and octave).
- 34 themes and 32 monospaced typefaces, carried over from mdnotes.
- Works offline once loaded (service worker). Installs to the iPad Home Screen with its own icon.
- ⓘ opens a full guide: getting started, an ABC reference, playback and export, and keyboard shortcuts.

## Install on iPad
1. Repo → Settings → Pages → Deploy from branch → `main` / root.
2. Open `https://<you>.github.io/codeABC/` in Safari.
3. Share → **Add to Home Screen**.

## Files
| Path | What |
| --- | --- |
| `index.html` | The whole app |
| `sw.js`, `manifest.webmanifest` | Offline cache and install manifest |
| `icons/` | App icon (`icon.svg` is the source) |
| `vendor/` | abcjs, jsPDF, svg2pdf.js and their licences |
| `piano/v5`, `v10`, `v14` | Soft, medium and loud piano samples, named by MIDI note |

## Credits
- [abcjs](https://github.com/paulrosen/abcjs) by Paul Rosen and Gregory Dyke, MIT licence.
- Salamander Grand Piano V3 by Alexander Holm, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). The MP3 conversions by Jan Forst ([samples-piano-mp3](https://github.com/darosh/samples-piano-mp3)) are MIT-licensed. For codeABC they were trimmed and faded (3.5 to 10 s per note) and re-encoded at 128 kbps.
- [jsPDF](https://github.com/parallax/jsPDF) and [svg2pdf.js](https://github.com/yWorks/svg2pdf.js), MIT licence.
