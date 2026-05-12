/* ═══════════════════════════════════════════════
   MATEO'S FAITH HUB — DEVOTIONALS
   Stage 7: Character profiles, WWJD, athlete devos
═══════════════════════════════════════════════ */

// ── BIBLE CHARACTER PROFILES ──────────────────────
const BIBLE_CHARACTERS = [
  {
    name:'David',
    emoji:'👑',
    role:'King, Warrior, Poet',
    summary:'A shepherd boy who became the greatest king of Israel. He killed Goliath when everyone else was afraid, wrote most of the Psalms, and was called "a man after God\'s own heart" — yet he also committed adultery and murder. His story is about what God can do with someone who is genuinely repentant and fully surrendered.',
    struggles:'Pride, lust, poor parenting, running from consequences',
    strengths:'Courage, worship, repentance, loyalty',
    keyVerse:'1 Samuel 13:14 — "A man after God\'s own heart."',
    forMateo:'David was an athlete before he was a king — explosive, physical, fiercely competitive. He also failed spectacularly. His life proves that your worst moments don\'t disqualify you from God\'s calling.',
    chapters:[{book:'1 Samuel',ch:17,label:'David vs Goliath'},{book:'Psalms',ch:51,label:'After his worst failure'},{book:'Psalms',ch:23,label:'His most famous psalm'}],
  },
  {
    name:'Paul',
    emoji:'✍️',
    role:'Apostle, Missionary, Writer',
    summary:'Paul spent the first part of his life killing Christians — he watched Stephen get stoned and approved of it. Then Jesus appeared to him on a road, blinded him, and completely wrecked his life in the best way possible. He went on to write 13 books of the New Testament, plant churches across the Roman Empire, and die for the faith he once tried to destroy.',
    struggles:'Pride ("chief of sinners"), a mysterious "thorn in the flesh", imprisonment',
    strengths:'Intellectual brilliance, relentless drive, total surrender to mission',
    keyVerse:'Philippians 4:13 — "I can do all things through Christ who strengthens me."',
    forMateo:'Paul was the kind of guy who went all-in on everything — first persecuting Christians, then advancing the gospel. That intensity, when surrendered to God, is exactly what God uses. Your competitiveness is an asset.',
    chapters:[{book:'Acts',ch:9,label:'Paul\'s conversion'},{book:'Philippians',ch:4,label:'Joy from prison'},{book:'Romans',ch:8,label:'His greatest chapter'}],
  },
  {
    name:'Peter',
    emoji:'🪨',
    role:'Disciple, Leader, Preacher',
    summary:'Peter was loud, impulsive, and constantly putting his foot in his mouth. He walked on water — then sank. He declared he\'d die for Jesus — then denied Him three times. But after the resurrection, Jesus specifically sought him out, restored him, and he became the foundational leader of the early church. Peter preached one sermon and 3,000 people were saved.',
    struggles:'Impulsiveness, fear of man, inconsistency',
    strengths:'Boldness, passion, loyalty, authentic faith',
    keyVerse:'Matthew 16:18 — "On this rock I will build my church."',
    forMateo:'Peter is the disciple most people relate to — intense, flawed, passionate, and constantly needing to get back up. His story says your failures don\'t define you. What you do after them does.',
    chapters:[{book:'Matthew',ch:14,label:'Walking on water'},{book:'John',ch:21,label:'Restoration after denial'},{book:'Acts',ch:2,label:'His greatest moment'}],
  },
  {
    name:'Moses',
    emoji:'🌊',
    role:'Deliverer, Lawgiver, Prophet',
    summary:'Moses was raised in the palace of the most powerful nation on earth, then spent 40 years as a nobody shepherd in the desert, then spent another 40 leading 2 million people through the wilderness. He met God in a burning bush, parted the Red Sea, and received the Ten Commandments — yet described himself as "not eloquent" and begged God to send someone else.',
    struggles:'Anger (killed a man, struck the rock), insecurity, feeling inadequate',
    strengths:'Humility, intercession, perseverance, intimacy with God',
    keyVerse:'Exodus 33:11 — "The Lord would speak to Moses face to face, as one speaks to a friend."',
    forMateo:'Moses was insecure about speaking in public. God\'s response wasn\'t "you\'re actually great at it." It was "I will be with you." God doesn\'t call the equipped — He equips the called.',
    chapters:[{book:'Exodus',ch:3,label:'The burning bush'},{book:'Exodus',ch:14,label:'Parting the Red Sea'},{book:'Deuteronomy',ch:34,label:'His final days'}],
  },
  {
    name:'Joseph',
    emoji:'🎨',
    role:'Dreamer, Slave, Prime Minister',
    summary:'Joseph\'s brothers threw him in a pit and sold him into slavery when he was 17. He was then falsely accused and thrown in prison for years. At every point where his story could have gone right, it got worse. Then in one day, at age 30, he went from prison to second-in-command of all of Egypt — and used that position to save his family, including the brothers who betrayed him.',
    struggles:'Pride in youth, years of unjust suffering, loneliness',
    strengths:'Integrity under pressure, forgiveness, long-range faith',
    keyVerse:'Genesis 50:20 — "You intended to harm me, but God intended it for good."',
    forMateo:'Joseph had 13 years between the dream and the fulfillment. Everything in between looked like failure. If you\'re in a waiting season — new school, new team, trying to prove yourself — Joseph\'s story is for you.',
    chapters:[{book:'Genesis',ch:37,label:'Betrayed by his brothers'},{book:'Genesis',ch:39,label:'Integrity in the hard place'},{book:'Genesis',ch:50,label:'The great reversal'}],
  },
  {
    name:'Elijah',
    emoji:'⚡',
    role:'Prophet, Man of Fire',
    summary:'Elijah called down fire from heaven, outran a chariot, and single-handedly confronted 450 false prophets. Then, after his greatest victory, he ran into the desert and asked God to let him die because he was so exhausted and afraid. God\'s response wasn\'t a rebuke. It was food, sleep, and gentleness.',
    struggles:'Burnout, depression, isolation, feeling like the only faithful one left',
    strengths:'Bold prayer, radical obedience, fearlessness in confronting evil',
    keyVerse:'1 Kings 19:12 — "After the fire came a still small voice."',
    forMateo:'Elijah burned out after his biggest win. Athletes know this — the emotional crash after a peak performance. God\'s response to Elijah\'s breakdown was compassion, not disappointment.',
    chapters:[{book:'1 Kings',ch:18,label:'Fire from heaven'},{book:'1 Kings',ch:19,label:'The burnout and the still small voice'}],
  },
];

