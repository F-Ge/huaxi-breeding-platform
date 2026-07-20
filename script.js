/* ---------------------------------------------------------
   Modal open/close handling
--------------------------------------------------------- */
document.querySelectorAll('[data-open-modal]').forEach(function (trigger) {
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    openModal(trigger.getAttribute('data-open-modal'));
  });
});

document.querySelectorAll('[data-switch-modal]').forEach(function (trigger) {
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    var current = trigger.closest('.modal-overlay');
    if (current) closeModal(current);
    openModal(trigger.getAttribute('data-switch-modal'));
  });
});

document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    closeModal(btn.closest('.modal-overlay'));
  });
});

document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal(overlay);
  });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.is-open').forEach(closeModal);
  }
});

function openModal(id) {
  var overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('is-open');
}

function closeModal(overlay) {
  if (!overlay) return;
  overlay.classList.remove('is-open');
  var form = overlay.querySelector('form');
  var success = overlay.querySelector('.modal-success');
  if (form) form.hidden = false;
  if (success) success.hidden = true;
}

// Demo login/signup forms — no backend, just a friendly inline message
document.querySelectorAll('[data-demo-form]').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var overlay = form.closest('.modal-overlay');
    var success = overlay ? overlay.querySelector('.modal-success') : null;
    form.hidden = true;
    if (success) success.hidden = false;
  });
});

