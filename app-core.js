/* ═══════════════════════════════════════════════
   MATEO'S FAITH HUB — CORE
   State, Storage, Utils, Gestures, Navigation
═══════════════════════════════════════════════ */

// ── STORAGE ──────────────────────────────────────
const S = {
  get: (k, def=null) => { try { const v=localStorage.getItem(k); return v?JSON.parse(v):def; } catch(e){return def;} },
  set: (k, v) => { try { localStorage.setItem(k,JSON.stringify(v)); } catch(e){} },
  del: (k) => localStorage.removeItem(k),
};

// ── STATE ─────────────────────────────────────────
const STATE = {
  page: 'home',
  theme: S.get('theme','dark'),
  fontSize: S.get('fontSize', 16),
  streak: S.get('streak', {current:0, longest:0, lastDate:null}),
  readDays: S.get('readDays', []),
  highlights: S.get('highlights', {}),
  notes: S.get('notes', {}),
  chapterNotes: S.get('chapterNotes', {}),
  bookmarks: S.get('bookmarks', []),
  prayedCounts: S.get('prayedCounts', {}),
  customPrayers: S.get('customPrayers', []),
  prayForPeople: S.get('prayForPeople', []),
  journal: S.get('journal', []),
  savedVerses: S.get('savedVerses', []),
  pinnedVerses: S.get('pinnedVerses', []),
  legacyStatement: S.get('legacyStatement', ''),
  settings: S.get('settings', {redLetter:false, autoScroll:false, worshipMode:false}),
  lastPosition: S.get('lastPosition', {}),
  moodLog: S.get('moodLog', []),
  xp: S.get('xp', 0),
  verseOfWeek: S.get('verseOfWeek', null),
  weeklyGoal: S.get('weeklyGoal', {chapters:3,prayers:5,verses:1}),
  verseTags: S.get('verseTags', {}),
  iDontUnderstand: S.get('iDontUnderstand', []),
  readingSessions: S.get('readingSessions', []),
  sessionStart: null,
  sessionBook: null,
  sessionCh: null,
  todayMoodBefore: null,
};

function saveState(key) {
  S.set(key, STATE[key]);
}

