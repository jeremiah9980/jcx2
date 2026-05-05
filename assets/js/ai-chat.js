(() => {
  const SYSTEM_PROMPT = `You are an AI analysis assistant embedded in a Communication Timeline & Analysis Package. This package is a structured legal and co-parenting review tool containing:

- AppClose message export analysis (communication between co-parents)
- Behavioral profiles: Deanna Cargill (co-parent), Sharon, Stephanie (third parties), and children Kelsie, Kinsley, and Kassidy
- Third-party influence analysis and triangulation model
- Full timeline data including February parallel timeline and accusations timeline
- Conflict escalation mapping, tone classification, and communication category breakdowns
- Advanced analysis: narrative inconsistency detection, behavior role classification

Your role: Help users understand the analysis, navigate the package, answer questions about behavioral patterns, communication tone, timeline events, third-party dynamics, and co-parenting conflict patterns. Provide neutral, objective, court-ready-style summaries.

Guidelines:
- Be concise, professional, and factually neutral
- Reference specific sections or profiles by name when relevant
- Do not speculate beyond what the data suggests
- If asked about a specific timeline date or event, note that the full data is in the timeline and CSV exports`;

  const STORAGE_KEY = 'jcx2_anthropic_key';
  const MODEL = 'claude-sonnet-4-6';

  let apiKey = localStorage.getItem(STORAGE_KEY) || '';
  let messages = [];
  let isStreaming = false;

  function buildWidget() {
    const style = document.createElement('style');
    style.textContent = `
      #jcx-chat-btn {
        position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        width: 56px; height: 56px; border-radius: 50%;
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        border: 2px solid #3b82f6; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 20px rgba(37,99,235,0.5);
        transition: transform .2s, box-shadow .2s;
        color: #fff; font-size: 22px; user-select: none;
      }
      #jcx-chat-btn:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(37,99,235,0.7); }
      #jcx-chat-btn .jcx-badge {
        position: absolute; top: -4px; right: -4px;
        background: #6ee7b7; color: #0b5d1e; font-size: 9px;
        font-weight: 700; padding: 2px 5px; border-radius: 999px;
        letter-spacing: .05em; text-transform: uppercase;
      }
      #jcx-chat-panel {
        position: fixed; bottom: 90px; right: 24px; z-index: 9998;
        width: 380px; max-width: calc(100vw - 32px);
        height: 540px; max-height: calc(100vh - 120px);
        background: #16213c; border: 1px solid #30446f;
        border-radius: 16px; display: flex; flex-direction: column;
        box-shadow: 0 8px 40px rgba(0,0,0,0.6);
        overflow: hidden; transform: scale(0.95) translateY(10px);
        opacity: 0; pointer-events: none;
        transition: transform .2s ease, opacity .2s ease;
      }
      #jcx-chat-panel.open {
        transform: scale(1) translateY(0); opacity: 1; pointer-events: all;
      }
      #jcx-panel-header {
        background: #0f1830; padding: 14px 16px;
        border-bottom: 1px solid #30446f;
        display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
      }
      #jcx-panel-header h4 {
        margin: 0; font-size: .9rem; color: #eef4ff;
        display: flex; align-items: center; gap: 8px;
      }
      #jcx-panel-header h4 span.ai-dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: #6ee7b7; display: inline-block;
        box-shadow: 0 0 6px #6ee7b7; animation: pulse 2s infinite;
      }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
      #jcx-panel-header small { color: #6ee7b7; font-size: .72rem; }
      .jcx-hdr-right { display: flex; align-items: center; gap: 8px; }
      #jcx-key-btn, #jcx-clear-btn, #jcx-close-btn {
        background: none; border: 1px solid #30446f; border-radius: 6px;
        color: #9ec5ff; font-size: .72rem; padding: 3px 8px; cursor: pointer;
      }
      #jcx-key-btn:hover, #jcx-clear-btn:hover, #jcx-close-btn:hover { background: rgba(255,255,255,.06); }
      #jcx-messages {
        flex: 1; overflow-y: auto; padding: 14px;
        display: flex; flex-direction: column; gap: 10px;
        scrollbar-width: thin; scrollbar-color: #30446f transparent;
      }
      #jcx-messages::-webkit-scrollbar { width: 4px; }
      #jcx-messages::-webkit-scrollbar-track { background: transparent; }
      #jcx-messages::-webkit-scrollbar-thumb { background: #30446f; border-radius: 4px; }
      .jcx-msg {
        max-width: 90%; padding: 10px 12px; border-radius: 12px;
        font-size: .85rem; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word;
      }
      .jcx-msg.user {
        align-self: flex-end; background: #2563eb; color: #fff; border-bottom-right-radius: 4px;
      }
      .jcx-msg.assistant {
        align-self: flex-start; background: #1a2546; color: #eef4ff;
        border: 1px solid #30446f; border-bottom-left-radius: 4px;
      }
      .jcx-msg.system-msg {
        align-self: center; background: rgba(110,231,183,.08); color: #6ee7b7;
        border: 1px solid rgba(110,231,183,.2); font-size: .78rem;
        text-align: center; max-width: 100%;
      }
      .jcx-cursor { display: inline-block; width: 2px; height: 1em; background: #6ee7b7; animation: blink .7s infinite; vertical-align: text-bottom; }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      #jcx-input-row {
        padding: 10px 12px; border-top: 1px solid #30446f;
        display: flex; gap: 8px; flex-shrink: 0; background: #0f1830;
      }
      #jcx-input {
        flex: 1; background: #1a2546; border: 1px solid #30446f;
        border-radius: 8px; color: #eef4ff; padding: 9px 12px; font-size: .85rem;
        resize: none; outline: none; height: 38px; max-height: 100px;
        font-family: inherit; line-height: 1.4;
      }
      #jcx-input:focus { border-color: #3b82f6; }
      #jcx-send {
        background: #2563eb; border: none; border-radius: 8px;
        color: #fff; padding: 0 14px; cursor: pointer; font-size: 16px;
        transition: background .15s; flex-shrink: 0;
      }
      #jcx-send:hover { background: #1d4ed8; }
      #jcx-send:disabled { background: #1e3a6e; cursor: not-allowed; opacity: .6; }
      #jcx-key-modal {
        position: fixed; inset: 0; z-index: 10000;
        background: rgba(0,0,0,.7); display: flex;
        align-items: center; justify-content: center;
        padding: 16px;
      }
      #jcx-key-modal.hidden { display: none; }
      #jcx-key-box {
        background: #16213c; border: 1px solid #30446f; border-radius: 16px;
        padding: 28px; width: 100%; max-width: 400px;
        box-shadow: 0 8px 40px rgba(0,0,0,.6);
      }
      #jcx-key-box h3 { margin: 0 0 6px; color: #eef4ff; font-size: 1rem; }
      #jcx-key-box p { color: #bfd0f0; font-size: .82rem; margin: 0 0 16px; line-height: 1.5; }
      #jcx-key-input {
        width: 100%; box-sizing: border-box;
        background: #0f1830; border: 1px solid #30446f; border-radius: 8px;
        color: #eef4ff; padding: 10px 12px; font-size: .85rem;
        outline: none; margin-bottom: 12px; font-family: monospace;
      }
      #jcx-key-input:focus { border-color: #3b82f6; }
      .jcx-key-btns { display: flex; gap: 8px; }
      #jcx-key-save {
        flex: 1; background: #2563eb; border: none; border-radius: 8px;
        color: #fff; padding: 10px; cursor: pointer; font-size: .88rem; font-weight: 600;
      }
      #jcx-key-save:hover { background: #1d4ed8; }
      #jcx-key-cancel {
        background: none; border: 1px solid #30446f; border-radius: 8px;
        color: #9ec5ff; padding: 10px 16px; cursor: pointer; font-size: .88rem;
      }
      #jcx-key-cancel:hover { background: rgba(255,255,255,.05); }
      #jcx-key-note { font-size: .74rem; color: #6ee7b7; margin-top: 10px; }
    `;
    document.head.appendChild(style);

    // Floating button
    const btn = document.createElement('button');
    btn.id = 'jcx-chat-btn';
    btn.title = 'AI Analysis Assistant';
    btn.innerHTML = '🤖<span class="jcx-badge">AI</span>';
    document.body.appendChild(btn);

    // Chat panel
    const panel = document.createElement('div');
    panel.id = 'jcx-chat-panel';
    panel.innerHTML = `
      <div id="jcx-panel-header">
        <h4><span class="ai-dot"></span>AI Analysis Assistant</h4>
        <div class="jcx-hdr-right">
          <button id="jcx-key-btn" title="Set API key">🔑 Key</button>
          <button id="jcx-clear-btn" title="Clear chat">↺ Clear</button>
          <button id="jcx-close-btn">✕</button>
        </div>
      </div>
      <div id="jcx-messages"></div>
      <div id="jcx-input-row">
        <textarea id="jcx-input" placeholder="Ask about the analysis, timeline, profiles…" rows="1"></textarea>
        <button id="jcx-send">➤</button>
      </div>
    `;
    document.body.appendChild(panel);

    // Key modal
    const modal = document.createElement('div');
    modal.id = 'jcx-key-modal';
    modal.className = 'hidden';
    modal.innerHTML = `
      <div id="jcx-key-box">
        <h3>🔑 Anthropic API Key</h3>
        <p>Enter your Anthropic API key to enable the AI assistant. The key is stored locally in your browser and never sent anywhere except directly to Anthropic's API.</p>
        <input id="jcx-key-input" type="password" placeholder="sk-ant-..." autocomplete="off" spellcheck="false"/>
        <div class="jcx-key-btns">
          <button id="jcx-key-save">Save & Connect</button>
          <button id="jcx-key-cancel">Cancel</button>
        </div>
        <p id="jcx-key-note">Get a key at console.anthropic.com</p>
      </div>
    `;
    document.body.appendChild(modal);

    wireEvents();
    showWelcome();
  }

  function wireEvents() {
    const btn = document.getElementById('jcx-chat-btn');
    const panel = document.getElementById('jcx-chat-panel');
    const closeBtn = document.getElementById('jcx-close-btn');
    const keyBtn = document.getElementById('jcx-key-btn');
    const clearBtn = document.getElementById('jcx-clear-btn');
    const sendBtn = document.getElementById('jcx-send');
    const input = document.getElementById('jcx-input');
    const modal = document.getElementById('jcx-key-modal');
    const keyInput = document.getElementById('jcx-key-input');
    const keySave = document.getElementById('jcx-key-save');
    const keyCancel = document.getElementById('jcx-key-cancel');

    btn.addEventListener('click', () => panel.classList.toggle('open'));
    closeBtn.addEventListener('click', () => panel.classList.remove('open'));

    keyBtn.addEventListener('click', () => {
      keyInput.value = apiKey;
      modal.classList.remove('hidden');
    });

    keySave.addEventListener('click', () => {
      const val = keyInput.value.trim();
      if (!val.startsWith('sk-ant-')) {
        keyInput.style.borderColor = '#e8b7bf';
        return;
      }
      apiKey = val;
      localStorage.setItem(STORAGE_KEY, apiKey);
      modal.classList.add('hidden');
      addMessage('system-msg', 'API key saved. You\'re connected to Claude!');
    });

    keyCancel.addEventListener('click', () => modal.classList.add('hidden'));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });

    clearBtn.addEventListener('click', () => {
      messages = [];
      document.getElementById('jcx-messages').innerHTML = '';
      showWelcome();
    });

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });
  }

  function showWelcome() {
    addMessage('assistant',
      'Hello! I\'m your AI analysis assistant for this Communication Timeline & Analysis Package.\n\n' +
      'I can help you:\n• Understand behavioral patterns and communication tone\n• Navigate profiles (Deanna, Sharon, Kelsie, Kinsley, Kassidy)\n• Summarize timeline events and conflict escalation\n• Explain analysis methodology and findings\n\n' +
      (apiKey ? 'What would you like to explore?' : '⚠️ No API key set — click 🔑 Key above to add your Anthropic key to get started.')
    );
  }

  function addMessage(type, text) {
    const container = document.getElementById('jcx-messages');
    const el = document.createElement('div');
    el.className = `jcx-msg ${type}`;
    el.textContent = text;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
    return el;
  }

  async function handleSend() {
    if (isStreaming) return;
    const input = document.getElementById('jcx-input');
    const sendBtn = document.getElementById('jcx-send');
    const text = input.value.trim();
    if (!text) return;

    if (!apiKey) {
      document.getElementById('jcx-key-modal').classList.remove('hidden');
      return;
    }

    input.value = '';
    input.style.height = 'auto';
    addMessage('user', text);
    messages.push({ role: 'user', content: text });

    isStreaming = true;
    sendBtn.disabled = true;

    const msgEl = document.createElement('div');
    msgEl.className = 'jcx-msg assistant';
    const cursor = document.createElement('span');
    cursor.className = 'jcx-cursor';
    msgEl.appendChild(cursor);
    document.getElementById('jcx-messages').appendChild(msgEl);
    document.getElementById('jcx-messages').scrollTop = 9999;

    let fullText = '';

    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 1024,
          stream: true,
          system: SYSTEM_PROMPT,
          messages
        })
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error ${resp.status}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
              fullText += parsed.delta.text;
              msgEl.textContent = fullText;
              msgEl.appendChild(cursor);
              document.getElementById('jcx-messages').scrollTop = 9999;
            }
          } catch (_) {}
        }
      }

      msgEl.textContent = fullText;
      messages.push({ role: 'assistant', content: fullText });

    } catch (err) {
      msgEl.textContent = `Error: ${err.message}`;
      msgEl.style.color = '#e8b7bf';
      messages.pop();
    } finally {
      isStreaming = false;
      sendBtn.disabled = false;
      document.getElementById('jcx-input').focus();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();