/* ---------------------------------------------------------
   i18n — English / Chinese toggle
--------------------------------------------------------- */
var translations = {
  en: {
    'nav.modules': 'Modules',
    'nav.tryit': 'Try It',
    'nav.contact': 'Contact',
    'nav.login': 'Log In',
    'nav.signup': 'Sign Up',
    'hero.eyebrow': 'Genomic Selection & Breeding Decision Platform',
    'hero.title': 'Huaxi Precision Breeding Platform',
    'hero.subhead': 'An end-to-end pipeline for genomic data — from raw chip calls to optimized mating decisions. Built for breeders and geneticists who need accuracy at every step of the selection process.',
    'hero.cta1': 'View Modules',
    'hero.cta2': 'Try the QC Demo',
    'features.eyebrow': 'Platform Modules',
    'features.title': 'Five modules, one pipeline',
    'features.subtitle': 'Each module handles a distinct stage of the genomic selection workflow.',
    'f1.title': 'Chip Data Imputation',
    'f1.tag': 'Variant-Specific SNV',
    'f1.desc': 'Reconstructs missing genotype calls from sparse SNP chip panels using variant-specific imputation models, recovering higher-density genomic resolution without a full re-genotyping cost.',
    'f2.title': 'Quality Control',
    'f2.tag': 'MAF · HWE · Call Rate',
    'f2.desc': 'Filters genotype data on Minor Allele Frequency thresholds, tests markers for departure from Hardy-Weinberg Equilibrium, and enforces per-sample and per-marker call rate cutoffs before any downstream analysis runs.',
    'f2.link': 'Try it live →',
    'f3.title': 'Genomic Prediction Module',
    'f3.tag': 'GEBV Estimation',
    'f3.desc': 'Estimates genomic breeding values directly from marker data, giving breeders a selection signal earlier and with greater accuracy than pedigree-based methods alone.',
    'f4.title': 'Model Selection',
    'f4.tag': 'GBLUP · BayesB · BayesR',
    'f4.desc': 'Lets users choose and compare prediction models — GBLUP, Bayes B, or Bayes R — to match the genetic architecture of the trait being selected for, from polygenic to major-gene-driven.',
    'f5.title': 'Mate Allocation Service',
    'f5.tag': 'Optimal Mating',
    'f5.desc': 'Generates recommended mating pairs that balance expected genetic gain against inbreeding risk, turning prediction output into an actionable breeding plan.',
    'f6.title': 'More modules coming',
    'f6.desc': 'This platform is under active development. Additional modules and detailed documentation will be added as the pipeline matures.',
    'workflow.eyebrow': 'Pipeline',
    'workflow.title': 'How the modules connect',
    'workflow.s1': 'Chip Data Imputation',
    'workflow.s2': 'Quality Control',
    'workflow.s3': 'Genomic Prediction',
    'workflow.s4': 'Model Selection',
    'workflow.s5': 'Mate Allocation',
    'qc.eyebrow': 'Try It — Real Computation',
    'qc.title': 'Run a live quality-control check',
    'qc.subtitle': 'Upload a genotype CSV or load sample data — call rate, Minor Allele Frequency, and an exact Hardy-Weinberg Equilibrium test are computed live in your browser. No upload leaves your device.',
    'qc.upload': 'Choose genotype CSV',
    'qc.sample': 'Load Sample Data',
    'qc.thresholds': 'Thresholds: call rate ≥ 95% · MAF ≥ 1% · HWE p ≥ 1e-6',
    'qc.formatHint': 'CSV format: first column is the SNP ID, remaining columns are one genotype call per sample coded 0 / 1 / 2 (minor-allele dosage), missing calls as NA.',
    'qc.col.snp': 'SNP',
    'qc.col.callrate': 'Call Rate',
    'qc.col.maf': 'MAF',
    'qc.col.hwe': 'HWE p-value',
    'qc.col.status': 'Status',
    'qc.pass': 'PASS',
    'qc.fail': 'FAIL',
    'qc.summary': '{n} SNPs analyzed — {pass} passed, {fail} flagged',
    'contact.eyebrow': 'Get In Touch',
    'contact.title': 'Contact the team',
    'contact.subtitle': "Questions, pilot interest, or feedback on the platform — send a message and we'll reply by email.",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.note': "First message may take a moment to activate — we'll confirm on our end.",
    'footer.title': 'Huaxi Precision Breeding Platform',
    'footer.subtitle': 'Genomic selection tools for precision breeding.',
    'login.eyebrow': 'Welcome back',
    'login.title': 'Log In',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Log In',
    'login.success1': 'Account access is currently invite-only while the platform is in early development.',
    'login.success2': "Reach out via the contact form and we'll follow up with next steps.",
    'login.switch': 'No account yet?',
    'login.switchLink': 'Sign up',
    'signup.eyebrow': 'Join early access',
    'signup.title': 'Sign Up',
    'signup.name': 'Name',
    'signup.email': 'Email',
    'signup.password': 'Password',
    'signup.submit': 'Create Account',
    'signup.success1': 'Thanks for the interest — the platform is currently invite-only.',
    'signup.success2': "We've noted your details and will follow up by email as access opens up.",
    'signup.switch': 'Already have an account?',
    'signup.switchLink': 'Log in',
  },
  zh: {
    'nav.modules': '功能模块',
    'nav.tryit': '立即体验',
    'nav.contact': '联系我们',
    'nav.login': '登录',
    'nav.signup': '注册',
    'hero.eyebrow': '基因组选择与育种决策平台',
    'hero.title': '华西精准育种平台',
    'hero.subhead': '面向基因组数据的端到端流程——从原始芯片分型到最优配种方案。为需要在选育每一步都保证准确性的育种师和遗传学家而打造。',
    'hero.cta1': '查看功能模块',
    'hero.cta2': '体验质控演示',
    'features.eyebrow': '平台模块',
    'features.title': '五大模块，一条流水线',
    'features.subtitle': '每个模块负责基因组选择流程中的一个独立环节。',
    'f1.title': '芯片数据填充',
    'f1.tag': '位点特异性 SNV',
    'f1.desc': '利用位点特异性填充模型，从稀疏的 SNP 芯片数据中重建缺失基因型，在无需重新全基因组分型的情况下恢复更高密度的基因组分辨率。',
    'f2.title': '质量控制',
    'f2.tag': 'MAF · HWE · 检出率',
    'f2.desc': '在下游分析前，基于最小等位基因频率阈值过滤基因型数据，检验标记位点是否偏离哈迪-温伯格平衡，并对每个样本和每个标记位点设定检出率下限。',
    'f2.link': '立即体验 →',
    'f3.title': '基因组预测模块',
    'f3.tag': '基因组育种值 (GEBV) 估计',
    'f3.desc': '直接根据标记数据估计基因组育种值，为育种师提供比单纯系谱法更早、更准确的选育信号。',
    'f4.title': '模型选择',
    'f4.tag': 'GBLUP · BayesB · BayesR',
    'f4.desc': '支持用户在 GBLUP、BayesB、BayesR 等预测模型间选择与比较，以匹配目标性状的遗传结构，从多基因性状到主效基因驱动性状均可适用。',
    'f5.title': '配种分配服务',
    'f5.tag': '最优配种方案',
    'f5.desc': '生成兼顾预期遗传进展与近交风险的推荐配种组合，将预测结果转化为可执行的育种方案。',
    'f6.title': '更多模块开发中',
    'f6.desc': '本平台正在持续开发中。随着流程的完善，将陆续添加更多模块与详细文档。',
    'workflow.eyebrow': '流程',
    'workflow.title': '模块如何衔接',
    'workflow.s1': '芯片数据填充',
    'workflow.s2': '质量控制',
    'workflow.s3': '基因组预测',
    'workflow.s4': '模型选择',
    'workflow.s5': '配种分配',
    'qc.eyebrow': '立即体验 — 真实计算',
    'qc.title': '运行真实质量控制检测',
    'qc.subtitle': '上传基因型 CSV 文件或加载示例数据——检出率、最小等位基因频率（MAF）与精确哈迪-温伯格平衡检验将在您的浏览器中实时计算，数据不会上传到任何服务器。',
    'qc.upload': '选择基因型 CSV 文件',
    'qc.sample': '加载示例数据',
    'qc.thresholds': '阈值：检出率 ≥ 95% · MAF ≥ 1% · HWE p ≥ 1e-6',
    'qc.formatHint': 'CSV 格式：第一列为位点 ID，其余每列为一个样本的基因型，编码为 0 / 1 / 2（次等位基因剂量），缺失记为 NA。',
    'qc.col.snp': '位点',
    'qc.col.callrate': '检出率',
    'qc.col.maf': 'MAF',
    'qc.col.hwe': 'HWE p 值',
    'qc.col.status': '状态',
    'qc.pass': '通过',
    'qc.fail': '未通过',
    'qc.summary': '已分析 {n} 个位点 — {pass} 个通过，{fail} 个被标记',
    'contact.eyebrow': '联系方式',
    'contact.title': '联系团队',
    'contact.subtitle': '如有疑问、试点合作意向或平台反馈，欢迎留言，我们将通过邮件回复。',
    'contact.name': '姓名',
    'contact.email': '邮箱',
    'contact.message': '留言内容',
    'contact.send': '发送消息',
    'contact.note': '首次留言需要一点时间激活——我们会在收到后确认。',
    'footer.title': '华西精准育种平台',
    'footer.subtitle': '面向精准育种的基因组选择工具。',
    'login.eyebrow': '欢迎回来',
    'login.title': '登录',
    'login.email': '邮箱',
    'login.password': '密码',
    'login.submit': '登录',
    'login.success1': '平台目前处于早期开发阶段，账户访问需邀请开通。',
    'login.success2': '请通过联系表单留言，我们会跟进后续步骤。',
    'login.switch': '还没有账户？',
    'login.switchLink': '注册',
    'signup.eyebrow': '加入早期体验',
    'signup.title': '注册',
    'signup.name': '姓名',
    'signup.email': '邮箱',
    'signup.password': '密码',
    'signup.submit': '创建账户',
    'signup.success1': '感谢您的关注——平台目前仅限受邀访问。',
    'signup.success2': '我们已记录您的信息，开放访问后将通过邮件与您联系。',
    'signup.switch': '已有账户？',
    'signup.switchLink': '登录',
  },
};

