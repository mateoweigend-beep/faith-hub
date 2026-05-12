/* ═══════════════════════════════════════════════
   MATEO'S FAITH HUB — TOOLS
   Stage 8: Search, Temptation Toolkit, Life Verse,
            Spiritual Gifts, Reading Plan, Polish
═══════════════════════════════════════════════ */

// ── TEMPTATION TOOLKIT ────────────────────────────
const TEMPTATION_DATA = {
  anger: {
    icon:'😤', label:'Anger',
    truth:"Anger itself isn't sin — Jesus got angry. But uncontrolled anger destroys relationships and your own peace. The battle is in the first 3 seconds.",
    verses:[
      {ref:'James 1:19-20', text:'"Be quick to listen, slow to speak and slow to become angry, because human anger does not produce the righteousness that God desires."'},
      {ref:'Proverbs 15:1', text:'"A gentle answer turns away wrath, but a harsh word stirs up anger."'},
      {ref:'Ephesians 4:26', text:'"In your anger do not sin: Do not let the sun go down while you are still angry."'},
    ],
    steps:["Pause. Don't respond in the first 3 seconds.","Ask: will this matter in a year? In 5 years?","Pray before you respond, not after.","Speak about how YOU feel, not what THEY did.","If you blow it — go back and repair it fast."],
  },
  pride: {
    icon:'😏', label:'Pride',
    truth:"Pride is sneaky — it hides behind confidence, performance, and success. The test: can you celebrate someone else's win as genuinely as your own?",
    verses:[
      {ref:'Proverbs 16:18', text:'"Pride goes before destruction, a haughty spirit before a fall."'},
      {ref:'Philippians 2:3', text:'"Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves."'},
      {ref:'James 4:6', text:'"God opposes the proud but shows favor to the humble."'},
    ],
    steps:["Ask: am I doing this for God's glory or my own reputation?","Celebrate someone else's success out loud today.","Confess pride to God when you notice it — don't wait.","Remember: every talent, every ability, every opportunity came from God.","Find one person to genuinely serve with nothing in return."],
  },
  lust: {
    icon:'🔥', label:'Lust',
    truth:"Your generation faces more sexual temptation than any in history — it's on your phone, everywhere. Purity isn't about being perfect. It's about fighting.",
    verses:[
      {ref:'1 Corinthians 6:18', text:'"Flee from sexual immorality."'},
      {ref:'Psalm 119:9', text:'"How can a young person stay on the path of purity? By living according to your word."'},
      {ref:'Job 31:1', text:'"I made a covenant with my eyes not to look lustfully."'},
    ],
    steps:["Don't fight this alone — tell a trusted adult or accountability partner.","Put filters on your devices (Covenant Eyes, etc.).","When tempted, physically move — get up, go somewhere.","Memorize Psalm 119:9 and say it out loud in the moment.","Fill your mind proactively with good things — the vacuum will be filled by something."],
  },
  jealousy: {
    icon:'💚', label:'Jealousy',
    truth:"Jealousy is rooted in believing God made a mistake — that He gave someone else something you deserved more. It's ultimately a trust issue.",
    verses:[
      {ref:'Proverbs 14:30', text:'"A heart at peace gives life to the body, but envy rots the bones."'},
      {ref:'1 Corinthians 13:4', text:'"Love does not envy, it does not boast."'},
      {ref:'Philippians 4:11', text:'"I have learned to be content whatever the circumstances."'},
    ],
    steps:["Name what you're jealous of out loud or in your journal.","Ask: what does this jealousy tell me I'm believing about God?","Pray for the person you're jealous of — genuinely.","List 5 things God has specifically given YOU.","Practice saying 'I'm happy for you' and meaning it."],
  },
  laziness: {
    icon:'😴', label:'Laziness',
    truth:"Laziness is actually a faith issue — it says 'my comfort right now matters more than what God has for me.' Discipline is a form of worship.",
    verses:[
      {ref:'Proverbs 6:6', text:'"Go to the ant, you sluggard; consider its ways and be wise!"'},
      {ref:'Colossians 3:23', text:'"Whatever you do, work at it with all your heart, as working for the Lord."'},
      {ref:'2 Thessalonians 3:10', text:'"The one who is unwilling to work shall not eat."'},
    ],
    steps:["Start with 2 minutes. Just start.","Remove the friction — lay out your stuff the night before.","Find your 'why' — who are you working hard FOR?","Build a routine so discipline becomes automatic.","Reward yourself after, not before."],
  },
  fear: {
    icon:'😨', label:'Fear & Anxiety',
    truth:"Fear is the enemy's favorite tool. It's almost always about the future — something that hasn't happened yet. God's antidote is always presence, not circumstance.",
    verses:[
      {ref:'Isaiah 41:10', text:'"Do not fear, for I am with you; do not be dismayed, for I am your God."'},
      {ref:'Philippians 4:6-7', text:'"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."'},
      {ref:'2 Timothy 1:7', text:'"For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline."'},
    ],
    steps:["Name the specific fear — vague fear is scarier than named fear.","Ask: what's the worst realistic outcome? Can I survive that with God?","Pray specifically about the fear, not generally.","Replace 'what if it goes wrong' with 'what if God comes through?'","Take one small action toward the thing you fear."],
  },
  doubt: {
    icon:'🤔', label:'Doubt',
    truth:"Doubt isn't the opposite of faith — certainty is. Faith means trusting in the presence of uncertainty. Jesus never condemned Thomas for doubting. He showed up.",
    verses:[
      {ref:'Mark 9:24', text:'"I do believe; help me overcome my unbelief!"'},
      {ref:'Hebrews 11:1', text:'"Faith is confidence in what we hope for and assurance about what we do not see."'},
      {ref:'John 20:27', text:'"Stop doubting and believe."'},
    ],
    steps:["Write the specific doubt down — don't leave it as a vague cloud.","Bring it to God honestly. He can handle your questions.","Ask your pastor or a trusted adult about it.","Look at the evidence that God has already shown up in your life.","Keep going even while you doubt — faith is action, not feeling."],
  },
};

