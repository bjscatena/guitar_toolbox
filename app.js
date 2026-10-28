/**
 * Guitar Toolbox Hub - Core Router & Tool Manager
 * --------------------------------------------------------------------------
 * Handles seamless switching between tools, URL hash routing
 * (ideal for GitHub Pages bookmarks), and global audio contexts.
 */

(function() {
  const TOOLS = {
    hub: {
      id: 'hub',
      title: 'Ferramentas',
      viewEl: document.getElementById('view-hub'),
      tabEl: document.getElementById('tab-hub'),
      breadcrumb: null
    },
    fretboard: {
      id: 'fretboard',
      title: 'FretMaster',
      viewEl: document.getElementById('view-fretboard'),
      tabEl: document.getElementById('tab-fretboard'),
      breadcrumb: 'FretMaster (Memorização do Braço)',
      onActivate: () => {
        if (window.FretboardModule && window.FretboardModule.init) {
          window.FretboardModule.init();
        }
      }
    },
    reading: {
      id: 'reading',
      title: 'SightReader',
      viewEl: document.getElementById('view-reading'),
      tabEl: document.getElementById('tab-reading'),
      breadcrumb: 'SightReader (Leitura de Partitura)',
      onActivate: () => {
        if (window.SightReadingModule && window.SightReadingModule.init) {
          window.SightReadingModule.init();
        }
      }
    },
    practice: {
      id: 'practice',
      title: 'LoopStudio',
      viewEl: document.getElementById('view-practice'),
      tabEl: document.getElementById('tab-practice'),
      breadcrumb: 'LoopStudio (Riffs, Solos & Repetições)',
      onActivate: () => {
        // Iframe is mounted and ready
      }
    },
    chords: {
      id: 'chords',
      title: 'Violão Virtual',
      viewEl: document.getElementById('view-chords'),
      tabEl: document.getElementById('tab-chords'),
      breadcrumb: 'Violão Virtual (Tocador de Acordes)',
      onActivate: () => {
        // O iframe da ferramenta mantém seu próprio estado e motor de áudio
      }
    }
  };

  let activeToolId = 'hub';

  const dom = {
    breadcrumbContainer: document.getElementById('current-tool-breadcrumb'),
    breadcrumbTitle: document.getElementById('breadcrumb-title'),
    btnNavHome: document.getElementById('btn-nav-home'),
    navTabs: document.querySelectorAll('.nav-tab'),
    actionButtons: document.querySelectorAll('[data-target]')
  };

  /**
   * Switch active tool view
   */
  function navigateTo(toolId, updateHash = true) {
    if (!TOOLS[toolId]) {
      toolId = 'hub';
    }

    activeToolId = toolId;
    const targetTool = TOOLS[toolId];

    // 1. Alterna visualização dos containers
    Object.values(TOOLS).forEach(tool => {
      if (tool.viewEl) {
        if (tool.id === toolId) {
          tool.viewEl.classList.remove('hidden');
        } else {
          tool.viewEl.classList.add('hidden');
        }
      }
      if (tool.tabEl) {
        tool.tabEl.classList.toggle('active', tool.id === toolId);
      }
    });

    // 2. Atualiza Breadcrumb no Header
    if (targetTool.breadcrumb) {
      dom.breadcrumbContainer.style.display = 'flex';
      dom.breadcrumbTitle.textContent = targetTool.breadcrumb;
    } else {
      dom.breadcrumbContainer.style.display = 'none';
    }

    // 3. Atualiza Hash no Navegador para permitir bookmark e reload
    if (updateHash) {
      window.location.hash = toolId === 'hub' ? '' : `#${toolId}`;
    }

    // 4. Executa hook de ativação da ferramenta
    if (targetTool.onActivate) {
      setTimeout(() => {
        targetTool.onActivate();
      }, 50);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Lê hash da URL (#fretboard, #reading) para permitir link direto
   */
  function handleHashChange() {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && TOOLS[hash]) {
      navigateTo(hash, false);
    } else {
      navigateTo('hub', false);
    }
  }

  /**
   * Configura eventos de clique e navegação
   */
  function setupHubEvents() {
    // Botão Logo/Home
    if (dom.btnNavHome) {
      dom.btnNavHome.addEventListener('click', () => navigateTo('hub'));
    }

    // Abas de navegação no topo
    dom.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tool;
        navigateTo(target);
      });
    });

    // Botões dos Cards e botões "Voltar ao Hub"
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-target]');
      if (btn) {
        const target = btn.dataset.target;
        navigateTo(target);
      }
    });

    // Hash change event (histórico e navegação do browser)
    window.addEventListener('hashchange', handleHashChange);
  }

  // Inicialização do Hub
  function initHub() {
    setupHubEvents();
    handleHashChange();
  }

  window.addEventListener('DOMContentLoaded', initHub);
})();
