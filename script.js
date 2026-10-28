/**
 * Guitar Fretboard Memorizer
 * --------------------------------------------------------------------------
 * Pure JavaScript logic for guitar fretboard note memorization game.
 */

// 1. Constantes e Mapeamentos Musicais
const NOTES_CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const SOLFEJO_MAP = {
  'C': 'Dó',
  'C#': 'Dó#',
  'Db': 'Ré♭',
  'D': 'Ré',
  'D#': 'Ré#',
  'Eb': 'Mi♭',
  'E': 'Mi',
  'F': 'Fá',
  'F#': 'Fá#',
  'Gb': 'Sol♭',
  'G': 'Sol',
  'G#': 'Sol#',
  'Ab': 'Lá♭',
  'A': 'Lá',
  'A#': 'Lá#',
  'Bb': 'Si♭',
  'B': 'Si'
};

// Configuração das cordas em afinação padrão: 1 (E aguda) a 6 (E grave)
// Ordem visual no braço: 1ª em cima, 6ª embaixo
const STRINGS_CONFIG = [
  { index: 1, openNote: 'E', openPitchHz: 329.63, label: '1 (E)', name: 'Mizinha' },
  { index: 2, openNote: 'B', openPitchHz: 246.94, label: '2 (B)', name: 'Si' },
  { index: 3, openNote: 'G', openPitchHz: 196.00, label: '3 (G)', name: 'Sol' },
  { index: 4, openNote: 'D', openPitchHz: 146.83, label: '4 (D)', name: 'Ré' },
  { index: 5, openNote: 'A', openPitchHz: 110.00, label: '5 (A)', name: 'Lá' },
  { index: 6, openNote: 'E', openPitchHz: 82.41,  label: '6 (E)', name: 'Mizão' }
];

const TOTAL_FRETS = 12; // 0 até 12

// Configuração dos 10 Níveis
const LEVEL_DEFINITIONS = {
  1:  { name: 'Corda 6 (Mizão / E)', activeStrings: [6] },
  2:  { name: 'Corda 5 (Lá / A)', activeStrings: [5] },
  3:  { name: 'Corda 4 (Ré / D)', activeStrings: [4] },
  4:  { name: 'Corda 3 (Sol / G)', activeStrings: [3] },
  5:  { name: 'Corda 2 (Si / B)', activeStrings: [2] },
  6:  { name: 'Corda 1 (Mizinha / E)', activeStrings: [1] },
  7:  { name: 'Cordas 6 e 5 (E, A)', activeStrings: [6, 5] },
  8:  { name: 'Cordas 6, 5 e 4 (Graves)', activeStrings: [6, 5, 4] },
  9:  { name: 'Cordas 3, 2 e 1 (Agudas)', activeStrings: [3, 2, 1] },
  10: { name: 'Master (Todas as 6 Cordas)', activeStrings: [1, 2, 3, 4, 5, 6] }
};

// 2. Construção da Matriz do Braço (Fretboard Matrix)
// fretboardMatrix[stringNumber][fretNumber] -> { note, solfejo, freq }
const fretboardMatrix = {};

function initFretboardMatrix() {
  STRINGS_CONFIG.forEach(str => {
    fretboardMatrix[str.index] = [];
    const openNoteIdx = NOTES_CHROMATIC.indexOf(str.openNote);

    for (let fret = 0; fret <= TOTAL_FRETS; fret++) {
      const noteIdx = (openNoteIdx + fret) % NOTES_CHROMATIC.length;
      const noteName = NOTES_CHROMATIC[noteIdx];
      // Frequência aproximada em semitons: f = f0 * (2 ^ (fret/12))
      const freq = str.openPitchHz * Math.pow(2, fret / 12);

      fretboardMatrix[str.index][fret] = {
        string: str.index,
        fret: fret,
        note: noteName,
        solfejo: SOLFEJO_MAP[noteName] || noteName,
        freq: freq
      };
    }
  });
}
initFretboardMatrix();

// 3. Sintetizador Web Audio API Simples
class SoundController {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  playNote(frequency) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle'; // timbre mais encorpado, lembrando violão/guitarra limpa
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      // Envelope rápido para simular palhetada
      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.3, this.audioCtx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.85);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  playFeedback(isCorrect) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      if (isCorrect) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.08); // A5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.setValueAtTime(110, now + 0.12);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      console.warn(e);
    }
  }
}

const soundManager = new SoundController();