// ── LIFE VERSE FINDER ─────────────────────────────
const LIFE_VERSE_QUESTIONS = [
  {
    q: "When life gets hard, what do you need most?",
    opts: [
      {label:"To know God is with me", tag:"presence"},
      {label:"Strength to keep going", tag:"endurance"},
      {label:"Peace and calm", tag:"peace"},
      {label:"Direction for what to do", tag:"wisdom"},
    ]
  },
  {
    q: "What's your biggest challenge right now?",
    opts: [
      {label:"Fear or anxiety", tag:"peace"},
      {label:"Feeling like I'm not enough", tag:"identity"},
      {label:"Not knowing my purpose", tag:"purpose"},
      {label:"Staying pure and disciplined", tag:"strength"},
    ]
  },
  {
    q: "What do you want your life to be about?",
    opts: [
      {label:"Loving people well", tag:"love"},
      {label:"Being used by God for something big", tag:"purpose"},
      {label:"Being known for my integrity", tag:"character"},
      {label:"Having deep faith and wisdom", tag:"wisdom"},
    ]
  },
  {
    q: "What word best describes the man you want to become?",
    opts: [
      {label:"Fearless", tag:"courage"},
      {label:"Faithful", tag:"faith"},
      {label:"Humble", tag:"character"},
      {label:"Powerful", tag:"strength"},
    ]
  },
];

