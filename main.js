// ─── NAVIGATION ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => navLinks?.classList.toggle('open'));

// Close nav on link click (mobile)
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks?.classList.remove('open')));

// Progress bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  if (!progressBar) return;
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrolled + '%';
});

// ─── SECTION ROUTING ────────────────────────────────────────
const sections = document.querySelectorAll('.page-section');
const navItems = document.querySelectorAll('[data-nav]');

function showSection(id) {
  sections.forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 64, behavior: 'smooth' });
  }
  navItems.forEach(n => {
    n.classList.toggle('active', n.dataset.nav === id);
  });
}

navItems.forEach(n => n.addEventListener('click', e => {
  e.preventDefault();
  showSection(n.dataset.nav);
  navLinks?.classList.remove('open');
}));

// Home category cards
document.querySelectorAll('[data-goto]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    showSection(el.dataset.goto);
  });
});

// ─── SCHEME FILTERS & VIEW ──────────────────────────────────
function initSchemes() {
  const grid = document.getElementById('schemesGrid');
  const viewBtns = document.querySelectorAll('.view-btn');
  const filterInputs = document.querySelectorAll('.scheme-filter');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (btn.dataset.view === 'list') {
        grid?.classList.add('list-view');
      } else {
        grid?.classList.remove('list-view');
      }
    });
  });

  filterInputs.forEach(f => f.addEventListener('change', filterSchemes));
}

function filterSchemes() {
  const industry = document.getElementById('filterIndustry')?.value || '';
  const state = document.getElementById('filterState')?.value || '';
  const gender = document.getElementById('filterGender')?.value || '';
  const trade = document.getElementById('filterTrade')?.value || '';

  document.querySelectorAll('.scheme-card').forEach(card => {
    const industries = card.dataset.industry?.split(',') || [];
    const states = card.dataset.state?.split(',') || [];
    const genders = card.dataset.gender?.split(',') || [];
    const trades = card.dataset.trade?.split(',') || [];

    const matchI = !industry || industries.includes(industry) || industries.includes('all');
    const matchS = !state || states.includes(state) || states.includes('all');
    const matchG = !gender || genders.includes(gender) || genders.includes('all');
    const matchT = !trade || trades.includes(trade) || trades.includes('all');

    card.style.display = (matchI && matchS && matchG && matchT) ? '' : 'none';
  });
}

