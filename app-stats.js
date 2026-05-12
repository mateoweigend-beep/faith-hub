/* ═══════════════════════════════════════════════
   MATEO'S FAITH HUB — STATS DASHBOARD
   Stage 5: Full stats, heatmap, completion map
═══════════════════════════════════════════════ */

// ── RENDER STATS PAGE ─────────────────────────────
function renderStatsPage() {
  renderStatsHeader();
  renderWrappedCard();
  renderHeatmap();
  renderCompletionMap();
  renderMoodChart();
  renderTopVerses();
  renderPrayerStats();
  renderJournalStats();
}

// ── STATS HEADER ──────────────────────────────────
function renderStatsHeader() {
  const s = STATE.streak;
  const lvl = getLevel();
  const xpToNext = lvl.next ? lvl.next - STATE.xp : 0;
  const xpPct = lvl.next ? Math.round(((STATE.xp - (lvl.next - (lvl.next - STATE.xp))) / lvl.next) * 100) : 100;

  document.getElementById('statsStreak').textContent = s.current;
  document.getElementById('statsLongest').textContent = s.longest;
  document.getElementById('statsXP').textContent = STATE.xp.toLocaleString();
  document.getElementById('statsLevel').textContent = lvl.name;
  document.getElementById('statsDays').textContent = getUniqueReadingDays();

  // XP progress bar
  const bar = document.getElementById('xpProgressBar');
  if(bar) {
    const pct = lvl.next ? Math.min(100, Math.round((STATE.xp / lvl.next) * 100)) : 100;
    bar.style.width = pct + '%';
    document.getElementById('xpNextLevel').textContent = lvl.next ? `${STATE.xp}/${lvl.next} XP to ${getNextLevelName(lvl.level)}` : 'Max Level 🔥';
  }
}

function getNextLevelName(currentLevel) {
  const names = ['','Seedling','Seeker','Disciple','Warrior','Champion','Overcomer','Warrior of Faith'];
  return names[currentLevel + 1] || 'Max';
}

function getUniqueReadingDays() {
  // Count only date-format keys (YYYY-M-D), not chapter keys (Book-ch)
  return STATE.readDays.filter(d => /^\d{4}-\d+-\d+$/.test(d)).length;
}

function getChaptersRead() {
  // Chapter keys are Book-ch format
  return STATE.readDays.filter(d => /^[A-Z]/.test(d)).length;
}

