const heroName = document.getElementById("heroName");
const typingText = document.getElementById("typingText");
const openBtn = document.getElementById("openBtn");
const surpriseSection = document.getElementById("surpriseSection");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const envelope = document.getElementById("envelope");
const letterPaper = document.getElementById("letterPaper");
const letterContent = document.getElementById("letterContent");
const confettiBtn = document.getElementById("confettiBtn");
const finalHidden = document.getElementById("finalHidden");
const finalMessageBox = document.getElementById("finalMessage");
const finalPopup = document.getElementById("finalPopup");
const closeFinalPopup = document.getElementById("closeFinalPopup");

heroName.textContent = "Meri Jaan ❤️";

const message = "I wanted to make one more little surprise — this time, built around your beautiful photos. ❤️";
let typingIndex = 0;
function typeMessage() {
  if (typingIndex < message.length) {
    typingText.textContent += message.charAt(typingIndex);
    typingIndex++;
    setTimeout(typeMessage, 42);
  }
}
typeMessage();

openBtn.addEventListener("click", () => {
  surpriseSection.classList.add("show");
  surpriseSection.scrollIntoView({ behavior: "smooth" });
  setTimeout(revealVisibleItems, 300);
});

let musicPlaying = false;
musicBtn.addEventListener("click", async () => {
  try {
    if (!musicPlaying) {
      await bgMusic.play();
      musicBtn.textContent = "❚❚ Pause Music";
    } else {
      bgMusic.pause();
      musicBtn.textContent = "♫ Play Music";
    }
    musicPlaying = !musicPlaying;
  } catch (error) {
    musicBtn.textContent = "Tap Again ♫";
  }
});

// Countdown
const targetDate = new Date("2026-08-01T00:00:00");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownNote = document.getElementById("countdownNote");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    countdownNote.textContent = "Girlfriend Day is here — time to make her smile 💕";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Featured slideshow
const featuredPhoto = document.getElementById("featuredPhoto");
const featuredTitle = document.getElementById("featuredTitle");
const featuredCaption = document.getElementById("featuredCaption");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const slideDots = document.getElementById("slideDots");

const featuredSlides = [
  { src: "photos/gallery1.png", title: "That soft smile.", caption: "Some smiles don’t just look pretty — they stay in the heart." },
  { src: "photos/gallery4.png", title: "Mood brightener.", caption: "You don’t just brighten the frame — you brighten the mood too." },
  { src: "photos/gallery6.png", title: "So effortlessly beautiful.", caption: "No matter the outfit or moment, your smile always steals the show." },
  { src: "photos/gallery9.png", title: "Our little moment.", caption: "Some pictures feel less like photos and more like a memory to hold onto." }
];

let currentSlide = 0;
let autoSlide;

function renderDots() {
  slideDots.innerHTML = "";
  featuredSlides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "slide-dot" + (index === currentSlide ? " active" : "");
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlide();
      restartAutoSlide();
    });
    slideDots.appendChild(dot);
  });
}

function updateSlide() {
  const slide = featuredSlides[currentSlide];
  featuredPhoto.src = slide.src;
  featuredTitle.textContent = slide.title;
  featuredCaption.textContent = slide.caption;
  renderDots();
}
function nextFeatured() {
  currentSlide = (currentSlide + 1) % featuredSlides.length;
  updateSlide();
}
function prevFeatured() {
  currentSlide = (currentSlide - 1 + featuredSlides.length) % featuredSlides.length;
  updateSlide();
}
function restartAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextFeatured, 3600);
}
prevSlide.addEventListener("click", () => { prevFeatured(); restartAutoSlide(); });
nextSlide.addEventListener("click", () => { nextFeatured(); restartAutoSlide(); });
updateSlide();
restartAutoSlide();

// Memory wheel
const wheelTitle = document.getElementById("wheelTitle");
const wheelCaption = document.getElementById("wheelCaption");
document.querySelectorAll(".wheel-photo").forEach((btn) => {
  btn.addEventListener("click", () => {
    wheelTitle.textContent = btn.dataset.title;
    wheelCaption.textContent = btn.dataset.caption;
  });
});

// Love game
const lovePlayground = document.getElementById("lovePlayground");
const noLoveBtn = document.getElementById("noLoveBtn");
const yesLoveBtn = document.getElementById("yesLoveBtn");
const loveAnswer = document.getElementById("loveAnswer");

function moveNoButton() {
  const containerRect = lovePlayground.getBoundingClientRect();
  const btnRect = noLoveBtn.getBoundingClientRect();
  const maxX = Math.max(20, containerRect.width - btnRect.width - 30);
  const maxY = Math.max(10, 120 - btnRect.height);
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  noLoveBtn.style.left = randomX + "px";
  noLoveBtn.style.top = randomY + "px";
}