// ── WWJD SCENARIOS ────────────────────────────────
const WWJD_SCENARIOS = [
  {
    scenario: "Someone on your team is talking trash about a player on the other team before the game. Everyone is laughing and joining in.",
    question: "What would Jesus do?",
    answer: "Jesus was intense but never cruel. He'd probably stay quiet or redirect the energy — 'Let's worry about our own game.' Proverbs 11:12 says 'Whoever derides their neighbor has no sense, but the one who has understanding holds their tongue.' The goal is to compete hard, not tear someone down.",
    verse: "Proverbs 11:12",
    action: "Next time this happens, say nothing. That itself is a statement.",
  },
  {
    scenario: "You find out a friend is sharing something online that's completely wrong about another person. It's going viral in your school.",
    question: "What would Jesus do?",
    answer: "Jesus defended people others were ready to condemn. He'd go to the friend privately first (Matthew 18:15 — 'go and tell him his fault between you and him alone'). Not a public callout, not silence. A direct, private conversation that gives them a chance to make it right.",
    verse: "Matthew 18:15",
    action: "Text or talk to the friend directly. 'Hey, I don't think that's accurate — you should take it down.'",
  },
  {
    scenario: "You're at a party and people start doing stuff you know you shouldn't be part of. Your friends want to stay.",
    question: "What would Jesus do?",
    answer: "Jesus went to parties — he turned water into wine at one. But he never compromised who He was to fit in. Daniel 1 shows someone who held the line with zero drama and came out better for it. You don't have to make a scene. You can just leave.",
    verse: "Daniel 1:8",
    action: "Have an exit plan before you go anywhere. It's easier to leave when you decide before you're in the moment.",
  },
  {
    scenario: "You made a huge mistake — said something or did something that hurt someone you care about. You're embarrassed and want to avoid them.",
    question: "What would Jesus do?",
    answer: "Jesus told a story about a son who wasted everything and came home in shame — and the father ran to him before he could even finish his apology. The culture of Jesus is restoration, not avoidance. Go to the person. Say what you did wrong. Don't minimize it. Matthew 5:23-24 says to go make things right before you even come to worship.",
    verse: "Matthew 5:23-24",
    action: "Don't wait. The longer you wait the harder it gets. Go today.",
  },
  {
    scenario: "A new student shows up at school and it's clear they don't fit in. People are ignoring or mocking them.",
    question: "What would Jesus do?",
    answer: "Every time Jesus encountered someone who was excluded — Zacchaeus the tax collector, the woman at the well, the leper — He went toward them, not away. He initiated. Luke 19:5 — Jesus saw Zacchaeus in the tree and said 'I must stay at your house today.' He didn't wait to see if it was socially acceptable.",
    verse: "Luke 19:5",
    action: "Introduce yourself. Ask one question. That's it. You don't have to fix anything — just acknowledge them.",
  },
  {
    scenario: "Your coach makes a decision you completely disagree with — you're not starting, or a play call you think is wrong. You're angry.",
    question: "What would Jesus do?",
    answer: "Jesus submitted to authority He could have overruled. He honored His parents (Luke 2:51) and paid taxes He technically shouldn't have owed. Colossians 3:23 says whatever you do, work at it with all your heart — not 'as long as you agree with the coaching staff.' Work hard, be coachable, speak respectfully if given the chance. The athletes coaches trust most are the ones who compete like it matters regardless.",
    verse: "Colossians 3:23",
    action: "Show up to the next practice as if you're starting. Earn it through your response.",
  },
];

