// ─── Component Data (sources + links) ────────────────────────────────────
const SOURCES = {
  'flipsky-65161-120kv': { name: 'Flipsky 65161 120KV 6kW Motor', source: 'flipsky.net', url: 'https://flipsky.net/products/motor-65161-6000w-waterproof-underwater-thruster-electric-boat-thruster' },
  'flipsky-65161-100kv': { name: 'Flipsky 65161 100KV 6kW Motor', source: 'flipsky.net', url: 'https://flipsky.net/products/motor-65161-6000w-waterproof-underwater-thruster-electric-boat-thruster' },
  'maytech-65162': { name: 'Maytech 65162 6kW Motor', source: 'maytech.cn', url: 'https://maytech.cn' },
  'fsesc-75200': { name: 'Flipsky FSESC 75200 Pro V2 (water cooling)', source: 'flipsky.net', url: 'https://flipsky.net' },
  'fsesc-75100': { name: 'Flipsky FSESC 75100', source: 'flipsky.net', url: 'https://flipsky.net' },
  'makerx-dv6': { name: 'MakerX DV6 Pro ESC', source: 'makerx-tech.com', url: 'https://makerx-tech.com' },
  'flipsky-alu-prop': { name: 'Flipsky Aluminum Propeller (×2 recommended)', source: 'flipsky.net', url: 'https://flipsky.net' },
  'custom-cnc-prop': { name: 'Custom CNC Propeller', source: 'Custom order', url: null },
  '3d-print-guard': { name: '3D Printed Prop Guard (PETG/ASA)', source: 'Self-print / MakerWorld', url: 'https://makerworld.com' },
  'metal-guard': { name: 'Stainless Steel Prop Guard', source: 'Custom fab', url: null },
  'vx3-pro': { name: 'Flipsky VX3 Pro Waterproof Remote', source: 'flipsky.net', url: 'https://flipsky.net/products/waterproof-remote-vx3-pro-controller' },
  'vx3': { name: 'Flipsky VX3 Remote', source: 'flipsky.net', url: 'https://flipsky.net' },
  'maytech-mtskr2005wf': { name: 'Maytech MTSKR2005WF Remote', source: 'maytech.cn', url: 'https://maytech.cn' },
  'diy-12s8p': { name: 'DIY 12S8P Molicel P42A (96 cells + nickel + shrink)', source: '18650batterystore.com', url: 'https://www.18650batterystore.com' },
  'used-efoil-battery': { name: 'Used eFoil 12S Battery Pack', source: 'FOIL.zone classifieds', url: 'https://foil.zone/c/for-sale' },
  'flipsky-battery': { name: 'Flipsky Waterproof 12S Battery', source: 'flipsky.net', url: 'https://flipsky.net' },
  'smart-bms': { name: '12S 100A Smart BMS (Bluetooth)', source: 'AliExpress (Daly/JBD)', url: 'https://www.aliexpress.com' },
  'basic-bms': { name: '12S 100A Basic BMS', source: 'AliExpress', url: 'https://www.aliexpress.com' },
  'no-bms': { name: 'BMS included in battery pack', source: '—', url: null },
  '5a-charger': { name: '50.4V 5A Smart Charger', source: 'Amazon / AliExpress', url: 'https://www.amazon.com/s?k=50.4v+5a+charger' },
  '2a-charger': { name: '50.4V 2A Charger', source: 'Amazon', url: 'https://www.amazon.com/s?k=50.4v+2a+charger' },
  'bodyboard': { name: 'Bodyboard ~105×50cm', source: 'Amazon / surf shop', url: 'https://www.amazon.com/s?k=bodyboard+42+inch' },
  'inflatable-pvc': { name: 'Drop-Stitch Inflatable Hull', source: 'AliExpress / Durainflate', url: 'https://www.durainflate.com' },
  'custom-composite': { name: 'Custom Fiberglass/Carbon Hull', source: 'Custom builder', url: null },
  'ip68-box': { name: 'IP68 Project Box (380×310×115mm)', source: 'AliExpress', url: 'https://www.aliexpress.com' },
  'pelican-case': { name: 'Pelican/Nanuk Waterproof Case', source: 'Amazon', url: 'https://www.amazon.com/s?k=pelican+case+waterproof' },
  'alu-tow-bar': { name: 'Alu Profile 25×25mm + 15m Dyneema Rope + EVA Handle', source: 'Hardware store + Amazon', url: 'https://www.amazon.com/s?k=dyneema+tow+rope' },
  '3d-print-mount': { name: '3D Printed Motor Mount + Pod (5° pitch)', source: 'Self-print / MakerWorld', url: 'https://makerworld.com/en/collections/6660539-e-tow-2025' },
  'cnc-alu-mount': { name: 'CNC Aluminum Motor Mount', source: 'Custom CNC', url: null },
  'standard-wp': { name: 'Waterproofing Kit (conformal coat, tape, glands, sealant)', source: 'Amazon', url: 'https://www.amazon.com' },
  'standard-safety': { name: 'Safety Kit (kill switch, buoyancy foam, SS316 hardware)', source: 'Amazon', url: 'https://www.amazon.com' },
  'standard-wiring': { name: 'Wiring Kit (8-10AWG silicone, XT90-S, Anderson)', source: 'Amazon', url: 'https://www.amazon.com' },
};

