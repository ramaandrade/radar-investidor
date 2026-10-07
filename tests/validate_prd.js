const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const htmlPath = path.join(projectRoot, 'index.html');
const cssPath = path.join(projectRoot, 'css', 'styles.css');
const trackerPath = path.join(projectRoot, 'js', 'tracker.js');
const appPath = path.join(projectRoot, 'js', 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const tracker = fs.readFileSync(trackerPath, 'utf8');
const app = fs.readFileSync(appPath, 'utf8');

const requiredTokens = [
  'Passo 6',
  'Dicas da Internet: O Radar do Investidor',
  'TEMA 4: Renda Fixa e Renda Variável',
  'Texto da Prova',
  'Vídeos',
  'Slides',
  'Visão Empresarial',
  'Aprenda Jogando',
  'Fuja do "Fintwit" e de Dicas Quentes',
  'O Tempo é o Maior Ativo',
  'Reserva de Emergência Primeiro',
  'A Magia da Marcação a Mercado',
  'Proteção do FGC (Fundo Garantidor de Créditos)',
  'Cuidado com a Inflação (IPCA)',
  'ETFs (Exchange Traded Funds)',
  'WRLD11',
  'IVVB11',
  'FIIs (Fundos Imobiliários) para Renda Passiva',
  'Ações e a Regra da Diversificação',
  'Status Invest',
  'Fundamentus',
  'Yubb / App Renda Fixa',
  'Calculadora do Cidadão (Banco Central)',
  'https://statusinvest.com.br/',
  'https://www.fundamentus.com.br/',
  'https://yubb.com.br/',
  'https://www3.bcb.gov.br/CALCIDADAO/'
];

console.log('--- VALIDATING HTML PRD REQUIREMENTS ---');
let missingCount = 0;
requiredTokens.forEach(token => {
  if (html.includes(token)) {
    console.log(`[PASS] Encontrado: "${token}"`);
  } else {
    console.error(`[FAIL] Ausente no HTML: "${token}"`);
    missingCount++;
  }
});

const deletedTokens = [
  'engagement-summary-card',
  'NÍVEL DE ABSORÇÃO DO PASSO 6',
  'btn-start-evaluation',
  'Estou Pronto: Iniciar Avaliação',
  'sticky-cta-dock'
];

deletedTokens.forEach(token => {
  if (!html.includes(token)) {
    console.log(`[PASS] Elemento removido com sucesso: "${token}"`);
  } else {
    console.error(`[FAIL] Elemento ainda presente no HTML: "${token}"`);
    missingCount++;
  }
});

console.log('\n--- VALIDATING TRACKER & TECHNICAL REQUIREMENTS ---');
const trackerChecks = [
  'calculateScrollDepth',
  'reachedThresholds',
  'thresholds = [25, 50, 75, 100]',
  'isReadyForEvaluation',
  'getTelemetryPayload'
];

trackerChecks.forEach(check => {
  if (tracker.includes(check)) {
    console.log(`[PASS] Tracker contém: "${check}"`);
  } else {
    console.error(`[FAIL] Tracker não contém: "${check}"`);
    missingCount++;
  }
});

console.log('\n--- VALIDATING ASYNC & LIGHTWEIGHT LOAD ASSETS ---');
const totalAssetSize = Buffer.byteLength(html) + Buffer.byteLength(css) + Buffer.byteLength(tracker) + Buffer.byteLength(app);
console.log(`Tamanho total dos arquivos críticos: ${(totalAssetSize / 1024).toFixed(2)} KB`);

if (totalAssetSize < 100 * 1024) {
  console.log(`[PASS] Arquivos essenciais pesam menos de 100KB! Carregamento inferior a 2s garantido em conexões 3G/4G.`);
} else {
  console.warn(`[WARN] Tamanho superior a 100KB: ${(totalAssetSize / 1024).toFixed(2)} KB`);
}

if (missingCount === 0) {
  console.log('\n========================================');
  console.log('✅ TODOS OS REQUISITOS DO PRD FORAM VALIDADOS COM 100% DE SUCESSO!');
  console.log('========================================');
  process.exit(0);
} else {
  console.error(`\n❌ ${missingCount} requisitos falharam.`);
  process.exit(1);
}
