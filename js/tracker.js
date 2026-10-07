/**
 * ==========================================================================
 * MOTOR DE TELEMETRIA E TRACKING DE ENGAJAMENTO (SCROLL DEPTH & ANALYTICS)
 * Passo 6 - Dicas da Internet: O Radar do Investidor
 * Disciplina: Educação Financeira / Mercado de Capitais (TEMA 4)
 * ==========================================================================
 */

class EngagementTracker {
  constructor() {
    this.storageKey = 'radar_investidor_telemetry_v1';
    this.sessionStart = Date.now();
    this.activeTimeSeconds = 0;
    this.isTabActive = true;
    
    // Marcos de Scroll Depth rastreados
    this.thresholds = [25, 50, 75, 100];
    this.reachedThresholds = new Set();
    this.maxScrollPercent = 0;

    // Estado de leitura dos Cards (A, B, C, D)
    this.cardsState = {
      cardA: { name: 'Mindset do Investidor', expanded: false, read: false, timeSec: 0 },
      cardB: { name: 'Hacks de Renda Fixa', expanded: false, read: false, timeSec: 0 },
      cardC: { name: 'Visão Prática em Renda Variável', expanded: false, read: false, timeSec: 0 },
      cardD: { name: 'Toolkit da Internet', expanded: false, read: false, timeSec: 0 }
    };

    // Cliques em ferramentas externas
    this.toolClicks = [];

    // Carregar dados prévios se existirem
    this.loadState();

    // Inicializar listeners
    this.initScrollListener();
    this.initIntersectionObserver();
    this.initActiveTimer();
    this.initPageVisibility();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.reachedThresholds) {
          data.reachedThresholds.forEach(t => this.reachedThresholds.add(t));
        }
        if (data.cardsState) {
          Object.keys(data.cardsState).forEach(k => {
            if (this.cardsState[k]) {
              this.cardsState[k].read = data.cardsState[k].read || false;
            }
          });
        }
        this.maxScrollPercent = data.maxScrollPercent || 0;
      }
    } catch (e) {
      console.warn('[Tracker] Erro ao carregar dados do localStorage:', e);
    }
  }

  saveState() {
    try {
      const payload = this.getTelemetryPayload();
      localStorage.setItem(this.storageKey, JSON.stringify(payload));
    } catch (e) {
      console.warn('[Tracker] Erro ao salvar estado:', e);
    }
  }

  initActiveTimer() {
    setInterval(() => {
      if (this.isTabActive && !document.hidden) {
        this.activeTimeSeconds++;
        this.saveState();
      }
    }, 1000);
  }

  initPageVisibility() {
    document.addEventListener('visibilitychange', () => {
      this.isTabActive = !document.hidden;
    });
  }

  initScrollListener() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.calculateScrollDepth();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  calculateScrollDepth() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (docHeight <= 0) return;

    const scrollPercent = Math.min(100, Math.round((scrollTop / docHeight) * 100));

    if (scrollPercent > this.maxScrollPercent) {
      this.maxScrollPercent = scrollPercent;
    }

    // Atualiza barra visual no topo
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Checar marcos (25%, 50%, 75%, 100%)
    this.thresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !this.reachedThresholds.has(threshold)) {
        this.reachedThresholds.add(threshold);
        this.triggerEvent('scroll:depth', { threshold, timestamp: new Date().toISOString() });
      }
    });

    this.notifyEngagementUpdate();
  }

  initIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const cardId = entry.target.dataset.cardId;
        if (!cardId || !this.cardsState[cardId]) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          // Se o elemento estiver visível e aberto, registrar leitura
          const cardEl = entry.target;
          if (cardEl.classList.contains('open')) {
            this.markCardAsRead(cardId);
          }
        }
      });
    }, { threshold: [0.2, 0.5, 0.8] });

    document.querySelectorAll('.accordion-card').forEach(card => {
      cardObserver.observe(card);
    });
  }

  recordCardToggle(cardId, isOpen) {
    if (!this.cardsState[cardId]) return;
    this.cardsState[cardId].expanded = isOpen;

    if (isOpen) {
      // Quando o aluno abre o card, dá um tempo mínimo de 2.5s para validar absorção
      setTimeout(() => {
        const cardEl = document.querySelector(`[data-card-id="${cardId}"]`);
        if (cardEl && cardEl.classList.contains('open')) {
          this.markCardAsRead(cardId);
        }
      }, 2500);
    }

    this.notifyEngagementUpdate();
    this.saveState();
  }

  markCardAsRead(cardId) {
    if (!this.cardsState[cardId] || this.cardsState[cardId].read) return;
    
    this.cardsState[cardId].read = true;
    
    // Atualizar badge visual no DOM
    const cardEl = document.querySelector(`[data-card-id="${cardId}"]`);
    if (cardEl) {
      const badge = cardEl.querySelector('.read-check-badge');
      if (badge) {
        badge.classList.add('checked');
        badge.innerHTML = '✓';
      }
    }

    this.triggerEvent('card:read', { cardId, time: new Date().toISOString() });
    this.notifyEngagementUpdate();
    this.saveState();
  }

  recordToolClick(toolName, targetUrl) {
    const clickEvent = {
      toolName,
      targetUrl,
      timestamp: new Date().toISOString(),
      scrollDepthAtClick: this.maxScrollPercent
    };
    this.toolClicks.push(clickEvent);
    this.markCardAsRead('cardD'); // Toolkit interagido
    this.saveState();
    this.notifyEngagementUpdate();
  }

  getReadCardsCount() {
    return Object.values(this.cardsState).filter(c => c.read).length;
  }

  getTotalCardsCount() {
    return Object.keys(this.cardsState).length;
  }

  getEngagementPercentage() {
    const totalCards = this.getTotalCardsCount();
    const readCards = this.getReadCardsCount();
    const cardWeight = (readCards / totalCards) * 70; // 70% peso nos cards
    const scrollWeight = (this.maxScrollPercent / 100) * 30; // 30% peso no scroll depth
    return Math.min(100, Math.round(cardWeight + scrollWeight));
  }

  isReadyForEvaluation() {
    const readCount = this.getReadCardsCount();
    // Pronto se leu ao menos todos os 4 cards e rolou a página até pelo menos 75%
    return readCount >= 4 && this.maxScrollPercent >= 60;
  }

  getMissingRequirements() {
    const missing = [];
    Object.entries(this.cardsState).forEach(([key, val]) => {
      if (!val.read) {
        missing.push(`Card ${key.replace('card', '')}: ${val.name}`);
      }
    });
    if (this.maxScrollPercent < 60) {
      missing.push('Rolar até o final para ver todo o Toolkit e hacks');
    }
    return missing;
  }

  notifyEngagementUpdate() {
    const pct = this.getEngagementPercentage();
    const readCount = this.getReadCardsCount();
    const totalCount = this.getTotalCardsCount();

    // Disparar evento para a UI
    const event = new CustomEvent('engagement:update', {
      detail: {
        percentage: pct,
        readCards: readCount,
        totalCards: totalCount,
        isReady: this.isReadyForEvaluation(),
        maxScroll: this.maxScrollPercent
      }
    });
    window.dispatchEvent(event);
  }

  triggerEvent(eventName, payload) {
    const evt = new CustomEvent(eventName, { detail: payload });
    window.dispatchEvent(evt);
  }

  getTelemetryPayload() {
    return {
      appName: 'Passo 6 - Dicas da Internet: O Radar do Investidor',
      lessonTheme: 'TEMA 4: Renda Fixa e Renda Variável',
      academicContext: 'URCA - Ciências Econômicas / Finanças Corporativas',
      studentSessionStart: new Date(this.sessionStart).toISOString(),
      activeStudyTimeFormatted: `${Math.floor(this.activeTimeSeconds / 60)}m ${this.activeTimeSeconds % 60}s`,
      activeStudySeconds: this.activeTimeSeconds,
      scrollDepthMilestones: Array.from(this.reachedThresholds).sort((a, b) => a - b),
      maxScrollDepthPercent: this.maxScrollPercent,
      cardsProgress: this.cardsState,
      cardsReadRatio: `${this.getReadCardsCount()}/${this.getTotalCardsCount()}`,
      engagementScore: `${this.getEngagementPercentage()}%`,
      externalToolsClicked: this.toolClicks,
      isFullyPreparedForExam: this.isReadyForEvaluation()
    };
  }

  resetTelemetry() {
    localStorage.removeItem(this.storageKey);
    this.reachedThresholds.clear();
    this.maxScrollPercent = 0;
    this.toolClicks = [];
    Object.keys(this.cardsState).forEach(k => {
      this.cardsState[k].read = false;
      this.cardsState[k].expanded = false;
    });
    this.notifyEngagementUpdate();
  }
}

// Instanciar globalmente
window.InvestidorTracker = new EngagementTracker();
