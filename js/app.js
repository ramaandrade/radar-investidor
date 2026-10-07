/**
 * ==========================================================================
 * APLICAÇÃO WEB MOBILE: PASSO 6 - DICAS DA INTERNET: O RADAR DO INVESTIDOR
 * TEMA 4: Renda Fixa e Renda Variável
 * Interatividade, Acordeões, Ferramentas Rápidas e Modais
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização de Componentes
  initAccordions();
  initToolbarControls();
  initInteractiveHacks();
  initToolkitLinks();
  initModals();
  initServiceWorker();
  updateEngagementUI();

  // Escutar eventos do Tracker de Engajamento
  window.addEventListener('engagement:update', (e) => {
    updateEngagementUI(e.detail);
  });
});

/* ==========================================================================
   1. ACORDEÕES DOS CARDS (ÁREA EXPANSÍVEL OTIMIZADA PARA POLEGAR)
   ========================================================================== */
function initAccordions() {
  const cards = document.querySelectorAll('.accordion-card');

  cards.forEach(card => {
    const header = card.querySelector('.accordion-header');
    const cardId = card.dataset.cardId;

    header.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');

      if (isOpen) {
        card.classList.remove('open');
        header.setAttribute('aria-expanded', 'false');
        if (window.InvestidorTracker) {
          window.InvestidorTracker.recordCardToggle(cardId, false);
        }
      } else {
        card.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
        if (window.InvestidorTracker) {
          window.InvestidorTracker.recordCardToggle(cardId, true);
        }
      }
    });
  });

  // Por padrão no mobile, abre o Card A para o aluno começar lendo de imediato
  const firstCard = document.querySelector('[data-card-id="cardA"]');
  if (firstCard && !firstCard.classList.contains('open')) {
    firstCard.classList.add('open');
    firstCard.querySelector('.accordion-header').setAttribute('aria-expanded', 'true');
    if (window.InvestidorTracker) {
      window.InvestidorTracker.recordCardToggle('cardA', true);
    }
  }
}

/* ==========================================================================
   2. CONTROLES RÁPIDOS DA TOOLBAR ("EXPANDIR TODOS" / "RECOLHER TODOS")
   ========================================================================== */
function initToolbarControls() {
  const toggleBtn = document.getElementById('btn-toggle-all-cards');
  if (!toggleBtn) return;

  let allOpen = false;

  toggleBtn.addEventListener('click', () => {
    const cards = document.querySelectorAll('.accordion-card');
    allOpen = !allOpen;

    cards.forEach(card => {
      const header = card.querySelector('.accordion-header');
      const cardId = card.dataset.cardId;

      if (allOpen) {
        card.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
        if (window.InvestidorTracker) {
          window.InvestidorTracker.recordCardToggle(cardId, true);
        }
      } else {
        card.classList.remove('open');
        header.setAttribute('aria-expanded', 'false');
        if (window.InvestidorTracker) {
          window.InvestidorTracker.recordCardToggle(cardId, false);
        }
      }
    });

    toggleBtn.innerHTML = allOpen 
      ? '<span>Recolher Todos</span>' 
      : '<span>Expandir Todos</span>';
  });
}

/* ==========================================================================
   3. MINI-HACKS INTERATIVOS EMBUTIDOS (REFORÇO PEDAGÓGICO IMEDIATO)
   ========================================================================== */
function initInteractiveHacks() {
  // Hack 1: Calculadora Rápida de Reserva de Emergência (Card A)
  const inputCusto = document.getElementById('input-custo-mensal');
  const lblReserva = document.getElementById('lbl-reserva-calculada');

  if (inputCusto && lblReserva) {
    inputCusto.addEventListener('input', () => {
      const valor = parseFloat(inputCusto.value) || 0;
      const totalReserva = valor * 6; // 6 meses recomendado
      lblReserva.textContent = totalReserva.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });
  }

  // Hack 2: Simulador de Marcação a Mercado (Card B)
  // Mostra que se a Selic cair, o Preço Unitário (P.U.) sobe!
  const sliderTaxa = document.getElementById('slider-taxa-selic');
  const lblTaxaAtual = document.getElementById('lbl-taxa-simulada');
  const lblPuResultado = document.getElementById('lbl-pu-resultado');
  const lblEfeitoPu = document.getElementById('lbl-efeito-pu');

  if (sliderTaxa && lblTaxaAtual && lblPuResultado && lblEfeitoPu) {
    const baseSelic = 12.0; // Taxa contratada inicial: 12% a.a.
    const basePU = 1000.0;  // P.U. base

    sliderTaxa.addEventListener('input', () => {
      const novaTaxa = parseFloat(sliderTaxa.value);
      lblTaxaAtual.textContent = `${novaTaxa.toFixed(1)}% a.a.`;

      // Diferencial aproximado: Se taxa cai 1%, PU sobe ~4.5% (duration típica de título médio 5 anos)
      const deltaTaxa = baseSelic - novaTaxa; 
      const variacaoPercent = deltaTaxa * 4.2;
      const novoPU = basePU * (1 + (variacaoPercent / 100));

      lblPuResultado.textContent = novoPU.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      if (deltaTaxa > 0.1) {
        lblEfeitoPu.innerHTML = `<span style="color: #059669; font-weight: 800;">🚀 Lucro Antecipado (+${variacaoPercent.toFixed(1)}%)!</span> A taxa caiu, o título valorizou no mercado secundário.`;
      } else if (deltaTaxa < -0.1) {
        lblEfeitoPu.innerHTML = `<span style="color: #e11d48; font-weight: 800;">📉 Deságio Temporário (${variacaoPercent.toFixed(1)}%)!</span> A taxa subiu. Se resgatar hoje, perde dinheiro. Se segurar até o vencimento, recebe 100% do combinado!`;
      } else {
        lblEfeitoPu.innerHTML = `<span>⚖️ No par:</span> Taxa igual à contratada.`;
      }
    });
  }

  // Hack 3: Verificador de Limite do FGC (Card B)
  const inputFgcValor = document.getElementById('input-fgc-valor');
  const lblFgcStatus = document.getElementById('lbl-fgc-status');

  if (inputFgcValor && lblFgcStatus) {
    inputFgcValor.addEventListener('input', () => {
      const v = parseFloat(inputFgcValor.value) || 0;
      if (v <= 250000) {
        lblFgcStatus.innerHTML = `<span style="color: #059669; font-weight:800;">🛡️ 100% Protegido pelo FGC!</span> Abaixo do teto de R$ 250.000 por CPF/instituição.`;
      } else {
        const excesso = v - 250000;
        lblFgcStatus.innerHTML = `<span style="color: #e11d48; font-weight:800;">⚠️ Risco de Crédito no Excesso!</span> R$ ${excesso.toLocaleString('pt-BR')} desprotegidos. Pulverize em outro banco!`;
      }
    });
  }
}

