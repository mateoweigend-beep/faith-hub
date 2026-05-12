/* ═══════════════════════════════════════════════
   MATEO'S FAITH HUB — PRAYER CENTER
   Stage 3: Full prayer system
═══════════════════════════════════════════════ */

// ── PRESET PRAYER POINTS ──────────────────────────
const PRESET_PRAYERS = [
  {id:'p1',cat:'faith',topic:'Getting Closer to God',txt:"Lord, help me want to know You more. Give me a real hunger to read the Bible and actually talk to You — not just go through the motions.",verse:'James 4:8',verseText:'"Draw near to God and He will draw near to you."'},
  {id:'p2',cat:'faith',topic:'Understanding the Bible',txt:"God, when I read the Bible help it actually make sense to me. Open my eyes to what You're saying and let it change how I live.",verse:'Psalm 119:18',verseText:'"Open my eyes, that I may see wonders from Your law."'},
  {id:'p3',cat:'faith',topic:'Faith Over Fear',txt:"Father, when I feel nervous or unsure remind me that You're with me. Help me choose faith instead of worrying about what could go wrong.",verse:'Isaiah 41:10',verseText:'"Do not fear, for I am with you."'},
  {id:'p4',cat:'faith',topic:'A Pure Heart',txt:"God, help me think about things that are true, honorable, right and pure. Guard my mind from what pulls me away from You.",verse:'Psalm 51:10',verseText:'"Create in me a pure heart, O God."'},
  {id:'p5',cat:'family',topic:'My Family',txt:"God, bless my family. Help us love each other well even when things are hard. Protect us and keep us close to You and to each other.",verse:'Psalm 128:3',verseText:'A blessing over families.'},
  {id:'p6',cat:'family',topic:'The Move to Leander ISD',txt:"Lord, this is a big transition. Help my whole family adjust well and feel at home. Guide every step of this move.",verse:'Proverbs 3:6',verseText:'"In all your ways acknowledge Him and He will direct your paths."'},
  {id:'p7',cat:'family',topic:'Honoring My Parents',txt:"God, help me honor my parents even when I don't agree with them. Give me a humble spirit at home and show me how to love them well.",verse:'Ephesians 6:2',verseText:'"Honor your father and mother."'},
  {id:'p8',cat:'school',topic:'Wisdom at School',txt:"God, give me wisdom in school. Help me focus, do my best and not get distracted by stuff that doesn't matter.",verse:'James 1:5',verseText:'"If any of you lacks wisdom, ask God, and it will be given to him."'},
  {id:'p9',cat:'school',topic:'Good Friendships',txt:"Lord, help me find real friends — people who make me better. Keep me away from friendships that pull me in the wrong direction.",verse:'Proverbs 13:20',verseText:'"Walk with the wise and become wise."'},
  {id:'p10',cat:'school',topic:'New Season at Vista Ridge',txt:"Father, as I transition to Vista Ridge High School, help me find my place. Give me confidence and open the right doors.",verse:'Jeremiah 29:11',verseText:'"I know the plans I have for you, declares the Lord."'},
  {id:'p11',cat:'strength',topic:'Character & Integrity',txt:"God, help me be the same person whether people are watching or not. Give me the strength to do what's right even when it costs me.",verse:'Proverbs 11:3',verseText:'"The integrity of the upright guides them."'},
  {id:'p12',cat:'strength',topic:'Football & Effort',txt:"Lord, help me give everything I have on the field. Give me a coachable spirit, a humble heart and the discipline to keep improving every day.",verse:'Colossians 3:23',verseText:'"Whatever you do, work at it with all your heart."'},
  {id:'p13',cat:'strength',topic:'Handling Temptation',txt:"Father, help me say no to things I know are wrong. Give me the strength to walk away and remind me that I'm not alone in this fight.",verse:'1 Corinthians 10:13',verseText:'"God will not let you be tempted beyond what you can bear."'},
  {id:'p14',cat:'strength',topic:'Bouncing Back',txt:"Lord, when I fail or fall short — on the field, at school, or in life — help me get back up quickly. You're the God of second chances.",verse:'Proverbs 24:16',verseText:'"The righteous falls seven times and rises again."'},
  {id:'p15',cat:'others',topic:"Friends Who Don't Know God",txt:"Let my life point people to You. I don't have to preach at everyone — just help me live in a way that makes people curious about my faith.",verse:'Matthew 5:16',verseText:'"Let your light shine before others."'},
  {id:'p16',cat:'others',topic:'Victory City Youth Group',txt:"God, bless Victory City and the youth group. Help everyone there — including me — to grow for real and not just show up on Wednesdays.",verse:'Hebrews 10:25',verseText:'"Do not give up meeting together."'},
  {id:'p17',cat:'others',topic:'Coach Garver & Vista Ridge Football',txt:"Lord, I pray for Coach Garver and the Vista Ridge coaching staff. Give them wisdom, and help me earn a spot on that team with hard work and character.",verse:'Proverbs 22:29',verseText:'"Do you see a man skilled in his work? He will stand before kings."'},
  {id:'p18',cat:'others',topic:'People Who Have Wronged Me',txt:"God, this is the hard one. Help me forgive the people who have hurt me or treated me unfairly. I can't do this on my own — I need Your grace.",verse:'Matthew 6:14',verseText:'"If you forgive others their trespasses, your heavenly Father will also forgive you."'},
];