// ── UTILS ─────────────────────────────────────────
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function formatDate(dateStr) {
  if(!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
}

function timeOfDay() {
  const h = new Date().getHours();
  if(h < 12) return 'morning';
  if(h < 17) return 'afternoon';
  return 'evening';
}

function greeting() {
  const t = timeOfDay();
  const greetings = {
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
  };
  return greetings[t];
}

function greetingVerse() {
  const t = timeOfDay();
  const verses = {
    morning: '"This is the day the Lord has made; let us rejoice and be glad in it." — Psalm 118:24',
    afternoon: '"I can do all things through Christ who strengthens me." — Philippians 4:13',
    evening: '"In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety." — Psalm 4:8',
  };
  return verses[t];
}

function addXP(amount, reason) {
  STATE.xp += amount;
  saveState('xp');
  const level = getLevel();
  showToast(`+${amount} XP — ${reason}`);
}

function getLevel() {
  const xp = STATE.xp;
  if(xp < 100) return {level:1, name:'Seedling', next:100};
  if(xp < 300) return {level:2, name:'Seeker', next:300};
  if(xp < 600) return {level:3, name:'Disciple', next:600};
  if(xp < 1000) return {level:4, name:'Warrior', next:1000};
  if(xp < 1500) return {level:5, name:'Champion', next:1500};
  if(xp < 2500) return {level:6, name:'Overcomer', next:2500};
  return {level:7, name:'Warrior of Faith', next:null};
}

// ── STREAK ────────────────────────────────────────
function checkStreak() {
  const t = today();
  const s = STATE.streak;
  if(s.lastDate === t) return; // already counted today

  const yesterday = (() => {
    const d = new Date();
    d.setDate(d.getDate()-1);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  })();

  if(s.lastDate === yesterday) {
    s.current += 1;
  } else if(s.lastDate !== t) {
    s.current = 1;
  }

  s.longest = Math.max(s.longest, s.current);
  s.lastDate = t;
  STATE.streak = s;
  saveState('streak');

  // milestone celebrations
  const milestones = [3,7,14,21,30,60,90,100,365];
  if(milestones.includes(s.current)) {
    setTimeout(() => showMilestone(s.current), 500);
  }
}

function showMilestone(days) {
  const msgs = {
    3: "3 days strong! You're building something real.",
    7: "One full week! This is becoming a habit.",
    14: "Two weeks! God is seeing your faithfulness.",
    21: "21 days — habits are formed. Keep going!",
    30: "30 days. One month of showing up for God.",
    60: "60 days. You're not the same person you were.",
    90: "90 days. This is who you are now.",
    100: "100 DAYS. That's legendary. 🔥",
    365: "ONE YEAR. Mateo, this is extraordinary.",
  };
  const el = document.getElementById('milestonePopup');
  document.getElementById('milestoneNum').textContent = days;
  document.getElementById('milestoneText').textContent = msgs[days] || `${days} day streak!`;
  el.classList.add('show');
}

// ── TOAST ─────────────────────────────────────────
function showToast(msg, duration=2400) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ── NAVIGATION ────────────────────────────────────
const PAGES = ['home','bible','prayer','journal','stats','more'];

function goTo(page, sub=null) {
  // hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));

  // show target page
  const pageEl = document.getElementById('page-' + page);
  if(pageEl) {
    pageEl.classList.add('active');
    pageEl.scrollTop = 0;
  }

  // activate tab
  const tabEl = document.querySelector(`.tab-item[data-page="${page}"]`);
  if(tabEl) tabEl.classList.add('active');

  STATE.page = page;

  // close more menu if open
  closeMoreMenu();

  // trigger page render
  if(page === 'home') renderHome();
  if(page === 'bible') renderBiblePage();
  if(page === 'prayer') renderPrayerPage();
  if(page === 'journal') renderJournalPage();
  if(page === 'stats') renderStatsPage();
  if(page === 'memory') renderMemoryPage();
  if(page === 'chat') renderChatPage();
  if(page === 'devotions') renderDevotionsPage();
  if(page === 'tools') renderToolsPage();
  if(page === 'settings') renderSettingsPage();

  // haptic
  haptic('light');
}

// ── MORE MENU ─────────────────────────────────────
function openMoreMenu() {
  document.getElementById('moreMenu').classList.add('open');
  document.getElementById('moreOverlay').classList.add('open');
}
function closeMoreMenu() {
  document.getElementById('moreMenu').classList.remove('open');
  document.getElementById('moreOverlay').classList.remove('open');
}

// ── MODALS ────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}
function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
}

// close modal on overlay tap
document.addEventListener('click', e => {
  if(e.target.classList.contains('modal-overlay')) closeAllModals();
});

// swipe down to close modals
document.addEventListener('touchstart', handleModalSwipe, {passive:true});
let swipeStartY = 0;
function handleModalSwipe(e) {
  swipeStartY = e.touches[0].clientY;
}
document.addEventListener('touchend', e => {
  const dy = e.changedTouches[0].clientY - swipeStartY;
  if(dy > 80) {
    const open = document.querySelector('.modal-sheet');
    if(open) closeAllModals();
  }
}, {passive:true});

// ── HAPTIC ────────────────────────────────────────
function haptic(type='light') {
  if(!window.navigator?.vibrate) return;
  const patterns = {light:[10], medium:[20], heavy:[40], success:[10,50,10]};
  window.navigator.vibrate(patterns[type] || [10]);
}

// ── THEME ─────────────────────────────────────────
function setTheme(theme) {
  STATE.theme = theme;
  S.set('theme', theme);
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? '' : theme);
  document.querySelectorAll('.theme-opt').forEach(o => {
    o.classList.toggle('active', o.dataset.theme === theme);
  });
}

function setFontSize(size) {
  STATE.fontSize = size;
  S.set('fontSize', size);
  document.documentElement.style.setProperty('--font-size', size + 'px');
}