// ── ATHLETE DEVOTIONALS ───────────────────────────
const ATHLETE_DEVOS = [
  {
    id:'ad1',
    title:'The Short Memory',
    tag:'Cornerback Life',
    emoji:'🏈',
    verse:'Philippians 3:13',
    verseText:'"Forgetting what is behind and straining toward what is ahead."',
    content:"Every cornerback knows the rule: if you get beat, you have to forget it immediately. You can't play the next play with the last one in your head. Paul writes from prison about 'forgetting what is behind' — not pretending it didn't happen, but refusing to let it determine what comes next. Your greatest asset as a corner isn't your speed or your hands. It's your amnesia. God built that into the position.",
    action:"Next time you get beat on a play — in football or in life — say out loud: 'Next play.' Then actually play the next play.",
  },
  {
    id:'ad2',
    title:'Coachable',
    tag:'Character',
    emoji:'📋',
    verse:'Proverbs 12:1',
    verseText:'"Whoever loves discipline loves knowledge, but whoever hates correction is stupid."',
    content:"Solomon doesn't sugarcoat it. The players who get better are the ones who can hear 'you're doing this wrong' and say 'show me.' Pride makes us defensive when coaches correct us. The best athletes in the world are obsessively coachable — not because they're weak, but because they want to win more than they want to be right. God works the same way with us.",
    action:"At your next practice, when you get corrected, say 'got it' and immediately try to apply it — no excuses, no explanation.",
  },
  {
    id:'ad3',
    title:'Why You Play',
    tag:'Motivation',
    emoji:'🎯',
    verse:'Colossians 3:23',
    verseText:'"Whatever you do, work at it with all your heart, as working for the Lord."',
    content:"There will be games nobody comes to. Practices that feel pointless. Moments when the scoreboard makes the effort seem worthless. Colossians 3:23 reframes everything: you're not playing for the stat line, the coaches, the scholarship, or the crowd. You're playing for an audience of one. That motivation never runs dry because it doesn't depend on circumstances.",
    action:"Before your next practice, say this: 'I'm doing this for You.' See if it changes how you warm up.",
  },
  {
    id:'ad4',
    title:'Winning with Humility',
    tag:'Character',
    emoji:'🏆',
    verse:'Proverbs 16:18',
    verseText:'"Pride goes before destruction, a haughty spirit before a fall."',
    content:"Goliath was trash-talking before David threw the stone. He was confident based on his size, his armor, his record. David was confident based on something completely different — 'the battle is the Lord\'s.' The most dangerous moment for an athlete isn\'t after a loss. It\'s after a big win, when you start to believe the hype. Stay hungry. Stay humble. The two aren\'t opposites.",
    action:"After your next win, congratulate the other team genuinely. One sentence. That's it.",
  },
  {
    id:'ad5',
    title:'When You\'re Not Starting',
    tag:'Hard Stuff',
    emoji:'😤',
    verse:'Romans 5:3-4',
    verseText:'"We also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope."',
    content:"Being on the bench is one of the hardest places to maintain your character. It\'s easy to be a great teammate when you\'re playing. The depth of your character shows when you\'re cheering for the guy playing your position. Paul says suffering produces perseverance. You can\'t develop perseverance without something to persevere through. The bench might be the most important training ground you\'ve ever been on.",
    action:"If you\'re not starting right now, be the loudest supporter of the person who is. That\'s not weakness — that\'s leadership.",
  },
  {
    id:'ad6',
    title:'Pre-Game Prayer That Actually Works',
    tag:'Prayer',
    emoji:'🙏',
    verse:'Psalm 18:32',
    verseText:'"It is God who arms me with strength and keeps my way secure."',
    content:"Don\'t pray for your team to win. Pray to play with everything you have. Pray to represent yourself with character. Pray for protection for both teams. Pray that your effort is an act of worship. God isn\'t a cosmic equipment manager you summon before kickoff. He\'s the one who made you fast, gave you instincts, and put the game in front of you. Talk to Him like that.",
    action:"Before your next game, spend 2 minutes alone. Not asking for a win. Just acknowledging that this moment, this body, this ability — it\'s His.",
  },
];