// ── ACTS PRAYER DATA ──────────────────────────────
const ACTS_PROMPTS = {
  A: {
    title: 'Adoration',
    icon: '✨',
    desc: "Tell God who He is. Not what you need — just who He is. Start by focusing completely on His character.",
    prompts: [
      "God, You are _____ (list 3 things about His character)",
      "I praise You because You are the Creator of everything I see",
      "You are holy, powerful, and completely good",
      "Everything I have comes from You, and You are worthy of all glory",
    ]
  },
  C: {
    title: 'Confession',
    icon: '🙏',
    desc: "Be honest about where you've fallen short. God already knows — this is about you agreeing with Him.",
    prompts: [
      "This week I struggled with _____ and I'm sorry",
      "I confess I chose _____ over You",
      "I haven't been treating _____ the way I should",
      "I've been thinking about _____ too much and not enough about You",
    ]
  },
  T: {
    title: 'Thanksgiving',
    icon: '🙌',
    desc: "Name specific things you're grateful for. The more specific, the more powerful. Generic gratitude doesn't hit the same.",
    prompts: [
      "Thank You for _____ (name 3 specific things from this week)",
      "Thank You for the people in my life, especially _____",
      "Thank You for my health, my family, and the gift of another day",
      "Thank You for not giving up on me even when I _____",
    ]
  },
  S: {
    title: 'Supplication',
    icon: '🔥',
    desc: "Now ask. For yourself, for others. Be specific — vague prayers get vague answers.",
    prompts: [
      "Lord, I need Your help with _____ right now",
      "I'm praying for _____ — they need You because _____",
      "Give me wisdom about _____",
      "Help me to _____ this week",
    ]
  }
};

// ── BREATH PRAYERS ────────────────────────────────
const BREATH_PRAYERS = [
  {morning: "Lord Jesus, be with me today.", evening: "Father, I trust You with tonight."},
  {morning: "Make me like You today, Lord.", evening: "Thank You for today, God."},
  {morning: "Your will, not mine, today.", evening: "I give this day back to You."},
  {morning: "I am Yours — use me today.", evening: "Guard my heart and mind tonight."},
  {morning: "Lead me, Lord. I will follow.", evening: "In peace I lie down — You are with me."},
  {morning: "Fill me with Your Spirit today.", evening: "Forgive me, restore me, renew me."},
  {morning: "I trust You with today, Lord.", evening: "You are enough. That is enough."},
];

// ── PRAYER STATE ──────────────────────────────────
let prayerFilter = 'all';
let prayerTimerInterval = null;
let prayerTimerSeconds = 0;
let prayerTimerRunning = false;
let actsStep = 'A';
let prayForPersonIndex = 0;

// ── RENDER PRAYER PAGE ────────────────────────────
function renderPrayerPage() {
  updateBreathPrayer();
  updatePrayForPerson();
  renderPresetPrayers();
  renderCustomPrayers();
}