var currentLang = 'en';

function applyLanguage(lang) {
  currentLang = lang;
  var dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  var toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) toggleBtn.textContent = lang === 'zh' ? 'EN' : '中文';
  if (window.lastQCResults) renderQCResults(window.lastQCResults);
  try { localStorage.setItem('huaxi-pbp-lang', lang); } catch (e) {}
}

(function initLang() {
  var saved = null;
  try { saved = localStorage.getItem('huaxi-pbp-lang'); } catch (e) {}
  var browserLang = (navigator.language || '').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
  applyLanguage(saved || browserLang);
})();

var langToggleBtn = document.getElementById('lang-toggle');
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', function () {
    applyLanguage(currentLang === 'en' ? 'zh' : 'en');
  });
}

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}

/* ---------------------------------------------------------
   QC engine — real MAF / call rate / exact HWE test
   (Wigginton, Cutler & Abecasis 2005 exact HWE test)
--------------------------------------------------------- */
var CALL_RATE_MIN = 0.95;
var MAF_MIN = 0.01;
var HWE_P_MIN = 1e-6;

function hweExactP(obsHets, obsHom1, obsHom2) {
  if (obsHom1 < 0 || obsHom2 < 0 || obsHets < 0) return -1;
  var obsHomc = obsHom1 < obsHom2 ? obsHom2 : obsHom1;
  var obsHomr = obsHom1 < obsHom2 ? obsHom1 : obsHom2;
  var rare = 2 * obsHomr + obsHets;
  var genotypes = obsHets + obsHomc + obsHomr;
  if (genotypes === 0) return 1;

  var hetProbs = new Array(rare + 1).fill(0);
  var mid = Math.floor((rare * (2 * genotypes - rare)) / (2 * genotypes));
  if (mid % 2 !== rare % 2) mid++;

  var currHets = mid;
  var currHomr = (rare - mid) / 2;
  var currHomc = genotypes - currHets - currHomr;
  hetProbs[mid] = 1.0;
  var sum = hetProbs[mid];

  currHets = mid;
  currHomr = (rare - mid) / 2;
  currHomc = genotypes - currHets - currHomr;
  while (currHets > 1) {
    hetProbs[currHets - 2] =
      (hetProbs[currHets] * currHets * (currHets - 1.0)) /
      (4.0 * (currHomr + 1.0) * (currHomc + 1.0));
    sum += hetProbs[currHets - 2];
    currHomr++;
    currHomc++;
    currHets -= 2;
  }

  currHets = mid;
  currHomr = (rare - mid) / 2;
  currHomc = genotypes - currHets - currHomr;
  while (currHets <= rare - 2) {
    hetProbs[currHets + 2] =
      (hetProbs[currHets] * 4.0 * currHomr * currHomc) /
      ((currHets + 2.0) * (currHets + 1.0));
    sum += hetProbs[currHets + 2];
    currHomr--;
    currHomc--;
    currHets += 2;
  }

  for (var i = 0; i <= rare; i++) hetProbs[i] /= sum;

  var target = hetProbs[obsHets];
  var pHwe = 0.0;
  for (var j = 0; j <= rare; j++) {
    if (hetProbs[j] <= target + 1e-12) pHwe += hetProbs[j];
  }
  return Math.min(1.0, pHwe);
}