// ── STATE ─────────────────────────────────────────
let selectedCharacter = null;
let currentWWJD = 0;
let wwjdRevealed = false;
let currentDevo = null;

// ── RENDER DEVOTIONS PAGE ─────────────────────────
function renderDevotionsPage() {
  // Default to showing the character grid
}

// ── BIBLE CHARACTER PROFILES ──────────────────────
function renderCharacterGrid() {
  const el = document.getElementById('characterGrid');
  if(!el) return;
  el.innerHTML = BIBLE_CHARACTERS.map(c => `
    <div class="char-card" onclick="openCharacter('${c.name}')">
      <div class="char-emoji">${c.emoji}</div>
      <div class="char-name">${c.name}</div>
      <div class="char-role">${c.role}</div>
    </div>`).join('');
}

function openCharacter(name) {
  const c = BIBLE_CHARACTERS.find(x => x.name === name);
  if(!c) return;
  selectedCharacter = c;

  const el = document.getElementById('characterDetail');
  if(!el) return;

  el.innerHTML = `
    <div style="text-align:center;margin-bottom:20px;">
      <div style="font-size:3rem;margin-bottom:8px;">${c.emoji}</div>
      <div style="font-family:'Cinzel',serif;font-size:1.3rem;color:var(--gold);">${c.name}</div>
      <div style="font-size:0.78rem;color:var(--muted);margin-top:4px;">${c.role}</div>
    </div>

    <div class="char-detail-section">
      <div class="cds-label">Who Was He?</div>
      <div class="cds-text">${c.summary}</div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
      <div class="char-detail-section">
        <div class="cds-label">Struggled With</div>
        <div class="cds-text" style="color:var(--red);">${c.struggles}</div>
      </div>
      <div class="char-detail-section">
        <div class="cds-label">Known For</div>
        <div class="cds-text" style="color:var(--green);">${c.strengths}</div>
      </div>
    </div>

    <div class="char-detail-section" style="background:rgba(212,168,67,0.07);border-color:rgba(212,168,67,0.2);">
      <div class="cds-label">Key Verse</div>
      <div class="cds-text" style="font-family:'Crimson Pro',serif;font-style:italic;">${c.keyVerse}</div>
    </div>

    <div class="char-detail-section" style="background:rgba(91,143,168,0.07);border-color:rgba(91,143,168,0.2);">
      <div class="cds-label">For You, Mateo</div>
      <div class="cds-text">${c.forMateo}</div>
    </div>

    <div class="cds-label" style="margin-bottom:8px;">Read His Story</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      ${c.chapters.map(ch =>
        `<button class="btn btn-ghost btn-sm" onclick="closeModal('characterModal');openBibleChapter('${ch.book}',${ch.ch})">${ch.label} →</button>`
      ).join('')}
    </div>`;

  openModal('characterModal');
}

