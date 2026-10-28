# 🧰 Guitar Toolbox

Uma **caixa de ferramentas** de guitarra que roda 100% no navegador (Client-Side) e fica pronta para hospedagem gratuita no **GitHub Pages**. Nada de curso com trilha nem ordem obrigatória: você abre a ferramenta que resolve o problema da vez, usa e fecha.

---

## 🏛️ Visão Geral & Filosofia

A ideia é simples: **cada ferramenta responde a uma pergunta que aparece na hora de praticar.** Não existe trilha obrigatória nem ordem de curso — o hub é uma bancada, e cada card é uma ferramenta pronta para uso:

| Ferramenta | Nome Oficial | Para que serve | Tecnologias Chave |
| :--- | :--- | :--- | :--- |
| **Ferramenta 01** | **🎯 FretMaster** | Encontrar notas no braço (corda isolada, grupos de cordas ou braço completo). | CSS Grid, Web Audio API, Cifras & Dó-Ré-Mi |
| **Ferramenta 02** | **🎼 SightReader** | Ligar a partitura em Clave de Sol à corda e à casa certas (17 progressões de dificuldade). | VexFlow 4.2, Tone.js, Frases de 4 a 16 notas |
| **Ferramenta 03** | **🔁 LoopStudio** | Isolar trechos, ajustar a velocidade e deixar as repetições no automático. | Wavesurfer.js v7, Time-Stretching, Repertório |
| **Ferramenta 04** | **🎸 Violão Virtual** | Montar acordes e voicings no braço, com execução simultânea das 6 cordas. | Web Audio API (nativa), Canvas-less CSS Grid, 53 acordes |


---

## 🎯 Ferramenta 01: FretMaster

- **Sorteio de nota:** A ferramenta sorteia uma nota alvo e você precisa achar a casa certa nas cordas ativas.
- **Desafio Multi-Cordas:** Nos níveis com mais de uma corda (7 a 10), o objetivo é localizar a nota em **todas as cordas ativas** (1 acerto por corda) para completar a rodada e ganhar bônus.
- **10 Níveis de Dificuldade:** Desde cordas isoladas (6ª, 5ª...) até o braço completo com 12 trastes.
- **Notação Flexível:** Alternância com 1 clique entre **Cifras** (C, D, E...) e **Solfejo** (Dó, Ré, Mi...).
- **Feedback Realista:** Marcadores perolados nas casas 3, 5, 7, 9 e 12 (dupla), cordas com espessuras proporcionais e áudio sintetizado de palhetada.

---

## 🎼 Ferramenta 02: SightReader