// 4. Estado da Aplicação (Game State)
const gameState = {
  currentLevel: 10,
  notationMode: 'cifra', // 'cifra' ou 'solfejo'
  score: 0,
  streak: 0,
  bestStreak: 0,
  lives: 3,
  totalAttempts: 0,
  successfulAttempts: 0,
  targetNote: null,
  foundStrings: new Set(), // Conjunto das cordas onde a nota alvo já foi acertada nesta rodada
  isProcessingGuess: false,
  isGameOver: false
};

// 5. Elementos DOM
const dom = {
  scoreVal: document.getElementById('score-val'),
  streakVal: document.getElementById('streak-val'),
  accuracyVal: document.getElementById('accuracy-val'),
  livesVal: document.getElementById('lives-val'),
  levelSelect: document.getElementById('level-select'),
  btnNotationCifra: document.getElementById('btn-notation-cifra'),
  btnNotationSolfejo: document.getElementById('btn-notation-solfejo'),
  btnSoundToggle: document.getElementById('btn-sound-toggle'),
  soundIcon: document.getElementById('sound-icon'),
  btnResetGame: document.getElementById('btn-reset-game'),
  targetNoteMain: document.getElementById('target-note-main'),
  targetNoteSub: document.getElementById('target-note-sub'),
  targetProgressContainer: document.getElementById('target-progress-container'),
  feedbackBanner: document.getElementById('feedback-banner'),
  activeStringsIndicator: document.getElementById('active-strings-indicator'),
  fretboard: document.getElementById('fretboard'),
  gameOverModal: document.getElementById('game-over-modal'),
  modalScore: document.getElementById('modal-score'),
  modalStreak: document.getElementById('modal-streak'),
  modalAccuracy: document.getElementById('modal-accuracy'),
  btnModalRestart: document.getElementById('btn-modal-restart')
};

// 6. Funções de Renderização da UI

/**
 * Renderiza o braço da guitarra dinamicamente
 */
function renderFretboard() {
  dom.fretboard.innerHTML = '';

  // 1ª Linha: Números dos trastes (0 a 12)
  const headerRow = document.createElement('div');
  headerRow.className = 'fret-number-row';

  // Célula vazia no canto superior esquerdo (sobre os nomes das cordas)
  const cornerCell = document.createElement('div');
  cornerCell.className = 'fret-num-cell';
  cornerCell.innerText = 'Corda';
  headerRow.appendChild(cornerCell);

  for (let fret = 0; fret <= TOTAL_FRETS; fret++) {
    const numCell = document.createElement('div');
    const isMarker = [3, 5, 7, 9, 12].includes(fret);
    numCell.className = `fret-num-cell ${isMarker ? 'is-marker' : ''}`;
    numCell.innerText = fret === 0 ? 'Nut' : fret;
    headerRow.appendChild(numCell);
  }
  dom.fretboard.appendChild(headerRow);

  // Linhas das Cordas (1 a 6)
  const activeStrings = LEVEL_DEFINITIONS[gameState.currentLevel].activeStrings;

  STRINGS_CONFIG.forEach(str => {
    const stringRow = document.createElement('div');
    const isActive = activeStrings.includes(str.index);
    stringRow.className = `string-row string-${str.index} ${!isActive ? 'disabled' : ''}`;
    stringRow.dataset.string = str.index;

    // Coluna do rótulo da corda
    const labelCell = document.createElement('div');
    labelCell.className = 'string-label-cell';
    labelCell.innerText = str.label;
    stringRow.appendChild(labelCell);

    // Células de trastes 0 a 12
    for (let fret = 0; fret <= TOTAL_FRETS; fret++) {
      const fretCell = document.createElement('div');
      fretCell.className = `fret-cell fret-${fret}`;
      fretCell.dataset.string = str.index;
      fretCell.dataset.fret = fret;

      // Inlay dots estéticos no braço
      // Casa 12 tem 2 pontos (entre cordas 2-3 e 4-5)
      // Casas 3, 5, 7, 9 têm ponto central (entre cordas 3 e 4)
      if (fret === 12 && (str.index === 2 || str.index === 4)) {
        const dot = document.createElement('div');
        dot.className = `inlay-dot ${str.index === 2 ? 'inlay-double-top' : 'inlay-double-bot'}`;
        fretCell.appendChild(dot);
      } else if ([3, 5, 7, 9].includes(fret) && str.index === 3) {
        const dot = document.createElement('div');
        dot.className = 'inlay-dot inlay-single';
        fretCell.appendChild(dot);
      }

      // Elemento do marcador de nota (aparece quando clicado ou revelado)
      const noteMarker = document.createElement('div');
      noteMarker.className = 'note-marker';
      const cellData = fretboardMatrix[str.index][fret];
      noteMarker.innerText = gameState.notationMode === 'cifra' ? cellData.note : cellData.solfejo;
      fretCell.appendChild(noteMarker);

      // Evento de clique no traste
      fretCell.addEventListener('click', () => handleFretClick(str.index, fret, fretCell));

      stringRow.appendChild(fretCell);
    }

    dom.fretboard.appendChild(stringRow);
  });

  updateIndicatorText();
}

