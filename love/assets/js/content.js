const siteContent = {
  story: [
    "Some stories are built in one unforgettable moment. Others are built in a thousand small choices. Yours feels like both — something beautiful, deeply felt, and worth preserving with intention.",
    "JC² is designed to feel like a living love letter: a place for your wedding photos, favorite videos, shared memories, private milestones, and the kind of warmth that social media alone can never fully hold.",
    "What makes this story special is not only that you found each other. It is that your life together carries loyalty, resilience, tenderness, and the feeling of home."
  ],
  timeline: [
    {
      date: "Before forever",
      title: "The story began to take shape",
      text: "Every real love story has a season where connection turns into certainty — when two lives stop running beside each other and start building something together."
    },
    {
      date: "10/10/2025",
      title: "Wedding day",
      text: "You made it official. A date worth anchoring the whole site around — elegant, memorable, and easy to celebrate every year."
    },
    {
      date: "Georgetown chapter",
      title: "Building a shared home",
      text: "Love becomes real in the everyday: a home, a rhythm, support, and the little routines that turn a relationship into a life."
    },
    {
      date: "Right now",
      title: "Turning memories into a legacy",
      text: "This site is the beginning of a digital scrapbook that can keep growing with anniversary trips, favorite reels, new photo sets, and future milestones."
    }
  ],
  gallery: [
    {
      title: "Just Married Portraits",
      caption: "Use this slot for your favorite wedding portrait or the photo that best captures your first moments as husband and wife.",
      fileHint: "assets/media/just-married-portrait.jpg"
    },
    {
      title: "Ceremony Details",
      caption: "Perfect for bouquet shots, rings, altar details, invitations, or one of those quiet beautiful still-life moments from the day.",
      fileHint: "assets/media/ceremony-details.jpg"
    },
    {
      title: "Reception Magic",
      caption: "First dance, laughter, table details, hugs, toasts, or the kind of candid image that says everything without trying.",
      fileHint: "assets/media/reception-magic.jpg"
    },
    {
      title: "Favorite Everyday Memory",
      caption: "This section does not have to be wedding-only. Add one of your favorite casual photos together — something warm, real, and unmistakably you.",
      fileHint: "assets/media/favorite-everyday-memory.jpg"
    }
  ],
  videos: [
    {
      title: "Wedding Highlight Reel",
      caption: "Add your ceremony and reception montage here for the cinematic version of your day.",
      fileHint: "assets/media/wedding-highlight-reel.mp4"
    },
    {
      title: "Instagram Reel Favorite",
      caption: "Use this section for a clip you already love from Instagram or a vertical edit you want people to revisit.",
      fileHint: "assets/media/instagram-favorite-reel.mp4"
    },
    {
      title: "Travel or Date-Night Memory",
      caption: "A simple clip from a trip, a concert, or a quiet night out can be just as meaningful as the wedding footage.",
      fileHint: "assets/media/date-night-memory.mp4"
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
          <span class="visual-hint">Replace with your real image</span>
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
          <span class="visual-hint">Ready for MP4 or embed</span>
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

renderStory();
renderTimeline();
renderGallery();
renderVideos();