// ─── EMI CALCULATOR ─────────────────────────────────────────
function calcEMI() {
  const P = parseFloat(document.getElementById('emiPrincipal')?.value) || 0;
  const R = parseFloat(document.getElementById('emiRate')?.value) || 0;
  const N = parseFloat(document.getElementById('emiTenure')?.value) || 0;

  if (P && R && N) {
    const r = R / 12 / 100;
    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    const total = emi * N;
    const interest = total - P;

    document.getElementById('emiResult').textContent = '₹' + emi.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('emiTotal').textContent = '₹' + total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('emiInterest').textContent = '₹' + interest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  updateSliderFill('emiRate', 0.5, 36);
  updateSliderFill('emiTenure', 1, 360);
  updateVal('emiRateVal', document.getElementById('emiRate')?.value, '%');
  updateVal('emiTenureVal', document.getElementById('emiTenure')?.value, ' mo');
  updateVal('emiPrincipalVal', '₹' + Number(document.getElementById('emiPrincipal')?.value || 0).toLocaleString('en-IN'));
}

// ─── OD CALCULATOR ──────────────────────────────────────────
function calcOD() {
  const L = parseFloat(document.getElementById('odLimit')?.value) || 0;
  const R = parseFloat(document.getElementById('odRate')?.value) || 0;
  const U = parseFloat(document.getElementById('odUtil')?.value) || 0;

  if (L && R && U) {
    const drawn = L * (U / 100);
    const monthlyInt = (drawn * R / 100) / 12;
    document.getElementById('odResult').textContent = '₹' + monthlyInt.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('odDrawn').textContent = '₹' + drawn.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('odAnnual').textContent = '₹' + (monthlyInt * 12).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  updateSliderFill('odRate', 5, 24);
  updateSliderFill('odUtil', 0, 100);
  updateVal('odRateVal', document.getElementById('odRate')?.value, '%');
  updateVal('odUtilVal', document.getElementById('odUtil')?.value, '%');
  updateVal('odLimitVal', '₹' + Number(document.getElementById('odLimit')?.value || 0).toLocaleString('en-IN'));
}

function updateSliderFill(id, min, max) {
  const el = document.getElementById(id);
  if (!el) return;
  const pct = ((el.value - min) / (max - min)) * 100;
  el.style.setProperty('--val', pct + '%');
}

function updateVal(id, val, suffix = '') {
  const el = document.getElementById(id);
  if (el) el.textContent = (typeof val === 'string' ? val : val + suffix);
}

// ─── GST CALCULATOR ─────────────────────────────────────────
let gstRows = [{ sno: 1, hsn: '', particular: '', qty: 1, rate: 0, gstRate: 18 }];

function renderGSTTable() {
  const tbody = document.getElementById('gstTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  gstRows.forEach((row, i) => {
    const taxable = row.qty * row.rate;
    const gst = taxable * row.gstRate / 100;
    const cgst = gst / 2;
    const sgst = gst / 2;
    const total = taxable + gst;

    tbody.innerHTML += `
      <tr>
        <td>${row.sno}</td>
        <td><input value="${row.hsn}" onchange="updateGSTRow(${i},'hsn',this.value)" placeholder="HSN Code"></td>
        <td><input value="${row.particular}" onchange="updateGSTRow(${i},'particular',this.value)" placeholder="Description"></td>
        <td><input type="number" value="${row.qty}" min="1" onchange="updateGSTRow(${i},'qty',+this.value)" style="width:60px"></td>
        <td><input type="number" value="${row.rate}" min="0" onchange="updateGSTRow(${i},'rate',+this.value)" placeholder="0.00"></td>
        <td><strong>₹${taxable.toFixed(2)}</strong></td>
        <td>
          <select onchange="updateGSTRow(${i},'gstRate',+this.value)">
            ${[0,5,12,18,28].map(r => `<option value="${r}" ${r===row.gstRate?'selected':''}>${r}%</option>`).join('')}
          </select>
        </td>
        <td>₹${cgst.toFixed(2)}</td>
        <td>₹${sgst.toFixed(2)}</td>
        <td><strong>₹${total.toFixed(2)}</strong></td>
        <td><button onclick="removeGSTRow(${i})" style="background:none;border:none;cursor:pointer;color:#EF4444;font-size:1.1rem">✕</button></td>
      </tr>`;
  });
  updateGSTSummary();
}

function updateGSTRow(i, key, val) {
  gstRows[i][key] = val;
  renderGSTTable();
}

function addGSTRow() {
  gstRows.push({ sno: gstRows.length + 1, hsn: '', particular: '', qty: 1, rate: 0, gstRate: 18 });
  renderGSTTable();
}

function removeGSTRow(i) {
  gstRows.splice(i, 1);
  gstRows.forEach((r, idx) => r.sno = idx + 1);
  renderGSTTable();
}

function updateGSTSummary() {
  let taxable = 0, cgst = 0, sgst = 0, total = 0;
  gstRows.forEach(r => {
    const t = r.qty * r.rate;
    const g = t * r.gstRate / 100;
    taxable += t; cgst += g / 2; sgst += g / 2; total += t + g;
  });
  const fmt = v => '₹' + v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('gstTaxable') && (document.getElementById('gstTaxable').textContent = fmt(taxable));
  document.getElementById('gstCGST') && (document.getElementById('gstCGST').textContent = fmt(cgst));
  document.getElementById('gstSGST') && (document.getElementById('gstSGST').textContent = fmt(sgst));
  document.getElementById('gstTotal') && (document.getElementById('gstTotal').textContent = fmt(total));
}

// ─── INVOICE MAKER ───────────────────────────────────────────
let invoiceItems = [{ sno: 1, particular: '', qty: 1, rate: 0, disc: 0 }];

function renderInvoice() {
  // Update display fields
  const fields = ['invFirmName', 'invGST', 'invInvNo', 'invDate', 'invBillTo', 'invBillAddr'];
  fields.forEach(id => {
    const input = document.getElementById(id);
    const display = document.getElementById(id + 'Display');
    if (input && display) display.textContent = input.value || display.dataset.placeholder || '';
  });

  const tbody = document.getElementById('invoiceItemsBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  let subtotal = 0;
  invoiceItems.forEach((item, i) => {
    const amt = item.qty * item.rate * (1 - item.disc / 100);
    subtotal += amt;
    tbody.innerHTML += `
      <tr>
        <td>${item.sno}</td>
        <td>${item.particular || '—'}</td>
        <td>${item.qty}</td>
        <td>₹${item.rate.toFixed(2)}</td>
        <td>${item.disc}%</td>
        <td><strong>₹${amt.toFixed(2)}</strong></td>
      </tr>`;
  });
  const gstRate = parseFloat(document.getElementById('invGSTRate')?.value) || 18;
  const gstAmt = subtotal * gstRate / 100;
  const grandTotal = subtotal + gstAmt;
  const fmt = v => '₹' + v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('invSubtotal') && (document.getElementById('invSubtotal').textContent = fmt(subtotal));
  document.getElementById('invGSTAmt') && (document.getElementById('invGSTAmt').textContent = fmt(gstAmt));
  document.getElementById('invGrandTotal') && (document.getElementById('invGrandTotal').textContent = fmt(grandTotal));
}

function addInvoiceItem() {
  invoiceItems.push({ sno: invoiceItems.length + 1, particular: '', qty: 1, rate: 0, disc: 0 });
  renderInvoiceItemInputs();
  renderInvoice();
}

function renderInvoiceItemInputs() {
  const cont = document.getElementById('invoiceItemsInputs');
  if (!cont) return;
  cont.innerHTML = invoiceItems.map((item, i) => `
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr auto;gap:0.5rem;align-items:center">
      <input class="form-input" placeholder="Description" value="${item.particular}" oninput="invoiceItems[${i}].particular=this.value;renderInvoice()">
      <input class="form-input" type="number" placeholder="Qty" value="${item.qty}" min="1" oninput="invoiceItems[${i}].qty=+this.value;renderInvoice()">
      <input class="form-input" type="number" placeholder="Rate ₹" value="${item.rate}" min="0" oninput="invoiceItems[${i}].rate=+this.value;renderInvoice()">
      <input class="form-input" type="number" placeholder="Disc %" value="${item.disc}" min="0" max="100" oninput="invoiceItems[${i}].disc=+this.value;renderInvoice()">
      <button onclick="removeInvoiceItem(${i})" style="background:#FEF2F2;border:1px solid #EF4444;color:#EF4444;border-radius:6px;padding:0.4rem 0.6rem;cursor:pointer">✕</button>
    </div>`).join('');
}

function removeInvoiceItem(i) {
  invoiceItems.splice(i, 1);
  invoiceItems.forEach((r, idx) => r.sno = idx + 1);
  renderInvoiceItemInputs();
  renderInvoice();
}

// ─── VCARD MAKER ────────────────────────────────────────────
function updateVCard() {
  const fields = {
    vcardName: '#vcName',
    vcardLOB: '#vcLOB',
    vcardPhone: '#vcPhone',
    vcardEmail: '#vcEmail',
    vcardWebsite: '#vcWebsite',
    vcardLinkedIn: '#vcLinkedIn',
    vcardInsta: '#vcInsta',
    vcardLocation: '#vcLocation'
  };
  Object.entries(fields).forEach(([inputId, displaySel]) => {
    const input = document.getElementById(inputId);
    const display = document.querySelector(displaySel);
    if (input && display) display.textContent = input.value || display.dataset.default || '';
  });
}

function selectBGColor(color) {
  const overlay = document.querySelector('.vcard-overlay');
  if (overlay) {
    overlay.style.background = color;
  }
}

// ─── MODAL ──────────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => {
    if (e.target === m) closeModal(m.id);
  });
});