const ZERO_TOW_PRICE = 7750;

// ─── State ───────────────────────────────────────────────────────────────
const state = {};

// ─── Init ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Bind click handlers to all options
  document.querySelectorAll('.options').forEach(group => {
    const component = group.dataset.component;
    group.querySelectorAll('.option').forEach(btn => {
      btn.addEventListener('click', () => selectOption(component, btn, group));
    });
  });

  // Initialize state from pre-selected options
  document.querySelectorAll('.option.selected').forEach(btn => {
    const group = btn.closest('.options');
    const component = group.dataset.component;
    state[component] = {
      id: btn.dataset.id,
      price: parseFloat(btn.dataset.price) || 0,
      weight: parseFloat(btn.dataset.weight) || 0,
      runtime: btn.dataset.runtime || null,
      capacity: btn.dataset.capacity || null,
    };
  });

  updateAll();
});

function selectOption(component, btn, group) {
  // Deselect siblings
  group.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
  btn.classList.add('selected');

  // Update state
  state[component] = {
    id: btn.dataset.id,
    price: parseFloat(btn.dataset.price) || 0,
    weight: parseFloat(btn.dataset.weight) || 0,
    runtime: btn.dataset.runtime || null,
    capacity: btn.dataset.capacity || null,
  };

  // Smart BMS visibility: hide BMS for non-DIY batteries
  if (component === 'battery') {
    const bmsGroup = document.getElementById('bms-group');
    if (btn.dataset.id === 'diy-12s8p') {
      bmsGroup.style.display = '';
      // Re-select a BMS if none selected
      if (!state.bms || state.bms.id === 'no-bms') {
        const smartBms = bmsGroup.querySelector('[data-id="smart-bms"]');
        if (smartBms) selectOption('bms', smartBms, smartBms.closest('.options'));
      }
    } else {
      bmsGroup.style.display = '';
      // Auto-select "not needed" for pre-built batteries
      const noBms = bmsGroup.querySelector('[data-id="no-bms"]');
      if (noBms) selectOption('bms', noBms, noBms.closest('.options'));
    }
  }

  updateAll();
}

// ─── Category mapping ────────────────────────────────────────────────────
const CATEGORIES = {
  propulsion: ['motor', 'esc', 'prop', 'propguard'],
  remote: ['remote'],
  battery: ['battery', 'bms', 'charger'],
  hull: ['hull', 'enclosure', 'frame', 'mount'],
  safety: ['waterproofing', 'safety', 'wiring'],
};

function getCategoryTotal(cat) {
  return (CATEGORIES[cat] || []).reduce((sum, comp) => sum + (state[comp]?.price || 0), 0);
}

function getCategoryWeight(cat) {
  return (CATEGORIES[cat] || []).reduce((sum, comp) => sum + (state[comp]?.weight || 0), 0);
}

function getTotalPrice() {
  return Object.values(state).reduce((sum, s) => sum + (s.price || 0), 0);
}

function getTotalWeight() {
  return Object.values(state).reduce((sum, s) => sum + (s.weight || 0), 0);
}

// ─── Update all displays ────────────────────────────────────────────────
function updateAll() {
  const total = getTotalPrice();
  const weight = getTotalWeight();

  // Header stats
  document.getElementById('header-total').textContent = '$' + total.toLocaleString();
  document.getElementById('header-weight').textContent = weight.toFixed(1) + ' kg';

  // Category totals (on each section)
  Object.keys(CATEGORIES).forEach(cat => {
    const el = document.querySelector(`[data-cat-total="${cat}"]`);
    if (el) el.textContent = '$' + getCategoryTotal(cat).toLocaleString();
  });

  // Summary breakdown
  document.getElementById('sum-propulsion').textContent = '$' + getCategoryTotal('propulsion').toLocaleString();
  document.getElementById('sum-remote').textContent = '$' + getCategoryTotal('remote').toLocaleString();
  document.getElementById('sum-battery').textContent = '$' + getCategoryTotal('battery').toLocaleString();
  document.getElementById('sum-hull').textContent = '$' + getCategoryTotal('hull').toLocaleString();
  document.getElementById('sum-safety').textContent = '$' + getCategoryTotal('safety').toLocaleString();
  document.getElementById('sum-total').textContent = '$' + total.toLocaleString();

  // Performance
  document.getElementById('perf-weight').textContent = weight.toFixed(1) + ' kg';
  document.getElementById('perf-runtime').textContent = state.battery?.runtime || '—';
  document.getElementById('perf-capacity').textContent = state.battery?.capacity || '—';

  // Speed estimate based on motor
  const motorId = state.motor?.id || '';
  if (motorId.includes('100kv')) {
    document.getElementById('perf-speed').textContent = '~18 km/h';
  } else {
    document.getElementById('perf-speed').textContent = '~20 km/h';
  }

  // Build tier
  const tierEl = document.getElementById('build-tier');
  if (total < 1100) {
    tierEl.innerHTML = '<span class="tier-badge budget">💰 Budget Build</span>';
  } else if (total < 1500) {
    tierEl.innerHTML = '<span class="tier-badge recommended">⭐ Recommended Build</span>';
  } else {
    tierEl.innerHTML = '<span class="tier-badge premium">🔥 Premium Build</span>';
  }

  // Savings vs Zero Tow
  const savings = ZERO_TOW_PRICE - total;
  document.getElementById('savings-amount').textContent = '$' + savings.toLocaleString();
  const pct = Math.max(5, Math.min(95, (total / ZERO_TOW_PRICE) * 100));
  document.getElementById('bar-yours').style.width = pct + '%';

  // Update shopping list if visible
  if (document.getElementById('shopping-list').style.display !== 'none') {
    renderShoppingList();
  }
}

