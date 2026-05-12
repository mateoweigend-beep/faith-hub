/* ═══════════════════════════════════════════════
   MATEO'S FAITH HUB — MEMORY VERSES
   Stage 6: Flashcards, Verse of the Week, Quiz
═══════════════════════════════════════════════ */

// ── MEMORY VERSE DATA ─────────────────────────────
const ALL_MEMORY_VERSES = [
  {id:'mv1', ref:'Joshua 1:9', topic:'Courage', category:'strength',
   text:'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.'},
  {id:'mv2', ref:'Philippians 4:13', topic:'Strength', category:'strength',
   text:'I can do all things through Christ who strengthens me.'},
  {id:'mv3', ref:'Romans 8:28', topic:'Trust', category:'faith',
   text:'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.'},
  {id:'mv4', ref:'Proverbs 3:5-6', topic:'Direction', category:'wisdom',
   text:'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.'},
  {id:'mv5', ref:'John 3:16', topic:"God's Love", category:'gospel',
   text:'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.'},
  {id:'mv6', ref:'Jeremiah 29:11', topic:'Purpose', category:'faith',
   text:'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.'},
  {id:'mv7', ref:'Romans 12:2', topic:'Identity', category:'identity',
   text:"Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is — his good, pleasing and perfect will."},
  {id:'mv8', ref:'Psalm 23:1', topic:'Peace', category:'peace',
   text:'The Lord is my shepherd, I lack nothing.'},
  {id:'mv9', ref:'Matthew 6:33', topic:'Priorities', category:'wisdom',
   text:'But seek first his kingdom and his righteousness, and all these things will be given to you as well.'},
  {id:'mv10', ref:'1 Corinthians 10:13', topic:'Temptation', category:'strength',
   text:'No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can endure it.'},
  {id:'mv11', ref:'Colossians 3:23', topic:'Work Ethic', category:'strength',
   text:'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.'},
  {id:'mv12', ref:'Isaiah 40:31', topic:'Endurance', category:'strength',
   text:'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.'},
  {id:'mv13', ref:'Psalm 139:14', topic:'Identity', category:'identity',
   text:'I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.'},
  {id:'mv14', ref:'Galatians 5:22-23', topic:'Character', category:'character',
   text:'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.'},
  {id:'mv15', ref:'Ephesians 6:10-11', topic:'Spiritual Warfare', category:'strength',
   text:'Finally, be strong in the Lord and in his mighty power. Put on the full armor of God, so that you can take your stand against the devil\'s schemes.'},
  {id:'mv16', ref:'Matthew 5:16', topic:'Witness', category:'character',
   text:'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.'},
  {id:'mv17', ref:'2 Timothy 1:7', topic:'Courage', category:'strength',
   text:'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.'},
  {id:'mv18', ref:'Psalm 119:11', topic:'Scripture', category:'faith',
   text:'I have hidden your word in my heart that I might not sin against you.'},
  {id:'mv19', ref:'John 15:5', topic:'Abiding', category:'faith',
   text:'I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.'},
  {id:'mv20', ref:'Romans 8:1', topic:'Freedom', category:'gospel',
   text:'Therefore, there is now no condemnation for those who are in Christ Jesus.'},
  {id:'mv21', ref:'Proverbs 4:23', topic:'Heart', category:'wisdom',
   text:'Above all else, guard your heart, for everything you do flows from it.'},
  {id:'mv22', ref:'1 Peter 5:7', topic:'Anxiety', category:'peace',
   text:'Cast all your anxiety on him because he cares for you.'},
  {id:'mv23', ref:'James 1:2-3', topic:'Trials', category:'strength',
   text:'Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.'},
  {id:'mv24', ref:'Hebrews 11:1', topic:'Faith', category:'faith',
   text:'Now faith is confidence in what we hope for and assurance about what we do not see.'},
  {id:'mv25', ref:'John 14:6', topic:'Salvation', category:'gospel',
   text:'Jesus answered, "I am the way and the truth and the life. No one comes to the Father except through me."'},
  {id:'mv26', ref:'Philippians 4:6-7', topic:'Anxiety', category:'peace',
   text:'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'},
  {id:'mv27', ref:'Romans 5:8', topic:"God's Love", category:'gospel',
   text:'But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.'},
  {id:'mv28', ref:'Lamentations 3:22-23', topic:'Mercy', category:'faith',
   text:"Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness."},
  {id:'mv29', ref:'Micah 6:8', topic:'Justice', category:'character',
   text:'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.'},
  {id:'mv30', ref:'Matthew 22:37-39', topic:'Love', category:'character',
   text:"Jesus replied: 'Love the Lord your God with all your heart and with all your soul and with all your mind.' This is the first and greatest commandment. And the second is like it: 'Love your neighbor as yourself.'"},
];