/**
 * Atualiza o texto das cordas ativas no nível
 */
function updateIndicatorText() {
  const activeStrings = LEVEL_DEFINITIONS[gameState.currentLevel].activeStrings;
  if (activeStrings.length === 6) {
    dom.activeStringsIndicator.innerText = 'Cordas ativas: Todas (1 a 6)';
  } else {
    dom.activeStringsIndicator.innerText = `Cordas ativas: Corda(s) ${activeStrings.join(', ')}`;
  }
}

/**
 * Atualiza o placar e as estatísticas
 */
function updateStatsUI() {
  dom.scoreVal.innerText = gameState.score;
  dom.streakVal.innerText = `${gameState.streak}🔥`;

  const accuracy = gameState.totalAttempts === 0
    ? 100
    : Math.round((gameState.successfulAttempts / gameState.totalAttempts) * 100);
  dom.accuracyVal.innerText = `${accuracy}%`;

  // Renderizar corações de vidas
  const hearts = dom.livesVal.querySelectorAll('.heart');
  hearts.forEach((h, index) => {
    if (index < gameState.lives) {
      h.classList.remove('lost');
    } else {
      h.classList.add('lost');
    }
  });
}

/**
 * Gera uma nova nota alvo válida para as cordas ativas do nível atual
 * No caso de múltiplas cordas ativas, garante que a nota alvo apareça em pelo menos todas elas (ou nas possíveis)
 */
function generateNextTargetNote() {
  const activeStrings = LEVEL_DEFINITIONS[gameState.currentLevel].activeStrings;

  // Encontra todas as notas que existem em TODAS as cordas ativas do nível
  // Como cada corda possui 13 semitons (0 a 12), toda nota cromática aparece pelo menos 1 vez em qualquer corda!
  const possibleNotes = NOTES_CHROMATIC;

  // Evita sortear a mesma nota repetida em seguida se houver alternativas
  let newNote;
  do {
    const randIdx = Math.floor(Math.random() * possibleNotes.length);
    newNote = possibleNotes[randIdx];
  } while (newNote === gameState.targetNote && possibleNotes.length > 1);

  gameState.targetNote = newNote;
  gameState.foundStrings = new Set();
  clearPersistedFretHighlights();

  renderTargetNoteDisplay();
  renderStringsProgress();
}

/**
 * Limpa os trastes que ficaram visualmente fixados durante a rodada
 */
function clearPersistedFretHighlights() {
  const persisted = dom.fretboard.querySelectorAll('.found-persisted');
  persisted.forEach(cell => cell.classList.remove('found-persisted'));
}

/**
 * Renderiza o progresso de quais cordas já tiveram a nota alvo encontrada
 */
function renderStringsProgress() {
  const activeStrings = LEVEL_DEFINITIONS[gameState.currentLevel].activeStrings;
  dom.targetProgressContainer.innerHTML = '';

  if (activeStrings.length <= 1) {
    dom.targetProgressContainer.style.display = 'none';
    return;
  }

  dom.targetProgressContainer.style.display = 'flex';

  activeStrings.forEach(strIdx => {
    const isFound = gameState.foundStrings.has(strIdx);
    const chip = document.createElement('div');
    chip.className = `string-progress-chip ${isFound ? 'completed' : ''}`;
    chip.innerHTML = `
      <span class="chip-label">Corda ${strIdx}</span>
      <span class="chip-check">${isFound ? '✓' : '○'}</span>
    `;
    dom.targetProgressContainer.appendChild(chip);
  });
}

/**
 * Atualiza o painel central da nota alvo de acordo com a notação selecionada
 */