- **Partitura ⇄ Braço:** Conexão direta entre a pauta musical tradicional (Clave de Sol) e a corda/casa reais no braço.
- **17 Progressões de Dificuldade:** Das notas naturais na 1ª posição até expansões completas com acidentes (#).
- **Frases Configuráveis:** Sequências de 4, 8, 12 ou 16 notas com indicador de progresso em bolinhas.
- **Áudio Polifônico:** Síntese sonora em tempo real via **Tone.js**.

---

## 🔁 Ferramenta 03: LoopStudio

- **Isolamento de Trechos:** Defina loops precisos na onda sonora da música utilizando o mouse ou os atalhos de teclado:
  - <kbd>Espaço</kbd>: Play / Pause
  - <kbd>S</kbd>: Marca início do loop
  - <kbd>E</kbd>: Marca fim do loop
  - <kbd>Esc</kbd>: Para rotina ativa
- **Controle de Velocidade:** Treine de 50% a 150% da velocidade original sem alterar a afinação.
- **Automatização de Treino:** Contagem regressiva de preparação (metrônomo) e pausas configuráveis entre repetições.
- **Minhas Músicas:** Carregue qualquer arquivo de áudio local (MP3, WAV) e organize seu repertório.

---

## 🎸 Ferramenta 04: Violão Virtual

- **Braço Interativo:** 6 cordas × 12 casas (trastes) em CSS Grid, com colunas extras para **X** (corda abafada) e **0** (corda solta). Clique em qualquer casa para montar o acorde.
- **Execução 100% Simultânea:** O botão **Tocar Acorde** dispara todas as cordas ativas no *mesmo* instante — nenhum arpejo. A sincronia é garantida por um único `startTime` compartilhado por todas as vozes:

  ```js
  const startTime = ctx.currentTime + 0.035; // um único timestamp
  soundingStrings.forEach(({ stringIndex, midi }) => synth.pluckString(midi, startTime));
  ```

- **Síntese de Cordas (Web Audio API nativa):** Cada corda usa 2–3 osciladores levemente desafinados (*triangle* + *sawtooth* + sub), envelope de filtro *lowpass*, transiente de palhetada em *band-pass*, compressor e reverb de convolução gerado proceduralmente (IR sintética) — **sem Tone.js nem CDN**.
- **Dicionário com 53 Acordes em 9 Categorias:** Maiores, Menores, Com sétima (7), Sétimas maiores (7M), Menores com 7 (m7), Suspensos & add9, Power chords (5), Inversões (baixo alternativo) e Diminutos/Aumentados/6. Clicar em um desenho carrega o acorde no braço **e já o toca**.
- **Detecção Automática do Nome:** A ferramenta analisa as notas soando e escreve o nome do acorde (ex.: `C`, `Am7/G`, `C9`, `E5`), além de calcular os intervalos e detectar inversões.
- **Notação Flexível:** Alternância entre **Cifra** (C, D, E...) e **Solfejo** (Dó, Ré, Mi...) nos chips de nota.
- **Afinações Alternativas:** Padrão (E A D G B E), Meio tom abaixo (Eb Ab Db Gb Bb Eb), Drop D e Open G — os nomes das notas e a detecção do acorde são recalculados conforme a afinação escolhida.
- **Controles de Áudio:** Sliders de *sustain* e *volume*, botão de mute/unmute e botão **Parar o som**.
- **Atalhos de Teclado:**
  - <kbd>Espaço</kbd>: Tocar o acorde montado
  - <kbd>Esc</kbd>: Limpar o braço (todas as cordas soltas)

---

## 📁 Estrutura de Pastas

```text
guitar_toolbox/
├── index.html                    <- Hub principal (a bancada com as 4 ferramentas)
├── app.js                        <- Roteador SPA e gerenciador das ferramentas
├── style.css                     <- Tema escuro global, layout do hub e do braço
├── 404.html                      <- Página de erro exibida pelo GitHub Pages
├── site.webmanifest              <- Manifesto PWA (nome, ícones, cor de tema)
├── robots.txt                    <- Diretrizes para buscadores
├── .nojekyll                     <- Evita o processamento Jekyll no Pages
├── .editorconfig / .gitignore    <- Padronização e higiene do repositório
├── README.md                     <- Documentação do projeto
│
├── assets/                       <- Ícones estáticos da aplicação
│   ├── favicon.svg
│   └── icons/                    <- icon-192.png, icon-512.png, apple-touch-icon.png, favicon-32.png
│
├── .github/workflows/deploy.yml  <- Deploy automático no GitHub Pages
│
└── modules/                      <- Uma pasta por ferramenta
    ├── fret-master/              <- Ferramenta 01: Localizador de notas no braço
    │   ├── script.js
    │   └── style.css
    │
    ├── sight-reader/             <- Ferramenta 02: Partitura ⇄ braço
    │   ├── script.js
    │   └── style.css
    │
    ├── loop-studio/              <- Ferramenta 03: Loops, velocidade e repetições
    │   ├── app.js
    │   ├── index.html
    │   └── style.css
    │
    └── virtual-guitar/           <- Ferramenta 04: Montador de acordes (arquivo único)
        └── index.html            <- HTML + CSS + motor de áudio (Web Audio API) completo
```

---

## 🚀 Deploy no GitHub Pages

O projeto é 100% estático (HTML/CSS/JS puro, sem build) e usa **caminhos relativos** em todas as referências locais — por isso funciona igual na raiz do domínio ou em `/<nome-do-repo>/`.

### 1. Primeiro push

```bash
git init -b main
git add .
git commit -m "chore: Guitar Toolbox pronta para produção"
git remote add origin https://github.com/<seu-usuario>/guitar_toolbox.git
git push -u origin main
```

### 2. Ativar o Pages

Em **Settings > Pages > Build and deployment**, escolha a fonte:

- **GitHub Actions** (recomendado): o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publica o site a cada push em `main` (e também via *Run workflow*).
- **Deploy from a branch**: branch `main`, pasta `/ (root)` — o arquivo `.nojekyll` já está presente.

URL final: `https://<seu-usuario>.github.io/guitar_toolbox/`

### 3. Testar localmente (antes do push)

Qualquer servidor estático serve — abrir `index.html` via `file://` também funciona, mas o áudio e os iframes são mais confiáveis com HTTP:

```bash
npx --yes serve . -l 8080      # ou: python -m http.server 8080
```

Acesse `http://localhost:8080/` (hub), `http://localhost:8080/#practice` e `http://localhost:8080/#chords`.

> ⚠️ Se o usuário/repositório não for `bjscatena/guitar_toolbox`, ajuste as URLs absolutas do `index.html` (`canonical`, `og:url`, `og:image`) e os links deste README.

---

## ✅ Checklist de produção

### Já aplicado neste repositório

| Item | Detalhe |
| :--- | :--- |
| **Caminhos relativos** | Nenhum `src`/`href` absoluto — nada quebra no subdiretório do Pages. |
| **Dependências de CDN fixadas** | VexFlow `4.2.2`, Tone.js `14.8.49`, Lucide `1.63.0` e Wavesurfer `7.12.12` (antes `@latest`/`@7` flutuavam) com **SRI (`integrity`)** + `crossorigin`. |
| **Ícones e PWA** | `assets/favicon.svg`, PNGs 32/192/512, `apple-touch-icon`, `site.webmanifest` e `theme-color`. |
| **SEO / compartilhamento** | `description`, `canonical`, Open Graph e Twitter Card, `robots.txt`. |
| **404 personalizado** | `404.html` no tema do app, com link de retorno ao hub. |
| **GitHub Pages** | `.nojekyll` + workflow de deploy com artefato limpo (sem `.git`). |
| **Higiene do repo** | `.gitignore` (inclui `modules/loop-studio/tracks/`), `.editorconfig`. |
| **Acessibilidade básica** | `lang="pt-BR"`, `noscript`, `title` em iframes, `loading="lazy"` e `focus-visible` no 404. |
| **Navegação por hash** | `#fretboard`, `#reading`, `#practice`, `#chords` — links compartilháveis e recarregáveis. |

### Passos manuais antes de divulgar

1. **Criar o repositório** `guitar_toolbox` no GitHub e rodar o primeiro push (seção acima).
2. **Ativar o Pages** com a fonte *GitHub Actions* e conferir se o primeiro deploy ficou verde em **Actions**.
3. **Testar em produção** os 4 cards, o áudio (Web Audio exige clique do usuário), o *upload* de MP3 no LoopStudio e os links `#practice` / `#chords`.
4. **Conferir as URLs absolutas** (`canonical`/`og:*`) caso o usuário do GitHub seja outro.

### Limitações conhecidas (por desenho ou pela plataforma)

- **GitHub Pages não permite cabeçalhos HTTP customizados** (CSP, `X-Frame-Options` etc.); a alternativa seria Cloudflare Pages/Netlify.
- **Persistência é local** (`localStorage`): repertório do LoopStudio e ajustes ficam só no navegador do usuário, sem backend nem login.
- **Faixas de áudio não são versionadas** (`modules/loop-studio/tracks/` está no `.gitignore` por direitos autorais).
- **Dependências de terceiros via CDN** (VexFlow, Tone.js, Lucide, Wavesurfer e Google Fonts): se um CDN cair, a ferramenta correspondente não carrega. Para independência total, o próximo passo seria vendorizar esses arquivos em `assets/vendor/`.
- **Sem build/testes automatizados**: não há bundler nem suíte de testes; a validação é manual no navegador.
