"use strict";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const displayName = "Meri Jaan ❤️";
const targetDate = new Date("2026-08-01T00:00:00");
const introMessage = "Some people make life brighter without even trying. You are that person for me — and this little world is made from our real memories. ❤️";

const photos = [
  { src: "photos/photo1.png", title: "You + me = my favourite place.", caption: "The kind of memory that turns an ordinary day into something worth keeping." },
  { src: "photos/photo2.png", title: "Your smile still wins.", caption: "A soft little smile that can make the whole day feel lighter." },
  { src: "photos/photo3.png", title: "Right beside you feels like home.", caption: "Some comfort does not need words — only the right person close by." },
  { src: "photos/photo4.png", title: "Our random moments are the best ones.", caption: "Nothing planned, nothing perfect, and somehow still one of my favourite memories." },
  { src: "photos/photo5.png", title: "A smile I would keep forever.", caption: "The silly, unfiltered moments always stay the longest in the heart." },
  { src: "photos/photo6.png", title: "Just us, being us.", caption: "Ordinary time becomes special when I get to share it with you." },
  { src: "photos/photo7.png", title: "The quiet little moments.", caption: "Even doing nothing feels like a memory when it is with the right person." },
  { src: "photos/photo8.jpg", title: "You shine in every version of you.", caption: "Grace, warmth, and that beautiful smile — all in one frame." },
  { src: "photos/photo9.png", title: "You make every frame brighter.", caption: "Some people do not need perfect lighting; they carry their own glow." },
  { src: "photos/photo10.png", title: "Still stealing my heart.", caption: "No matter how many times I see you, the feeling somehow stays new." }
];

const randomCaptions = [
  "You make even quiet moments feel special.",
  "A little memory, a very big feeling.",
  "The camera captured the moment; my heart kept it.",
  "No perfect pose needed when the feeling is real.",
  "One of those moments I would happily live twice.",
  "Some smiles deserve their own place in forever.",
  "This is what happiness looked like for a second.",
  "Nothing fancy — just one of my favourite people."
];

const heroName = $("#heroName");
const typingText = $("#typingText");
const openBtn = $("#openBtn");
const peekBtn = $("#peekBtn");
const scrollCue = $("#scrollCue");
const experience = $("#experience");
const musicBtn = $("#musicBtn");
const musicText = $("#musicText");
const bgMusic = $("#bgMusic");
const scrollProgress = $("#scrollProgress");

heroName.textContent = displayName;

let typeIndex = 0;
function typeIntro() {
  if (typeIndex < introMessage.length) {
    typingText.textContent += introMessage.charAt(typeIndex);
    typeIndex += 1;
    setTimeout(typeIntro, 30);
  }
}
typeIntro();

function openExperience(tryMusic = true) {
  document.body.classList.add("opened");
  experience.setAttribute("aria-hidden", "false");
  setTimeout(() => experience.scrollIntoView({ behavior: "smooth", block: "start" }), 160);
  setTimeout(revealVisible, 350);
  if (tryMusic && bgMusic.paused) playMusic();
  burstHearts(openBtn, 24);
}

openBtn.addEventListener("click", () => openExperience(true));
peekBtn.addEventListener("click", () => {
  document.body.classList.add("opened");
  experience.setAttribute("aria-hidden", "false");
  $("#featuredMemories").scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(revealVisible, 300);
});
scrollCue.addEventListener("click", () => openExperience(false));

let musicPlaying = false;
async function playMusic() {
  try {
    await bgMusic.play();
    musicPlaying = true;
    musicBtn.classList.add("playing");
    musicText.textContent = "Pause our song";
    musicBtn.setAttribute("aria-label", "Pause background music");
  } catch (_) {
    musicText.textContent = "Tap to play";
  }
}
function pauseMusic() {
  bgMusic.pause();
  musicPlaying = false;
  musicBtn.classList.remove("playing");
  musicText.textContent = "Play our song";
  musicBtn.setAttribute("aria-label", "Play background music");
}
musicBtn.addEventListener("click", () => (musicPlaying ? pauseMusic() : playMusic()));