// ── "YOUR BIBLE IN NUMBERS" WRAPPED CARD ──────────
function renderWrappedCard() {
  const el = document.getElementById('wrappedCard');
  if(!el) return;

  const chaptersRead = getChaptersRead();
  const daysRead = getUniqueReadingDays();
  const highlights = Object.keys(STATE.highlights).length;
  const notes = Object.keys(STATE.notes).length + Object.keys(STATE.chapterNotes).length;
  const prayers = Object.values(STATE.prayedCounts).filter(v => typeof v === 'number').reduce((a,b) => a+b, 0);
  const journalEntries = STATE.journal.length;
  const bookmarks = STATE.bookmarks.length;
  const savedVerses = STATE.savedVerses.length;

  // Estimate words read (avg 26 words per verse, avg 26 verses per chapter)
  const wordsRead = chaptersRead * 26 * 26;

  // Favorite book
  const bookVisits = {};
  STATE.readDays.filter(d => /^[A-Z]/.test(d)).forEach(d => {
    const book = d.split('-')[0];
    bookVisits[book] = (bookVisits[book] || 0) + 1;
  });
  const favBook = Object.entries(bookVisits).sort((a,b) => b[1]-a[1])[0]?.[0] || '—';

  // Most prayed for (preset)
  const presetMax = Object.entries(STATE.prayedCounts)
    .filter(([k,v]) => k.startsWith('p') && typeof v === 'number')
    .sort((a,b) => b[1]-a[1])[0];
  const mostPrayed = presetMax ? (PRESET_PRAYERS?.find(p => p.id === presetMax[0])?.topic || presetMax[0]) : '—';

  el.innerHTML = `
    <div class="wrapped-title">✦ Your Faith in Numbers</div>
    <div class="wrapped-grid">
      <div class="wrapped-stat">
        <div class="ws-num">${chaptersRead}</div>
        <div class="ws-label">Chapters Read</div>
      </div>
      <div class="wrapped-stat">
        <div class="ws-num">${daysRead}</div>
        <div class="ws-label">Days in the Word</div>
      </div>
      <div class="wrapped-stat">
        <div class="ws-num">${wordsRead.toLocaleString()}</div>
        <div class="ws-label">Words of Scripture</div>
      </div>
      <div class="wrapped-stat">
        <div class="ws-num">${STATE.streak.current}</div>
        <div class="ws-label">Day Streak 🔥</div>
      </div>
      <div class="wrapped-stat">
        <div class="ws-num">${highlights}</div>
        <div class="ws-label">Highlights</div>
      </div>
      <div class="wrapped-stat">
        <div class="ws-num">${notes}</div>
        <div class="ws-label">Notes Written</div>
      </div>
      <div class="wrapped-stat">
        <div class="ws-num">${prayers}</div>
        <div class="ws-label">Prayers Logged</div>
      </div>
      <div class="wrapped-stat">
        <div class="ws-num">${journalEntries}</div>
        <div class="ws-label">Journal Entries</div>
      </div>
    </div>
    <div class="wrapped-footer">
      <span>📖 Fav Book: <strong>${favBook}</strong></span>
      <span>🙏 Most Prayed: <strong>${mostPrayed}</strong></span>
      <span>⚡ ${STATE.xp} XP total</span>
    </div>`;
}

// ── READING HEATMAP ───────────────────────────────
function renderHeatmap() {
  const el = document.getElementById('heatmapGrid');
  if(!el) return;

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364); // last 52 weeks

  // Build set of reading day keys
  const readSet = new Set(STATE.readDays.filter(d => /^\d{4}-\d+-\d+$/.test(d)));

  // Generate 53 weeks of days
  let html = '';
  const weeks = 52;
  const days = [];

  // Start from the beginning of the week containing startDate
  const startDay = new Date(startDate);
  startDay.setDate(startDay.getDate() - startDay.getDay());

  for(let w = 0; w <= weeks; w++) {
    html += '<div class="hm-col">';
    for(let d = 0; d < 7; d++) {
      const date = new Date(startDay);
      date.setDate(startDay.getDate() + w*7 + d);
      if(date > today) {
        html += '<div class="hm-cell hm-future"></div>';
        continue;
      }
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const read = readSet.has(key);
      const title = date.toLocaleDateString('en-US',{month:'short',day:'numeric'});
      html += `<div class="hm-cell ${read?'hm-active':''}" title="${title}${read?' ✓ Read':''}"></div>`;
    }
    html += '</div>';
  }

  el.innerHTML = html;

  // Month labels
  const monthEl = document.getElementById('heatmapMonths');
  if(monthEl) {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let labels = '';
    let lastMonth = -1;
    for(let w = 0; w <= weeks; w++) {
      const date = new Date(startDay);
      date.setDate(startDay.getDate() + w*7);
      if(date.getMonth() !== lastMonth) {
        labels += `<span style="position:absolute;left:${w*14}px;font-size:0.6rem;color:var(--muted);">${months[date.getMonth()]}</span>`;
        lastMonth = date.getMonth();
      }
    }
    monthEl.style.position = 'relative';
    monthEl.style.height = '14px';
    monthEl.innerHTML = labels;
  }
}