function analyzeSNP(row) {
  var snp = row[0];
  var calls = row.slice(1);
  var n = calls.length;
  var nHom0 = 0, nHet = 0, nHom2 = 0, nMissing = 0;
  calls.forEach(function (c) {
    var v = (c || '').toString().trim();
    if (v === '' || v.toUpperCase() === 'NA') nMissing++;
    else if (Number(v) === 0) nHom0++;
    else if (Number(v) === 1) nHet++;
    else if (Number(v) === 2) nHom2++;
    else nMissing++;
  });
  var nCalled = n - nMissing;
  var callRate = n > 0 ? nCalled / n : 0;
  var p = nCalled > 0 ? (2 * nHom0 + nHet) / (2 * nCalled) : 0;
  var maf = Math.min(p, 1 - p);
  var hwePVal = nCalled > 0 ? hweExactP(nHet, nHom0, nHom2) : -1;
  var pass = callRate >= CALL_RATE_MIN && maf >= MAF_MIN && hwePVal >= HWE_P_MIN;
  return { snp: snp, callRate: callRate, maf: maf, hwePVal: hwePVal, pass: pass };
}

function parseCSV(text) {
  var lines = text.trim().split(/\r?\n/);
  lines.shift(); // header
  return lines
    .filter(function (l) { return l.trim().length > 0; })
    .map(function (l) { return l.split(','); });
}

function runQC(text) {
  var rows = parseCSV(text);
  var results = rows.map(analyzeSNP);
  window.lastQCResults = results;
  renderQCResults(results);
}

