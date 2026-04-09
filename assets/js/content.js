const siteContent = {
  story: [
    "Jesica and Jere’s story didn’t start from scratch — it started with history. A connection that went back to high school, long before life brought them back together again.",
    "Years later, Jesica reached out about going to a comedy show. What seemed simple turned into something real almost immediately. The reconnection wasn’t confusing — it was clear, aligned, and strong from the beginning.",
    "Forty days after reconnecting, they got married on October 10, 2025 at 11:00 AM. That moment didn’t just mark a wedding — it marked a shift into a shared identity, a shared life, and a future built together.",
    "Since then, their story has been written through real life — family, softball nights, holidays, routines, laughter, and the everyday moments that turn love into something lasting."
  ],

  timeline: [
    { date: "High School", title: "Where it started", text: "The connection existed long before the relationship officially began." },
    { date: "Sept 2025", title: "Reconnection", text: "Jesica reached out — and everything moved with clarity and speed." },
    { date: "Comedy Show", title: "The turning point", text: "A simple invite became the beginning of something real." },
    { date: "10/10/2025 • 11AM", title: "Wedding Day", text: "Jesica became Jesica Ann Cargill — the anchor moment of everything." },
    { date: "Now", title: "Building a life", text: "Family, routines, memories, and a future being built together." }
  ],

  gallery: [
    { title: "Wedding Portrait", caption: "The moment everything became official.", fileHint: "wedding-portrait.jpg" },
    { title: "Wedding Drive", caption: "That just married energy — real and unforgettable.", fileHint: "wedding-drive.jpg" },
    { title: "Family Moments", caption: "Softball nights, everyday life, and shared moments.", fileHint: "family.jpg" },
    { title: "First Christmas", caption: "Your first Christmas as the Cargills.", fileHint: "christmas.jpg" }
  ],

  videos: [
    { title: "Cargill Countdown", caption: "The video series leading up to Jesica becoming Jesica Ann Cargill.", fileHint: "YouTube playlist" },
    { title: "Wedding Memory", caption: "Cinematic shared moments from your story.", fileHint: "video.mp4" },
    { title: "Everyday Life", caption: "Real life clips that define your relationship.", fileHint: "reel.mp4" }
  ]
};

// ============================
// CORE RENDER
// ============================

function renderStory() {
  document.getElementById("story-paragraphs").innerHTML =
    siteContent.story.map(p => `<p>${p}</p>`).join("");
}

function renderTimeline() {
  document.getElementById("timeline-list").innerHTML =
    siteContent.timeline.map(t => `
      <article class="timeline-item">
        <div class="timeline-date">${t.date}</div>
        <div>
          <h3>${t.title}</h3>
          <p>${t.text}</p>
        </div>
      </article>
    `).join("");
}

function renderGallery() {
  document.getElementById("gallery-grid").innerHTML =
    siteContent.gallery.map((g,i) => `
      <article class="media-card">
        <div class="media-visual photo">
          <span class="visual-badge">Photo ${i+1}</span>
        </div>
        <div>
          <h3>${g.title}</h3>
          <p>${g.caption}</p>
        </div>
      </article>
    `).join("");
}

function renderVideos() {
  document.getElementById("video-grid").innerHTML =
    siteContent.videos.map((v,i) => `
      <article class="media-card">
        <div class="media-visual">
          <span class="visual-badge">Video ${i+1}</span>
        </div>
        <div>
          <h3>${v.title}</h3>
          <p>${v.caption}</p>
        </div>
      </article>
    `).join("");
}

// ============================
// 🔥 HERO + BRAND UPGRADE
// ============================

function injectHeroUpgrade() {
  const hero = document.querySelector('.hero-copy');

  hero.innerHTML += `
    <div style="margin-top:25px;padding:18px;border-radius:14px;background:rgba(255,120,0,0.08);border:1px solid rgba(255,120,0,0.2)">
      <h3 style="margin-bottom:12px">🎬 Cargill Countdown</h3>
      <iframe width="100%" height="220"
        src="https://www.youtube.com/embed/videoseries?list=PLx8Rm6IVQ2hJTdWkgshBPGjHMOgGJWKYh"
        frameborder="0" allowfullscreen>
      </iframe>
    </div>

    <div style="margin-top:20px;padding:15px;border-radius:12px;border:1px solid rgba(255,255,255,0.1)">
      <strong>Follow our journey →</strong><br/>
      <a href="https://www.instagram.com/jc2.twinflame.fit" target="_blank">
        @jc2.twinflame.fit
      </a>
    </div>
  `;
}

// ============================
// ⏱️ LIVE MARRIAGE TIMER
// ============================

function injectMarriageTicker() {
  const container = document.querySelector('.hero-copy');

  const ticker = document.createElement('div');
  ticker.style.marginTop = '20px';
  ticker.style.fontSize = '14px';
  ticker.style.opacity = '0.8';

  container.appendChild(ticker);

  const weddingDate = new Date("2025-10-10T11:00:00-05:00");

  function update() {
    const now = new Date();
    const diff = now - weddingDate;

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);

    ticker.innerHTML = `❤️ Married for ${days} days, ${hours} hours`;
  }

  setInterval(update, 1000);
  update();
}

// ============================
// 📲 INSTAGRAM SECTION
// ============================

function injectInstagram() {
  const header = document.querySelector('.embed-header strong');
  if (header) header.textContent = '@jc2.twinflame.fit';
}

// ============================
// INIT
// ============================

renderStory();
renderTimeline();
renderGallery();
renderVideos();

injectHeroUpgrade();
injectMarriageTicker();
injectInstagram();