// ── CHAPTER COMPLETION MAP ────────────────────────
function renderCompletionMap() {
  const el = document.getElementById('completionMap');
  if(!el) return;

  const readSet = new Set(STATE.readDays.filter(d => /^[A-Z]/.test(d)));

  const ALL_BOOKS_ORDERED = [
    'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth',
    '1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra',
    'Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song Of Songs',
    'Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos',
    'Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah',
    'Malachi','Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians',
    '2 Corinthians','Galatians','Ephesians','Philippians','Colossians',
    '1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon',
    'Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'
  ];

  const CHAPTER_COUNTS = {
    'Genesis':50,'Exodus':40,'Leviticus':27,'Numbers':36,'Deuteronomy':34,
    'Joshua':24,'Judges':21,'Ruth':4,'1 Samuel':31,'2 Samuel':24,'1 Kings':22,
    '2 Kings':25,'1 Chronicles':29,'2 Chronicles':36,'Ezra':10,'Nehemiah':13,
    'Esther':10,'Job':42,'Psalms':150,'Proverbs':31,'Ecclesiastes':12,
    'Song Of Songs':8,'Isaiah':66,'Jeremiah':52,'Lamentations':5,'Ezekiel':48,
    'Daniel':12,'Hosea':14,'Joel':3,'Amos':9,'Obadiah':1,'Jonah':4,'Micah':7,
    'Nahum':3,'Habakkuk':3,'Zephaniah':3,'Haggai':2,'Zechariah':14,'Malachi':4,
    'Matthew':28,'Mark':16,'Luke':24,'John':21,'Acts':28,'Romans':16,
    '1 Corinthians':16,'2 Corinthians':13,'Galatians':6,'Ephesians':6,
    'Philippians':4,'Colossians':4,'1 Thessalonians':5,'2 Thessalonians':3,
    '1 Timothy':6,'2 Timothy':4,'Titus':3,'Philemon':1,'Hebrews':13,
    'James':5,'1 Peter':5,'2 Peter':3,'1 John':5,'2 John':1,'3 John':1,
    'Jude':1,'Revelation':22
  };

  const totalChapters = Object.values(CHAPTER_COUNTS).reduce((a,b)=>a+b,0);
  const readCount = readSet.size;
  const pct = Math.round((readCount/totalChapters)*100);

  let html = `<div class="cm-header">
    <span class="cm-pct">${pct}%</span>
    <span class="cm-label">${readCount} of ${totalChapters} chapters read</span>
  </div>
  <div class="cm-books">`;

  // OT / NT divider
  const ntStart = ALL_BOOKS_ORDERED.indexOf('Matthew');
  ALL_BOOKS_ORDERED.forEach((book, bi) => {
    if(bi === ntStart) html += `</div><div class="cm-section-label">New Testament</div><div class="cm-books">`;
    if(bi === 0) html = html.replace('<div class="cm-books">', '<div class="cm-section-label">Old Testament</div><div class="cm-books">');

    const total = CHAPTER_COUNTS[book] || 1;
    const readInBook = Array.from({length:total}, (_,i) => readSet.has(`${book}-${i+1}`)).filter(Boolean).length;
    const bookPct = Math.round((readInBook/total)*100);

    html += `<div class="cm-book" title="${book}: ${readInBook}/${total} chapters">
      <div class="cm-book-bar">
        <div class="cm-book-fill" style="height:${bookPct}%"></div>
      </div>
      <div class="cm-book-name">${book.replace('1 ','').replace('2 ','').replace('3 ','').substring(0,3)}</div>
    </div>`;
  });

  html += '</div>';
  el.innerHTML = html;
}