// ── VERSE OF THE WEEK ─────────────────────────────
function getVerseOfWeek() {
  const now = new Date();
  // Week number of the year
  const start = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);

  const stored = STATE.verseOfWeek;
  if(stored && stored.weekNum === weekNum && stored.year === now.getFullYear()) {
    return stored;
  }

  // Assign new verse of the week
  const verse = ALL_MEMORY_VERSES[weekNum % ALL_MEMORY_VERSES.length];
  const monday = new Date(now);
  monday.setDate(now.getDate() - now.getDay() + 1);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const vow = {
    weekNum,
    year: now.getFullYear(),
    verseId: verse.id,
    ref: verse.ref,
    text: verse.text,
    topic: verse.topic,
    assignedDate: monday.toISOString(),
    endDate: sunday.toISOString(),
    quizScores: [],
    bestScore: 0,
  };

  STATE.verseOfWeek = vow;
  saveState('verseOfWeek');
  return vow;
}

function daysLeftInWeek() {
  const now = new Date();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() + (7 - now.getDay()));
  sunday.setHours(23,59,59,0);
  const diff = Math.ceil((sunday - now) / 86400000);
  return diff;
}

// ── STATE ─────────────────────────────────────────
let memoryFilter = 'all';
let currentFlashcardIdx = 0;
let flashcardFlipped = false;
let flashcardList = [];
let quizVerseId = null;

// ── RENDER MEMORY PAGE ────────────────────────────
function renderMemoryPage() {
  renderVerseOfWeek();
  renderMemoryVerseList();
}

// ── VERSE OF THE WEEK ─────────────────────────────
function renderVerseOfWeek() {
  const el = document.getElementById('verseOfWeekCard');
  if(!el) return;

  const vow = getVerseOfWeek();
  const daysLeft = daysLeftInWeek();
  const best = vow.bestScore || 0;

  el.innerHTML = `
    <div class="vow-label">📅 Verse of the Week</div>
    <div class="vow-ref">${vow.ref} · ${vow.topic}</div>
    <div class="vow-text">"${vow.text}"</div>
    <div class="vow-meta">
      <span class="vow-days">${daysLeft} day${daysLeft!==1?'s':''} left this week</span>
      ${best>0 ? `<span class="vow-best">Best: ${best}%</span>` : ''}
    </div>
    <div class="vow-actions">
      <button class="btn btn-primary btn-sm" onclick="startWeeklyQuiz()">📝 Take Quiz</button>
      <button class="btn btn-ghost btn-sm" onclick="copyMemVerse('${vow.ref}','${vow.text.replace(/'/g,"\\'")}')">Copy</button>
    </div>
    ${best >= 100 ? '<div style="margin-top:10px;font-size:0.78rem;color:var(--green);">✓ Memorized this week! 🔥</div>' : ''}`;
}

