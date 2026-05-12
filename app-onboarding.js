/* ═══════════════════════════════════════════════
   MATEO'S FAITH HUB — ONBOARDING + READING PLAN
   Stage Final: First-run experience + daily plan
═══════════════════════════════════════════════ */

// ── READING PLAN DATA ─────────────────────────────
const READING_PLAN = [
  {day:1,  title:'Who is Jesus?',           book:'Mark',      ch:1,  theme:'The beginning of Jesus\'s ministry'},
  {day:2,  title:'Jesus Heals & Forgives',  book:'Mark',      ch:2,  theme:'Jesus has authority over sin'},
  {day:3,  title:'Parables of Jesus',       book:'Mark',      ch:4,  theme:'The parable of the sower'},
  {day:4,  title:'Who Do You Say I Am?',    book:'Mark',      ch:8,  theme:'The turning point of the gospel'},
  {day:5,  title:'Serving Others',          book:'Mark',      ch:10, theme:'Greatness means serving'},
  {day:6,  title:'The Last Supper',         book:'Mark',      ch:14, theme:'Jesus prepares for the cross'},
  {day:7,  title:'The Resurrection',        book:'Mark',      ch:16, theme:'He is risen — everything changes'},
  {day:8,  title:'The Beatitudes',          book:'Matthew',   ch:5,  theme:'What real blessing looks like'},
  {day:9,  title:'Prayer & Worry',          book:'Matthew',   ch:6,  theme:'The Lord\'s Prayer + trust'},
  {day:10, title:'Build on the Rock',       book:'Matthew',   ch:7,  theme:'Hear AND do what Jesus says'},
  {day:11, title:'Born Again',              book:'John',      ch:3,  theme:'What it means to be born again'},
  {day:12, title:'Bread of Life',           book:'John',      ch:6,  theme:'What you\'re really hungry for'},
  {day:13, title:'The Good Shepherd',       book:'John',      ch:10, theme:'He knows you by name'},
  {day:14, title:'Raising of Lazarus',      book:'John',      ch:11, theme:'Jesus weeps — God enters your pain'},
  {day:15, title:'Love One Another',        book:'John',      ch:13, theme:'Jesus washes feet — serve first'},
  {day:16, title:'I Am the Way',            book:'John',      ch:14, theme:'Jesus is the only way to the Father'},
  {day:17, title:'The True Vine',           book:'John',      ch:15, theme:'Stay connected to Jesus daily'},
  {day:18, title:'Nothing Can Separate You',book:'Romans',    ch:8,  theme:'The greatest chapter in the Bible'},
  {day:19, title:'Living as a Sacrifice',   book:'Romans',    ch:12, theme:'How to live because of what God did'},
  {day:20, title:'Created for Good Works',  book:'Ephesians', ch:2,  theme:'Saved by grace, made for purpose'},
  {day:21, title:'Armor of God',            book:'Ephesians', ch:6,  theme:'Suit up every single day'},
  {day:22, title:'The Lord Is My Shepherd', book:'Psalms',    ch:23, theme:'You are never alone or without'},
  {day:23, title:'God Knows You Fully',     book:'Psalms',    ch:139,theme:'Fearfully and wonderfully made'},
  {day:24, title:'Wisdom in Trials',        book:'James',     ch:1,  theme:'Trials build unshakeable faith'},
  {day:25, title:'Faith Without Works',     book:'James',     ch:2,  theme:'Real faith changes how you live'},
  {day:26, title:'Fruit of the Spirit',     book:'Galatians', ch:5,  theme:'What grows in a person close to God'},
  {day:27, title:'Called Children of God',  book:'1 John',    ch:3,  theme:'Your identity in Christ'},
  {day:28, title:'God Is Love',             book:'1 John',    ch:4,  theme:'The foundation of everything'},
  {day:29, title:'Strength & Trust',        book:'Proverbs',  ch:3,  theme:'The most-quoted proverb ever'},
  {day:30, title:'The Great Commission',    book:'Matthew',   ch:28, theme:'Your mission from Jesus Himself'},
];

// ── ONBOARDING ────────────────────────────────────
function checkOnboarding() {
  const done = S.get('onboardingDone', false);
  if(!done) {
    setTimeout(() => openOnboarding(), 600);
  }
}

function openOnboarding() {
  renderOnboardingStep(0);
  document.getElementById('onboardingOverlay').style.display = 'flex';
}

function closeOnboarding() {
  S.set('onboardingDone', true);
  S.set('planStartDate', new Date().toISOString());
  document.getElementById('onboardingOverlay').style.display = 'none';
  // Refresh home
  renderHome();
  renderPlanBanner();
  showToast('Welcome to your Faith Hub, Mateo! ✝');
  haptic('success');
}