// ── GESTURE ENGINE ────────────────────────────────
class SwipeHandler {
  constructor(el, opts = {}) {
    this.el = el;
    this.opts = opts;
    this.startX = 0;
    this.startY = 0;
    this.startTime = 0;
    this._bind();
  }
  _bind() {
    this.el.addEventListener('touchstart', e => {
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.startTime = Date.now();
    }, {passive:true});
    this.el.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - this.startX;
      const dy = e.changedTouches[0].clientY - this.startY;
      const dt = Date.now() - this.startTime;
      const minSwipe = this.opts.minSwipe || 50;
      const maxTime = this.opts.maxTime || 400;
      if(dt > maxTime) return;
      if(Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipe) {
        if(dx > 0 && this.opts.onRight) this.opts.onRight(e);
        if(dx < 0 && this.opts.onLeft) this.opts.onLeft(e);
      }
      if(Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > minSwipe) {
        if(dy > 0 && this.opts.onDown) this.opts.onDown(e);
        if(dy < 0 && this.opts.onUp) this.opts.onUp(e);
      }
    }, {passive:true});
  }
}

// ── LONG PRESS ────────────────────────────────────
function addLongPress(el, callback, duration=500) {
  let timer;
  el.addEventListener('touchstart', e => {
    timer = setTimeout(() => { haptic('medium'); callback(e); }, duration);
  }, {passive:true});
  el.addEventListener('touchend', () => clearTimeout(timer), {passive:true});
  el.addEventListener('touchmove', () => clearTimeout(timer), {passive:true});
}

// ── DATE KEY ─────────────────────────────────────
function dateKey(date=new Date()) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

// ── VOTD DATA ─────────────────────────────────────
const VOTD_VERSES = [
  {t:"I can do all things through Christ who strengthens me.",r:"Philippians 4:13"},
  {t:"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",r:"John 3:16"},
  {t:"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",r:"Proverbs 3:5-6"},
  {t:"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",r:"Joshua 1:9"},
  {t:"Your word is a lamp to my feet and a light to my path.",r:"Psalm 119:105"},
  {t:"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",r:"Jeremiah 29:11"},
  {t:"And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",r:"Romans 8:28"},
  {t:"Do not conform to the pattern of this world, but be transformed by the renewing of your mind.",r:"Romans 12:2"},
  {t:"But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",r:"Isaiah 40:31"},
  {t:"The Lord is my shepherd, I lack nothing.",r:"Psalm 23:1"},
  {t:"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",r:"Colossians 3:23"},
  {t:"Seek first his kingdom and his righteousness, and all these things will be given to you as well.",r:"Matthew 6:33"},
  {t:"I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",r:"Psalm 139:14"},
  {t:"No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.",r:"1 Corinthians 10:13"},
  {t:"The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness and self-control.",r:"Galatians 5:22-23"},
  {t:"Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",r:"Joshua 1:9"},
  {t:"Come to me, all you who are weary and burdened, and I will give you rest.",r:"Matthew 11:28"},
  {t:"Even youths grow tired and weary, and young men stumble and fall; but those who hope in the Lord will renew their strength.",r:"Isaiah 40:30-31"},
  {t:"For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",r:"Ephesians 2:10"},
  {t:"Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",r:"1 Corinthians 13:4"},
  {t:"Greater love has no one than this: to lay down one's life for one's friends.",r:"John 15:13"},
  {t:"The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you.",r:"Zephaniah 3:17"},
  {t:"Cast all your anxiety on him because he cares for you.",r:"1 Peter 5:7"},
  {t:"This is the day the Lord has made; let us rejoice and be glad in it.",r:"Psalm 118:24"},
  {t:"Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",r:"Matthew 5:16"},
  {t:"Create in me a pure heart, O God, and renew a steadfast spirit within me.",r:"Psalm 51:10"},
  {t:"How can a young person stay on the path of purity? By living according to your word.",r:"Psalm 119:9"},
  {t:"Delight yourself in the Lord, and he will give you the desires of your heart.",r:"Psalm 37:4"},
  {t:"I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit.",r:"John 15:5"},
];

function getTodayVotd() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(),0,0)) / 86400000);
  return VOTD_VERSES[dayOfYear % VOTD_VERSES.length];
}

