/* ═══════════════════════════════════════════════
   MATEO'S FAITH HUB — BIBLE READER
   Stage 2: Full Bible reader with all features
═══════════════════════════════════════════════ */

// ── CONSTANTS ─────────────────────────────────────
const BIBLE_BOOKS_OT = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song Of Songs','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'];
const BIBLE_BOOKS_NT = ['Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'];
const ALL_BOOKS = [...BIBLE_BOOKS_OT, ...BIBLE_BOOKS_NT];

const BOOK_INTROS = {
  'Genesis': {author:'Moses',date:'~1440 BC',theme:'Beginnings',summary:'The foundation of everything — creation, the fall, Noah, Abraham, Isaac, Jacob, and Joseph. Genesis answers: where did we come from and why are we here?'},
  'Psalms': {author:'David & others',date:'~1000-500 BC',theme:'Worship & Prayer',summary:'150 songs and poems covering every emotion — joy, grief, doubt, praise, anger, hope. The most honest book in the Bible. Perfect for when words fail you.'},
  'Proverbs': {author:'Solomon',date:'~970 BC',theme:'Wisdom',summary:'Short punchy wisdom for everyday life. How to handle money, friendships, pride, work, relationships. Written by the wisest man who ever lived — for young people specifically.'},
  'Isaiah': {author:'Isaiah',date:'~700 BC',theme:'Salvation',summary:'The gospel written 700 years before Jesus. Chapter 53 describes the cross in detail before crucifixion was even invented. One of the most powerful books in the OT.'},
  'Matthew': {author:'Matthew',date:'~60 AD',theme:'Jesus the King',summary:'Written for Jewish readers to prove Jesus is the promised Messiah. Includes the Sermon on the Mount — Jesus\'s most famous teaching. Start here if you\'re new to the Gospels.'},
  'Mark': {author:'John Mark',date:'~55 AD',theme:'Jesus the Servant',summary:'The fastest Gospel — "immediately" appears 41 times. Non-stop action. Perfect for first-time readers. Covers Jesus\'s ministry in just 16 chapters.'},
  'Luke': {author:'Luke (a doctor)',date:'~60 AD',theme:'Jesus the Savior',summary:'The most detailed Gospel. Luke was a doctor who interviewed eyewitnesses. Includes parables only found here — the Prodigal Son, the Good Samaritan. Shows Jesus\'s heart for the outcast.'},
  'John': {author:'John',date:'~90 AD',theme:'Jesus is God',summary:'The most theological Gospel. Opens with "In the beginning was the Word" — immediately connecting Jesus to Genesis. Includes the 7 "I AM" statements and the most personal moments of Jesus\'s life.'},
  'Acts': {author:'Luke',date:'~62 AD',theme:'The Church Begins',summary:'The story of what happened after Jesus rose. The Holy Spirit comes, the church explodes, Paul starts his missionary journeys. The most action-packed book after Mark.'},
  'Romans': {author:'Paul',date:'~57 AD',theme:'The Gospel Explained',summary:'The most systematic explanation of salvation in the Bible. If you want to really understand what Jesus did and why, read Romans. Chapters 3-8 will change your life.'},
  'Galatians': {author:'Paul',date:'~49 AD',theme:'Freedom in Christ',summary:'Written in anger — Paul heard people were adding rules to the gospel. His point: you\'re saved by faith, not performance. One of the most liberating books in the NT.'},
  'Ephesians': {author:'Paul',date:'~60 AD',theme:'The Church & Armor',summary:'First 3 chapters: who you are in Christ. Last 3 chapters: how to live because of it. Contains the Armor of God (ch. 6) and the most complete picture of God\'s love.'},
  'Philippians': {author:'Paul',date:'~61 AD',theme:'Joy',summary:'Written from prison, it\'s somehow the most joyful book in the Bible. "Rejoice in the Lord always" is written by a man in chains. Chapter 4 is essential reading for anxiety.'},
  'James': {author:'James (Jesus\'s brother)',date:'~45 AD',theme:'Faith in Action',summary:'The most practical book in the NT. Real talk for real life. Faith that doesn\'t change how you live isn\'t real faith. James doesn\'t sugarcoat anything.'},
  'Hebrews': {author:'Unknown',date:'~65 AD',theme:'Jesus is Better',summary:'Written to Jewish Christians being pressured to go back to their old religion. The author\'s argument: Jesus is better than everything that came before. Chapter 11 is the faith hall of fame.'},
  'Revelation': {author:'John',date:'~95 AD',theme:'Victory',summary:'The final book. Symbolic and complex, but the main point is clear: Jesus wins. Written to persecuted Christians to give them hope. Don\'t get lost in the symbols — focus on the ending.'},
};