function updateBreathPrayer() {
  const tod = timeOfDay();
  const dayIdx = new Date().getDay();
  const bp = BREATH_PRAYERS[dayIdx % BREATH_PRAYERS.length];
  const text = tod === 'morning' ? bp.morning : bp.evening;
  const el = document.getElementById('breathPrayerText');
  if(el) el.textContent = `"${text}"`;
}

function updatePrayForPerson() {
  const people = STATE.prayForPeople;
  const el = document.getElementById('prayForPersonCard');
  if(!el) return;
  if(!people.length) {
    el.innerHTML = `<div class="card-label">🙏 Pray For Someone</div>
      <div style="color:var(--muted);font-size:0.85rem;margin-bottom:12px;">Add people you're praying for — one will be featured each day.</div>
      <button class="btn btn-ghost btn-sm" onclick="openModal('prayForModal')">+ Add Person</button>`;
    return;
  }
  // Feature different person each day
  const idx = new Date().getDate() % people.length;
  const person = people[idx];
  const daysSince = person.addedDate ? Math.floor((Date.now() - new Date(person.addedDate)) / 86400000) : 0;
  el.innerHTML = `<div class="card-label">🙏 Today: Pray for ${person.name}</div>
    <div style="font-size:0.82rem;color:var(--muted);margin-bottom:12px;">Praying for ${daysSince} day${daysSince!==1?'s':''} · ${people.length} total</div>
    <div style="font-family:'Crimson Pro',serif;font-style:italic;font-size:0.95rem;color:var(--text2);margin-bottom:14px;line-height:1.5;">"Lord, I lift up ${person.name} to You today. You know exactly what they need. Draw them closer to You, protect them, and help me love them well."</div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-primary btn-sm" onclick="logPrayedForPerson('${person.name}')">🙏 I Prayed for ${person.name}</button>
      <button class="btn btn-ghost btn-sm" onclick="openModal('prayForModal')">Manage</button>
    </div>`;
}

function logPrayedForPerson(name) {
  showToast(`🙏 Prayed for ${name}!`);
  addXP(10, `Prayed for ${name}`);
  haptic('success');
  logTodayPrayed();
}

function logTodayPrayed() {
  STATE.prayedCounts._today = dateKey();
  saveState('prayedCounts');
  // Update home today card
  const el = document.getElementById('todayPrayed');
  if(el) { el.textContent = '✓'; el.className = 'today-item-val done'; }
}

// ── PRESET PRAYERS ────────────────────────────────
function renderPresetPrayers() {
  const grid = document.getElementById('presetPrayerGrid');
  if(!grid) return;
  const list = prayerFilter === 'all' ? PRESET_PRAYERS : PRESET_PRAYERS.filter(p => p.cat === prayerFilter);

  grid.innerHTML = list.map(p => {
    const count = STATE.prayedCounts[p.id] || 0;
    const prayed = count > 0;
    return `<div class="prayer-card${prayed?' prayer-card-prayed':''}" id="pc-${p.id}">
      <div class="prayer-card-cat">${p.cat}</div>
      ${count > 0 ? `<div class="prayer-card-count">🙏 ${count}</div>` : ''}
      <div class="prayer-card-topic">${p.topic}</div>
      <div class="prayer-card-txt">${p.txt}</div>
      <div class="prayer-card-verse">${p.verse} — ${p.verseText}</div>
      <button class="btn ${prayed?'btn-green':'btn-ghost'} btn-sm btn-full prayer-pray-btn" onclick="logPresetPrayer('${p.id}')">
        ${prayed ? '✓ Prayed' : '🙏 Pray This'}
      </button>
    </div>`;
  }).join('');

  // Add swipe-left to pray on each card
  document.querySelectorAll('.prayer-card').forEach((card, i) => {
    const p = list[i];
    if(!p) return;
    new SwipeHandler(card, {
      onLeft: () => { logPresetPrayer(p.id); },
      minSwipe: 60,
    });
  });
}

function logPresetPrayer(id) {
  STATE.prayedCounts[id] = (STATE.prayedCounts[id] || 0) + 1;
  saveState('prayedCounts');
  logTodayPrayed();
  addXP(15, 'Prayer logged');
  haptic('success');
  showToast('🙏 Prayed! +15 XP');
  renderPresetPrayers();
}