// ── WWJD SCENARIOS ────────────────────────────────
function renderWWJD() {
  const el = document.getElementById('wwjdContent');
  if(!el) return;

  const s = WWJD_SCENARIOS[currentWWJD];
  wwjdRevealed = false;

  el.innerHTML = `
    <div class="wwjd-counter">${currentWWJD+1} of ${WWJD_SCENARIOS.length}</div>
    <div class="wwjd-scenario">${s.scenario}</div>
    <div class="wwjd-question">${s.question}</div>

    <div id="wwjdAnswer" style="display:none;">
      <div class="wwjd-answer">${s.answer}</div>
      <div class="wwjd-verse-tag">📖 ${s.verse}</div>
      <div class="wwjd-action">
        <div class="wwjd-action-label">Your Move →</div>
        <div class="wwjd-action-text">${s.action}</div>
      </div>
    </div>

    <div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap;">
      <button class="btn btn-primary" id="wwjdRevealBtn" onclick="revealWWJD()">What Would Jesus Do?</button>
      <button class="btn btn-ghost btn-sm" onclick="nextWWJD()">Next →</button>
    </div>`;
}

function revealWWJD() {
  document.getElementById('wwjdAnswer').style.display = 'block';
  document.getElementById('wwjdRevealBtn').style.display = 'none';
  wwjdRevealed = true;
  addXP(10, 'WWJD scenario completed');
}

function nextWWJD() {
  currentWWJD = (currentWWJD + 1) % WWJD_SCENARIOS.length;
  renderWWJD();
}

// ── ATHLETE DEVOTIONALS ───────────────────────────
function renderAthleteDevo(id) {
  const devo = id ? ATHLETE_DEVOS.find(d => d.id === id) : ATHLETE_DEVOS[new Date().getDate() % ATHLETE_DEVOS.length];
  if(!devo) return;
  currentDevo = devo;

  const el = document.getElementById('devoContent');
  if(!el) return;

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
      <span style="font-size:1.8rem;">${devo.emoji}</span>
      <div>
        <div style="font-family:'Cinzel',serif;font-size:1rem;color:var(--text);">${devo.title}</div>
        <div style="font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);">${devo.tag}</div>
      </div>
    </div>
    <div style="background:rgba(212,168,67,0.07);border:1px solid rgba(212,168,67,0.2);border-radius:8px;padding:14px;margin-bottom:14px;">
      <div style="font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:6px;">${devo.verse}</div>
      <div style="font-family:'Crimson Pro',serif;font-size:1.08rem;font-style:italic;line-height:1.6;color:var(--text);">${devo.verseText}</div>
    </div>
    <div style="font-size:0.95rem;color:var(--text2);line-height:1.75;margin-bottom:16px;">${devo.content}</div>
    <div style="background:var(--surface2);border-left:3px solid var(--gold);padding:12px 14px;border-radius:0 8px 8px 0;">
      <div style="font-size:0.62rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin-bottom:5px;">🎯 Do This Today</div>
      <div style="font-size:0.88rem;color:var(--text);">${devo.action}</div>
    </div>`;

  openModal('devoModal');
  addXP(10, 'Devotional read');
}

function renderDevoList() {
  const el = document.getElementById('devoList');
  if(!el) return;
  el.innerHTML = ATHLETE_DEVOS.map(d => `
    <div class="devo-card" onclick="renderAthleteDevo('${d.id}')">
      <span style="font-size:1.3rem;">${d.emoji}</span>
      <div style="flex:1;">
        <div style="font-size:0.9rem;font-weight:500;color:var(--text);margin-bottom:2px;">${d.title}</div>
        <div style="font-size:0.7rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--gold);">${d.tag}</div>
      </div>
      <span style="color:var(--muted);font-size:0.8rem;">→</span>
    </div>`).join('');
}