// ── MOOD CHART ────────────────────────────────────
function renderMoodChart() {
  const el = document.getElementById('moodChartArea');
  if(!el) return;

  // Count moods from journal
  const moodCounts = {};
  STATE.journal.forEach(e => {
    if(e.mood) moodCounts[e.mood] = (moodCounts[e.mood]||0)+1;
  });

  const JOURNAL_MOODS_LOCAL = [
    {id:'grateful',emoji:'🙏',label:'Grateful'},
    {id:'hopeful',emoji:'✨',label:'Hopeful'},
    {id:'peaceful',emoji:'🕊️',label:'Peaceful'},
    {id:'joyful',emoji:'😄',label:'Joyful'},
    {id:'anxious',emoji:'😰',label:'Anxious'},
    {id:'tired',emoji:'😴',label:'Tired'},
    {id:'frustrated',emoji:'😤',label:'Frustrated'},
    {id:'hurting',emoji:'💔',label:'Hurting'},
    {id:'fired-up',emoji:'🔥',label:'Fired Up'},
  ];

  const total = Object.values(moodCounts).reduce((a,b)=>a+b,0);
  if(!total) {
    el.innerHTML = '<div style="color:var(--muted);font-size:0.85rem;text-align:center;padding:16px;">No mood data yet. Start journaling to see your mood trends.</div>';
    return;
  }

  const sorted = JOURNAL_MOODS_LOCAL
    .map(m => ({...m, count: moodCounts[m.id]||0}))
    .filter(m => m.count > 0)
    .sort((a,b) => b.count-a.count);

  el.innerHTML = sorted.map(m => {
    const pct = Math.round((m.count/total)*100);
    return `<div class="mood-bar-row">
      <span class="mood-bar-emoji">${m.emoji}</span>
      <span class="mood-bar-label">${m.label}</span>
      <div class="mood-bar-track">
        <div class="mood-bar-fill" style="width:${pct}%"></div>
      </div>
      <span class="mood-bar-count">${m.count}x</span>
    </div>`;
  }).join('');
}

// ── TOP VERSES ────────────────────────────────────
function renderTopVerses() {
  const el = document.getElementById('topVersesList');
  if(!el) return;

  // Most visited = most highlighted books
  const bookCounts = {};
  Object.keys(STATE.highlights).forEach(key => {
    const book = key.split('-')[0];
    bookCounts[book] = (bookCounts[book]||0)+1;
  });

  const sorted = Object.entries(bookCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);
  if(!sorted.length) {
    el.innerHTML = '<div style="color:var(--muted);font-size:0.85rem;">No highlights yet. Start highlighting verses in the Bible reader.</div>';
    return;
  }

  el.innerHTML = sorted.map(([book,count],i) => `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);">
      <span style="font-family:'Cinzel',serif;font-size:0.9rem;color:var(--gold);width:20px;">${i+1}</span>
      <span style="flex:1;font-size:0.88rem;color:var(--text);">${book}</span>
      <span style="font-size:0.75rem;color:var(--muted);">${count} highlight${count!==1?'s':''}</span>
    </div>`).join('');
}

// ── PRAYER STATS ──────────────────────────────────
function renderPrayerStats() {
  const el = document.getElementById('prayerStatsList');
  if(!el) return;

  const total = Object.values(STATE.prayedCounts)
    .filter(v => typeof v === 'number').reduce((a,b)=>a+b,0);
  const customTotal = STATE.customPrayers.length;
  const answered = STATE.customPrayers.filter(p=>p.answered).length;
  const rate = customTotal > 0 ? Math.round((answered/customTotal)*100) : 0;
  const people = STATE.prayForPeople.length;

  // Most prayed preset
  const presetEntries = Object.entries(STATE.prayedCounts)
    .filter(([k,v]) => k.startsWith('p') && typeof v === 'number')
    .sort((a,b)=>b[1]-a[1]);

  const mostPrayedId = presetEntries[0]?.[0];
  const mostPrayedTopic = typeof PRESET_PRAYERS !== 'undefined'
    ? PRESET_PRAYERS?.find(p=>p.id===mostPrayedId)?.topic || '—'
    : '—';

  el.innerHTML = `
    <div class="stat-row"><span class="stat-label">Total Prayers Logged</span><span class="stat-val">${total}</span></div>
    <div class="stat-row"><span class="stat-label">Custom Requests</span><span class="stat-val">${customTotal}</span></div>
    <div class="stat-row"><span class="stat-label">Answered Prayers</span><span class="stat-val" style="color:var(--green);">${answered} (${rate}%)</span></div>
    <div class="stat-row"><span class="stat-label">People You Pray For</span><span class="stat-val">${people}</span></div>
    <div class="stat-row"><span class="stat-label">Most Prayed Topic</span><span class="stat-val" style="color:var(--gold);font-size:0.8rem;">${mostPrayedTopic}</span></div>`;
}