function filterPrayer(cat, btn) {
  prayerFilter = cat;
  document.querySelectorAll('.prayer-filter-btn').forEach(b => b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderPresetPrayers();
}

// ── CUSTOM PRAYERS ────────────────────────────────
function renderCustomPrayers() {
  const el = document.getElementById('customPrayerList');
  if(!el) return;
  const prayers = STATE.customPrayers;
  const active = prayers.filter(p => !p.answered);
  const answered = prayers.filter(p => p.answered);

  if(!prayers.length) {
    el.innerHTML = `<div style="color:var(--muted);font-size:0.85rem;text-align:center;padding:20px;">
      No custom prayers yet. Add something you're believing God for.
    </div>`;
    return;
  }

  let html = '';
  if(active.length) {
    html += `<div class="prayer-section-label">Active (${active.length})</div>`;
    html += active.map(p => customPrayerCard(p)).join('');
  }
  if(answered.length) {
    html += `<div class="prayer-section-label" style="margin-top:16px;">Answered ✓ (${answered.length})</div>`;
    html += answered.map(p => customPrayerCard(p, true)).join('');
  }
  el.innerHTML = html;

  // Swipe left = mark prayed, swipe right = mark answered
  document.querySelectorAll('.custom-prayer-card').forEach(card => {
    const id = card.dataset.id;
    new SwipeHandler(card, {
      onLeft: () => logCustomPrayerPrayed(id),
      onRight: () => markAnswered(id),
      minSwipe: 60,
    });
  });
}

function customPrayerCard(p, isAnswered=false) {
  const daysSince = Math.floor((Date.now() - new Date(p.date)) / 86400000);
  const prayedCount = p.prayedCount || 0;
  return `<div class="custom-prayer-card${isAnswered?' answered':''}" data-id="${p.id}">
    <div class="cp-header">
      <div class="cp-title">${p.request}</div>
      <div class="cp-days">${daysSince}d</div>
    </div>
    ${p.note ? `<div class="cp-note">${p.note}</div>` : ''}
    <div class="cp-meta">
      ${p.category ? `<span class="chip" style="padding:2px 8px;font-size:0.62rem;">${p.category}</span>` : ''}
      ${prayedCount > 0 ? `<span style="font-size:0.72rem;color:var(--muted);">🙏 Prayed ${prayedCount}x</span>` : ''}
    </div>
    ${isAnswered
      ? `<div class="cp-answered-badge">✓ Answered ${p.answeredDate ? '— ' + formatDate(p.answeredDate) : ''}</div>`
      : `<div class="cp-actions">
          <button class="btn btn-ghost btn-sm" onclick="logCustomPrayerPrayed('${p.id}')">🙏 Prayed</button>
          <button class="btn btn-green btn-sm" onclick="markAnswered('${p.id}')">✓ Answered!</button>
          <button class="btn btn-ghost btn-sm" onclick="deleteCustomPrayer('${p.id}')">✕</button>
        </div>`
    }
  </div>`;
}

function logCustomPrayerPrayed(id) {
  const p = STATE.customPrayers.find(p => p.id === id);
  if(!p) return;
  p.prayedCount = (p.prayedCount || 0) + 1;
  p.lastPrayed = new Date().toISOString();
  saveState('customPrayers');
  logTodayPrayed();
  addXP(15, 'Prayer logged');
  haptic('success');
  showToast('🙏 Prayed! +15 XP');
  renderCustomPrayers();
}

function markAnswered(id) {
  const p = STATE.customPrayers.find(p => p.id === id);
  if(!p) return;
  p.answered = true;
  p.answeredDate = new Date().toISOString();
  saveState('customPrayers');
  addXP(50, 'Prayer answered!');
  haptic('success');
  showToast('🎉 Praise God! +50 XP');
  renderCustomPrayers();
  updateAnsweredRate();
}

function deleteCustomPrayer(id) {
  STATE.customPrayers = STATE.customPrayers.filter(p => p.id !== id);
  saveState('customPrayers');
  renderCustomPrayers();
  showToast('Prayer removed');
}

function addCustomPrayer() {
  const req = document.getElementById('newPrayerRequest').value.trim();
  const note = document.getElementById('newPrayerNote').value.trim();
  const cat = document.getElementById('newPrayerCat').value;
  if(!req) { showToast('Enter a prayer request first'); return; }
  STATE.customPrayers.unshift({
    id: 'cp_' + Date.now(),
    request: req,
    note,
    category: cat,
    date: new Date().toISOString(),
    answered: false,
    prayedCount: 0,
  });
  saveState('customPrayers');
  document.getElementById('newPrayerRequest').value = '';
  document.getElementById('newPrayerNote').value = '';
  closeModal('addPrayerModal');
  renderCustomPrayers();
  addXP(5, 'Prayer request added');
  showToast('🙏 Prayer request added');
}

function updateAnsweredRate() {
  const total = STATE.customPrayers.length;
  const answered = STATE.customPrayers.filter(p => p.answered).length;
  const rate = total > 0 ? Math.round((answered/total)*100) : 0;
  const el = document.getElementById('answeredRate');
  if(el) el.textContent = `${answered}/${total} answered (${rate}%)`;
}

// ── PRAY FOR PEOPLE ───────────────────────────────
function renderPrayForList() {
  const el = document.getElementById('prayForList');
  if(!el) return;
  const people = STATE.prayForPeople;
  if(!people.length) {
    el.innerHTML = '<div style="color:var(--muted);font-size:0.85rem;text-align:center;padding:16px;">No one added yet.</div>';
    return;
  }
  el.innerHTML = people.map((p,i) => {
    const days = p.addedDate ? Math.floor((Date.now()-new Date(p.addedDate))/86400000) : 0;
    return `<div style="display:flex;align-items:center;gap:10px;padding:12px;background:var(--surface2);border-radius:8px;margin-bottom:6px;">
      <div style="flex:1;">
        <div style="font-size:0.88rem;color:var(--text);">${p.name}</div>
        <div style="font-size:0.72rem;color:var(--muted);">${p.note||'No note'} · Praying ${days}d</div>
      </div>
      <button onclick="removePrayForPerson(${i})" style="background:none;border:none;color:var(--muted);cursor:pointer;">✕</button>
    </div>`;
  }).join('');
}

function addPrayForPerson() {
  const name = document.getElementById('prayForName').value.trim();
  const note = document.getElementById('prayForNote').value.trim();
  if(!name) { showToast('Enter a name'); return; }
  STATE.prayForPeople.push({name, note, addedDate: new Date().toISOString(), lastPrayed: null});
  saveState('prayForPeople');
  document.getElementById('prayForName').value = '';
  document.getElementById('prayForNote').value = '';
  renderPrayForList();
  updatePrayForPerson();
  showToast(`Added ${name} to your prayer list`);
}

function removePrayForPerson(i) {
  STATE.prayForPeople.splice(i,1);
  saveState('prayForPeople');
  renderPrayForList();
  updatePrayForPerson();
}

// ── PRAYER TIMER ──────────────────────────────────
function startPrayerTimer(minutes) {
  prayerTimerSeconds = minutes * 60;
  prayerTimerRunning = true;
  updateTimerDisplay();
  clearInterval(prayerTimerInterval);
  prayerTimerInterval = setInterval(() => {
    if(!prayerTimerRunning) return;
    prayerTimerSeconds--;
    updateTimerDisplay();
    if(prayerTimerSeconds <= 0) {
      clearInterval(prayerTimerInterval);
      prayerTimerRunning = false;
      haptic('success');
      showToast('🙏 Prayer time complete! +20 XP');
      addXP(20, 'Prayer session completed');
      logTodayPrayed();
      document.getElementById('timerBtn').textContent = 'Start Again';
    }
  }, 1000);
  document.getElementById('timerBtn').textContent = 'Stop';
  document.getElementById('timerStatus').textContent = 'Praying…';
}

function toggleTimer() {
  if(prayerTimerSeconds <= 0) {
    const mins = parseInt(document.getElementById('timerMinutes').value) || 5;
    startPrayerTimer(mins);
  } else if(prayerTimerRunning) {
    prayerTimerRunning = false;
    clearInterval(prayerTimerInterval);
    document.getElementById('timerBtn').textContent = 'Resume';
    document.getElementById('timerStatus').textContent = 'Paused';
  } else {
    prayerTimerRunning = true;
    startPrayerTimer(prayerTimerSeconds / 60);
  }
}

function resetTimer() {
  clearInterval(prayerTimerInterval);
  prayerTimerRunning = false;
  prayerTimerSeconds = 0;
  document.getElementById('timerDisplay').textContent = '0:00';
  document.getElementById('timerBtn').textContent = 'Start';
  document.getElementById('timerStatus').textContent = 'Ready';
}

function updateTimerDisplay() {
  const m = Math.floor(prayerTimerSeconds / 60);
  const s = prayerTimerSeconds % 60;
  const el = document.getElementById('timerDisplay');
  if(el) el.textContent = `${m}:${s.toString().padStart(2,'0')}`;
  // Update ring progress
  const pct = 1 - (prayerTimerSeconds / (parseInt(document.getElementById('timerMinutes')?.value||5) * 60));
  const ring = document.getElementById('timerRing');
  if(ring) {
    const circumference = 2 * Math.PI * 52;
    ring.style.strokeDashoffset = circumference * (1 - pct);
  }
}

// ── ACTS PRAYER BUILDER ───────────────────────────
function openACTS() {
  actsStep = 'A';
  renderACTSStep();
  openModal('actsModal');
}

function renderACTSStep() {
  const steps = ['A','C','T','S'];
  const data = ACTS_PROMPTS[actsStep];

  // Update stepper
  steps.forEach(s => {
    const el = document.getElementById('acts-step-' + s);
    if(el) {
      el.classList.toggle('acts-step-active', s === actsStep);
      el.classList.toggle('acts-step-done', steps.indexOf(s) < steps.indexOf(actsStep));
    }
  });

  document.getElementById('actsTitle').textContent = data.icon + ' ' + data.title;
  document.getElementById('actsDesc').textContent = data.desc;
  document.getElementById('actsPromptsList').innerHTML = data.prompts.map(p =>
    `<div class="acts-prompt" onclick="useActsPrompt(this)">${p}</div>`
  ).join('');

  // Show/hide nav buttons
  const idx = steps.indexOf(actsStep);
  document.getElementById('actsPrevBtn').style.display = idx > 0 ? 'block' : 'none';
  document.getElementById('actsNextBtn').textContent = idx < steps.length-1 ? 'Next →' : '✓ Finish';
}

function useActsPrompt(el) {
  const ta = document.getElementById('actsPrayerTa');
  if(ta) ta.value = (ta.value ? ta.value + '\n' : '') + el.textContent;
  el.style.opacity = '0.5';
}

function actsNext() {
  const steps = ['A','C','T','S'];
  const idx = steps.indexOf(actsStep);
  if(idx < steps.length - 1) {
    actsStep = steps[idx+1];
    document.getElementById('actsPrayerTa').value = '';
    renderACTSStep();
  } else {
    // Finished
    closeModal('actsModal');
    addXP(25, 'ACTS prayer completed');
    logTodayPrayed();
    showToast('🙏 ACTS prayer complete! +25 XP');
    haptic('success');
  }
}

function actsPrev() {
  const steps = ['A','C','T','S'];
  const idx = steps.indexOf(actsStep);
  if(idx > 0) {
    actsStep = steps[idx-1];
    document.getElementById('actsPrayerTa').value = '';
    renderACTSStep();
  }
}

// ── PRAY THE PSALMS ───────────────────────────────
const PSALM_PRAYERS = [
  {psalm:23, lines:[
    {text:"The Lord is my shepherd; I lack nothing.", prompt:"Tell God you trust Him as your shepherd today — your provider and guide."},
    {text:"He makes me lie down in green pastures, he leads me beside quiet waters.", prompt:"Thank God for the rest and peace He gives, even when life is busy."},
    {text:"He refreshes my soul.", prompt:"Ask God to refresh you right now — emotionally, spiritually, physically."},
    {text:"Even though I walk through the darkest valley, I will fear no evil, for you are with me.", prompt:"Name something hard you're walking through. Tell God you trust He's right there with you."},
    {text:"Surely goodness and love will follow me all the days of my life.", prompt:"Declare this out loud over your life. Say it like you believe it."},
  ]},
  {psalm:139, lines:[
    {text:"You have searched me, Lord, and you know me.", prompt:"Tell God that you're okay with Him knowing everything about you — the good and the bad."},
    {text:"You know when I sit and when I rise; you perceive my thoughts from afar.", prompt:"Confess one thought you've been having that you know isn't right."},
    {text:"I praise you because I am fearfully and wonderfully made.", prompt:"Thank God specifically for 3 things about how He made you."},
    {text:"Your eyes saw my unformed body; all the days ordained for me were written in your book.", prompt:"Ask God to help you trust His plan for your life even when you can't see it."},
  ]},
  {psalm:51, lines:[
    {text:"Have mercy on me, O God, according to your unfailing love.", prompt:"Ask for God's mercy — not because you deserve it, but because of who He is."},
    {text:"Create in me a pure heart, O God, and renew a steadfast spirit within me.", prompt:"Name one area of your heart you want God to clean up and make new."},
    {text:"Restore to me the joy of your salvation.", prompt:"If your joy has been low lately, ask God to restore it right now."},
  ]},
];

let psalmPrayerStep = 0;
let psalmPrayerIdx = 0;

function openPsalmPrayer() {
  psalmPrayerIdx = Math.floor(Math.random() * PSALM_PRAYERS.length);
  psalmPrayerStep = 0;
  renderPsalmPrayerStep();
  openModal('psalmPrayerModal');
}

function renderPsalmPrayerStep() {
  const psalm = PSALM_PRAYERS[psalmPrayerIdx];
  const step = psalm.lines[psalmPrayerStep];
  const total = psalm.lines.length;

  document.getElementById('psalmPrayerTitle').textContent = `Praying Psalm ${psalm.psalm}`;
  document.getElementById('psalmPrayerProgress').textContent = `${psalmPrayerStep+1} of ${total}`;
  document.getElementById('psalmPrayerVerse').textContent = `"${step.text}"`;
  document.getElementById('psalmPrayerPrompt').textContent = step.prompt;
  document.getElementById('psalmPrayerNext').textContent = psalmPrayerStep < total-1 ? 'Next →' : '✓ Amen';
}

function psalmPrayerNext() {
  const psalm = PSALM_PRAYERS[psalmPrayerIdx];
  if(psalmPrayerStep < psalm.lines.length-1) {
    psalmPrayerStep++;
    renderPsalmPrayerStep();
  } else {
    closeModal('psalmPrayerModal');
    addXP(20, 'Prayed the Psalms');
    logTodayPrayed();
    showToast('🙏 Amen! +20 XP');
    haptic('success');
  }
}

// ── WORSHIP SUGGESTIONS ───────────────────────────
const WORSHIP_MOODS = {
  praise: {
    label: 'I want to Praise',
    icon: '🙌',
    songs: [
      {title:'Goodness of God', artist:'Bethel Music', why:'Based on Psalm 23 — God\'s goodness through every season of life'},
      {title:'How Great Is Our God', artist:'Chris Tomlin', why:'Simple, powerful declaration of who God is'},
      {title:'What A Beautiful Name', artist:'Hillsong Worship', why:'The most theologically rich worship song of the last decade'},
      {title:'Build My Life', artist:'Pat Barrett', why:'About making Jesus the cornerstone of everything'},
      {title:'King of Kings', artist:'Hillsong Worship', why:'Tells the whole gospel story in one song'},
    ]
  },
  peace: {
    label: 'I need Peace',
    icon: '🕊️',
    songs: [
      {title:'Oceans (Where Feet May Fail)', artist:'Hillsong United', why:'Based on Matthew 14 — trusting Jesus when you\'re out of your depth'},
      {title:'It Is Well', artist:'Kristene DiMarco', why:'Written by a man who lost his daughters at sea — real peace through real grief'},
      {title:'Peace Be Still', artist:'Hope Darst', why:'Jesus calming the storm, and calming your heart right now'},
      {title:'Rest On Us', artist:'Maverick City Music', why:'Asking the Holy Spirit to bring peace and rest'},
      {title:'Same God', artist:'Elevation Worship', why:'The God who was faithful before is the same God right now'},
    ]
  },
  surrender: {
    label: 'I need to Surrender',
    icon: '🤲',
    songs: [
      {title:'Graves Into Gardens', artist:'Elevation Worship', why:'God making something out of nothing — giving Him your mess'},
      {title:'Do It Again', artist:'Elevation Worship', why:'Trusting God based on what He\'s already done'},
      {title:'Hymn of Heaven', artist:'Phil Wickham', why:'Perspective — what heaven will be like, what matters today'},
      {title:'Raise A Hallelujah', artist:'Bethel Music', why:'Praising God in the middle of the hard thing, not after it'},
      {title:'Even If', artist:'MercyMe', why:'Worshipping God even if He doesn\'t do what you\'re hoping for'},
    ]
  },
  warfare: {
    label: 'I\'m in a Battle',
    icon: '⚔️',
    songs: [
      {title:'Surrounded (Fight My Battles)', artist:'Bethel Music', why:'Based on 2 Chronicles 20 — praise as a weapon'},
      {title:'Champion', artist:'Dante Bowe ft. Bethel', why:'Declaring who God is when the enemy is loud'},
      {title:'The Blessing', artist:'Kari Jobe & Elevation', why:'God\'s protection and favor declared over your life'},
      {title:'Lion and the Lamb', artist:'Bethel Music', why:'Jesus as both gentle and fierce — He wins every time'},
      {title:'Battle Belongs', artist:'Phil Wickham', why:'The fight is God\'s to win — your job is to trust'},
    ]
  },
  hurting: {
    label: 'I\'m Hurting',
    icon: '💔',
    songs: [
      {title:'Tears of the Saints', artist:'Leeland', why:'God sees the brokenness of the world — and His heart breaks too'},
      {title:'I Can Only Imagine', artist:'MercyMe', why:'When this life is too hard, the hope of what\'s coming is real'},
      {title:'Broken Hallelujah', artist:'The Afters', why:'You can still praise God from a broken place'},
      {title:'Thy Will', artist:'Hillary Scott', why:'Written after a miscarriage — raw, honest, surrendered'},
      {title:'Blessings', artist:'Laura Story', why:'What if your blessings come through raindrops? Hard but true'},
    ]
  },
};

let selectedMood = null;

function renderWorshipSuggestions() {
  const el = document.getElementById('worshipContent');
  if(!el) return;

  if(!selectedMood) {
    el.innerHTML = `
      <div style="margin-bottom:16px;font-size:0.85rem;color:var(--muted);">How are you coming to worship today?</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        ${Object.entries(WORSHIP_MOODS).map(([key,mood]) => `
          <div class="worship-mood-btn" onclick="selectMood('${key}')">
            <span style="font-size:1.5rem;">${mood.icon}</span>
            <span style="font-size:0.78rem;color:var(--muted);margin-top:4px;text-align:center;">${mood.label}</span>
          </div>`).join('')}
      </div>`;
    return;
  }

  const mood = WORSHIP_MOODS[selectedMood];
  el.innerHTML = `
    <button class="btn btn-ghost btn-sm" style="margin-bottom:16px;" onclick="selectedMood=null;renderWorshipSuggestions()">← Back</button>
    <div style="font-size:0.65rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;">${mood.icon} ${mood.label}</div>
    ${mood.songs.map(s => `
      <div class="worship-song-card">
        <div class="ws-title">${s.title}</div>
        <div class="ws-artist">${s.artist}</div>
        <div class="ws-why">${s.why}</div>
        <div style="display:flex;gap:8px;margin-top:10px;">
          <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(s.title+' '+s.artist)}" target="_blank" class="btn btn-ghost btn-sm">▶ YouTube</a>
          <a href="https://open.spotify.com/search/${encodeURIComponent(s.title+' '+s.artist)}" target="_blank" class="btn btn-ghost btn-sm">🎵 Spotify</a>
        </div>
      </div>`).join('')}`;
}

function selectMood(mood) {
  selectedMood = mood;
  renderWorshipSuggestions();
}