const LIFE_VERSE_RESULTS = {
  presence: {ref:"Joshua 1:9", text:"Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", why:"You need to know you're never alone. God's presence is the foundation your life can be built on."},
  endurance: {ref:"Isaiah 40:31", text:"But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", why:"You're a runner — someone who doesn't quit. This verse is your fuel for every long, hard season."},
  peace: {ref:"Philippians 4:6-7", text:"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", why:"Peace isn't the absence of chaos — it's what God gives in the middle of it. Make this your anchor."},
  wisdom: {ref:"Proverbs 3:5-6", text:"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", why:"You want to make good decisions. This is the foundation of every good decision you'll ever make."},
  identity: {ref:"Psalm 139:14", text:"I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.", why:"You need to know who you are before the world tells you who you're not. God settled this before you were born."},
  purpose: {ref:"Jeremiah 29:11", text:"'For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.'", why:"God has something specific for your life. This verse is your reminder when it feels unclear."},
  strength: {ref:"Philippians 4:13", text:"I can do all things through Christ who strengthens me.", why:"Short. Punchy. True. When you're in the hardest moment of a game or a season — say this."},
  love: {ref:"1 Corinthians 13:4-5", text:"Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking.", why:"You want to love people the way God loves them. This is the standard. It's harder than it looks."},
  character: {ref:"Micah 6:8", text:"He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.", why:"Three things. Justice. Mercy. Humility. If you build your life on these, you'll never regret who you became."},
  faith: {ref:"Hebrews 11:6", text:"And without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him.", why:"Faith is the foundation of everything. This verse reminds you what God is actually looking for from you."},
  courage: {ref:"2 Timothy 1:7", text:"For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", why:"You weren't made to shrink. The Holy Spirit inside you is not a spirit of fear — it's power, love, and discipline."},
};

// ── SPIRITUAL GIFTS QUIZ ──────────────────────────
const GIFTS_QUESTIONS = [
  {q:"I get energized when I get to explain something and see someone understand it.", gift:"teaching"},
  {q:"I notice when someone in a group is hurting and feel drawn to help them.", gift:"mercy"},
  {q:"I naturally take charge in a group and people tend to follow my lead.", gift:"leadership"},
  {q:"I love sharing my faith with people who don't know God yet.", gift:"evangelism"},
  {q:"I find joy in doing practical tasks that help things run smoothly behind the scenes.", gift:"serving"},
  {q:"I often know what someone needs to hear, even when they haven't asked.", gift:"wisdom"},
  {q:"I give generously with money or resources without needing recognition.", gift:"giving"},
  {q:"When I read the Bible, I see connections and patterns others often miss.", gift:"knowledge"},
  {q:"I love praying for people and feel a deep burden for specific situations.", gift:"intercession"},
  {q:"I feel called to create — art, music, writing — as an act of worship.", gift:"creativity"},
  {q:"I tend to be the one who speaks up and challenges wrong things directly.", gift:"prophecy"},
  {q:"I feel excited by the idea of starting something new from scratch for God.", gift:"pioneering"},
];

const GIFTS_DESCRIPTIONS = {
  teaching: {icon:"📚", name:"Teaching", desc:"You have a gift for making complex things clear. God uses teachers to help people understand His Word deeply. Think Paul, who wrote half the NT explaining the gospel."},
  mercy: {icon:"💛", name:"Mercy", desc:"You feel what others feel. God uses people with mercy to show His compassion to the hurting. Think Jesus, who always stopped for the person everyone else passed."},
  leadership: {icon:"🦁", name:"Leadership", desc:"You mobilize people toward a goal. God uses leaders to advance His kingdom. Think Nehemiah, who rebuilt a wall by rallying a demoralized people."},
  evangelism: {icon:"📢", name:"Evangelism", desc:"You have a natural boldness to share your faith. God uses evangelists to reach people who would never walk into a church. Think Paul in Athens."},
  serving: {icon:"🛠️", name:"Serving", desc:"You see needs and meet them without needing recognition. Jesus said the greatest is the servant of all. This gift holds the church together."},
  wisdom: {icon:"🧠", name:"Wisdom", desc:"You see situations clearly and know what to do. God uses wise people to guide others through hard decisions. Think Solomon, Joseph, Daniel."},
  giving: {icon:"🎁", name:"Giving", desc:"You're generous beyond what's expected. God uses givers to fund His work and bless people who don't see it coming. A quiet, powerful gift."},
  knowledge: {icon:"🔍", name:"Knowledge", desc:"You study deeply and connect truth across the Bible. God uses teachers of knowledge to keep the church doctrinally grounded and spiritually deep."},
  intercession: {icon:"🙏", name:"Intercession", desc:"You carry a heavy burden to pray for specific people and situations. God uses intercessors to change things in the spiritual realm before they change in the physical."},
  creativity: {icon:"🎨", name:"Creativity", desc:"You express worship and truth through art, music, or writing. God uses creative people to reach hearts that logic alone can't touch."},
  prophecy: {icon:"⚡", name:"Prophecy", desc:"You speak truth boldly, even when it's uncomfortable. God uses prophetic voices to call people back to what matters and to see things before they happen."},
  pioneering: {icon:"🚀", name:"Pioneering", desc:"You love starting new things for God — churches, ministries, movements. Think Paul planting churches across the Roman Empire where no one had gone."},
};

