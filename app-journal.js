/* ═══════════════════════════════════════════════
   MATEO'S FAITH HUB — JOURNAL
   Stage 4: Full journal system
═══════════════════════════════════════════════ */

// ── JOURNAL CONSTANTS ─────────────────────────────
const JOURNAL_MOODS = [
  {id:'grateful',emoji:'🙏',label:'Grateful'},
  {id:'hopeful',emoji:'✨',label:'Hopeful'},
  {id:'peaceful',emoji:'🕊️',label:'Peaceful'},
  {id:'joyful',emoji:'😄',label:'Joyful'},
  {id:'anxious',emoji:'😰',label:'Anxious'},
  {id:'tired',emoji:'😴',label:'Tired'},
  {id:'frustrated',emoji:'😤',label:'Frustrated'},
  {id:'hurting',emoji:'💔',label:'Hurting'},
  {id:'confused',emoji:'🤔',label:'Confused'},
  {id:'fired-up',emoji:'🔥',label:'Fired Up'},
];

const JOURNAL_TYPES = {
  regular: {label:'Journal Entry', icon:'✍️', color:'var(--gold)'},
  godShowedUp: {label:'God Showed Up', icon:'✨', color:'#f0c96a'},
  verseFoundMe: {label:'Verse Found Me', icon:'📖', color:'var(--accent)'},
  prayedAbout: {label:'I Prayed About This', icon:'🙏', color:'var(--green)'},
  sermon: {label:'Sermon Notes', icon:'⛪', color:'#a87fd4'},
  letter: {label:'Letter to Future Mateo', icon:'📨', color:'var(--orange)'},
  openWhen: {label:'Open When…', icon:'🔖', color:'var(--red)'},
};

const JOURNAL_PROMPTS = [
  "What is God teaching me right now?",
  "Where did I see God at work this week?",
  "What am I struggling to trust God with?",
  "What verse has been on my mind lately and why?",
  "How am I treating the people around me?",
  "What would I do differently if I wasn't afraid?",
  "Where do I need God to show up this week?",
  "What am I grateful for that I usually take for granted?",
  "Who has God put in my life that I need to pray for?",
  "What does God say about me that I'm having trouble believing?",
  "Where have I been compromising my values lately?",
  "What's one thing I want to remember about this season of life?",
  "How has my faith grown in the last month?",
  "What do I want to be different about myself in one year?",
  "Where did I see the fruit of the Spirit in my life this week?",
];

const OPEN_WHEN_TEMPLATES = [
  "Open when you feel like quitting",
  "Open when you feel completely alone",
  "Open when you win the championship",
  "Open when someone lets you down",
  "Open when you're not sure God is real",
  "Open when you're proud of yourself",
  "Open when football season starts",
  "Open when you graduate high school",
  "Open when you fall in love",
  "Open when you make a big mistake",
  "Open when life is really hard",
  "Open when everything is going great",
];

// ── JOURNAL STATE ─────────────────────────────────
let journalFilter = 'all';
let journalSelectedMood = null;
let journalSelectedType = 'regular';
let editingEntryId = null;
let sermonDate = new Date().toISOString().split('T')[0];

// ── RENDER JOURNAL PAGE ───────────────────────────
function renderJournalPage() {
  renderJournalEntries();
  updateJournalStats();
  renderTodayPrompt();
}

function renderTodayPrompt() {
  const el = document.getElementById('journalTodayPrompt');
  if(!el) return;
  const dayIdx = new Date().getDate() % JOURNAL_PROMPTS.length;
  el.textContent = JOURNAL_PROMPTS[dayIdx];
}