/* ==========================================================================
   4. LINKS DO TOOLKIT (BOTÕES LARGOS TOUCH-FIRST COM TRACKING)
   ========================================================================== */
function initToolkitLinks() {
  const toolButtons = document.querySelectorAll('.toolkit-touch-btn');

  toolButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const toolName = btn.dataset.toolName || 'Ferramenta Externa';
      const url = btn.getAttribute('href');

      if (window.InvestidorTracker) {
        window.InvestidorTracker.recordToolClick(toolName, url);
      }
      // O link abre normalmente em nova aba (target="_blank" rel="noopener noreferrer")
    });
  });
}

/* ==========================================================================
   5. ATUALIZAÇÃO DA UI DE ENGAJAMENTO & BARRA DE PROGRESSO
   ========================================================================== */
function updateEngagementUI(detail) {
  const tracker = window.InvestidorTracker;
  if (!tracker) return;

  const readCards = detail ? detail.readCards : tracker.getReadCardsCount();
  const totalCards = detail ? detail.totalCards : tracker.getTotalCardsCount();

  const countTag = document.getElementById('toolbar-cards-read-count');
  if (countTag) countTag.textContent = `${readCards}/${totalCards} lidos`;
}

/* ==========================================================================
   7. MODAIS (PROVA, CONFIRMAÇÃO & TELEMETRIA DO PROFESSOR)
   ========================================================================== */
function initModals() {
  // Fechar modais ao clicar no botão X ou overlay
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    const closeBtn = modal.querySelector('.btn-close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal.id));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Botão de Telemetria do Professor no Header
  const btnTeacher = document.getElementById('btn-open-teacher-data');
  if (btnTeacher) {
    btnTeacher.addEventListener('click', () => {
      populateTeacherTelemetryModal();
      openModal('modal-teacher-telemetry');
    });
  }


  const btnCopyTelemetry = document.getElementById('btn-copy-telemetry-json');
  if (btnCopyTelemetry) {
    btnCopyTelemetry.addEventListener('click', () => {
      const tracker = window.InvestidorTracker;
      if (!tracker) return;
      const json = JSON.stringify(tracker.getTelemetryPayload(), null, 2);
      navigator.clipboard.writeText(json).then(() => {
        btnCopyTelemetry.textContent = '✅ Copiado com Sucesso!';
        setTimeout(() => {
          btnCopyTelemetry.textContent = '📋 Copiar Relatório JSON';
        }, 2000);
      });
    });
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function scrollToFirstUnreadCard() {
  const tracker = window.InvestidorTracker;
  if (!tracker) return;

  for (const [cardId, val] of Object.entries(tracker.cardsState)) {
    if (!val.read) {
      const cardEl = document.querySelector(`[data-card-id="${cardId}"]`);
      if (cardEl) {
        if (!cardEl.classList.contains('open')) {
          cardEl.classList.add('open');
          cardEl.querySelector('.accordion-header').setAttribute('aria-expanded', 'true');
        }
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      }
    }
  }
}

function populateTeacherTelemetryModal() {
  const tracker = window.InvestidorTracker;
  if (!tracker) return;

  const payload = tracker.getTelemetryPayload();
  const codeBox = document.getElementById('teacher-telemetry-json');
  if (codeBox) {
    codeBox.textContent = JSON.stringify(payload, null, 2);
  }

  const summaryDiv = document.getElementById('teacher-telemetry-summary');
  if (summaryDiv) {
    summaryDiv.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.8rem;">
        <div style="background: #f1f5f9; padding: 8px; border-radius: 8px;">
          <strong>Tempo Ativo de Estudo:</strong><br>${payload.activeStudyTimeFormatted}
        </div>
        <div style="background: #f1f5f9; padding: 8px; border-radius: 8px;">
          <strong>Scroll Depth Máximo:</strong><br>${payload.maxScrollDepthPercent}%
        </div>
        <div style="background: #f1f5f9; padding: 8px; border-radius: 8px;">
          <strong>Cards Lidos:</strong><br>${payload.cardsReadRatio} (${payload.engagementScore})
        </div>
        <div style="background: #f1f5f9; padding: 8px; border-radius: 8px;">
          <strong>Links Externos Clicados:</strong><br>${payload.externalToolsClicked.length} ferramentas
        </div>
      </div>
    `;
  }
}

/* ==========================================================================
   8. SERVICE WORKER PARA CARREGAMENTO ASSÍNCRONO ULTRA-RÁPIDO (<2s EM 3G/4G)
   ========================================================================== */
function initServiceWorker() {
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.log('SW registration note:', err.message);
      });
    });
  }
}
