const siteContent = {
  story: [
    "Jesica and Jere’s story did not begin with strangers meeting for the first time. It began with history already in place — a connection that went back to high school, long before life brought them back together again.",
    "Years later, Jesica reached out about going to a comedy show. What looked simple on the surface turned into something much bigger. The reconnection carried clarity, ease, and the kind of momentum that felt real from the start.",
    "What made the story stand out was not only how quickly things moved, but how naturally they fit. It did not feel forced or chaotic. It felt aligned. Both of them recognized that what was happening was meaningful, and they moved with confidence instead of hesitation.",
    "Forty days after reconnecting, they got married on October 10, 2025 at 11:00 AM. That date became more than a wedding anniversary. It became the anchor point for a new shared identity, a new home life, and a new chapter together in Georgetown.",
    "Since then, their story has been built not only through wedding memories, but through family moments, softball nights, holidays, quiet everyday routines, road trips, restaurant dates, laughter, and the simple reality of building a life together one day at a time."
  ],
  timeline: [
    {
      date: "High school years",
      title: "The original connection",
      text: "Jesica and Jere already had history long before the relationship officially began, which gave the reconnection a depth that brand-new stories do not usually have."
    },
    {
      date: "September 2025",
      title: "The reconnection",
      text: "Jesica reached back out and the conversation reopened a connection that had been there for years. What followed moved with surprising speed and real clarity."
    },
    {
      date: "Comedy show invite",
      title: "The moment the story shifted",
      text: "A simple invite turned into the beginning of something serious. That one moment became the opening scene for everything that followed."
    },
    {
      date: "40 days later",
      title: "The decision was clear",
      text: "The relationship moved into commitment quickly, not because it was rushed in a reckless way, but because both of them already knew what it was."
    },
    {
      date: "10/10/2025 • 11:00 AM",
      title: "Wedding day",
      text: "Jesica and Jere got married and officially began the next chapter together — the moment Jesica became Jesica Ann Cargill."
    },
    {
      date: "After the wedding",
      title: "Building a shared life",
      text: "Marriage became real through everyday life: family time, shared routines, sports nights, first holidays together, and the steady work of building a home and identity together."
    },
    {
      date: "First Christmas 2025",
      title: "The Cargills’ first Christmas",
      text: "The relationship became more than a wedding date. It became a family chapter, marked by shared traditions and the feeling of a real home life taking shape."
    },
    {
      date: "Right now",
      title: "Turning memories into legacy",
      text: "This site exists to keep those memories from being scattered across phones and social posts. It gives the story a home that can keep growing."
    }
  ],
  gallery: [
    {
      title: "Wedding Portrait",
      caption: "The wedding portrait is the visual anchor of the whole story — the moment everything became official on October 10, 2025.",
      fileHint: "love/assets/media/wedding-portrait.jpg"
    },
    {
      title: "Wedding Day Drive",
      caption: "The drive after the ceremony has that just-married energy — part celebration, part peace, and part disbelief that the day had finally arrived.",
      fileHint: "love/assets/media/wedding-drive.jpg"
    },
    {
      title: "Softball Family Moment",
      caption: "Not all defining memories are formal. Family nights at the field became part of the story too, weaving the relationship into real everyday life.",
      fileHint: "love/assets/media/softball-family.jpg"
    },
    {
      title: "First Christmas as the Cargills",
      caption: "The first Christmas together in 2025 turned the relationship into something bigger than a wedding day — a shared family chapter with traditions beginning to form.",
      fileHint: "love/assets/media/first-christmas.jpg"
    }
  ],
  videos: [
    {
      title: "Cargill Countdown Series",
      caption: "A set of videos capturing the days leading up to the moment Jesica became Jesica Ann Cargill — one of the most meaningful pre-wedding memory collections tied to the story.",
      fileHint: "YouTube playlist: Cargill Countdown"
    },
    {
      title: "Wedding / Memory Clip",
      caption: "A cinematic shared moment that fits the emotional center of the page — something that feels personal, visual, and replay-worthy.",
      fileHint: "iCloud / direct video memory"
    },
    {
      title: "Everyday Life Reel",
      caption: "The story is not only the wedding. It is the restaurant dates, selfies, road moments, holidays, and little clips that make the relationship feel real.",
      fileHint: "love/assets/media/everyday-life-reel.mp4"
    }
  ]
};

function renderStory() {
  const container = document.getElementById("story-paragraphs");
  container.innerHTML = siteContent.story
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function renderTimeline() {
  const container = document.getElementById("timeline-list");
  container.innerHTML = siteContent.timeline
    .map((item) => `
      <article class="timeline-item">
        <div class="timeline-date">${item.date}</div>
        <div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      </article>
    `)
    .join("");
}

function renderGallery() {
  const container = document.getElementById("gallery-grid");
  container.innerHTML = siteContent.gallery
    .map((item, index) => `
      <article class="media-card">
        <div class="media-visual photo">
          <span class="visual-badge">Photo ${index + 1}</span>
          <span class="visual-hint">Ready for your real image</span>
        </div>
        <div class="media-copy">
          <h3>${item.title}</h3>
          <p>${item.caption}</p>
          <span class="media-file">${item.fileHint}</span>
        </div>
      </article>
    `)
    .join("");
}

function renderVideos() {
  const container = document.getElementById("video-grid");
  container.innerHTML = siteContent.videos
    .map((item, index) => `
      <article class="media-card">
        <div class="media-visual">
          <span class="visual-badge">Video ${index + 1}</span>
          <span class="visual-hint">Ready for playlist, MP4, or embed</span>
        </div>
        <div class="media-copy">
          <h3>${item.title}</h3>
          <p>${item.caption}</p>
          <span class="media-file">${item.fileHint}</span>
        </div>
      </article>
    `)
    .join("");
}

function hydrateInstagramSection() {
  const header = document.querySelector('.embed-header strong');
  const body = document.querySelector('.embed-body');
  const pills = document.querySelector('.pill-grid');
  if (header) header.textContent = '@jc2.twinflame.fit';
  if (body) {
    body.innerHTML = `
      <p><strong>Instagram home for the brand</strong></p>
      <p>The Instagram account ties the love story into the JC2 / Twin Flame Fit identity and gives the relationship a living social presence beyond this site.</p>
      <pre class="code-block">https://www.instagram.com/jc2.twinflame.fit</pre>
    `;
  }
  if (pills) {
    pills.innerHTML = `
      <span>Cargill Countdown clips</span>
      <span>Wedding memories</span>
      <span>Anniversary countdown</span>
      <span>Date-night highlights</span>
      <span>Family moments</span>
      <span>Favorite selfies together</span>
    `;
  }
}

renderStory();
renderTimeline();
renderGallery();
renderVideos();
hydrateInstagramSection();