function updateJournalStats() {
  const entries = STATE.journal;
  const thisMonth = entries.filter(e => {
    const d = new Date(e.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const el = document.getElementById('journalStatLine');
  if(el) el.textContent = `${entries.length} total entries · ${thisMonth.length} this month`;
}

// ── RENDER ENTRIES ────────────────────────────────
function renderJournalEntries() {
  const el = document.getElementById('journalEntriesList');
  if(!el) return;

  let entries = [...STATE.journal].sort((a,b) => new Date(b.date) - new Date(a.date));

  // Filter
  if(journalFilter !== 'all') {
    entries = entries.filter(e => e.type === journalFilter);
  }

  if(!entries.length) {
    el.innerHTML = `<div style="text-align:center;padding:40px 20px;color:var(--muted);">
      <div style="font-size:2.5rem;margin-bottom:12px;">✍️</div>
      <div style="font-family:'Cinzel',serif;color:var(--text);margin-bottom:8px;">Start Writing</div>
      <div style="font-size:0.85rem;">Your journal is empty. Tap the button above to write your first entry.</div>
    </div>`;
    return;
  }

  el.innerHTML = entries.map(e => journalEntryCard(e)).join('');

  // Add swipe gestures
  document.querySelectorAll('.journal-entry-card').forEach(card => {
    const id = card.dataset.id;
    new SwipeHandler(card, {
      onLeft: () => confirmDeleteEntry(id),
      onRight: () => shareEntry(id),
      minSwipe: 70,
    });
  });
}

function journalEntryCard(e) {
  const type = JOURNAL_TYPES[e.type] || JOURNAL_TYPES.regular;
  const mood = JOURNAL_MOODS.find(m => m.id === e.mood);
  const date = new Date(e.date);
  const dateStr = date.toLocaleDateString('en-US', {weekday:'short', month:'short', day:'numeric'});
  const preview = e.text ? e.text.substring(0,120) + (e.text.length > 120 ? '…' : '') : '';

  // Special rendering for different types
  let extra = '';
  if(e.type === 'sermon' && e.sermonData) {
    extra = `<div class="je-sermon-meta">
      <span>⛪ ${e.sermonData.pastor||'Pastor'}</span>
      <span>📖 ${e.sermonData.scripture||''}</span>
    </div>`;
  }
  if(e.type === 'letter') {
    const openDate = e.openDate ? new Date(e.openDate).toLocaleDateString('en-US',{month:'short',year:'numeric'}) : 'future';
    extra = `<div class="je-letter-badge">📨 Open in ${openDate}</div>`;
  }
  if(e.type === 'openWhen') {
    extra = `<div class="je-openwhen-badge">🔖 ${e.openWhenTitle||'Open When…'}</div>`;
  }
  if(e.type === 'verseFoundMe' && e.verse) {
    extra = `<div class="je-verse-badge">📖 ${e.verse}</div>`;
  }
  if(e.type === 'prayedAbout' && e.answered) {
    extra = `<div class="je-answered-badge">✓ Prayer Answered!</div>`;
  }

  return `<div class="journal-entry-card" data-id="${e.id}" onclick="openEntry('${e.id}')">
    <div class="je-header">
      <div class="je-type-badge" style="background:${type.color}22;color:${type.color};">
        ${type.icon} ${type.label}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        ${mood ? `<span title="${mood.label}">${mood.emoji}</span>` : ''}
        <div class="je-date">${dateStr}</div>
      </div>
    </div>
    ${e.title ? `<div class="je-title">${e.title}</div>` : ''}
    ${preview ? `<div class="je-preview">${preview}</div>` : ''}
    ${extra}
    <div class="je-footer">
      <span class="je-word-count">${e.text ? e.text.split(' ').length : 0} words</span>
      <span class="je-swipe-hint">← delete · → share</span>
    </div>
  </div>`;
}

// ── OPEN / EDIT ENTRY ─────────────────────────────
function openEntry(id) {
  const entry = STATE.journal.find(e => e.id === id);
  if(!entry) return;

  // Check if it's a letter that shouldn't be opened yet
  if(entry.type === 'letter' && entry.openDate && new Date(entry.openDate) > new Date()) {
    const openDate = new Date(entry.openDate).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
    showToast(`This letter opens on ${openDate}`);
    return;
  }

  editingEntryId = id;
  populateEntryEditor(entry);
  openModal('entryViewModal');
}

function populateEntryEditor(entry) {
  const type = JOURNAL_TYPES[entry.type] || JOURNAL_TYPES.regular;
  const date = new Date(entry.date).toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
  const mood = JOURNAL_MOODS.find(m => m.id === entry.mood);

  let html = `
    <div class="je-type-badge" style="background:${type.color}22;color:${type.color};margin-bottom:12px;">
      ${type.icon} ${type.label}
    </div>
    <div style="font-family:'Cinzel',serif;font-size:0.8rem;color:var(--muted);margin-bottom:${entry.title?'6px':'14px'};">${date}</div>
    ${entry.title ? `<div style="font-family:'Cinzel',serif;font-size:1.1rem;color:var(--text);margin-bottom:14px;">${entry.title}</div>` : ''}
    ${mood ? `<div style="margin-bottom:14px;">${mood.emoji} <span style="font-size:0.8rem;color:var(--muted);">${mood.label}</span></div>` : ''}`;

  // Type-specific headers
  if(entry.type === 'sermon' && entry.sermonData) {
    const s = entry.sermonData;
    html += `<div class="sermon-view-meta">
      ${s.date ? `<div><span class="svm-label">Date</span> ${formatDate(s.date)}</div>` : ''}
      ${s.pastor ? `<div><span class="svm-label">Pastor</span> ${s.pastor}</div>` : ''}
      ${s.series ? `<div><span class="svm-label">Series</span> ${s.series}</div>` : ''}
      ${s.scripture ? `<div><span class="svm-label">Scripture</span> ${s.scripture}</div>` : ''}
    </div>`;
    if(s.points && s.points.length) {
      html += `<div style="margin-bottom:12px;"><div style="font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;">Key Points</div>
        ${s.points.filter(p=>p).map((p,i)=>`<div style="padding:8px 12px;background:var(--surface2);border-radius:6px;margin-bottom:6px;font-size:0.88rem;color:var(--text2);">${i+1}. ${p}</div>`).join('')}
      </div>`;
    }
    if(s.action) {
      html += `<div style="padding:12px;background:var(--green-dim);border:1px solid rgba(90,158,110,.3);border-radius:8px;margin-bottom:12px;">
        <div style="font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--green);margin-bottom:4px;">One Thing I'll Do</div>
        <div style="font-size:0.88rem;color:var(--text2);">${s.action}</div>
      </div>`;
    }
  }

  if(entry.type === 'verseFoundMe' && entry.verse) {
    html += `<div style="padding:12px;background:var(--gold-dim);border:1px solid rgba(212,168,67,.25);border-radius:8px;margin-bottom:12px;font-family:'Crimson Pro',serif;font-style:italic;font-size:1rem;color:var(--text);">
      📖 ${entry.verse}
    </div>`;
  }

  if(entry.type === 'openWhen') {
    html += `<div style="padding:10px 14px;background:rgba(196,96,96,.1);border:1px solid rgba(196,96,96,.3);border-radius:8px;margin-bottom:12px;font-size:0.85rem;color:var(--red);">
      🔖 ${entry.openWhenTitle||'Open When…'}
    </div>`;
  }

  // Main text
  if(entry.text) {
    html += `<div style="font-family:'Crimson Pro',serif;font-size:1.05rem;line-height:1.8;color:var(--text);white-space:pre-wrap;">${entry.text}</div>`;
  }

  // Answered prayer badge
  if(entry.type === 'prayedAbout') {
    if(entry.answered) {
      html += `<div class="je-answered-badge" style="margin-top:16px;">✓ God answered this prayer on ${formatDate(entry.answeredDate)}</div>`;
    } else {
      html += `<div style="margin-top:16px;"><button class="btn btn-green btn-sm" onclick="markJournalAnswered('${entry.id}')">✓ Mark as Answered</button></div>`;
    }
  }

  document.getElementById('entryViewContent').innerHTML = html;
}

function markJournalAnswered(id) {
  const entry = STATE.journal.find(e => e.id === id);
  if(!entry) return;
  entry.answered = true;
  entry.answeredDate = new Date().toISOString();
  saveState('journal');
  closeModal('entryViewModal');
  addXP(50, 'Prayer answered!');
  showToast('🎉 Praise God! Marked as answered!');
  renderJournalEntries();
}

function confirmDeleteEntry(id) {
  if(confirm('Delete this journal entry? This cannot be undone.')) {
    STATE.journal = STATE.journal.filter(e => e.id !== id);
    saveState('journal');
    renderJournalEntries();
    updateJournalStats();
    showToast('Entry deleted');
  }
}

function shareEntry(id) {
  const entry = STATE.journal.find(e => e.id === id);
  if(!entry) return;
  const text = entry.title ? `${entry.title}\n\n${entry.text}` : entry.text;
  if(navigator.share) {
    navigator.share({text: text || ''});
  } else {
    navigator.clipboard.writeText(text || '').then(() => showToast('Copied to clipboard'));
  }
}

// ── NEW ENTRY ─────────────────────────────────────
function openNewEntry(type='regular') {
  journalSelectedType = type;
  journalSelectedMood = null;
  editingEntryId = null;

  // Reset form
  document.getElementById('entryTitle').value = '';
  document.getElementById('entryText').value = '';
  document.getElementById('entryVerse').value = '';
  document.getElementById('entryTypeLabel').textContent = JOURNAL_TYPES[type].icon + ' ' + JOURNAL_TYPES[type].label;

  // Show/hide type-specific fields
  updateEntryFormFields();

  // Mood selector
  renderMoodSelector();

  // Set today's prompt
  const dayIdx = new Date().getDate() % JOURNAL_PROMPTS.length;
  document.getElementById('entryPromptHint').textContent = JOURNAL_PROMPTS[dayIdx];

  openModal('newEntryModal');
  setTimeout(() => document.getElementById('entryText').focus(), 200);
}

function updateEntryFormFields() {
  const type = journalSelectedType;
  document.getElementById('fieldVerse').style.display = (type === 'verseFoundMe') ? 'block' : 'none';
  document.getElementById('fieldOpenWhen').style.display = (type === 'openWhen') ? 'block' : 'none';
  document.getElementById('fieldLetter').style.display = (type === 'letter') ? 'block' : 'none';
  document.getElementById('fieldSermon').style.display = (type === 'sermon') ? 'block' : 'none';
}

function renderMoodSelector() {
  const el = document.getElementById('moodSelector');
  if(!el) return;
  el.innerHTML = JOURNAL_MOODS.map(m => `
    <div class="mood-opt${journalSelectedMood===m.id?' mood-opt-active':''}" 
      title="${m.label}"
      onclick="selectMood2('${m.id}',this)">
      ${m.emoji}
    </div>`).join('');
}

function selectMood2(id, el) {
  journalSelectedMood = id;
  document.querySelectorAll('.mood-opt').forEach(o => o.classList.remove('mood-opt-active'));
  if(el) el.classList.add('mood-opt-active');
}

function saveJournalEntry() {
  const text = document.getElementById('entryText').value.trim();
  const title = document.getElementById('entryTitle').value.trim();

  if(!text && journalSelectedType !== 'sermon') {
    showToast('Write something first');
    return;
  }

  const entry = {
    id: editingEntryId || 'je_' + Date.now(),
    type: journalSelectedType,
    date: new Date().toISOString(),
    title,
    text,
    mood: journalSelectedMood,
  };

  // Type-specific data
  if(journalSelectedType === 'verseFoundMe') {
    entry.verse = document.getElementById('entryVerse').value.trim();
  }
  if(journalSelectedType === 'openWhen') {
    entry.openWhenTitle = document.getElementById('openWhenTitle').value.trim() || 'Open When…';
  }
  if(journalSelectedType === 'letter') {
    entry.openDate = document.getElementById('letterOpenDate').value
      ? new Date(document.getElementById('letterOpenDate').value).toISOString()
      : null;
    entry.letterTo = 'Future Mateo';
  }
  if(journalSelectedType === 'sermon') {
    entry.sermonData = {
      date: document.getElementById('sermonDateInput').value,
      pastor: document.getElementById('sermonPastor').value.trim(),
      series: document.getElementById('sermonSeries').value.trim(),
      scripture: document.getElementById('sermonScripture').value.trim(),
      points: [
        document.getElementById('sermonPoint1').value.trim(),
        document.getElementById('sermonPoint2').value.trim(),
        document.getElementById('sermonPoint3').value.trim(),
      ].filter(Boolean),
      action: document.getElementById('sermonAction').value.trim(),
    };
  }

  // Save
  if(editingEntryId) {
    const idx = STATE.journal.findIndex(e => e.id === editingEntryId);
    if(idx > -1) STATE.journal[idx] = entry;
  } else {
    STATE.journal.unshift(entry);
  }

  saveState('journal');
  closeModal('newEntryModal');
  renderJournalEntries();
  updateJournalStats();

  // XP
  const xpMap = {regular:20, godShowedUp:30, verseFoundMe:25, prayedAbout:20, sermon:30, letter:25, openWhen:20};
  addXP(xpMap[journalSelectedType]||20, 'Journal entry written');
  showToast('✍️ Entry saved! +' + (xpMap[journalSelectedType]||20) + ' XP');
  haptic('success');
}

// ── EXPORT JOURNAL AS PDF ─────────────────────────
function exportJournalPDF() {
  const entries = [...STATE.journal].sort((a,b) => new Date(a.date)-new Date(b.date));
  if(!entries.length) { showToast('No journal entries to export'); return; }

  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Mateo's Faith Journal</title>
    <style>
      body{font-family:Georgia,serif;max-width:700px;margin:40px auto;padding:0 30px;color:#1a1408;line-height:1.7;}
      h1{font-size:2rem;color:#b8861e;border-bottom:2px solid #b8861e;padding-bottom:12px;}
      .entry{margin-bottom:40px;padding-bottom:30px;border-bottom:1px solid #e8e0d0;}
      .entry-type{font-size:0.75rem;letter-spacing:0.14em;text-transform:uppercase;color:#b8861e;margin-bottom:6px;}
      .entry-date{font-size:0.85rem;color:#888;margin-bottom:8px;}
      .entry-title{font-size:1.2rem;font-weight:bold;margin-bottom:10px;color:#1a1408;}
      .entry-mood{font-size:0.8rem;color:#888;margin-bottom:10px;}
      .entry-text{white-space:pre-wrap;font-size:1rem;color:#2a1e0a;}
      .sermon-meta{background:#f8f3ea;padding:12px;border-radius:6px;margin-bottom:12px;font-size:0.85rem;}
      .answered{color:#5a9e6e;font-weight:bold;}
      @media print{body{margin:20px;}.entry{page-break-inside:avoid;}}
    </style></head><body>
    <h1>✝ Mateo's Faith Journal</h1>
    <p style="color:#888;margin-bottom:30px;">Exported ${new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})} · ${entries.length} entries</p>`;

  entries.forEach(e => {
    const type = JOURNAL_TYPES[e.type] || JOURNAL_TYPES.regular;
    const mood = JOURNAL_MOODS.find(m => m.id === e.mood);
    const date = new Date(e.date).toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
    html += `<div class="entry">
      <div class="entry-type">${type.icon} ${type.label}</div>
      <div class="entry-date">${date}</div>
      ${e.title ? `<div class="entry-title">${e.title}</div>` : ''}
      ${mood ? `<div class="entry-mood">${mood.emoji} ${mood.label}</div>` : ''}`;

    if(e.type === 'sermon' && e.sermonData) {
      const s = e.sermonData;
      html += `<div class="sermon-meta">
        ${s.pastor ? `<strong>Pastor:</strong> ${s.pastor}<br>` : ''}
        ${s.scripture ? `<strong>Scripture:</strong> ${s.scripture}<br>` : ''}
        ${s.points?.length ? `<strong>Key Points:</strong><br>${s.points.map((p,i)=>`${i+1}. ${p}`).join('<br>')}` : ''}
        ${s.action ? `<br><strong>My Action:</strong> ${s.action}` : ''}
      </div>`;
    }

    if(e.verse) html += `<p style="font-style:italic;color:#b8861e;">📖 ${e.verse}</p>`;
    if(e.text) html += `<div class="entry-text">${e.text}</div>`;
    if(e.answered) html += `<p class="answered">✓ Prayer answered${e.answeredDate?' on '+formatDate(e.answeredDate):''}!</p>`;
    html += '</div>';
  });

  html += '</body></html>';

  const blob = new Blob([html], {type:'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mateo-faith-journal.html';
  a.click();
  showToast('Journal exported! Open the file and print to PDF.');
  addXP(10, 'Journal exported');
}

// ── FILTER ────────────────────────────────────────
function setJournalFilter(filter, btn) {
  journalFilter = filter;
  document.querySelectorAll('.journal-filter-btn').forEach(b => b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderJournalEntries();
}
