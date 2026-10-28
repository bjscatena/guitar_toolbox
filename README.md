# 🧰 Guitar Toolbox

Caixa de ferramentas de guitarra que roda 100% no navegador. HTML, CSS e JavaScript puro — sem build.

🔗 **Online:** <https://bjscatena.github.io/guitar_toolbox/>

## Ferramentas

| Ferramenta | O que faz |
| :--- | :--- |
| 🎯 **FretMaster** (`#fretboard`) | Sorteia uma nota e você acha a casa certa no braço (10 níveis, cifra ou solfejo). |
| 🎼 **SightReader** (`#reading`) | Liga a partitura em Clave de Sol à corda e à casa certas (17 progressões). |
| 🔁 **LoopStudio** (`#practice`) | Isola trechos, ajusta a velocidade (50–150%) e automatiza repetições. |
| 🎸 **Violão Virtual** (`#chords`) | Monta acordes no braço (53 acordes, 4 afinações) e toca as 6 cordas juntas. |

## Rodar localmente

```bash
python3 -m http.server 8080     # ou: npx serve .
```

Depois abra <http://localhost:8080/> (não abra via `file://`).

## Deploy

Push na `main` → GitHub Actions publica no GitHub Pages (`.github/workflows/deploy.yml`).

## Stack

VexFlow · Tone.js · WaveSurfer · Web Audio API · Google Fonts (via CDN)

## Licença

Projeto pessoal de estudo, aberto para consulta. Bibliotecas de terceiros mantêm suas próprias licenças.