function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  scrollProgress.style.width = `${Math.min(100, value)}%`;
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

const revealItems = $$(".reveal");
const observer = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

function revealVisible() {
  revealItems.forEach((item) => {
    if (item.getBoundingClientRect().top < window.innerHeight - 60) item.classList.add("visible");
  });
}
revealItems.forEach((item) => observer ? observer.observe(item) : item.classList.add("visible"));
window.addEventListener("load", revealVisible);

const daysEl = $("#days");
const hoursEl = $("#hours");
const minutesEl = $("#minutes");
const secondsEl = $("#seconds");
const countdownNote = $("#countdownNote");
function updateCountdown() {
  const difference = targetDate - new Date();
  if (difference <= 0) {
    [daysEl, hoursEl, minutesEl, secondsEl].forEach((item) => item.textContent = "00");
    countdownNote.textContent = "Girlfriend Day is here — today is officially yours. 💕";
    return;
  }
  daysEl.textContent = String(Math.floor(difference / 86400000)).padStart(2, "0");
  hoursEl.textContent = String(Math.floor(difference / 3600000) % 24).padStart(2, "0");
  minutesEl.textContent = String(Math.floor(difference / 60000) % 60).padStart(2, "0");
  secondsEl.textContent = String(Math.floor(difference / 1000) % 60).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const featuredPhoto = $("#featuredPhoto");
const featuredTitle = $("#featuredTitle");
const featuredCaption = $("#featuredCaption");
const slideNumber = $("#slideNumber");
const featureCard = $("#featureCard");
const featurePhotoWrap = $(".feature-photo-wrap");
const slideDots = $("#slideDots");
let currentSlide = 0;
let slideTimer;
let touchStartX = 0;

function renderDots() {
  slideDots.innerHTML = "";
  photos.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `slide-dot${index === currentSlide ? " active" : ""}`;
    button.setAttribute("aria-label", `Show memory ${index + 1}`);
    button.addEventListener("click", () => {
      currentSlide = index;
      updateSlide();
      restartSlideTimer();
    });
    slideDots.appendChild(button);
  });
}

function updateSlide() {
  featurePhotoWrap.classList.add("change");
  setTimeout(() => {
    const photo = photos[currentSlide];
    featuredPhoto.src = photo.src;
    featuredPhoto.alt = photo.title;
    featuredTitle.textContent = photo.title;
    featuredCaption.textContent = photo.caption;
    slideNumber.textContent = String(currentSlide + 1).padStart(2, "0");
    renderDots();
    featurePhotoWrap.classList.remove("change");
  }, 220);
}
function nextSlide() { currentSlide = (currentSlide + 1) % photos.length; updateSlide(); }
function prevSlide() { currentSlide = (currentSlide - 1 + photos.length) % photos.length; updateSlide(); }
function restartSlideTimer() { clearInterval(slideTimer); slideTimer = setInterval(nextSlide, 4700); }
$("#nextSlide").addEventListener("click", () => { nextSlide(); restartSlideTimer(); });
$("#prevSlide").addEventListener("click", () => { prevSlide(); restartSlideTimer(); });
featureCard.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
featureCard.addEventListener("touchend", (event) => {
  const difference = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(difference) > 45) difference < 0 ? nextSlide() : prevSlide();
  restartSlideTimer();
}, { passive: true });
renderDots();
restartSlideTimer();

$("#heartReact").addEventListener("click", (event) => {
  burstHearts(event.currentTarget, 22);
  event.currentTarget.textContent = "♥";
  setTimeout(() => event.currentTarget.textContent = "♡", 900);
});