function renderQCResults(results) {
  var container = document.getElementById('qc-results');
  var summaryEl = document.getElementById('qc-summary');
  var bodyEl = document.getElementById('qc-table-body');
  if (!container || !summaryEl || !bodyEl) return;

  var passCount = results.filter(function (r) { return r.pass; }).length;
  var failCount = results.length - passCount;

  summaryEl.innerHTML =
    '<strong>' + results.length + '</strong> ' +
    t('qc.summary')
      .replace('{n} SNPs analyzed — ', '')
      .replace('已分析 {n} 个位点 — ', '')
      .replace('{pass}', '<strong>' + passCount + '</strong>')
      .replace('{fail}', '<strong>' + failCount + '</strong>');

  bodyEl.innerHTML = '';
  results.forEach(function (r) {
    var tr = document.createElement('tr');
    var hweDisplay = r.hwePVal < 0.0001 ? r.hwePVal.toExponential(2) : r.hwePVal.toFixed(4);
    tr.innerHTML =
      '<td>' + r.snp + '</td>' +
      '<td>' + (r.callRate * 100).toFixed(1) + '%</td>' +
      '<td>' + r.maf.toFixed(3) + '</td>' +
      '<td>' + hweDisplay + '</td>' +
      '<td class="' + (r.pass ? 'qc-status-pass' : 'qc-status-fail') + '">' +
      (r.pass ? t('qc.pass') : t('qc.fail')) + '</td>';
    bodyEl.appendChild(tr);
  });

  container.hidden = false;
}

var qcFileInput = document.getElementById('qc-file-input');
if (qcFileInput) {
  qcFileInput.addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (evt) { runQC(evt.target.result); };
    reader.readAsText(file);
  });
}

var SAMPLE_CSV =
  'snp,S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14,S15,S16,S17,S18,S19,S20,S21,S22,S23,S24\n' +
  'SNP_1_1023,1,1,0,0,1,1,1,0,0,1,2,0,2,0,0,0,0,0,1,1,0,0,1,1\n' +
  'SNP_1_4581,0,0,1,0,0,2,1,0,0,1,1,0,1,0,0,0,0,0,1,1,0,0,0,0\n' +
  'SNP_2_2210,0,0,1,1,1,1,0,2,1,1,0,1,1,0,2,1,1,1,0,1,2,2,0,0\n' +
  'SNP_2_8834,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,NA,0,0,0,0,0,1,0,0\n' +
  'SNP_3_1190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n' +
  'SNP_3_5567,0,NA,NA,1,0,0,0,1,0,1,NA,2,1,1,NA,1,NA,NA,NA,NA,0,0,0,NA\n' +
  'SNP_4_990,2,2,0,2,0,2,0,2,0,2,2,0,2,0,0,0,2,0,0,0,0,2,0,2\n' +
  'SNP_4_7712,1,1,1,0,0,0,0,2,2,0,1,1,1,1,2,0,1,1,2,1,0,1,1,2\n' +
  'SNP_5_330,0,0,0,1,1,0,0,1,1,0,1,1,1,0,0,2,0,1,2,0,1,1,0,0\n' +
  'SNP_5_6120,1,1,0,0,0,0,0,0,0,1,2,1,1,1,1,2,0,1,0,1,0,1,0,0\n' +
  'SNP_6_2245,0,0,1,1,0,1,0,0,0,0,1,0,1,0,0,0,2,0,0,0,0,1,1,1\n' +
  'SNP_6_9012,1,0,1,0,1,2,0,0,NA,1,NA,0,0,1,1,1,0,1,1,0,0,2,0,1\n' +
  'SNP_7_1450,0,0,0,0,0,0,0,0,0,2,0,2,2,2,2,2,0,2,0,2,0,2,0,2\n' +
  'SNP_7_6789,0,1,0,1,1,1,0,0,0,0,0,2,0,1,1,0,1,0,1,0,0,0,0,0\n' +
  'SNP_8_3301,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0';

var qcSampleBtn = document.getElementById('qc-sample-btn');
if (qcSampleBtn) {
  qcSampleBtn.addEventListener('click', function () {
    runQC(SAMPLE_CSV);
  });
}