// ── JOURNAL STATS ─────────────────────────────────
function renderJournalStats() {
  const el = document.getElementById('journalStatsList');
  if(!el) return;

  const entries = STATE.journal;
  const total = entries.length;
  const totalWords = entries.reduce((sum,e) => sum + (e.text?e.text.split(' ').length:0), 0);
  const sermons = entries.filter(e=>e.type==='sermon').length;
  const letters = entries.filter(e=>e.type==='letter').length;
  const godShowedUp = entries.filter(e=>e.type==='godShowedUp').length;

  // This month
  const thisMonth = entries.filter(e=>{
    const d = new Date(e.date);
    const n = new Date();
    return d.getMonth()===n.getMonth()&&d.getFullYear()===n.getFullYear();
  }).length;

  el.innerHTML = `
    <div class="stat-row"><span class="stat-label">Total Entries</span><span class="stat-val">${total}</span></div>
    <div class="stat-row"><span class="stat-label">This Month</span><span class="stat-val">${thisMonth}</span></div>
    <div class="stat-row"><span class="stat-label">Total Words Written</span><span class="stat-val">${totalWords.toLocaleString()}</span></div>
    <div class="stat-row"><span class="stat-label">Sermon Notes</span><span class="stat-val">${sermons}</span></div>
    <div class="stat-row"><span class="stat-label">God Showed Up</span><span class="stat-val">${godShowedUp}</span></div>
    <div class="stat-row"><span class="stat-label">Letters to Future Me</span><span class="stat-val">${letters}</span></div>`;
}

// ── WEEKLY REPORT ─────────────────────────────────
function renderWeeklyReport() {
  const el = document.getElementById('weeklyReportContent');
  if(!el) return;

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());

  // Chapters read this week
  let chaptersThisWeek = 0;
  for(let i=0; i<7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate()+i);
    const k = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if(STATE.readDays.includes(k)) chaptersThisWeek++;
  }

  // Prayers this week
  const prayersThisWeek = Object.entries(STATE.prayedCounts)
    .filter(([k,v]) => k.startsWith('p') && typeof v === 'number')
    .reduce((a,[,v])=>a+v, 0);

  const journalThisWeek = STATE.journal.filter(e => new Date(e.date) >= weekStart).length;
  const streak = STATE.streak;

  const score = Math.min(100, Math.round(
    (chaptersThisWeek/7)*40 + (Math.min(prayersThisWeek,5)/5)*30 + (Math.min(journalThisWeek,3)/3)*30
  ));

  const grade = score>=90?'A+':score>=80?'A':score>=70?'B':score>=60?'C':'Keep Going';
  const msg = score>=90?'This was an incredible week of faith. Keep it up!'
    :score>=70?'Solid week. You showed up consistently.'
    :score>=50?'Good start. Push a little harder next week.'
    :'Every week is a new start. What\'s one thing you can commit to this week?';

  el.innerHTML = `
    <div style="text-align:center;margin-bottom:20px;">
      <div style="font-family:'Cinzel',serif;font-size:3rem;color:var(--gold);">${grade}</div>
      <div style="font-size:0.82rem;color:var(--muted);">Week of ${weekStart.toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div>
    </div>
    <div class="stat-row"><span class="stat-label">Days Read</span><span class="stat-val">${chaptersThisWeek}/7</span></div>
    <div class="stat-row"><span class="stat-label">Prayers Logged</span><span class="stat-val">${prayersThisWeek}</span></div>
    <div class="stat-row"><span class="stat-label">Journal Entries</span><span class="stat-val">${journalThisWeek}</span></div>
    <div class="stat-row"><span class="stat-label">Current Streak</span><span class="stat-val">${streak.current} 🔥</span></div>
    <div style="background:var(--gold-dim);border:1px solid rgba(212,168,67,.2);border-radius:8px;padding:14px;margin-top:16px;font-size:0.88rem;color:var(--text2);line-height:1.6;font-style:italic;">
      "${msg}"
    </div>`;
}