const orbitTitle = $("#orbitTitle");
const orbitCaption = $("#orbitCaption");
$$(".orbit-photo").forEach((button) => {
  button.addEventListener("click", () => {
    orbitTitle.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 320 });
    orbitCaption.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 430 });
    orbitTitle.textContent = button.dataset.title;
    orbitCaption.textContent = button.dataset.caption;
    burstHearts(button, 12);
  });
});

const toast = $("#toast");
const toastText = $("#toastText");
let toastTimer;
function showToast(message, icon = "💗") {
  clearTimeout(toastTimer);
  $("#toastIcon").textContent = icon;
  toastText.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4300);
}
$("#closeToast").addEventListener("click", () => toast.classList.remove("show"));
$$(".reason-card").forEach((card) => card.addEventListener("click", () => {
  showToast(card.dataset.note, card.querySelector(".reason-icon").textContent);
  burstHearts(card, 14);
}));

const galleryItems = $$(".gallery-item");
const lightbox = $("#lightbox");
const lightboxImage = $("#lightboxImage");
const lightboxCaption = $("#lightboxCaption");
let lightboxIndex = 0;
function openLightbox(index) {
  lightboxIndex = (index + photos.length) % photos.length;
  lightboxImage.src = photos[lightboxIndex].src;
  lightboxImage.alt = photos[lightboxIndex].title;
  lightboxCaption.textContent = photos[lightboxIndex].title;
  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("show");
  document.body.style.overflow = "";
}
function lightboxMove(direction) { openLightbox(lightboxIndex + direction); }
galleryItems.forEach((item) => item.addEventListener("click", () => openLightbox(Number(item.dataset.index))));
featuredPhoto.addEventListener("click", () => openLightbox(currentSlide));
$$(".orbit-photo img").forEach((image) => image.addEventListener("dblclick", () => {
  const index = photos.findIndex((photo) => image.src.endsWith(photo.src.replace("photos/", "")));
  openLightbox(index < 0 ? 0 : index);
}));
$("#closeLightbox").addEventListener("click", closeLightbox);
$("#lightboxPrev").addEventListener("click", () => lightboxMove(-1));
$("#lightboxNext").addEventListener("click", () => lightboxMove(1));
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
window.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("show")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") lightboxMove(-1);
  if (event.key === "ArrowRight") lightboxMove(1);
});

const shufflePhoto = $("#shufflePhoto");
const shuffleImage = $("#shuffleImage");
const shuffleCaption = $("#shuffleCaption");
let lastShuffleIndex = -1;
$("#shuffleBtn").addEventListener("click", (event) => {
  let index;
  do { index = Math.floor(Math.random() * photos.length); } while (index === lastShuffleIndex && photos.length > 1);
  lastShuffleIndex = index;
  shufflePhoto.classList.add("changing");
  setTimeout(() => {
    shuffleImage.src = photos[index].src;
    shuffleImage.alt = photos[index].title;
    shuffleCaption.textContent = randomCaptions[Math.floor(Math.random() * randomCaptions.length)];
    shufflePhoto.classList.remove("changing");
    shufflePhoto.animate([{ transform: "rotate(-2deg) scale(.96)" }, { transform: "rotate(2deg) scale(1)" }], { duration: 480, easing: "cubic-bezier(.2,.8,.2,1)" });
  }, 300);
  burstHearts(event.currentTarget, 18);
});

const lovePlayground = $("#lovePlayground");
const noLoveBtn = $("#noLoveBtn");
const yesLoveBtn = $("#yesLoveBtn");
const loveAnswer = $("#loveAnswer");
function moveNoButton(event) {
  event?.preventDefault();
  const area = $("#loveButtons").getBoundingClientRect();
  const buttonRect = noLoveBtn.getBoundingClientRect();
  const maxX = Math.max(20, area.width - buttonRect.width - 8);
  const maxY = Math.max(70, area.height - buttonRect.height - 5);
  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * maxY);
  noLoveBtn.style.left = `${x}px`;
  noLoveBtn.style.top = `${y}px`;
  noLoveBtn.style.transform = "none";
  loveAnswer.textContent = ["That button is a little shy 😌", "Oops… it escaped again 😂", "Nice try, meri jaan 💕"][Math.floor(Math.random() * 3)];
}
["mouseenter", "pointerdown", "touchstart"].forEach((name) => noLoveBtn.addEventListener(name, moveNoButton, { passive: false }));
yesLoveBtn.addEventListener("click", (event) => {
  loveAnswer.textContent = "Knew it 😌💖 You just made this page 100x cuter.";
  burstHearts(event.currentTarget, 34);
  yesLoveBtn.textContent = "Best answer ever 💖";
});

