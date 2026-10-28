/**
 * Sight-Reader Tool (Guitar Toolbox)
 * Encapsulated inside window.SightReadingModule to avoid global collisions.
 */
(function() {
  // 1. Data Mapping
  const guitarNotes = [
    // --- CORDA 1 (Mi agudo / E) ---
    { string: 1, fret: 0, note: "E4", vexflowKey: "e/5", isAccidental: false, accidental: null },
    { string: 1, fret: 1, note: "F4", vexflowKey: "f/5", isAccidental: false, accidental: null },
    { string: 1, fret: 2, note: "F#4", vexflowKey: "f#/5", isAccidental: true, accidental: "#" },
    { string: 1, fret: 3, note: "G4", vexflowKey: "g/5", isAccidental: false, accidental: null },
    { string: 1, fret: 4, note: "G#4", vexflowKey: "g#/5", isAccidental: true, accidental: "#" },
    { string: 1, fret: 5, note: "A4", vexflowKey: "a/5", isAccidental: false, accidental: null },
    { string: 1, fret: 6, note: "A#4", vexflowKey: "a#/5", isAccidental: true, accidental: "#" },
    { string: 1, fret: 7, note: "B4", vexflowKey: "b/5", isAccidental: false, accidental: null },
    { string: 1, fret: 8, note: "C5", vexflowKey: "c/6", isAccidental: false, accidental: null },
    { string: 1, fret: 9, note: "C#5", vexflowKey: "c#/6", isAccidental: true, accidental: "#" },
    { string: 1, fret: 10, note: "D5", vexflowKey: "d/6", isAccidental: false, accidental: null },
    { string: 1, fret: 11, note: "D#5", vexflowKey: "d#/6", isAccidental: true, accidental: "#" },
    { string: 1, fret: 12, note: "E5", vexflowKey: "e/6", isAccidental: false, accidental: null },

    // --- CORDA 2 (Si / B) ---
    { string: 2, fret: 0, note: "B3", vexflowKey: "b/4", isAccidental: false, accidental: null },
    { string: 2, fret: 1, note: "C4", vexflowKey: "c/5", isAccidental: false, accidental: null },
    { string: 2, fret: 2, note: "C#4", vexflowKey: "c#/5", isAccidental: true, accidental: "#" },
    { string: 2, fret: 3, note: "D4", vexflowKey: "d/5", isAccidental: false, accidental: null },
    { string: 2, fret: 4, note: "D#4", vexflowKey: "d#/5", isAccidental: true, accidental: "#" },
    { string: 2, fret: 5, note: "E4", vexflowKey: "e/5", isAccidental: false, accidental: null },
    { string: 2, fret: 6, note: "F4", vexflowKey: "f/5", isAccidental: false, accidental: null },
    { string: 2, fret: 7, note: "F#4", vexflowKey: "f#/5", isAccidental: true, accidental: "#" },
    { string: 2, fret: 8, note: "G4", vexflowKey: "g/5", isAccidental: false, accidental: null },
    { string: 2, fret: 9, note: "G#4", vexflowKey: "g#/5", isAccidental: true, accidental: "#" },
    { string: 2, fret: 10, note: "A4", vexflowKey: "a/5", isAccidental: false, accidental: null },
    { string: 2, fret: 11, note: "A#4", vexflowKey: "a#/5", isAccidental: true, accidental: "#" },
    { string: 2, fret: 12, note: "B4", vexflowKey: "b/5", isAccidental: false, accidental: null },

    // --- CORDA 3 (Sol / G) ---
    { string: 3, fret: 0, note: "G3", vexflowKey: "g/4", isAccidental: false, accidental: null },
    { string: 3, fret: 1, note: "G#3", vexflowKey: "g#/4", isAccidental: true, accidental: "#" },
    { string: 3, fret: 2, note: "A3", vexflowKey: "a/4", isAccidental: false, accidental: null },
    { string: 3, fret: 3, note: "A#3", vexflowKey: "a#/4", isAccidental: true, accidental: "#" },
    { string: 3, fret: 4, note: "B3", vexflowKey: "b/4", isAccidental: false, accidental: null },
    { string: 3, fret: 5, note: "C4", vexflowKey: "c/5", isAccidental: false, accidental: null },
    { string: 3, fret: 6, note: "C#4", vexflowKey: "c#/5", isAccidental: true, accidental: "#" },
    { string: 3, fret: 7, note: "D4", vexflowKey: "d/5", isAccidental: false, accidental: null },
    { string: 3, fret: 8, note: "D#4", vexflowKey: "d#/5", isAccidental: true, accidental: "#" },
    { string: 3, fret: 9, note: "E4", vexflowKey: "e/5", isAccidental: false, accidental: null },
    { string: 3, fret: 10, note: "F4", vexflowKey: "f/5", isAccidental: false, accidental: null },
    { string: 3, fret: 11, note: "F#4", vexflowKey: "f#/5", isAccidental: true, accidental: "#" },
    { string: 3, fret: 12, note: "G4", vexflowKey: "g/5", isAccidental: false, accidental: null },

    // --- CORDA 4 (Ré / D) ---
    { string: 4, fret: 0, note: "D3", vexflowKey: "d/4", isAccidental: false, accidental: null },
    { string: 4, fret: 1, note: "D#3", vexflowKey: "d#/4", isAccidental: true, accidental: "#" },
    { string: 4, fret: 2, note: "E3", vexflowKey: "e/4", isAccidental: false, accidental: null },
    { string: 4, fret: 3, note: "F3", vexflowKey: "f/4", isAccidental: false, accidental: null },
    { string: 4, fret: 4, note: "F#3", vexflowKey: "f#/4", isAccidental: true, accidental: "#" },
    { string: 4, fret: 5, note: "G3", vexflowKey: "g/4", isAccidental: false, accidental: null },
    { string: 4, fret: 6, note: "G#3", vexflowKey: "g#/4", isAccidental: true, accidental: "#" },
    { string: 4, fret: 7, note: "A3", vexflowKey: "a/4", isAccidental: false, accidental: null },
    { string: 4, fret: 8, note: "A#3", vexflowKey: "a#/4", isAccidental: true, accidental: "#" },
    { string: 4, fret: 9, note: "B3", vexflowKey: "b/4", isAccidental: false, accidental: null },
    { string: 4, fret: 10, note: "C4", vexflowKey: "c/5", isAccidental: false, accidental: null },
    { string: 4, fret: 11, note: "C#4", vexflowKey: "c#/5", isAccidental: true, accidental: "#" },
    { string: 4, fret: 12, note: "D4", vexflowKey: "d/5", isAccidental: false, accidental: null },

    // --- CORDA 5 (Lá / A) ---
    { string: 5, fret: 0, note: "A2", vexflowKey: "a/3", isAccidental: false, accidental: null },
    { string: 5, fret: 1, note: "A#2", vexflowKey: "a#/3", isAccidental: true, accidental: "#" },
    { string: 5, fret: 2, note: "B2", vexflowKey: "b/3", isAccidental: false, accidental: null },
    { string: 5, fret: 3, note: "C3", vexflowKey: "c/4", isAccidental: false, accidental: null },
    { string: 5, fret: 4, note: "C#3", vexflowKey: "c#/4", isAccidental: true, accidental: "#" },
    { string: 5, fret: 5, note: "D3", vexflowKey: "d/4", isAccidental: false, accidental: null },
    { string: 5, fret: 6, note: "D#3", vexflowKey: "d#/4", isAccidental: true, accidental: "#" },
    { string: 5, fret: 7, note: "E3", vexflowKey: "e/4", isAccidental: false, accidental: null },
    { string: 5, fret: 8, note: "F3", vexflowKey: "f/4", isAccidental: false, accidental: null },
    { string: 5, fret: 9, note: "F#3", vexflowKey: "f#/4", isAccidental: true, accidental: "#" },
    { string: 5, fret: 10, note: "G3", vexflowKey: "g/4", isAccidental: false, accidental: null },
    { string: 5, fret: 11, note: "G#3", vexflowKey: "g#/4", isAccidental: true, accidental: "#" },
    { string: 5, fret: 12, note: "A3", vexflowKey: "a/4", isAccidental: false, accidental: null },

    // --- CORDA 6 (Mi grave / E) ---
    { string: 6, fret: 0, note: "E2", vexflowKey: "e/3", isAccidental: false, accidental: null },
    { string: 6, fret: 1, note: "F2", vexflowKey: "f/3", isAccidental: false, accidental: null },
    { string: 6, fret: 2, note: "F#2", vexflowKey: "f#/3", isAccidental: true, accidental: "#" },
    { string: 6, fret: 3, note: "G2", vexflowKey: "g/3", isAccidental: false, accidental: null },
    { string: 6, fret: 4, note: "G#2", vexflowKey: "g#/3", isAccidental: true, accidental: "#" },
    { string: 6, fret: 5, note: "A2", vexflowKey: "a/3", isAccidental: false, accidental: null },
    { string: 6, fret: 6, note: "A#2", vexflowKey: "a#/3", isAccidental: true, accidental: "#" },
    { string: 6, fret: 7, note: "B2", vexflowKey: "b/3", isAccidental: false, accidental: null },
    { string: 6, fret: 8, note: "C3", vexflowKey: "c/4", isAccidental: false, accidental: null },
    { string: 6, fret: 9, note: "C#3", vexflowKey: "c#/4", isAccidental: true, accidental: "#" },
    { string: 6, fret: 10, note: "D3", vexflowKey: "d/4", isAccidental: false, accidental: null },
    { string: 6, fret: 11, note: "D#3", vexflowKey: "d#/4", isAccidental: true, accidental: "#" },
    { string: 6, fret: 12, note: "E3", vexflowKey: "e/4", isAccidental: false, accidental: null }
  ];

  // 2. Estado da Ferramenta
  const state = {
    currentLevel: "corda_1_intro",
    sequenceLength: 16,
    currentSequence: [],
    currentSequenceIndex: 0,
    score: 0,
    streak: 0,
    soundEnabled: true,
    synth: null,
    isInitialized: false
  };

  // 3. Audio Synth (Tone.js)
  function initAudio() {
    if (state.synth) return;
    try {
      if (window.Tone) {
        state.synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "triangle" },
          envelope: { attack: 0.01, decay: 0.3, sustain: 0.2, release: 0.8 }
        }).toDestination();
        state.synth.volume.value = -6;
      }
    } catch (e) {
      console.warn("Audio initialization error:", e);
    }
  }

  function playNoteAudio(noteName) {
    if (!state.soundEnabled) return;
    try {
      if (!state.synth) initAudio();
      if (window.Tone && Tone.context.state !== "running") {
        Tone.start();
      }
      if (state.synth) {
        state.synth.triggerAttackRelease(noteName, "8n");
      }
    } catch (err) {
      console.warn("Sound play error:", err);
    }
  }

  // 4. VexFlow Renderer
  function drawSequence(sequence, activeIndex = 0) {
    const container = document.getElementById("vexflow-output");
    if (!container || !sequence || sequence.length === 0) return;
    container.innerHTML = "";

    const VF = Vex.Flow;
    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    
    const noteSpacing = 68;
    const staveWidth = Math.max(380, sequence.length * noteSpacing + 90);
    
    renderer.resize(staveWidth + 30, 150);
    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    const stave = new VF.Stave(15, 20, staveWidth);
    stave.addClef("treble");
    stave.addTimeSignature("4/4");
    stave.setContext(context).draw();

    try {
      const staveNotes = sequence.map((q, idx) => {
        const sNote = new VF.StaveNote({
          clef: "treble",
          keys: [q.vexflowKey],
          duration: "q"
        });

        if (q.accidental) {
          sNote.addModifier(new VF.Accidental(q.accidental), 0);
        }

        if (idx < activeIndex) {
          sNote.setStyle({ fillStyle: "#10b981", strokeStyle: "#10b981" });
        } else if (idx === activeIndex) {
          sNote.setStyle({ fillStyle: "#f59e0b", strokeStyle: "#f59e0b" });
        } else {
          sNote.setStyle({ fillStyle: "#94a3b8", strokeStyle: "#94a3b8" });
        }

        return sNote;
      });

      const voice = new VF.Voice({ num_beats: sequence.length, beat_value: 4 });
      voice.setStrict(false);
      voice.addTickables(staveNotes);

      new VF.Formatter().joinVoices([voice]).format([voice], staveWidth - 85);
      voice.draw(context, stave);
    } catch (err) {
      console.error("VexFlow draw error:", err);
    }
  }

  // 5. Construção do Braço Virtual do Sight-Reading
  function buildFretboard() {
    const grid = document.getElementById("sr-fretboard-grid");
    const fretNumbersContainer = document.getElementById("sr-fret-numbers");
    if (!grid || !fretNumbersContainer) return;

    grid.innerHTML = "";
    fretNumbersContainer.innerHTML = "";

    // Régua de trastes
    for (let f = 0; f <= 12; f++) {
      const span = document.createElement("span");
      span.textContent = f === 0 ? "Nut" : f;
      if ([3, 5, 7, 9, 12].includes(f)) {
        span.classList.add("marker-fret");
      }
      fretNumbersContainer.appendChild(span);
    }

    // 6 cordas x 13 trastes
    for (let s = 1; s <= 6; s++) {
      for (let f = 0; f <= 12; f++) {
        const cell = document.createElement("div");
        cell.className = "fret-cell";
        cell.dataset.string = s;
        cell.dataset.fret = f;
        cell.id = `sr-cell-${s}-${f}`;

        // Inlays
        if (s === 3 && [3, 5, 7, 9].includes(f)) {
          const dot = document.createElement("div");
          dot.className = "fret-inlay-single";
          cell.appendChild(dot);
        } else if ([2, 4].includes(s) && f === 12) {
          const dot = document.createElement("div");
          dot.className = "fret-inlay-single";
          cell.appendChild(dot);
        }

        const marker = document.createElement("div");
        marker.className = "note-marker";
        cell.appendChild(marker);

        cell.addEventListener("click", () => handleFretClick(s, f));
        grid.appendChild(cell);
      }
    }
  }

  // 6. Filtros de Níveis Progressivos
  function getAvailableNotes(level) {
    switch (level) {
      case "corda_1_intro":
        return guitarNotes.filter(n => n.string === 1 && [0, 1, 3].includes(n.fret) && !n.isAccidental);
      case "corda_2_intro":
        return guitarNotes.filter(n => n.string === 2 && [0, 1, 3].includes(n.fret) && !n.isAccidental);
      case "cordas_1_2":
        return guitarNotes.filter(n => [1, 2].includes(n.string) && [0, 1, 3].includes(n.fret) && !n.isAccidental);
      case "corda_3_intro":
        return guitarNotes.filter(n => n.string === 3 && [0, 2].includes(n.fret) && !n.isAccidental);
      case "cordas_1_3":
        return guitarNotes.filter(n => [1, 2, 3].includes(n.string) && n.fret <= 3 && !n.isAccidental);
      case "corda_4_intro":
        return guitarNotes.filter(n => n.string === 4 && [0, 2, 3].includes(n.fret) && !n.isAccidental);
      case "cordas_1_4":
        return guitarNotes.filter(n => [1, 2, 3, 4].includes(n.string) && n.fret <= 3 && !n.isAccidental);
      case "corda_5_intro":
        return guitarNotes.filter(n => n.string === 5 && [0, 2, 3].includes(n.fret) && !n.isAccidental);
      case "cordas_1_5":
        return guitarNotes.filter(n => [1, 2, 3, 4, 5].includes(n.string) && n.fret <= 3 && !n.isAccidental);
      case "corda_6_intro":
        return guitarNotes.filter(n => n.string === 6 && [0, 1, 3].includes(n.fret) && !n.isAccidental);
      case "revisao_pos1_todas":
        return guitarNotes.filter(n => n.fret <= 3 && !n.isAccidental);

      case "acidentes_cordas_1_2":
        return guitarNotes.filter(n => [1, 2].includes(n.string) && [1, 2, 3, 4].includes(n.fret) && n.isAccidental);
      case "acidentes_cordas_3_4":
        return guitarNotes.filter(n => [3, 4].includes(n.string) && [1, 2, 3, 4].includes(n.fret) && n.isAccidental);
      case "acidentes_cordas_5_6":
        return guitarNotes.filter(n => [5, 6].includes(n.string) && [1, 2, 3, 4].includes(n.fret) && n.isAccidental);
      case "pos1_completa_com_acidentes":
        return guitarNotes.filter(n => n.fret <= 4);

      case "expansao_casa_5":
        return guitarNotes.filter(n => n.fret <= 5);
      case "braco_completo_12":
        return guitarNotes;

      default:
        return guitarNotes.filter(n => n.string === 1 && [0, 1, 3].includes(n.fret) && !n.isAccidental);
    }
  }

  function updateSequenceTracker() {
    const container = document.getElementById("sr-seq-dots");
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < state.sequenceLength; i++) {
      const dot = document.createElement("div");
      dot.className = "seq-dot";
      dot.textContent = i + 1;
      if (i < state.currentSequenceIndex) {
        dot.classList.add("completed");
        dot.textContent = "✓";
      } else if (i === state.currentSequenceIndex) {
        dot.classList.add("active");
      }
      container.appendChild(dot);
    }
  }

  function startNewSequence() {
    clearHighlights();
    const pool = getAvailableNotes(state.currentLevel);
    const newSeq = [];

    for (let i = 0; i < state.sequenceLength; i++) {
      const rand = pool[Math.floor(Math.random() * pool.length)];
      newSeq.push(rand);
    }

    state.currentSequence = newSeq;
    state.currentSequenceIndex = 0;

    renderCurrentSequenceStep();
  }

  function renderCurrentSequenceStep() {
    clearHighlights();
    const currentTarget = state.currentSequence[state.currentSequenceIndex];
    if (!currentTarget) return;

    updateSequenceTracker();

    const promptText = document.getElementById("sr-prompt-instruction");
    const badge = document.getElementById("sr-feedback-badge");
    if (badge) {
      badge.textContent = `Nota ${state.currentSequenceIndex + 1} de ${state.sequenceLength}`;
      badge.className = "feedback-badge";
    }

    if (promptText) {
      promptText.textContent = `Identifique a nota destacada na partitura e toque na corda e casa corretas:`;
    }
    drawSequence(state.currentSequence, state.currentSequenceIndex);
  }

  function handleFretClick(string, fret) {
    initAudio();
    const currentTarget = state.currentSequence[state.currentSequenceIndex];
    if (!currentTarget) return;

    const clickedCell = document.getElementById(`sr-cell-${string}-${fret}`);
    const marker = clickedCell ? clickedCell.querySelector(".note-marker") : null;

    const foundNote = guitarNotes.find(n => n.string === string && n.fret === fret);
    const noteName = foundNote ? foundNote.note : "";

    const isCorrect = (string === currentTarget.string && fret === currentTarget.fret) || 
                      (foundNote && foundNote.vexflowKey === currentTarget.vexflowKey);

    if (isCorrect) {
      if (marker) marker.textContent = currentTarget.note;
      if (clickedCell) clickedCell.classList.add("correct");
      playNoteAudio(currentTarget.note);

      state.score += 10;
      state.streak += 1;
      updateStats();

      if (state.currentSequenceIndex + 1 >= state.sequenceLength) {
        showFeedback(true, `🎉 Frase de ${state.sequenceLength} notas completada! (+50 bônus)`);
        state.score += 50;
        updateStats();

        setTimeout(() => {
          startNewSequence();
        }, 1200);
      } else {
        showFeedback(true, `Correto! Nota ${currentTarget.note} tocada.`);
        state.currentSequenceIndex++;
        setTimeout(() => {
          renderCurrentSequenceStep();
        }, 450);
      }
    } else {
      if (marker) marker.textContent = noteName || "X";
      if (clickedCell) {
        clickedCell.classList.add("wrong");
        setTimeout(() => {
          clickedCell.classList.remove("wrong");
        }, 600);
      }
      state.streak = 0;
      updateStats();
      showFeedback(false, `Nota incorreta! Procure a nota indicada na partitura.`);
    }
  }

  function showFeedback(isSuccess, message) {
    const badge = document.getElementById("sr-feedback-badge");
    if (!badge) return;
    badge.textContent = message;
    badge.className = `feedback-badge ${isSuccess ? "success" : "error"}`;
  }

  function updateStats() {
    const scoreEl = document.getElementById("sr-score-counter");
    const streakEl = document.getElementById("sr-streak-counter");
    if (scoreEl) scoreEl.textContent = state.score;
    if (streakEl) streakEl.textContent = `${state.streak}🔥`;
  }

  function clearHighlights() {
    document.querySelectorAll("#sr-fretboard-grid .fret-cell").forEach(cell => {
      cell.classList.remove("correct", "wrong", "target-note");
      const marker = cell.querySelector(".note-marker");
      if (marker) marker.textContent = "";
    });
  }

  function setupEventListeners() {
    const levelSelect = document.getElementById("sr-level-select");
    if (levelSelect) {
      levelSelect.addEventListener("change", (e) => {
        state.currentLevel = e.target.value;
        startNewSequence();
      });
    }

    const seqLengthSelect = document.getElementById("sr-sequence-length-select");
    if (seqLengthSelect) {
      seqLengthSelect.addEventListener("change", (e) => {
        state.sequenceLength = parseInt(e.target.value, 10);
        startNewSequence();
      });
    }

    const btnNext = document.getElementById("sr-btn-next-question");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        startNewSequence();
      });
    }

    const soundBtn = document.getElementById("sr-sound-toggle-btn");
    const soundIcon = document.getElementById("sr-sound-icon");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        state.soundEnabled = !state.soundEnabled;
        soundBtn.classList.toggle("active", state.soundEnabled);
        if (soundIcon) soundIcon.textContent = state.soundEnabled ? "🔊" : "🔇";
        if (state.soundEnabled) initAudio();
      });
    }
  }

  // Interface pública da ferramenta para o hub
  window.SightReadingModule = {
    init: function() {
      if (!state.isInitialized) {
        buildFretboard();
        setupEventListeners();
        state.isInitialized = true;
      }
      startNewSequence();
    },
    resize: function() {
      if (state.currentSequence && state.currentSequence.length > 0) {
        drawSequence(state.currentSequence, state.currentSequenceIndex);
      }
    }
  };
})();