["mouseenter", "click", "touchstart"].forEach((evt) => {
  noLoveBtn.addEventListener(evt, (e) => {
    e.preventDefault();
    moveNoButton();
  });
});

yesLoveBtn.addEventListener("click", () => {
  loveAnswer.textContent = "Knew it 😌💖  You just made this page 100x cuter.";
});

// Letter typing
const letterParagraphs = [
  "Sometimes a few pictures say more than long conversations. Looking at these photos, all I can think is how naturally beautiful you are and how easy it is to get lost in your smile.",
  "You have this soft, quiet charm that makes even the simplest photo feel special. And the truth is, it’s not just the pictures — it’s the person in them that makes everything feel brighter.",
  "So I made this little page with your photos, a few lines from my heart, and one small hope — that it makes you smile the way your smile always manages to make my day better."
];
const letterSignature = "Always yours,<br /><strong>Sahil</strong>";

function typeHTML(element, text, speed = 20, callback = null) {
  let i = 0;
  const timer = setInterval(() => {
    element.innerHTML = text.slice(0, i + 1);
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (callback) callback();
    }
  }, speed);
}

function startLetterTyping() {
  if (!letterContent || letterContent.dataset.done === "true") return;
  letterContent.dataset.done = "true";
  letterContent.innerHTML = "";

  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const sign = document.createElement("p");
  sign.className = "signature";

  letterContent.appendChild(p1);
  typeHTML(p1, letterParagraphs[0], 21, () => {
    letterContent.appendChild(p2);
    typeHTML(p2, letterParagraphs[1], 21, () => {
      letterContent.appendChild(p3);
      typeHTML(p3, letterParagraphs[2], 21, () => {
        letterContent.appendChild(sign);
        typeHTML(sign, letterSignature, 18);
      });
    });
  });
}

envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  setTimeout(() => {
    envelope.classList.add("hide");
    letterPaper.classList.add("show");
    startLetterTyping();
  }, 650);
});

// Reveal
const revealItems = [...document.querySelectorAll(".reveal, .gallery-card")];
function revealVisibleItems() {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 70) {
      item.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", revealVisibleItems);
window.addEventListener("load", revealVisibleItems);

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".memory-card img, #featuredPhoto, .wheel-photo img").forEach((image) => {
  image.addEventListener("click", () => {
    lightboxImage.src = image.src;
    lightbox.classList.add("show");
  });
});

function closeViewer() {
  lightbox.classList.remove("show");
}
closeLightbox.addEventListener("click", closeViewer);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeViewer();
});

// Floating hearts
const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function heartPath(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y + size / 4);
  ctx.bezierCurveTo(x - size, y - size / 2, x - size, y + size, x, y + size * 1.3);
  ctx.bezierCurveTo(x + size, y + size, x + size, y - size / 2, x, y + size / 4);
  ctx.closePath();
}

class Heart {
  constructor(burst = false) {
    this.x = burst ? window.innerWidth / 2 : Math.random() * window.innerWidth;
    this.y = burst ? window.innerHeight * 0.7 : window.innerHeight + 30;
    this.size = 5 + Math.random() * 10;
    this.speedY = burst ? -(2 + Math.random() * 5) : -(0.4 + Math.random() * 1.1);
    this.speedX = burst ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 0.7;
    this.alpha = 0.25 + Math.random() * 0.5;
    this.rotation = Math.random() * Math.PI;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += 0.01;
    if (this.y < -40 || this.x < -50 || this.x > window.innerWidth + 50) {
      this.x = Math.random() * window.innerWidth;
      this.y = window.innerHeight + 30;
      this.speedY = -(0.4 + Math.random() * 1.1);
      this.speedX = (Math.random() - 0.5) * 0.7;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = `rgba(255, 76, 132, ${this.alpha})`;
    heartPath(0, 0, this.size);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 42; i++) particles.push(new Heart());

function animateHearts() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateHearts);
}
animateHearts();

// Final surprise
confettiBtn.addEventListener("click", () => {
  for (let i = 0; i < 85; i++) particles.push(new Heart(true));
  confettiBtn.textContent = "Happy Girlfriend Day ❤️";
  finalHidden.classList.add("show");
  finalMessageBox.classList.add("celebrate");
  finalPopup.classList.add("show");
});

closeFinalPopup.addEventListener("click", () => {
  finalPopup.classList.remove("show");
});
finalPopup.addEventListener("click", (e) => {
  if (e.target === finalPopup) finalPopup.classList.remove("show");
});