const envelope = $("#envelope");
const letterPaper = $("#letterPaper");
const letterContent = $("#letterContent");
const letterParagraphs = [
  "From the very beginning, there was something about you that felt different. The more moments I spent with you, the more I realised that your smile brings a kind of peace to my heart that words can barely explain.",
  "I love the way you make ordinary days feel beautiful. Your little expressions, our random talks, the silly moments, and the way you stay in my mind long after every conversation — all of it has quietly become one of my favourite parts of life.",
  "If I could wish for one thing today, it would simply be this: may your smile always stay the same, and may I always have a place somewhere in the memories that make you happy. You are genuinely special to me, and this surprise is just a tiny piece of what I feel for you."
];
function typeText(element, text, speed, done) {
  let index = 0;
  const timer = setInterval(() => {
    element.textContent = text.slice(0, index + 1);
    index += 1;
    if (index >= text.length) {
      clearInterval(timer);
      if (done) done();
    }
  }, speed);
}
function startLetterTyping() {
  if (letterContent.dataset.typed === "true") return;
  letterContent.dataset.typed = "true";
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const signature = document.createElement("p");
  signature.className = "signature";
  letterContent.appendChild(p1);
  typeText(p1, letterParagraphs[0], 16, () => {
    letterContent.appendChild(p2);
    typeText(p2, letterParagraphs[1], 16, () => {
      letterContent.appendChild(p3);
      typeText(p3, letterParagraphs[2], 16, () => {
        letterContent.appendChild(signature);
        typeText(signature, "Always yours, Sahil ❤️", 28);
      });
    });
  });
}
envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  burstHearts(envelope, 20);
  setTimeout(() => {
    envelope.classList.add("hide");
    letterPaper.classList.add("show");
    letterPaper.setAttribute("aria-hidden", "false");
    startLetterTyping();
  }, 950);
});

const promiseHeart = $("#promiseHeart");
const promiseCopy = $("#promiseCopy");
promiseHeart.addEventListener("click", () => {
  promiseCopy.classList.toggle("show");
  burstHearts(promiseHeart, 24);
});

const finalBtn = $("#finalBtn");
const finalCard = $("#finalCard");
const finalSecret = $("#finalSecret");
const finalPopup = $("#finalPopup");
finalBtn.addEventListener("click", () => {
  finalSecret.classList.add("show");
  finalCard.classList.add("celebrate");
  finalPopup.classList.add("show");
  massiveCelebration();
  finalBtn.textContent = "Happy Girlfriend Day ❤️";
});
function closeFinalPopup() { finalPopup.classList.remove("show"); }
$("#closeFinalPopup").addEventListener("click", closeFinalPopup);
finalPopup.addEventListener("click", (event) => { if (event.target === finalPopup) closeFinalPopup(); });

function centerOf(element) {
  const rect = element.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}