// ── MEMORY VERSE LIST ─────────────────────────────
function renderMemoryVerseList() {
  const el = document.getElementById('memoryVerseList');
  if(!el) return;

  const categories = ['all','strength','faith','identity','wisdom','gospel','peace','character'];
  let verses = memoryFilter === 'all' ? ALL_MEMORY_VERSES
    : ALL_MEMORY_VERSES.filter(v => v.category === memoryFilter);

  el.innerHTML = verses.map(v => {
    const saved = STATE.savedVerses.includes(v.id);
    const scores = STATE.readingSessions[`quiz_${v.id}`] || [];
    const best = scores.length ? Math.max(...scores) : 0;
    const attempts = scores.length;

    return `<div class="mv-card${saved?' mv-saved':''}" id="mvc-${v.id}">
      <div class="mv-header">
        <div class="mv-ref">${v.ref}</div>
        <div class="mv-topic-badge">${v.topic}</div>
      </div>
      <div class="mv-text">"${v.text}"</div>
      ${attempts > 0 ? `<div class="mv-progress">
        <div class="mv-prog-bar-track"><div class="mv-prog-bar-fill" style="width:${best}%"></div></div>
        <span class="mv-prog-label">Best: ${best}% · ${attempts} attempt${attempts!==1?'s':''}</span>
      </div>` : ''}
      <div class="mv-actions">
        <button class="btn btn-ghost btn-sm ${saved?'mv-saved-btn':''}" onclick="toggleSaveVerse('${v.id}',this)">
          ${saved ? '★ Saved' : '☆ Save'}
        </button>
        <button class="btn btn-ghost btn-sm" onclick="openFlashcard('${v.id}')">🃏 Flashcard</button>
        <button class="btn btn-ghost btn-sm" onclick="startQuiz('${v.id}')">📝 Quiz</button>
        <button class="btn btn-ghost btn-sm" onclick="copyMemVerse('${v.ref}','${v.text.replace(/'/g,"\\'")}')">Copy</button>
      </div>
    </div>`;
  }).join('');
}

function toggleSaveVerse(id, btn) {
  const idx = STATE.savedVerses.indexOf(id);
  if(idx > -1) {
    STATE.savedVerses.splice(idx, 1);
    showToast('Removed from saved');
  } else {
    STATE.savedVerses.push(id);
    addXP(5, 'Verse saved');
    showToast('★ Verse saved!');
    haptic('success');
  }
  saveState('savedVerses');
  renderMemoryVerseList();
}

function copyMemVerse(ref, text) {
  const full = `"${text}" — ${ref} (WEB)`;
  navigator.clipboard.writeText(full).then(() => showToast('📋 Copied!'));
}