// ─── TABS ────────────────────────────────────────────────────
function initTabs(containerSelector) {
  const containers = document.querySelectorAll(containerSelector || '.tabs-container');
  containers.forEach(container => {
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const target = container.querySelector('#' + tab.dataset.tab);
        target?.classList.add('active');
      });
    });
  });
}

// ─── ELIGIBILITY CHECKER ─────────────────────────────────────
function checkEligibility(schemeId) {
  const form = document.getElementById('eligForm_' + schemeId);
  if (!form) return;
  const result = document.getElementById('eligResult_' + schemeId);
  const inputs = form.querySelectorAll('select, input');
  let allFilled = true;
  inputs.forEach(i => { if (!i.value) allFilled = false; });
  if (!allFilled) { alert('Please fill all fields to check eligibility.'); return; }

  // Simple rule-based check (scheme-specific)
  const turnover = parseFloat(form.querySelector('[name="turnover"]')?.value) || 0;
  const udyam = form.querySelector('[name="udyam"]')?.value;
  const outstanding = form.querySelector('[name="outstanding"]')?.value;

  let eligible = true;
  if (udyam === 'no') eligible = false;
  if (turnover > 250 && schemeId === 'cgtmse') eligible = false;

  if (result) {
    result.classList.add('show');
    result.classList.toggle('fail', !eligible);
    result.querySelector('h4').textContent = eligible ? '✅ You appear eligible!' : '❌ You may not be eligible';
    result.querySelector('p').textContent = eligible
      ? 'Based on your inputs, you meet the basic criteria. Please visit the official portal or your bank to apply.'
      : 'Based on your inputs, you do not meet one or more eligibility criteria. Review the requirements above.';
  }
}

// ─── PRINT INVOICE ───────────────────────────────────────────
function printInvoice() {
  const content = document.getElementById('invoicePreview').innerHTML;
  const w = window.open('', '', 'width=900,height=700');
  w.document.write(`<html><head><title>Invoice</title>
    <link rel="stylesheet" href="css/style.css">
    <style>body{padding:2rem;background:white}</style>
    </head><body>${content}</body></html>`);
  w.document.close();
  setTimeout(() => w.print(), 500);
}

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
  initSchemes();
  initTabs();
  renderGSTTable();
  renderInvoiceItemInputs();
  renderInvoice();
  calcEMI();
  calcOD();
  updateVCard();
});