// ── STATE ─────────────────────────────────────────
let temptationSelected = null;
let lifeVerseAnswers = {};
let lifeVerseStep = 0;
let giftsAnswers = {};
let giftsStep = 0;

// ── RENDER TOOLS PAGE ─────────────────────────────
function renderToolsPage() {
  // Tools page renders from HTML, nothing dynamic needed on load
}

// ── TEMPTATION TOOLKIT ────────────────────────────
function openTemptationTool(key) {
  const d = TEMPTATION_DATA[key];
  if(!d) return;

  const el = document.getElementById('temptationContent');
  el.innerHTML = `
    <div style="font-size:2rem;margin-bottom:10px;">${d.icon}</div>
    <div style="font-family:'Cinzel',serif;font-size:1.1rem;color:var(--gold);margin-bottom:12px;">${d.label}</div>
    <div style="background:var(--surface2);border-radius:8px;padding:14px;margin-bottom:16px;font-size:0.9rem;color:var(--text2);line-height:1.65;font-style:italic;">"${d.truth}"</div>

    <div style="font-size:0.65rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;">Scripture for This Battle</div>
    ${d.verses.map(v=>`
      <div style="padding:12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;margin-bottom:8px;">
        <div style="font-family:'Cinzel',serif;font-size:0.78rem;color:var(--gold);margin-bottom:6px;">${v.ref}</div>
        <div style="font-family:'Crimson Pro',serif;font-size:1rem;font-style:italic;color:var(--text);line-height:1.6;">${v.text}</div>
      </div>`).join('')}

    <div style="font-size:0.65rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin:16px 0 10px;">Practical Steps</div>
    ${d.steps.map((s,i)=>`
      <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="font-family:'Cinzel',serif;color:var(--gold);font-size:0.85rem;width:20px;flex-shrink:0;">${i+1}</span>
        <span style="font-size:0.88rem;color:var(--text2);line-height:1.5;">${s}</span>
      </div>`).join('')}`;

  openModal('temptationModal');
  addXP(5, 'Used temptation toolkit');
}

// ── LIFE VERSE FINDER ─────────────────────────────
function startLifeVerseFinder() {
  lifeVerseAnswers = {};
  lifeVerseStep = 0;
  renderLifeVerseStep();
  openModal('lifeVerseModal');
}

function renderLifeVerseStep() {
  const el = document.getElementById('lifeVerseContent');
  if(lifeVerseStep >= LIFE_VERSE_QUESTIONS.length) {
    showLifeVerseResult();
    return;
  }
  const q = LIFE_VERSE_QUESTIONS[lifeVerseStep];
  el.innerHTML = `
    <div style="font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-bottom:16px;">
      Question ${lifeVerseStep+1} of ${LIFE_VERSE_QUESTIONS.length}
    </div>
    <div style="font-family:'Crimson Pro',serif;font-size:1.1rem;color:var(--text);line-height:1.5;margin-bottom:20px;">${q.q}</div>
    <div style="display:flex;flex-direction:column;gap:8px;">
      ${q.opts.map(o=>`
        <div class="lv-opt" onclick="selectLifeVerseOpt('${o.tag}',this)">
          ${o.label}
        </div>`).join('')}
    </div>`;
}