function filterMemory(cat, btn) {
  memoryFilter = cat;
  document.querySelectorAll('.mem-filter-btn').forEach(b => b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderMemoryVerseList();
}

// ── FLASHCARD MODE ────────────────────────────────
function openFlashcard(id) {
  const verse = ALL_MEMORY_VERSES.find(v => v.id === id);
  if(!verse) return;

  // Build deck: this verse + 2 neighbors
  const idx = ALL_MEMORY_VERSES.findIndex(v => v.id === id);
  flashcardList = ALL_MEMORY_VERSES.slice(
    Math.max(0, idx-1),
    Math.min(ALL_MEMORY_VERSES.length, idx+3)
  );
  currentFlashcardIdx = flashcardList.findIndex(v => v.id === id);
  flashcardFlipped = false;
  renderFlashcard();
  openModal('flashcardModal');
}

function openFlashcardAll() {
  flashcardList = memoryFilter === 'all' ? [...ALL_MEMORY_VERSES]
    : ALL_MEMORY_VERSES.filter(v => v.category === memoryFilter);
  // Shuffle
  flashcardList = flashcardList.sort(() => Math.random() - 0.5);
  currentFlashcardIdx = 0;
  flashcardFlipped = false;
  renderFlashcard();
  openModal('flashcardModal');
}

function renderFlashcard() {
  const verse = flashcardList[currentFlashcardIdx];
  if(!verse) return;

  const el = document.getElementById('flashcardInner');
  const counter = document.getElementById('flashcardCounter');
  if(counter) counter.textContent = `${currentFlashcardIdx+1} / ${flashcardList.length}`;

  if(el) {
    el.innerHTML = `
      <div class="fc-front${flashcardFlipped?' fc-hidden':''}">
        <div class="fc-label">Reference</div>
        <div class="fc-ref">${verse.ref}</div>
        <div class="fc-topic">${verse.topic}</div>
        <div class="fc-hint">Tap to reveal verse</div>
      </div>
      <div class="fc-back${flashcardFlipped?'':' fc-hidden'}">
        <div class="fc-label">Verse</div>
        <div class="fc-text">"${verse.text}"</div>
        <div class="fc-ref-small">${verse.ref} (WEB)</div>
      </div>`;
  }

  // Nav buttons
  document.getElementById('fcPrevBtn').disabled = currentFlashcardIdx === 0;
  document.getElementById('fcNextBtn').disabled = currentFlashcardIdx === flashcardList.length - 1;
}

function flipFlashcard() {
  flashcardFlipped = !flashcardFlipped;
  renderFlashcard();
  haptic('light');
}

function nextFlashcard() {
  if(currentFlashcardIdx < flashcardList.length - 1) {
    currentFlashcardIdx++;
    flashcardFlipped = false;
    renderFlashcard();
    haptic('light');
  }
}

function prevFlashcard() {
  if(currentFlashcardIdx > 0) {
    currentFlashcardIdx--;
    flashcardFlipped = false;
    renderFlashcard();
    haptic('light');
  }
}

// Swipe on flashcard
function setupFlashcardSwipe() {
  const el = document.getElementById('flashcardArea');
  if(!el) return;
  new SwipeHandler(el, {
    onLeft: () => nextFlashcard(),
    onRight: () => prevFlashcard(),
    onUp: () => flipFlashcard(),
    minSwipe: 50,
  });
}

// ── QUIZ MODE ─────────────────────────────────────
function startQuiz(id) {
  quizVerseId = id;
  const verse = ALL_MEMORY_VERSES.find(v => v.id === id);
  if(!verse) return;

  document.getElementById('quizVerseRef').textContent = verse.ref + ' — ' + verse.topic;
  document.getElementById('quizVerseHint').textContent = verse.text.split(' ').slice(0,4).join(' ') + '…';
  document.getElementById('memQuizInput').value = '';
  document.getElementById('memQuizResult').style.display = 'none';
  document.getElementById('memQuizSubmitBtn').style.display = 'block';
  openModal('memQuizModal');
  setTimeout(() => document.getElementById('memQuizInput').focus(), 200);
}

function startWeeklyQuiz() {
  const vow = getVerseOfWeek();
  startQuiz(vow.verseId);
}

function submitMemQuiz() {
  const verse = ALL_MEMORY_VERSES.find(v => v.id === quizVerseId);
  if(!verse) return;

  const answer = document.getElementById('memQuizInput').value.trim().toLowerCase();
  const correct = verse.text.toLowerCase();

  if(!answer) { showToast('Type something first'); return; }

  // Score: word-level match
  const correctWords = correct.replace(/[^a-z\s]/g,'').split(/\s+/);
  const answerWords = answer.replace(/[^a-z\s]/g,'').split(/\s+/);
  let matched = 0;
  correctWords.forEach(w => {
    if(w.length > 2 && answerWords.some(a => a === w || a.startsWith(w.substring(0,Math.min(w.length,5))))) matched++;
  });
  const score = Math.round((matched / correctWords.length) * 100);

  // Save score
  const key = `quiz_${quizVerseId}`;
  if(!STATE.readingSessions[key]) STATE.readingSessions[key] = [];
  STATE.readingSessions[key].push(score);
  saveState('readingSessions');

  // Update verse of week best score
  if(STATE.verseOfWeek && STATE.verseOfWeek.verseId === quizVerseId) {
    STATE.verseOfWeek.bestScore = Math.max(STATE.verseOfWeek.bestScore || 0, score);
    STATE.verseOfWeek.quizScores.push(score);
    saveState('verseOfWeek');
  }

  // XP
  const xp = Math.round(score / 10) * 5;
  addXP(xp, 'Memory quiz');

  // Show result
  const el = document.getElementById('memQuizResult');
  el.style.display = 'block';
  document.getElementById('memQuizSubmitBtn').style.display = 'none';

  const grade = score >= 95 ? '🔥 Perfect!' : score >= 80 ? '✓ Great!' : score >= 60 ? '👍 Good progress' : '📖 Keep practicing';
  const color = score >= 80 ? 'var(--green)' : score >= 60 ? 'var(--gold)' : 'var(--red)';

  el.innerHTML = `
    <div style="text-align:center;margin-bottom:16px;">
      <div style="font-family:'Cinzel',serif;font-size:2.5rem;color:${color};">${score}%</div>
      <div style="font-size:1rem;color:${color};margin-top:4px;">${grade} +${xp} XP</div>
    </div>
    <div style="background:var(--surface2);border-radius:8px;padding:14px;margin-bottom:14px;">
      <div style="font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;">The full verse:</div>
      <div style="font-family:'Crimson Pro',serif;font-size:1rem;font-style:italic;line-height:1.65;color:var(--text);">"${verse.text}"</div>
      <div style="font-size:0.72rem;color:var(--gold);margin-top:8px;">— ${verse.ref}</div>
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-primary btn-full" onclick="startQuiz('${quizVerseId}')">Try Again</button>
      <button class="btn btn-ghost" onclick="closeModal('memQuizModal')">Done</button>
    </div>`;

  haptic(score >= 80 ? 'success' : 'light');
  renderMemoryVerseList();
  renderVerseOfWeek();
}

// ── LONGEST VERSE RECORD ──────────────────────────
function getLongestMemorized() {
  let longest = null;
  let maxLen = 0;
  Object.entries(STATE.readingSessions).forEach(([key, scores]) => {
    if(!key.startsWith('quiz_')) return;
    const best = Math.max(...scores);
    if(best >= 80) {
      const id = key.replace('quiz_','');
      const verse = ALL_MEMORY_VERSES.find(v => v.id === id);
      if(verse && verse.text.length > maxLen) {
        maxLen = verse.text.length;
        longest = verse;
      }
    }
  });
  return longest;
}

// ── SAVED VERSES PANEL ────────────────────────────
let savedSectionVisible = true;

function renderSavedVerses() {
  const el = document.getElementById('savedVersesList');
  if(!el) return;

  const saved = ALL_MEMORY_VERSES.filter(v => STATE.savedVerses.includes(v.id));

  // Also include verses pinned from the Bible reader (highlighted with special flag)
  const pinnedFromBible = STATE.pinnedVerses || [];

  if(!saved.length && !pinnedFromBible.length) {
    el.innerHTML = `<div style="color:var(--muted);font-size:0.82rem;padding:12px;background:var(--surface);border-radius:var(--radius);border:1px dashed var(--border2);">
      No saved verses yet. Hit ☆ Save on any verse below, or 📌 Pin a verse from the Bible reader.
    </div>`;
    return;
  }

  let html = '';

  // Pinned from Bible
  if(pinnedFromBible.length) {
    html += pinnedFromBible.map(v => `
      <div class="saved-verse-row">
        <div class="svr-pin">📌</div>
        <div class="svr-body">
          <div class="svr-ref">${v.ref}</div>
          <div class="svr-text">"${v.text}"</div>
        </div>
        <button class="svr-remove" onclick="removePinnedVerse('${v.ref}')">✕</button>
      </div>`).join('');
  }

  // Saved memory verses
  html += saved.map(v => `
    <div class="saved-verse-row">
      <div class="svr-pin" style="color:var(--gold);">★</div>
      <div class="svr-body">
        <div class="svr-ref">${v.ref} <span style="font-size:0.62rem;color:var(--muted);margin-left:4px;">${v.topic}</span></div>
        <div class="svr-text">"${v.text}"</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0;">
        <button class="svr-action" onclick="startQuiz('${v.id}')">Quiz</button>
        <button class="svr-action" onclick="openFlashcard('${v.id}')">Card</button>
        <button class="svr-remove" onclick="toggleSaveVerse('${v.id}',null)">✕</button>
      </div>
    </div>`).join('');

  el.innerHTML = html;
}

function removePinnedVerse(ref) {
  STATE.pinnedVerses = STATE.pinnedVerses.filter(v => v.ref !== ref);
  saveState('pinnedVerses');
  renderSavedVerses();
  renderPinnedVerses();
  showToast('Unpinned');
}

function toggleSavedSection() {
  savedSectionVisible = !savedSectionVisible;
  const el = document.getElementById('savedVersesList');
  if(el) el.style.display = savedSectionVisible ? 'block' : 'none';
}