function renderTargetNoteDisplay() {
  if (!gameState.targetNote) return;

  const cifra = gameState.targetNote;
  const solfejo = SOLFEJO_MAP[cifra] || cifra;

  if (gameState.notationMode === 'cifra') {
    dom.targetNoteMain.innerText = cifra;
    dom.targetNoteSub.innerText = solfejo;
  } else {
    dom.targetNoteMain.innerText = solfejo;
    dom.targetNoteSub.innerText = `(${cifra})`;
  }
}

/**
 * Trata o clique do usuário em um traste
 */
function handleFretClick(stringIdx, fretIdx, fretCell) {
  if (gameState.isProcessingGuess || gameState.isGameOver) return;

  const activeStrings = LEVEL_DEFINITIONS[gameState.currentLevel].activeStrings;
  if (!activeStrings.includes(stringIdx)) return; // Corda inativa

  // Se a corda já foi completada nessa rodada
  if (gameState.foundStrings.has(stringIdx)) {
    const cellData = fretboardMatrix[stringIdx][fretIdx];
    soundManager.playNote(cellData.freq);
    dom.feedbackBanner.innerText = `Você já encontrou a nota na corda ${stringIdx}! Procure nas cordas restantes.`;
    dom.feedbackBanner.className = 'target-feedback';
    return;
  }

  gameState.isProcessingGuess = true;
  gameState.totalAttempts++;

  const cellData = fretboardMatrix[stringIdx][fretIdx];
  soundManager.playNote(cellData.freq);

  const isCorrect = cellData.note === gameState.targetNote;

  if (isCorrect) {
    // === ACERTO NA CORDA ATUAL ===
    gameState.foundStrings.add(stringIdx);
    fretCell.classList.add('correct-hit', 'found-persisted');

    gameState.score += 10 + (gameState.streak * 2);
    gameState.streak++;
    if (gameState.streak > gameState.bestStreak) {
      gameState.bestStreak = gameState.streak;
    }
    gameState.successfulAttempts++;

    soundManager.playFeedback(true);
    renderStringsProgress();
    updateStatsUI();

    const remainingCount = activeStrings.length - gameState.foundStrings.size;

    if (remainingCount === 0) {
      // Todas as cordas foram encontradas! Bônus de combo e avança nota
      gameState.score += activeStrings.length > 1 ? (activeStrings.length * 15) : 0;
      updateStatsUI();

      dom.feedbackBanner.innerText = activeStrings.length > 1
        ? `Perfeito! Você encontrou todas as ${activeStrings.length} notas!`
        : `Excelente! Nota ${cellData.note} correta!`;
      dom.feedbackBanner.className = 'target-feedback success';

      setTimeout(() => {
        fretCell.classList.remove('correct-hit');
        dom.feedbackBanner.innerText = 'Encontre a próxima nota nas cordas!';
        dom.feedbackBanner.className = 'target-feedback';
        generateNextTargetNote();
        gameState.isProcessingGuess = false;
      }, 1000);

    } else {
      // Ainda restam cordas para achar
      dom.feedbackBanner.innerText = `Boa! Agora encontre na corda ${activeStrings.filter(s => !gameState.foundStrings.has(s)).join(', ')}... (Faltam ${remainingCount})`;
      dom.feedbackBanner.className = 'target-feedback success';

      setTimeout(() => {
        fretCell.classList.remove('correct-hit');
        gameState.isProcessingGuess = false;
      }, 350);
    }

  } else {
    // === ERRO ===
    gameState.streak = 0;
    gameState.lives--;
    soundManager.playFeedback(false);

    fretCell.classList.add('wrong-hit');
    dom.feedbackBanner.innerText = `Incorreto! Essa posição na corda ${stringIdx} é ${cellData.note} (${cellData.solfejo}).`;
    dom.feedbackBanner.className = 'target-feedback error';

    updateStatsUI();

    // Revelar onde estavam as respostas corretas nas cordas ativas
    revealCorrectLocations();

    if (gameState.lives <= 0) {
      setTimeout(() => {
        triggerGameOver();
      }, 1400);
      return;
    }

    setTimeout(() => {
      fretCell.classList.remove('wrong-hit');
      clearRevealedLocations();
      const remainingCount = activeStrings.length - gameState.foundStrings.size;
      dom.feedbackBanner.innerText = remainingCount > 1
        ? `Tente novamente encontrar nas cordas restantes!`
        : 'Tente novamente encontrar a nota!';
      dom.feedbackBanner.className = 'target-feedback';
      gameState.isProcessingGuess = false;
    }, 1400);
  }
}