function selectLifeVerseOpt(tag, el) {
  document.querySelectorAll('.lv-opt').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
  lifeVerseAnswers[lifeVerseStep] = tag;
  setTimeout(()=>{
    lifeVerseStep++;
    renderLifeVerseStep();
  }, 300);
}

function showLifeVerseResult() {
  // Tally tags
  const counts = {};
  Object.values(lifeVerseAnswers).forEach(tag=>{
    counts[tag]=(counts[tag]||0)+1;
  });
  const topTag = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0];
  const result = LIFE_VERSE_RESULTS[topTag] || LIFE_VERSE_RESULTS.purpose;

  const el = document.getElementById('lifeVerseContent');
  el.innerHTML = `
    <div style="text-align:center;margin-bottom:20px;">
      <div style="font-size:0.65rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;">Your Life Verse</div>
      <div style="font-family:'Cinzel',serif;font-size:1rem;color:var(--gold);margin-bottom:14px;">${result.ref}</div>
      <div style="background:rgba(212,168,67,0.07);border:1px solid rgba(212,168,67,0.22);border-radius:var(--radius);padding:18px;font-family:'Crimson Pro',serif;font-size:1.1rem;font-style:italic;line-height:1.65;color:var(--text);">"${result.text}"</div>
    </div>
    <div style="background:var(--surface2);border-radius:8px;padding:14px;margin-bottom:16px;font-size:0.88rem;color:var(--text2);line-height:1.65;">${result.why}</div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-primary btn-full" onclick="saveLifeVerse('${result.ref}','${result.text.replace(/'/g,"\\'")}')">📌 Save to Home</button>
      <button class="btn btn-ghost" onclick="lifeVerseStep=0;lifeVerseAnswers={};renderLifeVerseStep()">Retake</button>
    </div>`;
}

function saveLifeVerse(ref, text) {
  if(STATE.pinnedVerses.some(v=>v.ref===ref)){showToast('Already pinned!');return;}
  if(STATE.pinnedVerses.length>=3){STATE.pinnedVerses.shift();}
  STATE.pinnedVerses.push({ref,text});
  saveState('pinnedVerses');
  closeModal('lifeVerseModal');
  showToast('📌 Life verse pinned to home!');
  addXP(25,'Life verse found');
  haptic('success');
}

// ── SPIRITUAL GIFTS QUIZ ──────────────────────────
function startGiftsQuiz() {
  giftsAnswers={};giftsStep=0;
  renderGiftsStep();
  openModal('giftsModal');
}

function renderGiftsStep() {
  const el=document.getElementById('giftsContent');
  if(giftsStep>=GIFTS_QUESTIONS.length){showGiftsResult();return;}
  const q=GIFTS_QUESTIONS[giftsStep];
  el.innerHTML=`
    <div style="font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;">
      ${giftsStep+1} of ${GIFTS_QUESTIONS.length}
    </div>
    <div style="background:var(--surface2);border-radius:var(--radius);padding:16px;margin-bottom:18px;">
      <div style="font-family:'Crimson Pro',serif;font-size:1.05rem;color:var(--text);line-height:1.6;">"${q.q}"</div>
    </div>
    <div style="font-size:0.82rem;color:var(--muted);margin-bottom:12px;">Does this describe you?</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      ${['Strongly Yes','Somewhat Yes','Not Really','Definitely Not'].map((l,i)=>`
        <button class="btn btn-ghost" onclick="answerGift(${i},this)" style="padding:12px;text-align:center;">${l}</button>`).join('')}
    </div>`;
}

function answerGift(score,el) {
  giftsAnswers[giftsStep]={gift:GIFTS_QUESTIONS[giftsStep].gift,score:3-score};
  document.querySelectorAll('#giftsContent .btn').forEach(b=>b.style.opacity='0.4');
  el.style.opacity='1';el.style.borderColor='var(--gold)';el.style.color='var(--gold)';
  setTimeout(()=>{giftsStep++;renderGiftsStep();},300);
}

