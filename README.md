# 📡 Passo 6 — Dicas da Internet: O Radar do Investidor

> 🌐 **Acesso Online (GitHub Pages):** [https://ramaandrade.github.io/radar-investidor/](https://ramaandrade.github.io/radar-investidor/)  
> 📦 **Repositório GitHub:** [https://github.com/ramaandrade/radar-investidor](https://github.com/ramaandrade/radar-investidor)  
> 🎓 **Contexto da Aula:** Sequência da Aula — **TEMA 4: Renda Fixa e Renda Variável**  
> 🧭 **Posição na Trilha:** Passo 6 de 6 (Fechamento e Aulão de Hacks pós "Texto da Prova", "Vídeos", "Slides", "Visão Empresarial" e "Aprenda Jogando")  
> 📱 **Formato:** App Web Mobile (*Single-page Scroller*) Mobile-First  
> 🏛️ **Público:** Estudantes de Finanças, Ciências Econômicas e Mercado de Capitais (URCA)

---

## 🎯 1. Visão Geral e Objetivo do Recurso

O recurso **"Passo 6 - Dicas da Internet: O Radar do Investidor"** atua como um **"Aulão de Revisão e Hacks"**, entregando uma curadoria direta de alto impacto para conectar a teoria acadêmica ao dia a dia do investidor pessoa física no mercado financeiro brasileiro.

O app é projetado para navegação ergonômica com o polegar (360px+), eliminando a sobrecarga cognitiva através de **Cards Expansíveis (acordeões)**, ferramentas táteis interativas e atalhos diretos para plataformas gratuitas do mercado real.

---

## 📱 2. Especificações de UI/UX

* **Layout Mobile-First:** Concebido para uso em smartphones com área de toque mínima de 48px para todos os elementos interativos (*thumb-zone friendly*).
* **Identidade Visual Consistente:** Fundo claro com tipografia escura de alto contraste, acentuado por **ícones verdes com o número "6"** no cabeçalho do tema e nos cards.
* **Sequência Pedagógica no Topo:** Barra navegadora indicando os 6 passos da aula:
  1. *Texto da Prova*
  2. *Vídeos*
  3. *Slides*
  4. *Visão Empresarial*
  5. *Aprenda Jogando*
  6. **Dicas da Internet (Ativo)**

---

## 📚 3. Conteúdo Curado (Os 4 Cards do Aulão)

### 🧠 Card A: O Mindset do Investidor (Comportamento)
1. **Fuja do "Fintwit" e de Dicas Quentes:** Se a dica chegou no Twitter/X ou TikTok, o mercado já a precificou. Decisões guiadas por fundamentos, não por *hype*.
2. **O Tempo é o Maior Ativo:** Curva de juros compostos recompensando a paciência na Renda Variável (horizonte de 5 a 10+ anos).
3. **Reserva de Emergência Primeiro:** Separação do dinheiro de curto prazo (até 2 anos) em liquidez diária (CDB 100% CDI ou Tesouro Selic). Inclui *Simulador Rápido de Reserva de 6 Meses*.

### 🛡️ Card B: Hacks de Renda Fixa (Segurança com Estratégia)
1. **A Magia da Marcação a Mercado:** Renda Fixa oscila de preço antes do vencimento. Se a taxa de juros (Selic) cai, o Preço Unitário (P.U.) sobe, permitindo ganhos expressivos de capital. Inclui *Simulador Interativo de Choque de Juros*.
2. **Proteção do FGC:** Garantia de até R$ 250.000,00 por CPF/instituição para CDBs, LCIs e LCAs de bancos médios. Inclui *Checador de Teto de R$ 250k*.
3. **Cuidado com a Inflação (IPCA):** Busca obrigatória por ganho real acima da inflação para preservar o poder de compra.

### 📈 Card C: Visão Prática em Renda Variável (Crescimento e Dividendos)
1. **ETFs (Exchange Traded Funds):** Diversificação global imediata com baixo custo operacional (exemplos: *WRLD11* e *IVVB11*).
2. **FIIs (Fundos Imobiliários) para Renda Passiva:** Recebimento de dividendos mensais isentos de Imposto de Renda.
3. **Ações e a Regra da Diversificação:** Descorrelação setorial entre ativos para proteger o patrimônio de crises locais.

### 🛠️ Card D: Toolkit da Internet (Onde Pesquisar?)
Apresentados como botões largos e fáceis de tocar:
* **Status Invest** (`https://statusinvest.com.br/`): Análise fundamentalista de Ações, FIIs e dividendos.
* **Fundamentus** (`https://www.fundamentus.com.br/`): Múltiplos da Bolsa (P/L, ROE, Dividend Yield).
* **Yubb / App Renda Fixa** (`https://yubb.com.br/` e `https://apprendafixa.com.br/`): Comparadores das melhores taxas de CDB e LCI do mercado.
* **Calculadora do Cidadão (Banco Central)** (`https://www3.bcb.gov.br/...`): Simulação oficial de depósitos regulares e juros compostos.

---

## ⚡ 4. Requisitos Técnicos & Auditoria Docente

### 🚀 Carregamento Assíncrono (< 2s em 3G/4G)
* **Zero dependências externas pesadas:** Sem bibliotecas pesadas ou CDNs lentos.
* **Tipografia nativa do sistema:** Renderização instantânea (*First Contentful Paint* em milissegundos).
* **SVGs 100% inline:** Ícones embutidos diretamente no código, sem latência de download de imagens ou icon fonts.
* **Service Worker PWA:** Suporte completo a navegação offline e cache local.

### 📊 Tracking de Engajamento & Scroll Depth
O arquivo `js/tracker.js` monitora e registra em tempo real:
* **Scroll Depth:** Marcos de 25%, 50%, 75% e 100% de leitura da página.
* **Abertura e Tempo de Leitura por Card:** Tempo ativo gasto nos Cards A, B, C e D.
* **Cliques no Toolkit:** Registro de quais ferramentas externas o aluno clicou para abrir.
* **Tempo Total de Estudo Ativo:** Contabilizado apenas quando a aba do navegador está em foco.
* **Painel do Docente (Telemetria):** Botão discreto no canto superior direito para o professor inspecionar o JSON de telemetria e verificar se a turma está engajada antes de lançar a prova.

---

## 💻 5. Como Executar Localmente

```bash
# Na pasta do projeto:
python serve.py
# Abra no navegador: http://localhost:8086/index.html
```