// ── HOME PAGE RENDERER ────────────────────────────
function renderHome() {
  const streak = STATE.streak;
  const tod = timeOfDay();
  const votd = getTodayVotd();
  const todayKey = dateKey();
  const hasRead = STATE.readDays.includes(todayKey);
  const hasPrayed = (STATE.prayedCounts._today === todayKey);

  // Greeting
  document.getElementById('homeGreeting').textContent = greeting() + ',';
  document.getElementById('homeSubGreeting').textContent = greetingVerse();

  // Streak
  document.getElementById('streakNum').textContent = streak.current;
  document.getElementById('streakLongest').textContent = `Best: ${streak.longest}`;

  // VOTD
  document.getElementById('votdText').textContent = `"${votd.t}"`;
  document.getElementById('votdRef').textContent = `— ${votd.r}`;

  // Today summary
  document.getElementById('todayRead').textContent = hasRead ? '✓' : '—';
  document.getElementById('todayRead').className = 'today-item-val' + (hasRead ? ' done' : '');
  document.getElementById('todayPrayed').textContent = hasPrayed ? '✓' : '—';
  document.getElementById('todayPrayed').className = 'today-item-val' + (hasPrayed ? ' done' : '');
  document.getElementById('todayStreak').textContent = streak.current;

  // Pinned verses
  renderPinnedVerses();

  // Level badge
  const lvl = getLevel();
  document.getElementById('levelBadge').textContent = `${lvl.name} · ${STATE.xp} XP`;
}

function renderPinnedVerses() {
  const container = document.getElementById('pinnedContainer');
  if(!container) return;
  const pinned = STATE.pinnedVerses;
  if(pinned.length === 0) {
    container.innerHTML = `<div class="pinned-empty" onclick="openModal('pinVerseModal')">
      + Pin up to 3 verses to always show here
    </div>`;
    return;
  }
  container.innerHTML = pinned.map((v,i) => `
    <div class="pinned-verse fade-up" onclick="openModal('pinVerseModal')">
      <div class="pinned-pin">📌</div>
      <div>
        <div class="pinned-verse-text">${v.text}</div>
        <div class="pinned-verse-ref">${v.ref}</div>
      </div>
    </div>
  `).join('');
}

// ── SETTINGS PAGE ─────────────────────────────────
function renderSettingsPage() {
  const s = STATE.settings;
  document.getElementById('toggleRedLetter').checked = s.redLetter || false;
  document.getElementById('fontSizeSlider').value = STATE.fontSize;
  document.getElementById('fontSizeVal').textContent = STATE.fontSize + 'px';
  // theme buttons
  document.querySelectorAll('.theme-opt').forEach(o => {
    o.classList.toggle('active', o.dataset.theme === STATE.theme);
  });
}

// ── INIT ──────────────────────────────────────────
function initApp() {
  // Apply saved theme + font
  if(STATE.theme !== 'dark') {
    document.documentElement.setAttribute('data-theme', STATE.theme);
  }
  document.documentElement.style.setProperty('--font-size', STATE.fontSize + 'px');

  // Check streak on open
  checkStreak();

  // Render home
  renderHome();

  // Tab bar events
  document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
      const page = tab.dataset.page;
      if(page === 'more') openMoreMenu();
      else goTo(page);
    });
  });

  // More menu items
  document.querySelectorAll('.more-item').forEach(item => {
    item.addEventListener('click', () => {
      goTo(item.dataset.page);
    });
  });

  // Overlay close
  document.getElementById('moreOverlay').addEventListener('click', closeMoreMenu);

  // Milestone close
  document.getElementById('milestonePopup').addEventListener('click', () => {
    document.getElementById('milestonePopup').classList.remove('show');
  });

  // Settings listeners
  document.getElementById('fontSizeSlider')?.addEventListener('input', e => {
    setFontSize(+e.target.value);
    document.getElementById('fontSizeVal').textContent = e.target.value + 'px';
  });

  document.getElementById('toggleRedLetter')?.addEventListener('change', e => {
    STATE.settings.redLetter = e.target.checked;
    saveState('settings');
  });

  console.log('✝ Faith Hub initialized');
}

document.addEventListener('DOMContentLoaded', initApp);