function showGiftsResult() {
  const totals={};
  Object.values(giftsAnswers).forEach(({gift,score})=>{
    totals[gift]=(totals[gift]||0)+score;
  });
  const sorted=Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const el=document.getElementById('giftsContent');
  el.innerHTML=`
    <div style="font-size:0.65rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold);text-align:center;margin-bottom:16px;">Your Top Spiritual Gifts</div>
    ${sorted.map(([gift,score],i)=>{
      const g=GIFTS_DESCRIPTIONS[gift];
      return `<div style="background:${i===0?'rgba(212,168,67,0.08)':'var(--surface2)'};border:1px solid ${i===0?'rgba(212,168,67,0.3)':'var(--border)'};border-radius:var(--radius);padding:16px;margin-bottom:10px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
          <span style="font-size:1.5rem;">${g.icon}</span>
          <div>
            <div style="font-family:'Cinzel',serif;font-size:0.9rem;color:${i===0?'var(--gold)':'var(--text)'};">${g.name}</div>
            ${i===0?'<div style="font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);">Primary Gift</div>':''}
          </div>
        </div>
        <div style="font-size:0.85rem;color:var(--text2);line-height:1.6;">${g.desc}</div>
      </div>`;
    }).join('')}
    <button class="btn btn-ghost btn-full" style="margin-top:8px;" onclick="giftsStep=0;giftsAnswers={};renderGiftsStep()">Retake Quiz</button>`;
  addXP(30,'Spiritual gifts quiz completed');
}

// ── SCRIPTURE OVER FEAR ───────────────────────────
const FEAR_TOPICS = [
  {label:"I'm afraid of failing", key:"failure", verses:["Romans 8:1","Proverbs 24:16","Lamentations 3:22-23"]},
  {label:"I'm afraid of what people think", key:"approval", verses:["Galatians 1:10","Proverbs 29:25","John 12:43"]},
  {label:"I'm afraid of the future", key:"future", verses:["Jeremiah 29:11","Matthew 6:34","Psalm 23:4"]},
  {label:"I'm afraid I'm not good enough", key:"worth", verses:["Psalm 139:14","Ephesians 2:10","Romans 8:1"]},
  {label:"I'm afraid of losing someone", key:"loss", verses:["John 11:35","Romans 8:38-39","2 Corinthians 1:3-4"]},
  {label:"I'm afraid of a new situation", key:"change", verses:["Joshua 1:9","Isaiah 43:2","Deuteronomy 31:8"]},
];

function renderScriptureFear() {
  const el=document.getElementById('fearContent');
  if(!el)return;
  el.innerHTML=FEAR_TOPICS.map(f=>`
    <div class="tool-option-card" onclick="showFearVerses('${f.key}')">
      <span style="font-size:0.9rem;color:var(--text2);">${f.label}</span>
      <span style="color:var(--muted);">→</span>
    </div>`).join('');
}

function showFearVerses(key) {
  const f=FEAR_TOPICS.find(x=>x.key===key);
  if(!f)return;
  const el=document.getElementById('fearContent');
  el.innerHTML=`
    <button class="btn btn-ghost btn-sm" onclick="renderScriptureFear()" style="margin-bottom:14px;">← Back</button>
    <div style="font-family:'Crimson Pro',serif;font-size:1rem;font-style:italic;color:var(--text2);margin-bottom:16px;">"${f.label}"</div>
    <div style="font-size:0.65rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;">Scripture for This Fear</div>
    ${f.verses.map(ref=>`
      <div style="padding:12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;margin-bottom:8px;cursor:pointer;" onclick="closeModal('scriptureFearModal');openBibleChapter('${ref.split(' ')[0]}',parseInt('${ref.match(/\d+/)?.[0]||1}'))">
        <div style="font-family:'Cinzel',serif;font-size:0.82rem;color:var(--gold);margin-bottom:4px;">${ref}</div>
        <div style="font-size:0.75rem;color:var(--muted);">Tap to open in Bible →</div>
      </div>`).join('')}`;
}