let onboardingStep = 0;
const ONBOARDING_STEPS = [
  {
    icon: '✝',
    title: 'Welcome, Mateo.',
    sub: 'Victory City Church · Wednesday Youth',
    body: 'This is your personal faith app — built just for you. Bible, prayer, journal, memory verses, devotionals, and more. All offline, all private, all yours.',
    btn: 'Let\'s Go →',
  },
  {
    icon: '🔥',
    title: 'Build Your Streak',
    sub: 'Consistency beats intensity',
    body: 'Every day you read the Bible, your streak goes up. Miss a day, it resets. The goal isn\'t perfection — it\'s showing up. Even 5 minutes counts.',
    btn: 'Got It →',
  },
  {
    icon: '📖',
    title: 'Your 30-Day Plan',
    sub: 'One chapter a day',
    body: 'We\'ve built a 30-day reading plan starting today — one chapter per day through the key passages of the New Testament. It takes about 10 minutes.',
    btn: 'See the Plan →',
  },
  {
    icon: '🙏',
    title: 'Pray. Journal. Grow.',
    sub: 'Not just a Bible app',
    body: 'You\'ve got prayer points, a full journal, memory verse flashcards, an AI you can ask any faith question, and athlete devotionals written for you.',
    btn: 'Start My Journey →',
    last: true,
  },
];

function renderOnboardingStep(step) {
  onboardingStep = step;
  const s = ONBOARDING_STEPS[step];
  const el = document.getElementById('onboardingContent');

  // Progress dots
  const dots = ONBOARDING_STEPS.map((_,i) =>
    `<div class="ob-dot${i===step?' ob-dot-active':''}"></div>`
  ).join('');

  el.innerHTML = `
    <div class="ob-dots">${dots}</div>
    <div class="ob-icon">${s.icon}</div>
    <div class="ob-title">${s.title}</div>
    <div class="ob-sub">${s.sub}</div>
    <div class="ob-body">${s.body}</div>
    <button class="btn btn-primary ob-btn" onclick="${s.last ? 'closeOnboarding()' : 'renderOnboardingStep('+(step+1)+')'}">${s.btn}</button>
    ${step > 0 ? `<button class="btn btn-ghost ob-skip" onclick="closeOnboarding()">Skip</button>` : ''}`;
}

// ── READING PLAN BANNER ───────────────────────────
function renderPlanBanner() {
  const el = document.getElementById('planBanner');
  if(!el) return;

  const startDate = S.get('planStartDate');
  if(!startDate) {
    el.style.display = 'none';
    return;
  }

  const dayNum = getTodayPlanDay();
  if(dayNum < 1 || dayNum > 30) {
    el.style.display = 'none';
    return;
  }

  const plan = READING_PLAN[dayNum - 1];
  const chKey = `${plan.book}-${plan.ch}`;
  const isRead = STATE.readDays.includes(chKey);

  el.style.display = 'block';
  el.innerHTML = `
    <div class="plan-banner-label">📅 Day ${dayNum} of 30</div>
    <div class="plan-banner-title">${plan.title}</div>
    <div class="plan-banner-theme">${plan.theme}</div>
    <div class="plan-banner-actions">
      <button class="btn btn-primary btn-sm" onclick="openBibleChapter('${plan.book}',${plan.ch});goTo('bible',navEl(1))">
        Read ${plan.book} ${plan.ch} →
      </button>
      ${isRead ? '<span class="plan-read-badge">✓ Read today</span>' : ''}
    </div>`;
}

function getTodayPlanDay() {
  const startDate = S.get('planStartDate');
  if(!startDate) return 0;
  const start = new Date(startDate);
  start.setHours(0,0,0,0);
  const now = new Date();
  now.setHours(0,0,0,0);
  const diff = Math.floor((now - start) / 86400000);
  return Math.min(diff + 1, 30);
}

// ── STREAK: count any faith activity ─────────────
function logFaithActivity() {
  // Any faith activity (prayer, journal, reading) counts toward streak
  const t = dateKey();
  if(!STATE.readDays.includes(t)) {
    STATE.readDays.push(t);
    saveState('readDays');
  }
  checkStreak();
  // Update home
  const el = document.getElementById('todayRead');
  if(el) { el.textContent = '✓'; el.className = 'today-item-val done'; }
}

// ── BACK BUTTON (Android) ─────────────────────────
window.addEventListener('popstate', () => {
  // Close any open modal first
  const openModal = document.querySelector('.modal-overlay.open');
  if(openModal) { openModal.classList.remove('open'); return; }
  // Otherwise go home
  if(STATE.page !== 'home') goTo('home', navEl(0));
});

// Push a history state so back button works
function pushHistory() {
  history.pushState({page: 'app'}, '', window.location.href);
}

// ── STREAK ANIMATION ──────────────────────────────
function animateStreak() {
  const badge = document.querySelector('.streak-badge');
  if(badge) {
    badge.style.animation = 'streakPop 0.5s ease';
    setTimeout(() => badge.style.animation = '', 500);
  }
}

// ── SHARE VERSE CARD ──────────────────────────────
function shareVerseCard(ref, text) {
  // Generate a beautiful shareable text card
  const shareText = `✝ "${text}"\n\n— ${ref}\n\n#FaithHub #VictoryCity`;
  if(navigator.share) {
    navigator.share({
      title: ref,
      text: shareText,
    });
  } else {
    navigator.clipboard.writeText(shareText).then(() => showToast('📋 Verse copied to share!'));
  }
}

// Make shareVerse globally callable
window.shareVerseCard = shareVerseCard;