// ─── Shopping List ──────────────────────────────────────────────────────
function toggleShoppingList() {
  const el = document.getElementById('shopping-list');
  const btn = document.getElementById('btn-shopping-list');
  if (el.style.display === 'none') {
    el.style.display = '';
    btn.textContent = '📋 Hide Shopping List';
    renderShoppingList();
  } else {
    el.style.display = 'none';
    btn.textContent = '📋 View Shopping List';
  }
}

function renderShoppingList() {
  const container = document.getElementById('shopping-items');
  let html = '';

  Object.entries(state).forEach(([component, sel]) => {
    const info = SOURCES[sel.id];
    if (!info) return;
    if (sel.id === 'no-bms') return; // Skip "not needed"

    const link = info.url
      ? `<a href="${info.url}" target="_blank" style="color: var(--accent); font-size: 12px;">🔗 Buy</a>`
      : '';

    html += `
      <div class="shop-item">
        <div>
          <div class="shop-item-name">${info.name}</div>
          <div class="shop-item-source">${info.source} ${link}</div>
        </div>
        <div class="shop-item-price">$${sel.price}</div>
      </div>
    `;
  });

  // Total
  html += `
    <div class="shop-item" style="font-weight:700; border-top: 2px solid var(--border); margin-top:8px; padding-top:12px;">
      <div>Total Estimated Cost</div>
      <div class="shop-item-price" style="font-size:16px;">$${getTotalPrice().toLocaleString()}</div>
    </div>
  `;

  container.innerHTML = html;
}

function copyShoppingList() {
  let text = '🚀 Tow Boogie Build — Shopping List\n';
  text += '(Generated at towboogie.pacificmeister.com)\n\n';

  Object.entries(state).forEach(([component, sel]) => {
    const info = SOURCES[sel.id];
    if (!info || sel.id === 'no-bms') return;
    text += `☐ ${info.name} — $${sel.price} (${info.source})`;
    if (info.url) text += `\n  ${info.url}`;
    text += '\n';
  });

  text += `\n─────────────────────\nTotal: $${getTotalPrice().toLocaleString()}\n`;
  text += `Weight: ${getTotalWeight().toFixed(1)} kg\n`;
  text += `\nBuilt with: https://foil.zone`;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.btn-copy');
    btn.textContent = '✅ Copied!';
    setTimeout(() => { btn.textContent = '📋 Copy to Clipboard'; }, 2000);
  });
}

// ─── Share Build ────────────────────────────────────────────────────────
function shareBuild() {
  // Encode selections into URL params
  const params = new URLSearchParams();
  Object.entries(state).forEach(([component, sel]) => {
    params.set(component, sel.id);
  });

  const url = window.location.origin + window.location.pathname + '?' + params.toString();

  navigator.clipboard.writeText(url).then(() => {
    const btns = document.querySelectorAll('.btn-secondary');
    btns.forEach(b => {
      if (b.textContent.includes('Share')) {
        b.textContent = '✅ Link Copied!';
        setTimeout(() => { b.textContent = '🔗 Share Build'; }, 2000);
      }
    });
  }).catch(() => {
    // Fallback: prompt
    prompt('Share this URL:', url);
  });
}

// ─── Print Build Sheet ──────────────────────────────────────────────────
function printBuild() {
  // Ensure shopping list is rendered before printing
  renderShoppingList();
  const hero = document.querySelector('.hero');
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  hero.setAttribute('data-date', today);
  window.print();
}

// ─── Load from URL params ───────────────────────────────────────────────
(function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  if (params.toString() === '') return;

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', () => {
    params.forEach((id, component) => {
      const group = document.querySelector(`[data-component="${component}"]`);
      if (!group) return;
      const btn = group.querySelector(`[data-id="${id}"]`);
      if (!btn) return;
      selectOption(component, btn, group);
    });
  });
})();