const CHAPTER_SUMMARIES = {
  'Mark-1': 'Jesus is baptized, tempted in the desert, then immediately launches His ministry — calling disciples, healing the sick, driving out demons. Mark moves fast. "Immediately" sets the pace for the whole book.',
  'Mark-2': 'Jesus forgives a paralyzed man — which the religious leaders say only God can do. He\'s making a claim. Then He calls Matthew (a tax collector), eats with sinners, and explains that He\'s doing something completely new.',
  'Mark-4': 'Jesus teaches in parables — stories with hidden meaning for those willing to dig in. The parable of the sower is the key to understanding all the others. He also calms a storm, showing authority over nature.',
  'Mark-8': 'The turning point of Mark. Peter declares Jesus is the Messiah. Jesus then reveals He must die — and says anyone who follows Him must take up their cross. What does it mean to really follow Jesus?',
  'Mark-16': 'The resurrection. The tomb is empty. "He is risen — He is not here." The disciples are told to go tell the world. Everything in the Bible has been building to this moment.',
  'Matthew-5': 'The Beatitudes open the Sermon on the Mount. Jesus redefines what blessed looks like — not rich and powerful, but humble, pure, merciful. Then He raises the bar on anger, lust, and honesty.',
  'Matthew-6': 'Jesus teaches how to pray — the Lord\'s Prayer as a model. He warns against showing off your faith. Then the famous teaching on worry: "Look at the birds... your Father feeds them."',
  'Matthew-7': 'The close of the Sermon on the Mount. Ask, seek, knock. The narrow and wide roads. Wolves in sheep\'s clothing. Build your life on rock, not sand. One of the most challenging chapters in the Bible.',
  'John-3': 'Nicodemus visits Jesus at night with questions. Jesus says you must be born again to see God\'s kingdom. Then comes John 3:16 — the most famous verse in the Bible and the heart of the gospel.',
  'John-10': 'Jesus says "I am the good shepherd." He knows His sheep by name. He lays down His life for them. Nobody can snatch them from His hand. One of the most comforting chapters in scripture.',
  'John-14': '"Do not let your hearts be troubled." Jesus promises to prepare a place for His followers. He says "I am the way, the truth and the life." He promises the Holy Spirit — so they won\'t be alone.',
  'John-15': 'The vine and branches. You can\'t produce anything apart from Jesus — like a branch cut from the vine. "Remain in me." Then the greatest commandment: love each other as I have loved you.',
  'Romans-8': 'Possibly the greatest chapter in the Bible. No condemnation. The Spirit gives life. Creation is groaning. God works everything for good. And the climax: nothing — absolutely nothing — can separate us from God\'s love.',
  'Ephesians-6': 'The Armor of God. Paul describes a real spiritual battle and gives us real equipment: truth, righteousness, peace, faith, salvation, and the Word. Suit up every single day.',
  'Psalms-23': 'The most beloved psalm. The Lord as shepherd — providing rest, guidance, and comfort even in the darkest valley. Written by David, who actually was a shepherd before he was a king.',
  'Psalms-139': 'God\'s complete knowledge of you. He knew you before you were born, knows every thought, has plans for you. "I am fearfully and wonderfully made." Read this when you feel unseen or insignificant.',
  'James-1': 'Don\'t run from trials — they build endurance. Ask God for wisdom when you need it. Be quick to listen, slow to speak, slow to anger. Don\'t just hear the Word — do it.',
};

const CROSS_REFS = {
  'Mark-1-11': ['Matthew 3:17', 'Luke 3:22', 'Psalm 2:7', 'Isaiah 42:1'],
  'Mark-1-15': ['Matthew 4:17', 'Luke 4:43', 'Isaiah 61:1'],
  'John-3-16': ['Romans 5:8', 'John 3:17', '1 John 4:9', 'Romans 8:32'],
  'John-14-6': ['Acts 4:12', '1 Timothy 2:5', 'Hebrews 9:15', 'John 10:9'],
  'Romans-8-1': ['John 3:18', 'Romans 8:34', 'Colossians 1:22'],
  'Romans-8-28': ['Genesis 50:20', 'Jeremiah 29:11', 'Philippians 1:6'],
  'Romans-8-38': ['John 10:28', 'Psalm 139:8', '1 Peter 1:5'],
  'Ephesians-2-8': ['Romans 3:24', 'Titus 3:5', 'Acts 15:11', 'Romans 11:6'],
  'Ephesians-2-10': ['Psalm 139:14', 'Titus 2:14', 'Colossians 3:10'],
  'Ephesians-6-10': ['1 Peter 5:8', '2 Corinthians 10:4', 'James 4:7'],
  'Psalms-23-1': ['John 10:11', 'Psalm 28:9', 'Isaiah 40:11'],
  'Psalms-139-14': ['Psalm 8:5', 'Genesis 1:27', 'Ephesians 2:10'],
  'Philippians-4-13': ['2 Corinthians 12:9', 'Colossians 1:11', 'Ephesians 6:10'],
  'James-1-2': ['Romans 5:3', '1 Peter 1:6', '2 Corinthians 12:10'],
};

// ── BIBLE STATE ───────────────────────────────────
let bibleCurrentBook = null;
let bibleCurrentCh = 1;
let bibleActiveHlColor = 'yellow';
let bibleNoteKey = null;
let bibleSearchFilter = '';
let bibleReadingStart = null;
let bibleAutoScrollInterval = null;

// ── RENDER BIBLE PAGE ─────────────────────────────
function renderBiblePage() {
  renderBibleSidebar();
  if(bibleCurrentBook) {
    renderBibleChapter();
  } else {
    showBibleWelcome();
  }
}

function showBibleWelcome() {
  document.getElementById('bibleMainArea').innerHTML = `
    <div style="padding:40px 24px;text-align:center;color:var(--muted);max-width:500px;margin:0 auto;">
      <div style="font-size:3.5rem;margin-bottom:16px;">📖</div>
      <div style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text);margin-bottom:10px;">World English Bible</div>
      <div style="font-size:0.88rem;line-height:1.6;margin-bottom:24px;">Select a book from the sidebar, or jump to a passage using the search bar above. Tap any verse to highlight it. Long-press for more options.</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
        ${['Mark 1','John 3','Psalm 23','Romans 8','Matthew 5','Ephesians 6','John 14','Philippians 4'].map(p => {
          const [b,...rest] = p.split(' ');
          const ch = parseInt(rest.join(' '));
          return `<button class="btn btn-ghost btn-sm" onclick="openBibleChapter('${p.includes('Psalm')?'Psalms':b}',${ch})">${p}</button>`;
        }).join('')}
      </div>
    </div>`;
}

function renderBibleSidebar(filter='') {
  const sb = document.getElementById('bibleSidebar');
  if(!sb) return;
  bibleSearchFilter = filter.toLowerCase();
  sb.innerHTML = `<input class="bible-search" placeholder="Search book…" oninput="renderBibleSidebar(this.value)" value="${filter}">`;

  ['OT','NT'].forEach(section => {
    const books = (section==='OT' ? BIBLE_BOOKS_OT : BIBLE_BOOKS_NT)
      .filter(b => !bibleSearchFilter || b.toLowerCase().includes(bibleSearchFilter));
    if(!books.length) return;
    const lbl = document.createElement('div');
    lbl.className = 'sb-section-label';
    lbl.textContent = section === 'NT' ? 'New Testament' : 'Old Testament';
    sb.appendChild(lbl);
    books.forEach(book => {
      const el = document.createElement('div');
      el.className = 'sb-book' + (bibleCurrentBook===book ? ' active' : '');
      const chCount = (typeof BIBLE!=='undefined' && BIBLE[book]) ? Object.keys(BIBLE[book]).length : '';
      const isRead = STATE.readDays.some(d => d.startsWith && d === dateKey()); // simplified
      el.innerHTML = `<span>${book}</span><span class="sb-ch-count">${chCount}</span>`;
      el.onclick = () => { openBibleChapter(book, 1); };
      sb.appendChild(el);
    });
  });
}