/**
 * Destaca visualmente no braço todos os trastes corretos para a nota atual
 */
function revealCorrectLocations() {
  const activeStrings = LEVEL_DEFINITIONS[gameState.currentLevel].activeStrings;
  activeStrings.forEach(strIdx => {
    // Revela apenas nas cordas que ainda não foram acertadas
    if (!gameState.foundStrings.has(strIdx)) {
      for (let fret = 0; fret <= TOTAL_FRETS; fret++) {
        if (fretboardMatrix[strIdx][fret].note === gameState.targetNote) {
          const cell = dom.fretboard.querySelector(`.fret-cell[data-string="${strIdx}"][data-fret="${fret}"]`);
          if (cell) cell.classList.add('reveal-target');
        }
      }
    }
  });
}

/**
 * Remove os destaques de revelação temporários
 */
function clearRevealedLocations() {
  const revealed = dom.fretboard.querySelectorAll('.reveal-target');
  revealed.forEach(cell => cell.classList.remove('reveal-target'));
}

/**
 * Ativa o modal de fim de jogo
 */
function triggerGameOver() {
  gameState.isGameOver = true;
  dom.modalScore.innerText = gameState.score;
  dom.modalStreak.innerText = gameState.bestStreak;
  const acc = gameState.totalAttempts === 0
    ? 0
    : Math.round((gameState.successfulAttempts / gameState.totalAttempts) * 100);
  dom.modalAccuracy.innerText = `${acc}%`;
  dom.gameOverModal.classList.remove('hidden');
}

/**
 * Reinicia a partida
 */
function restartGame() {
  gameState.score = 0;
  gameState.streak = 0;
  gameState.bestStreak = 0;
  gameState.lives = 3;
  gameState.totalAttempts = 0;
  gameState.successfulAttempts = 0;
  gameState.isGameOver = false;
  gameState.isProcessingGuess = false;
  gameState.foundStrings = new Set();

  dom.gameOverModal.classList.add('hidden');
  clearRevealedLocations();
  clearPersistedFretHighlights();
  updateStatsUI();
  dom.feedbackBanner.innerText = 'Clique no traste correspondente nas cordas ativas';
  dom.feedbackBanner.className = 'target-feedback';
  generateNextTargetNote();
}

/**
 * Troca de nível selecionado
 */
function setLevel(newLevel) {
  gameState.currentLevel = parseInt(newLevel, 10);
  renderFretboard();
  restartGame();
}

/**
 * Alterna entre Cifra (C, D, E) e Solfejo (Dó, Ré, Mi)
 */
function setNotation(mode) {
  gameState.notationMode = mode;
  if (mode === 'cifra') {
    dom.btnNotationCifra.classList.add('active');
    dom.btnNotationSolfejo.classList.remove('active');
  } else {
    dom.btnNotationCifra.classList.remove('active');
    dom.btnNotationSolfejo.classList.add('active');
  }
  renderTargetNoteDisplay();
  // Atualiza também os marcadores no braço
  renderFretboard();
}

// 7. Event Listeners
function setupEventListeners() {
  // Seletor de Nível
  dom.levelSelect.addEventListener('change', (e) => {
    setLevel(e.target.value);
  });

  // Botões de Notação
  dom.btnNotationCifra.addEventListener('click', () => setNotation('cifra'));
  dom.btnNotationSolfejo.addEventListener('click', () => setNotation('solfejo'));

  // Som On/Off
  dom.btnSoundToggle.addEventListener('click', () => {
    const isEnabled = soundManager.toggleSound();
    dom.soundIcon.innerText = isEnabled ? '🔊' : '🔇';
    dom.btnSoundToggle.classList.toggle('active', isEnabled);
  });

  // Botão Reiniciar
  dom.btnResetGame.addEventListener('click', () => restartGame());

  // Botão Restart Modal
  dom.btnModalRestart.addEventListener('click', () => restartGame());

  // Ativação do áudio no primeiro clique do usuário
  document.addEventListener('click', () => soundManager.init(), { once: true });
}

// Inicialização da Aplicação
function initApp() {
  setupEventListeners();
  renderFretboard();
  updateStatsUI();
  generateNextTargetNote();
}

window.addEventListener('DOMContentLoaded', initApp);