function burstHearts(element, count = 16) {
  const origin = centerOf(element);
  for (let index = 0; index < count; index += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-burst-heart";
    heart.textContent = Math.random() > .3 ? "♥" : "✦";
    heart.style.left = `${origin.x}px`;
    heart.style.top = `${origin.y}px`;
    const angle = Math.random() * Math.PI * 2;
    const distance = 45 + Math.random() * 120;
    heart.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    heart.style.setProperty("--dy", `${Math.sin(angle) * distance - 35}px`);
    heart.style.setProperty("--rot", `${Math.random() * 180 - 90}deg`);
    heart.style.fontSize = `${12 + Math.random() * 17}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1400);
  }
}
function massiveCelebration() {
  const fake = { getBoundingClientRect: () => ({ left: window.innerWidth / 2, top: window.innerHeight * .68, width: 1, height: 1 }) };
  for (let wave = 0; wave < 5; wave += 1) setTimeout(() => burstHearts(fake, 38), wave * 210);
  sparkleBurst(180);
}

let lastCursorHeart = 0;
window.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") return;
  const now = performance.now();
  if (now - lastCursorHeart < 75) return;
  lastCursorHeart = now;
  const heart = document.createElement("span");
  heart.className = "cursor-heart";
  heart.textContent = Math.random() > .25 ? "♥" : "✦";
  heart.style.left = `${event.clientX + 4}px`;
  heart.style.top = `${event.clientY + 4}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}, { passive: true });

const canvas = $("#sparkleCanvas");
const context = canvas.getContext("2d");
let particles = [];
let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
function resizeCanvas() {
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * pixelRatio);
  canvas.height = Math.floor(window.innerHeight * pixelRatio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}
class Sparkle {
  constructor(burst = false) {
    this.reset(burst);
  }
  reset(burst = false) {
    this.x = burst ? window.innerWidth / 2 + (Math.random() - .5) * 120 : Math.random() * window.innerWidth;
    this.y = burst ? window.innerHeight * .68 : window.innerHeight + Math.random() * 160;
    this.size = 1.4 + Math.random() * 4;
    this.vx = burst ? (Math.random() - .5) * 8 : (Math.random() - .5) * .35;
    this.vy = burst ? -(2 + Math.random() * 6) : -(.25 + Math.random() * .75);
    this.alpha = .2 + Math.random() * .55;
    this.life = burst ? 70 + Math.random() * 80 : Infinity;
    this.hue = Math.random() > .5 ? 338 : 275;
    this.shape = Math.random() > .45 ? "heart" : "spark";
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.life !== Infinity) {
      this.life -= 1;
      this.alpha *= .985;
    }
    if (this.y < -30 || this.x < -40 || this.x > window.innerWidth + 40 || this.life <= 0) this.reset(false);
  }
  draw() {
    context.save();
    context.translate(this.x, this.y);
    context.globalAlpha = this.alpha;
    context.fillStyle = `hsl(${this.hue} 92% 67%)`;
    if (this.shape === "heart") {
      const s = this.size;
      context.beginPath();
      context.moveTo(0, s * .35);
      context.bezierCurveTo(-s * 1.2, -s * .55, -s * 1.35, s * .85, 0, s * 1.55);
      context.bezierCurveTo(s * 1.35, s * .85, s * 1.2, -s * .55, 0, s * .35);
      context.fill();
    } else {
      context.fillRect(-this.size / 2, -this.size * 2, this.size, this.size * 4);
      context.fillRect(-this.size * 2, -this.size / 2, this.size * 4, this.size);
    }
    context.restore();
  }
}
function sparkleBurst(count = 100) {
  for (let index = 0; index < count; index += 1) particles.push(new Sparkle(true));
}
function animateCanvas() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((particle) => { particle.update(); particle.draw(); });
  if (particles.length > 320) particles = particles.slice(-320);
  requestAnimationFrame(animateCanvas);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
for (let index = 0; index < 42; index += 1) {
  const particle = new Sparkle(false);
  particle.y = Math.random() * window.innerHeight;
  particles.push(particle);
}
animateCanvas();

$$('.btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    ripple.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,.36);left:${event.clientX - rect.left - size/2}px;top:${event.clientY - rect.top - size/2}px;transform:scale(0);pointer-events:none;animation:ripple .55s ease-out forwards;`;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});
const style = document.createElement('style');
style.textContent = '@keyframes ripple{to{transform:scale(1);opacity:0}}';
document.head.appendChild(style);