function openBibleChapter(book, ch) {
  bibleCurrentBook = book;
  bibleCurrentCh = parseInt(ch);

  // Save last position
  STATE.lastPosition[book] = ch;
  saveState('lastPosition');

  // Start reading session timer
  bibleReadingStart = Date.now();
  STATE.sessionBook = book;
  STATE.sessionCh = ch;

  // Navigate to bible page
  goTo('bible');

  if(typeof BIBLE !== 'undefined') {
    renderBibleSidebar(bibleSearchFilter);
    renderBibleChapter();
  }
}

function renderBibleChapter() {
  if(!bibleCurrentBook || typeof BIBLE === 'undefined') return;
  const bookData = BIBLE[bibleCurrentBook];
  if(!bookData) { document.getElementById('bibleMainArea').innerHTML = '<div style="padding:40px;text-align:center;color:var(--muted);">Book not available offline yet.</div>'; return; }

  const chapters = Object.keys(bookData).map(Number).sort((a,b)=>a-b);
  if(!chapters.includes(bibleCurrentCh)) bibleCurrentCh = chapters[0];

  const verses = bookData[bibleCurrentCh];
  const isRedLetterOn = STATE.settings.redLetter;
  const rlBook = RED_LETTER?.[bibleCurrentBook];
  const rlVerses = rlBook?.[bibleCurrentCh] || [];

  // Chapter summary
  const summaryKey = `${bibleCurrentBook}-${bibleCurrentCh}`;
  const summary = CHAPTER_SUMMARIES[summaryKey];

  // Book intro (show only on chapter 1)
  const intro = bibleCurrentCh === 1 ? BOOK_INTROS[bibleCurrentBook] : null;

  // Completion status
  const chKey = `${bibleCurrentBook}-${bibleCurrentCh}`;
  const isCompleted = STATE.readDays.includes(chKey);

  let html = `
    <div class="bible-topbar">
      <button class="bible-nav-btn" onclick="bibleNavCh(-1)" ${bibleCurrentCh<=chapters[0]?'disabled':''}>←</button>
      <div class="bible-book-ch">
        <span class="bible-book-name">${bibleCurrentBook}</span>
        <select class="bible-ch-select" onchange="bibleCurrentCh=+this.value;renderBibleChapter()">
          ${chapters.map(c=>`<option value="${c}"${c===bibleCurrentCh?' selected':''}>${c}</option>`).join('')}
        </select>
      </div>
      <button class="bible-nav-btn" onclick="bibleNavCh(1)" ${bibleCurrentCh>=chapters[chapters.length-1]?'disabled':''}>→</button>
      <div class="hl-toolbar">
        <span class="hl-legend-label">Highlight:</span>
        ${['yellow','blue','green','pink'].map(c=>`<div class="hl-dot hl-${c}${bibleActiveHlColor===c?' hl-active':''}" title="${hlMeaning(c)}" onclick="setHlColor('${c}',this)"></div>`).join('')}
        <button class="hl-clear-btn" onclick="showBibleSearch()">🔍</button>
      </div>
    </div>
    <div class="bible-reading-progress" id="bibleProgress"></div>`;

  // Book intro card
  if(intro) {
    html += `<div class="bible-intro-card">
      <div class="bible-intro-label">📚 About ${bibleCurrentBook}</div>
      <div class="bible-intro-meta">
        <span>✍️ ${intro.author}</span>
        <span>📅 ${intro.date}</span>
        <span>🎯 ${intro.theme}</span>
      </div>
      <div class="bible-intro-text">${intro.summary}</div>
    </div>`;
  }

  // Chapter summary card
  if(summary) {
    html += `<div class="bible-summary-card">
      <div class="bible-summary-label">⚡ Chapter ${bibleCurrentCh} at a Glance</div>
      <div class="bible-summary-text">${summary}</div>
    </div>`;
  }

  html += `<div class="bible-text-area" id="bibleTextArea">
    <div class="bible-ch-header">${bibleCurrentBook} ${bibleCurrentCh}</div>`;

  verses.forEach((text, i) => {
    const vn = i + 1;
    const key = `${bibleCurrentBook}-${bibleCurrentCh}-${vn}`;
    const hl = STATE.highlights[key] || '';
    const hasNote = !!STATE.notes[key];
    const isRL = isRedLetterOn && rlVerses.includes(vn);
    const tag = STATE.verseTags[key] || [];
    const isFlagged = STATE.iDontUnderstand.includes(key);
    if(!text) return;

    html += `<div class="vrow${hl?' hl-'+hl:''}${hasNote?' has-note':''}${isFlagged?' flagged':''}" 
      id="vrow-${vn}" 
      data-vn="${vn}"
      data-key="${key}"
      onclick="handleVerseClick(${vn},'${key}')"
      ondblclick="quickBookmark(${vn},'${key}')"
      oncontextmenu="return showVerseMenu(event,${vn},'${key}')">
      <span class="vnum">${vn}</span>
      <span class="vtxt${isRL?' red-letter':''}">${text}</span>
      <span class="vrow-indicators">
        ${hasNote?'<span class="vind vind-note" title="Has note">📝</span>':''}
        ${isFlagged?'<span class="vind vind-flag" title="Flagged">🚩</span>':''}
        ${tag.length?`<span class="vind vind-tag">#</span>`:''}
      </span>
    </div>`;
  });

  html += `</div>`;

  // Highlight legend
  html += `<div class="hl-legend">
    <div class="hl-legend-title">Highlight Key:</div>
    ${['yellow','blue','green','pink'].map(c=>`<span class="hl-legend-item"><span class="hl-dot-sm hl-${c}"></span>${hlMeaning(c)}</span>`).join('')}
  </div>`;

  // Chapter notes
  const chNote = STATE.chapterNotes[`${bibleCurrentBook}-${bibleCurrentCh}`] || '';
  html += `<div class="ch-notes-section">
    <div class="ch-notes-label">📝 Chapter Notes</div>
    <textarea class="input ch-notes-ta" placeholder="Write your thoughts on this chapter…" onchange="saveChapterNote(this.value)">${chNote}</textarea>
  </div>`;

  // Complete button + quiz
  html += `<div class="ch-complete-section">
    <button class="btn ${isCompleted?'btn-green':'btn-primary'} btn-full" onclick="markChapterRead('${bibleCurrentBook}',${bibleCurrentCh})">
      ${isCompleted ? '✓ Chapter Read' : 'Mark Chapter Read'}
    </button>
    <button class="btn btn-ghost btn-full" style="margin-top:8px;" onclick="showCompQuiz('${bibleCurrentBook} ${bibleCurrentCh}')">
      ✦ Take Comprehension Quiz
    </button>
  </div>`;

  html += `<div style="height:40px;"></div>`;

  document.getElementById('bibleMainArea').innerHTML = html;

  // Scroll to top
  document.getElementById('bibleReadingArea').scrollTop = 0;

  // Setup swipe between chapters
  setupChapterSwipe();

  // Setup reading progress bar
  setupReadingProgress();

  // Add long press to each verse row
  document.querySelectorAll('.vrow').forEach(row => {
    const vn = parseInt(row.dataset.vn);
    const key = row.dataset.key;
    addLongPress(row, () => showVerseMenu(null, vn, key));
  });
}

function hlMeaning(color) {
  return {yellow:'Promise',blue:'Command',green:'Encouragement',pink:'Conviction'}[color] || color;
}

function setHlColor(color, el) {
  bibleActiveHlColor = color;
  document.querySelectorAll('.hl-dot').forEach(d => d.classList.remove('hl-active'));
  if(el) el.classList.add('hl-active');
  showToast(`Highlight: ${hlMeaning(color)}`);
}

function handleVerseClick(vn, key) {
  // Toggle highlight
  if(STATE.highlights[key] === bibleActiveHlColor) {
    delete STATE.highlights[key];
  } else {
    STATE.highlights[key] = bibleActiveHlColor;
    addXP(2, 'Verse highlighted');
  }
  saveState('highlights');

  // Track most visited
  if(!STATE.readingSessions._verseVisits) STATE.readingSessions._verseVisits = {};
  STATE.readingSessions._verseVisits[key] = (STATE.readingSessions._verseVisits[key]||0)+1;

  // Update row
  const row = document.getElementById('vrow-' + vn);
  if(row) {
    const hl = STATE.highlights[key];
    row.className = 'vrow' + (hl?' hl-'+hl:'') + (STATE.notes[key]?' has-note':'') + (STATE.iDontUnderstand.includes(key)?' flagged':'');
  }

  haptic('light');
}

function quickBookmark(vn, key) {
  // Double tap = quick bookmark
  const exists = STATE.bookmarks.find(b => b.key === key);
  if(exists) {
    showToast('Already bookmarked!');
    return;
  }
  const verseEl = document.querySelector(`#vrow-${vn} .vtxt`);
  const text = verseEl ? verseEl.textContent.substring(0,60)+'…' : '';
  STATE.bookmarks.push({
    key,
    name: `${bibleCurrentBook} ${bibleCurrentCh}:${vn}`,
    book: bibleCurrentBook,
    ch: bibleCurrentCh,
    v: vn,
    text,
    date: new Date().toISOString(),
  });
  saveState('bookmarks');
  showToast('🔖 Bookmarked!');
  haptic('success');
  addXP(3, 'Verse bookmarked');
}

function showVerseMenu(e, vn, key) {
  if(e) e.preventDefault();
  const hl = STATE.highlights[key];
  const hasNote = !!STATE.notes[key];
  const isFlagged = STATE.iDontUnderstand.includes(key);
  const isBookmarked = STATE.bookmarks.some(b => b.key === key);

  document.getElementById('verseMenuRef').textContent = `${bibleCurrentBook} ${bibleCurrentCh}:${vn}`;

  const actions = document.getElementById('verseMenuActions');
  actions.innerHTML = `
    <button class="verse-menu-btn" onclick="handleVerseClick(${vn},'${key}');closeModal('verseMenuModal')">
      ${hl ? '✕ Remove Highlight' : '🎨 Highlight (' + hlMeaning(bibleActiveHlColor) + ')'}
    </button>
    <button class="verse-menu-btn" onclick="openNoteModal(${vn},'${key}')">
      ${hasNote ? '📝 Edit Note' : '📝 Add Note'}
    </button>
    <button class="verse-menu-btn" onclick="quickBookmark(${vn},'${key}');closeModal('verseMenuModal')">
      ${isBookmarked ? '🔖 Bookmarked' : '🔖 Bookmark'}
    </button>
    <button class="verse-menu-btn" onclick="copyVerse(${vn},'${key}')">
      📋 Copy Verse
    </button>
    <button class="verse-menu-btn" onclick="shareVerse(${vn},'${key}')">
      ↗ Share Verse
    </button>
    <button class="verse-menu-btn" onclick="showCrossRefs(${vn},'${key}')">
      🔗 Cross References
    </button>
    <button class="verse-menu-btn" onclick="toggleFlag(${vn},'${key}')">
      ${isFlagged ? '🚩 Remove Flag' : '🚩 Flag (Don\'t Understand)'}
    </button>
    <button class="verse-menu-btn" onclick="pinVerse(${vn},'${key}')">
      📌 Pin to Home
    </button>
  `;
  openModal('verseMenuModal');
  haptic('medium');
  return false;
}

function openNoteModal(vn, key) {
  bibleNoteKey = key;
  closeModal('verseMenuModal');
  document.getElementById('noteModalRef').textContent = `${bibleCurrentBook} ${bibleCurrentCh}:${vn}`;
  document.getElementById('noteModalTa').value = STATE.notes[key] || '';
  document.getElementById('noteDeleteBtn').style.display = STATE.notes[key] ? 'block' : 'none';
  openModal('noteModal');
  setTimeout(() => document.getElementById('noteModalTa').focus(), 100);
}

function saveNoteModal() {
  const key = bibleNoteKey;
  const txt = document.getElementById('noteModalTa').value.trim();
  if(txt) { STATE.notes[key] = txt; addXP(10, 'Note written'); }
  else delete STATE.notes[key];
  saveState('notes');
  closeModal('noteModal');
  renderBibleChapter();
  showToast(txt ? '📝 Note saved!' : 'Note removed.');
}

function deleteNoteModal() {
  if(!bibleNoteKey) return;
  delete STATE.notes[bibleNoteKey];
  saveState('notes');
  closeModal('noteModal');
  renderBibleChapter();
  showToast('Note deleted.');
}

function saveChapterNote(val) {
  const key = `${bibleCurrentBook}-${bibleCurrentCh}`;
  if(val.trim()) {
    STATE.chapterNotes[key] = val.trim();
    addXP(5, 'Chapter note written');
  } else {
    delete STATE.chapterNotes[key];
  }
  saveState('chapterNotes');
}

function copyVerse(vn, key) {
  const el = document.querySelector(`#vrow-${vn} .vtxt`);
  if(!el) return;
  const text = `"${el.textContent}" — ${bibleCurrentBook} ${bibleCurrentCh}:${vn} (WEB)`;
  navigator.clipboard.writeText(text).then(() => showToast('📋 Copied!'));
  closeModal('verseMenuModal');
}

function shareVerse(vn, key) {
  const el = document.querySelector(`#vrow-${vn} .vtxt`);
  if(!el) return;
  const text = `"${el.textContent}" — ${bibleCurrentBook} ${bibleCurrentCh}:${vn} (WEB)`;
  if(navigator.share) {
    navigator.share({text});
  } else {
    navigator.clipboard.writeText(text).then(() => showToast('Copied to share!'));
  }
  closeModal('verseMenuModal');
}

function showCrossRefs(vn, key) {
  closeModal('verseMenuModal');
  const refs = CROSS_REFS[`${bibleCurrentBook}-${bibleCurrentCh}-${vn}`];
  const el = document.getElementById('crossRefsContent');
  el.innerHTML = refs && refs.length
    ? refs.map(r => `<button class="btn btn-ghost btn-sm" style="margin:4px;" onclick="openRefFromCross('${r}')">${r} →</button>`).join('')
    : '<div style="color:var(--muted);font-size:0.85rem;">No cross-references available for this verse.</div>';
  document.getElementById('crossRefsTitle').textContent = `${bibleCurrentBook} ${bibleCurrentCh}:${vn}`;
  openModal('crossRefsModal');
}

function openRefFromCross(ref) {
  // Parse "Book ch:v" or "Book ch"
  const m = ref.match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
  if(!m) return;
  closeModal('crossRefsModal');
  openBibleChapter(m[1], parseInt(m[2]));
}

function toggleFlag(vn, key) {
  const idx = STATE.iDontUnderstand.indexOf(key);
  if(idx > -1) STATE.iDontUnderstand.splice(idx, 1);
  else STATE.iDontUnderstand.push(key);
  saveState('iDontUnderstand');
  closeModal('verseMenuModal');
  renderBibleChapter();
  showToast(idx > -1 ? 'Flag removed' : '🚩 Flagged for later');
}

function pinVerse(vn, key) {
  const el = document.querySelector(`#vrow-${vn} .vtxt`);
  if(!el) return;
  if(STATE.pinnedVerses.length >= 3) { showToast('Max 3 pinned verses'); return; }
  const ref = `${bibleCurrentBook} ${bibleCurrentCh}:${vn}`;
  if(STATE.pinnedVerses.some(v => v.ref === ref)) { showToast('Already pinned!'); return; }
  STATE.pinnedVerses.push({ref, text: el.textContent});
  saveState('pinnedVerses');
  closeModal('verseMenuModal');
  showToast('📌 Pinned to home!');
  haptic('success');
}

function markChapterRead(book, ch) {
  const key = `${book}-${ch}`;
  const dayKey2 = dateKey();

  // Track by chapter for completion map
  if(!STATE.readDays.includes(key)) {
    STATE.readDays.push(key);
    saveState('readDays');
    addXP(10, 'Chapter read');
    haptic('success');

    // Also mark today as a reading day
    if(!STATE.readDays.includes(dayKey2)) {
      STATE.readDays.push(dayKey2);
      checkStreak();
    }

    // Reading session
    if(bibleReadingStart) {
      const duration = Math.round((Date.now() - bibleReadingStart) / 1000);
      if(!STATE.readingSessions.sessions) STATE.readingSessions.sessions = [];
      STATE.readingSessions.sessions.push({
        date: new Date().toISOString(),
        book, ch, duration,
        highlights: Object.keys(STATE.highlights).filter(k=>k.startsWith(`${book}-${ch}-`)).length,
        notes: Object.keys(STATE.notes).filter(k=>k.startsWith(`${book}-${ch}-`)).length,
      });
      saveState('readingSessions');
      bibleReadingStart = null;

      showToast(`✓ Chapter read! +10 XP (${Math.round(duration/60)} min)`);
    } else {
      showToast('✓ Chapter marked as read! +10 XP');
    }
  } else {
    showToast('Already marked as read ✓');
  }

  renderBibleChapter();
}

function bibleNavCh(dir) {
  if(!bibleCurrentBook || typeof BIBLE === 'undefined') return;
  const chapters = Object.keys(BIBLE[bibleCurrentBook]).map(Number).sort((a,b)=>a-b);
  const idx = chapters.indexOf(bibleCurrentCh);
  const newIdx = idx + dir;
  if(newIdx >= 0 && newIdx < chapters.length) {
    bibleCurrentCh = chapters[newIdx];
    renderBibleChapter();
    haptic('light');
  }
}

function setupChapterSwipe() {
  const area = document.getElementById('bibleReadingArea');
  if(!area) return;
  new SwipeHandler(area, {
    onLeft: () => bibleNavCh(1),
    onRight: () => bibleNavCh(-1),
    minSwipe: 80,
  });
}

function setupReadingProgress() {
  const area = document.getElementById('bibleReadingArea');
  const bar = document.getElementById('bibleProgress');
  if(!area || !bar) return;
  area.addEventListener('scroll', () => {
    const total = area.scrollHeight - area.clientHeight;
    if(total <= 0) return;
    const pct = Math.round((area.scrollTop / total) * 100);
    bar.style.width = pct + '%';
  }, {passive:true});
}

function showBibleSearch() {
  openModal('bibleSearchModal');
  setTimeout(() => document.getElementById('bibleSearchInput').focus(), 100);
}

function doBibleSearch() {
  const q = document.getElementById('bibleSearchInput').value.trim().toLowerCase();
  if(!q || typeof BIBLE === 'undefined') return;
  const results = [];
  const words = q.split(' ');
  for(const book of ALL_BOOKS) {
    if(!BIBLE[book]) continue;
    for(const [ch, verses] of Object.entries(BIBLE[book])) {
      verses.forEach((text, i) => {
        if(!text) return;
        if(words.every(w => text.toLowerCase().includes(w))) {
          results.push({book, ch:parseInt(ch), v:i+1, text});
        }
      });
    }
    if(results.length >= 30) break;
  }
  const el = document.getElementById('bibleSearchResults');
  if(!results.length) { el.innerHTML = '<div style="color:var(--muted);text-align:center;padding:20px;">No results found.</div>'; return; }
  el.innerHTML = results.map(r => `
    <div class="search-result" onclick="closeModal('bibleSearchModal');openBibleChapter('${r.book}',${r.ch})">
      <div class="sr-ref">${r.book} ${r.ch}:${r.v}</div>
      <div class="sr-text">${r.text.replace(new RegExp(q,'gi'), m=>`<mark>${m}</mark>`)}</div>
    </div>`).join('') + (results.length>=30?'<div style="color:var(--muted);text-align:center;font-size:0.8rem;padding:10px;">Showing first 30 results</div>':'');
}

function showBookmarks() {
  const el = document.getElementById('bookmarksList');
  const bm = STATE.bookmarks;
  if(!bm.length) { el.innerHTML = '<div style="color:var(--muted);text-align:center;padding:20px;">No bookmarks yet. Double-tap any verse to bookmark it.</div>'; }
  else {
    el.innerHTML = bm.map((b,i) => `
      <div class="bm-item" onclick="closeModal('bookmarksModal');openBibleChapter('${b.book}',${b.ch})">
        <div class="bm-ref">${b.name}</div>
        <div class="bm-text">${b.text||''}</div>
        <div class="bm-date">${formatDate(b.date)}</div>
        <button class="bm-del" onclick="event.stopPropagation();deleteBookmark(${i})">✕</button>
      </div>`).join('');
  }
  openModal('bookmarksModal');
}

function deleteBookmark(i) {
  STATE.bookmarks.splice(i,1);
  saveState('bookmarks');
  showBookmarks();
  showToast('Bookmark removed');
}

function showFlaggedVerses() {
  const el = document.getElementById('flaggedList');
  const flags = STATE.iDontUnderstand;
  if(!flags.length) { el.innerHTML = '<div style="color:var(--muted);text-align:center;padding:20px;">No flagged verses yet. Tap any verse and flag it when you don\'t understand something.</div>'; }
  else {
    el.innerHTML = flags.map(key => {
      const [book,ch,v] = key.split('-');
      const text = (typeof BIBLE !== 'undefined' && BIBLE[book]?.[ch])?.[v-1] || '';
      return `<div class="bm-item" onclick="closeModal('flaggedModal');openBibleChapter('${book}',${ch})">
        <div class="bm-ref">${book} ${ch}:${v}</div>
        <div class="bm-text">${text.substring(0,100)}…</div>
        <button class="bm-del" onclick="event.stopPropagation();removeFlag('${key}')">✕</button>
      </div>`;
    }).join('');
  }
  openModal('flaggedModal');
}

function removeFlag(key) {
  const idx = STATE.iDontUnderstand.indexOf(key);
  if(idx>-1) STATE.iDontUnderstand.splice(idx,1);
  saveState('iDontUnderstand');
  showFlaggedVerses();
}

// ── COMPREHENSION QUIZ DATA ───────────────────────
const COMP_QUIZZES = {
  'Mark 1':{why:"Mark 1 launches Jesus's entire ministry — baptism, temptation, first miracles, first disciples. It sets the pace for the whole gospel: Jesus is powerful, urgent, and completely focused on God's mission.",qs:[{q:"What happened right after Jesus was baptized?",o:["Nothing special","The Spirit descended and God said 'You are my Son, whom I love'","Jesus healed a sick man","John refused to baptize Him"],a:1},{q:"How long was Jesus in the wilderness?",o:["7 days","1 year","40 days","3 months"],a:2},{q:"What was Jesus's first public message?",o:["Follow the law","'Repent, for the kingdom of God has come near'","Build a temple","Fast and pray"],a:1}]},
  'Mark 2':{why:"Jesus forgives sins — something only God can do. The religious leaders are furious. This chapter establishes who Jesus really is and why following Him requires a complete rethinking of everything.",qs:[{q:"Why did the men cut a hole in the roof?",o:["To steal something","No room — the crowd blocked the way to Jesus","The door was locked","Jesus told them to"],a:1},{q:"What did Jesus say to the paralyzed man first?",o:["'Get up and walk'","'Your faith has healed you'","'Your sins are forgiven'","'Follow me'"],a:2},{q:"Why did Jesus eat with sinners?",o:["He didn't know who they were","It's the sick who need a doctor, not the healthy","He was hungry","They paid Him"],a:1}]},
  'Mark 4':{why:"The parable of the sower is Jesus's most important parable — He says if you don't get this one you won't understand any of them. It's all about what kind of heart you bring to God's Word.",qs:[{q:"What does the seed represent?",o:["Money","God's Word","Prayer","Good deeds"],a:1},{q:"Which soil produced a good crop?",o:["Rocky soil","Path soil","Good soil","Thorny soil"],a:2},{q:"What do the thorns represent?",o:["Satan","Worries of life and desire for wealth","People who never heard the gospel","False teachers"],a:1}]},
  'Mark 8':{why:"The turning point of Mark. 'Who do you say I am?' is Jesus's question for every person alive. Peter's answer and Jesus's cross teaching shows what following Jesus actually costs — and why it's worth it.",qs:[{q:"Who did Peter say Jesus was?",o:["A prophet","Elijah","The Messiah","A great teacher"],a:2},{q:"What must anyone who follows Jesus do?",o:["Keep all the commandments","Deny themselves, take up their cross, follow Him","Give away everything","Be baptized immediately"],a:1},{q:"What profit is there in gaining the whole world?",o:["Great profit","You still lack peace","None — you lose your soul","You get closer to God"],a:2}]},
  'Mark 16':{why:"The resurrection is the foundation of everything. Without it, nothing else matters. But because it's true — because Jesus actually rose — every single promise He ever made is real and guaranteed.",qs:[{q:"Who went to the tomb first?",o:["Peter and John","Mary Magdalene and the other women","Joseph of Arimathea","All the disciples"],a:1},{q:"What did the young man in the tomb say?",o:["'He is still here'","'He has risen — He is not here'","'Wrong tomb'","'Come back in three days'"],a:1},{q:"What did Jesus command His followers to do after rising?",o:["Build temples","Go into all the world and preach the gospel","Stay in Jerusalem","Return home"],a:1}]},
  'Matthew 5':{why:"The Beatitudes flip every human instinct. The world says be strong, successful, popular. Jesus says the humble, the merciful, the pure in heart are the truly blessed ones. This is what God calls great.",qs:[{q:"What does Jesus say about those who are poor in spirit?",o:["They should pursue riches","Theirs is the kingdom of heaven","They need strengthening","They'll inherit the earth"],a:1},{q:"What does Jesus say about anger toward a brother?",o:["It's okay if they wronged you","It's the same as murder in God's eyes","Express it honestly","God will judge later"],a:1},{q:"How should we treat our enemies?",o:["Ignore them","Love them and pray for them","Avoid them","Expose them"],a:1}]},
  'Matthew 6':{why:"Matthew 6 gives us the Lord's Prayer as a template and Jesus's direct answer to worry. Every time Mateo feels anxious, the answer is right here in this chapter — straight from Jesus's mouth.",qs:[{q:"What does Jesus say about praying to be seen?",o:["Shows devotion","You already have your reward from people, not God","Fine if your heart is right","Same as private prayer"],a:1},{q:"After 'daily bread' what comes next in the Lord's Prayer?",o:["'Lead us not into temptation'","'Yours is the kingdom'","'Forgive us our debts as we forgive our debtors'","'Your kingdom come'"],a:2},{q:"What does Jesus say about worrying?",o:["Some worry is healthy","Can worry add a single hour to your life?","Worry shows you care","Big worries are okay"],a:1}]},
  'Matthew 7':{why:"Build your life on rock, not sand. The rock is hearing AND doing what Jesus says. Just knowing the Bible isn't enough — it has to change how you actually live. That's the whole point.",qs:[{q:"What does 'ask, seek, knock' promise?",o:["You get exactly what you want","Ask receive, seek find, knock opens","Only big requests answered","Prayer changes God's mind"],a:1},{q:"How do we recognize false prophets?",o:["By their words","By their appearance","By their fruit — what their life produces","By their popularity"],a:2},{q:"What is the house on rock compared to?",o:["Giving to the poor","Hearing AND putting Jesus's words into practice","Praying every day","Going to church"],a:1}]},
  'John 3':{why:"John 3:16 is the most famous verse in the Bible for a reason — it's the whole gospel in one sentence. But the context makes it even more powerful: Jesus is explaining what it means to be completely remade from the inside out.",qs:[{q:"Who came to Jesus at night?",o:["Zacchaeus","Nicodemus, a Pharisee","A blind man","A Roman soldier"],a:1},{q:"What does being 'born again' mean?",o:["Going back to infancy","Being born of water and the Spirit","Changing lifestyle","Being baptized"],a:1},{q:"Why did God send His Son according to John 3:17?",o:["To judge the world","To destroy sin","Not to condemn the world but to save it","To establish new law"],a:2}]},
  'John 10':{why:"Jesus says His sheep hear His voice, He knows them by name, and no one can snatch them from His hand. If Mateo ever feels lost or alone, this chapter is a direct personal promise from Jesus.",qs:[{q:"What does the good shepherd do that a hired hand won't?",o:["Better food","Lay down his life for the sheep","Better pastures","Name each sheep"],a:1},{q:"What does Jesus say about His sheep?",o:["Never face danger","They hear His voice and He knows them","Must earn their place","Always understand His teaching"],a:1},{q:"What does Jesus promise in verse 28?",o:["Answer every prayer","Eternal life — no one can snatch them from His hand","Return soon","Heal all sickness"],a:1}]},
  'John 14':{why:"'I am the way, the truth and the life' — there is a real path back to God and Jesus is it. Plus He promises the Holy Spirit so His followers are never alone. This chapter is one of the most comforting in all of scripture.",qs:[{q:"What does 'I am the way, the truth and the life' mean?",o:["Good moral teacher","No one comes to the Father except through Him","All paths lead to God","Religion is the way"],a:1},{q:"What does Jesus promise to send?",o:["Angels","The Holy Spirit — the Advocate","Another prophet","More disciples"],a:1},{q:"What do those who love Jesus do?",o:["Never suffer","Obey His commands","Perform miracles","Never doubt"],a:1}]},
  'Romans 8':{why:"Possibly the greatest chapter in the entire Bible. Starts with 'no condemnation' and ends with 'nothing can separate us from God's love.' Whatever Mateo faces — failure, doubt, hard times — this chapter is the direct answer.",qs:[{q:"What does Romans 8:1 say?",o:["We must earn God's approval","There is NOW no condemnation for those in Christ","We must keep the law","Sin separates us"],a:1},{q:"What does verse 28 promise?",o:["Everything easy","God works ALL things for good for those who love Him","No harm will come","Prayers always answered fast"],a:1},{q:"What can separate us from God's love?",o:["Sin","Death","Our failures","Absolutely nothing — not death, life, angels, or anything in creation"],a:3}]},
  'Ephesians 6':{why:"Ephesians 6 is the Armor of God — one of the most practical passages in the Bible. There's a real spiritual battle happening and God gives us real equipment. As a cornerback, Mateo knows you suit up before the game.",qs:[{q:"What is the sword of the Spirit?",o:["Prayer","Faith","The Word of God","Righteousness"],a:2},{q:"What is our struggle NOT against?",o:["Sin","Flesh and blood — but spiritual forces of evil","Temptation","False teachers"],a:1},{q:"What does verse 16 call the shield of faith?",o:["Our strength","Our protection","Something that extinguishes all the enemy's flaming arrows","Our identity"],a:2}]},
  'Psalms 23':{why:"The most memorized passage in the Bible. 'The Lord is my shepherd' means you're never lost, never without what you need, never alone. Even walking through 'the valley of the shadow of death' — God is right there.",qs:[{q:"What does 'green pastures' represent?",o:["Literal farming","God's rest and provision","Sleeping outside","Where God controls us"],a:1},{q:"What does the rod and staff do?",o:["Punishment","God's guidance and protection","A walking aid","Work tools"],a:1},{q:"What will follow the psalmist all his days?",o:["Trials","Goodness and love","Wealth","Quiet"],a:1}]},
  'Psalms 139':{why:"God knew Mateo before he was born, knows every thought before he thinks it, and has plans already written for his life. When the world says he's not enough — this chapter says God couldn't disagree more.",qs:[{q:"What does God know according to verse 2?",o:["Name and family","When he sits, rises, and his thoughts from afar","Future only","His sins"],a:1},{q:"What does verse 14 say about how we're made?",o:["In God's image","Fearfully and wonderfully made","From dust","For a purpose"],a:1},{q:"Can we hide from God's presence?",o:["Yes, far enough","No — dark and light are the same to God","Only in death","In our minds"],a:1}]},
  'James 1':{why:"James doesn't say avoid trials — he says consider them pure joy because they build endurance, which builds character, which builds unshakeable faith. Every hard season in Mateo's life is doing something in him.",qs:[{q:"What should we do when we face trials?",o:["Ask God to remove them","Consider it pure joy — they develop endurance","Avoid them","Pray they end fast"],a:1},{q:"How should we ask God for wisdom?",o:["Only educated get wisdom","Ask God who gives generously — but without doubting","Wisdom only through suffering","Read more scripture first"],a:1},{q:"What does James say about hearing vs doing?",o:["Hearing is most important","Doing is most important","Don't just listen — do what it says, or you forget it like your face in a mirror","Both equally important"],a:2}]},
  'default':{why:"Every chapter of the Bible is worth reflecting on. Ask yourself: What does this tell me about who God is? What does it say about who I am? And what is one thing I want to do differently because of it?",qs:[{q:"What stood out most to you in this passage?",o:["A promise from God","A command to follow","Something about Jesus","Something that challenged me"],a:-1},{q:"How does this apply to your life right now?",o:["Encourages something I'm going through","Challenges something I'm doing","Teaches me something new about God","Gives me something to pray about"],a:-1},{q:"What's one thing you want to remember?",o:["A specific verse","A story or example","A promise to hold onto","Something to act on this week"],a:-1}]}
};

let cqPassage = null, cqAnswers = {};

function showCompQuiz(passage) {
  cqPassage = passage; cqAnswers = {};
  const data = COMP_QUIZZES[passage] || COMP_QUIZZES['default'];
  document.getElementById('cqTitle').textContent = passage;
  document.getElementById('cqPassage').textContent = 'You just finished ' + passage + ' — let\'s see what stuck!';
  const qc = document.getElementById('cqQuestions'); qc.innerHTML = '';
  data.qs.forEach((q, qi) => {
    const div = document.createElement('div');
    div.className = 'cq-question';
    div.innerHTML = `<p>${qi+1}. ${q.q}</p><div class="cq-options" id="cqo-${qi}"></div>`;
    qc.appendChild(div);
    q.o.forEach((opt, oi) => {
      const btn = document.createElement('div');
      btn.className = 'cq-opt';
      btn.textContent = opt;
      btn.onclick = () => {
        document.querySelectorAll(`#cqo-${qi} .cq-opt`).forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        cqAnswers[qi] = oi;
      };
      document.getElementById('cqo-'+qi).appendChild(btn);
    });
  });
  document.getElementById('cqResult').style.display = 'none';
  document.getElementById('cqSubmitBtn').style.display = 'block';
  openModal('compQuizModal');
}

function submitCompQuiz() {
  const data = COMP_QUIZZES[cqPassage] || COMP_QUIZZES['default'];
  if(Object.keys(cqAnswers).length < data.qs.length) { showToast('Answer all 3 questions first!'); return; }
  let score = 0;
  data.qs.forEach((q, qi) => {
    const opts = document.querySelectorAll(`#cqo-${qi} .cq-opt`);
    opts.forEach((btn, oi) => {
      btn.classList.remove('selected');
      if(q.a === -1) { if(oi === cqAnswers[qi]) btn.classList.add('correct'); }
      else { if(oi === q.a) btn.classList.add('correct'); else if(oi === cqAnswers[qi]) btn.classList.add('wrong'); }
    });
    if(q.a === -1 || cqAnswers[qi] === q.a) score++;
  });
  document.getElementById('cqSubmitBtn').style.display = 'none';
  const res = document.getElementById('cqResult');
  res.style.display = 'block';
  const em = score===3?'🔥 Perfect!':score===2?'✓ Good work!':'📖 Keep studying!';
  const xpEarned = score * 15;
  addXP(xpEarned, 'Quiz completed');
  res.innerHTML = `<div style="font-weight:500;color:var(--gold);margin-bottom:8px;">${em} ${COMP_QUIZZES[cqPassage]?score+'/3':''} (+${xpEarned} XP)</div>
    <div style="background:var(--gold-dim);border:1px solid rgba(212,168,67,.2);border-radius:8px;padding:12px;font-size:0.86rem;line-height:1.65;">${data.why}</div>`;
}
