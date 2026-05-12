/* ═══════════════════════════════════════════════
   MATEO'S FAITH HUB — AI BIBLE CHAT
   Stage 7: Ask the Bible anything
═══════════════════════════════════════════════ */

// ── CHAT STATE ────────────────────────────────────
let chatHistory = [];
let chatLoading = false;

const CHAT_SYSTEM_PROMPT = `You are a wise, warm, and biblically grounded faith mentor helping Mateo, a 14-year-old Christian who goes to Victory City Church in Round Rock, TX and attends Wednesday youth group. He plays cornerback on his school football team and is moving to Leander ISD for high school.

Your role:
- Answer faith questions clearly and honestly, always grounding answers in scripture
- Use the World English Bible (WEB) translation for any verses you quote
- Keep answers concise and practical — he's 14, not a seminary student
- Be real and direct, not preachy or condescending
- When relevant, connect answers to his life (football, school, friendships, the transition to a new school)
- Always include at least one Bible verse reference
- If he asks something hard (doubt, suffering, tough theology), engage honestly rather than giving a Sunday school answer
- End responses with a brief practical takeaway or question to think about

Format: conversational, not a lecture. Short paragraphs. Use a verse in-line naturally. Keep it under 200 words unless the question genuinely requires more depth.`;

const SUGGESTED_QUESTIONS = [
  "What does the Bible say about anxiety?",
  "Why did Jesus have to die?",
  "How do I know if God is real?",
  "What does it mean to be born again?",
  "How should I handle it when I mess up badly?",
  "What does the Bible say about friendships?",
  "How do I pray when I don't know what to say?",
  "What does God say about my identity?",
  "Why does God allow suffering?",
  "How do I know God's will for my life?",
  "What does the Bible say about pride?",
  "How do I stay strong in my faith at a new school?",
];

// ── RENDER CHAT PAGE ──────────────────────────────
function renderChatPage() {
  if(chatHistory.length === 0) {
    renderChatWelcome();
  } else {
    renderChatMessages();
  }
}

function renderChatWelcome() {
  const el = document.getElementById('chatMessages');
  if(!el) return;

  const tod = timeOfDay();
  const greets = {morning:'Good morning, Mateo.', afternoon:'Hey Mateo.', evening:'Evening, Mateo.'};

  el.innerHTML = `
    <div class="chat-welcome">
      <div class="cw-cross">✝</div>
      <div class="cw-greeting">${greets[tod]}</div>
      <div class="cw-sub">Ask me anything about faith, the Bible, or life. I'll always point you back to scripture.</div>
    </div>
    <div class="chat-suggestions-label">Try asking…</div>
    <div class="chat-suggestions">
      ${SUGGESTED_QUESTIONS.slice(0,6).map(q =>
        `<div class="chat-suggestion" onclick="sendSuggestedQuestion('${q.replace(/'/g,"\\'")}')">
          ${q}
        </div>`
      ).join('')}
    </div>`;
}

function renderChatMessages() {
  const el = document.getElementById('chatMessages');
  if(!el) return;

  el.innerHTML = chatHistory.map(msg => `
    <div class="chat-msg chat-msg-${msg.role}">
      ${msg.role === 'assistant' ? '<div class="chat-msg-avatar">✝</div>' : ''}
      <div class="chat-msg-bubble">
        <div class="chat-msg-text">${formatChatText(msg.content)}</div>
      </div>
    </div>`).join('');

  if(chatLoading) {
    el.innerHTML += `<div class="chat-msg chat-msg-assistant">
      <div class="chat-msg-avatar">✝</div>
      <div class="chat-msg-bubble">
        <div class="chat-typing"><span></span><span></span><span></span></div>
      </div>
    </div>`;
  }

  // Scroll to bottom
  el.scrollTop = el.scrollHeight;
}

function formatChatText(text) {
  // Bold **text**
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italics *text*
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Line breaks
  text = text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
  return '<p>' + text + '</p>';
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if(!text || chatLoading) return;

  input.value = '';
  input.style.height = 'auto';

  // Add user message
  chatHistory.push({role:'user', content:text});
  chatLoading = true;
  renderChatMessages();

  try {
    const messages = chatHistory.map(m => ({role:m.role, content:m.content}));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: CHAT_SYSTEM_PROMPT,
        messages: messages,
      })
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'Sorry, I had trouble responding. Try again.';

    chatHistory.push({role:'assistant', content:reply});
    addXP(10, 'Asked the Bible a question');

  } catch(err) {
    chatHistory.push({role:'assistant', content:"I'm having trouble connecting right now. Make sure you're online and try again."});
  }

  chatLoading = false;
  renderChatMessages();
}

function sendSuggestedQuestion(q) {
  document.getElementById('chatInput').value = q;
  sendMessage();
}

function clearChat() {
  chatHistory = [];
  renderChatWelcome();
}

function handleChatKeydown(e) {
  if(e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoresizeChat(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}
