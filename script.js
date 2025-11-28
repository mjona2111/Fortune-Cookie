// --- Elements ---
const cookie1 = document.getElementById("cookie-1");
const cookie2 = document.getElementById("cookie-2");
const fortuneEl = document.getElementById("fortune");
const newFortuneBtn = document.getElementById("new-fortune");
const toggleBtn = document.getElementById("toggle-theme");
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

// --- Daily Limits & tracking ---
let dailyKeeps = 5;
let dailyTosses = 5;
let collectedFortunes = [];
let rareFortunes = [];
let currentFortune = null;
let goodFortunesCollected = 0;
let userLevel = 1;
const levelUpThreshold = 50;

// --- Hide open cookie and fortune initially ---
cookie2.style.display = "none";
fortuneEl.style.display = "none";

// --- Fortunes ---
const fortunes = [
  { text: "you will spill something 🍵", type: "bad", rarity: "common" },
  { text: "you will lose your keys 🔑", type: "bad", rarity: "common" },
  { text: "you will get stuck in traffic 🚗", type: "bad", rarity: "common" },
  { text: "you will forget your umbrella ☂️", type: "bad", rarity: "common" },
  { text: "you will burn your food 🍳", type: "bad", rarity: "common" },
  { text: "you will miss an important call 📞", type: "bad", rarity: "common" },
  { text: "you will lose track of time ⏳", type: "bad", rarity: "common" },
  { text: "you will get a flat tire 🚲", type: "bad", rarity: "common" },
  { text: "you will forget your wallet 💸", type: "bad", rarity: "common" },
  { text: "you will spill coffee on yourself ☕", type: "bad", rarity: "common" },
  { text: "you will get a paper cut 📄", type: "bad", rarity: "common" },
  { text: "you will step in a puddle 💦", type: "bad", rarity: "common" },
  { text: "you will lose an important document 📝", type: "bad", rarity: "common" },
  { text: "you will forget your password 🔐", type: "bad", rarity: "common" },
  { text: "you will get a sunburn ☀️", type: "bad", rarity: "common" },
  { text: "you will miss the bus 🚌", type: "bad", rarity: "common" },
  { text: "you will drop your phone 📱", type: "bad", rarity: "common" },
  { text: "you will forget an appointment 📅", type: "bad", rarity: "common" },
  { text: "you will get a headache 🤕", type: "bad", rarity: "common" },
  { text: "you will lose your sunglasses 🕶️", type: "bad", rarity: "common" },
  { text: "your phone will die when you need it 📱", type: "bad", rarity: "common" },
  { text: "you will trip over something 😂", type: "bad", rarity: "common" },
  { text: "you will forget something important 🧠", type: "bad", rarity: "common" },
  { text: "you’ll be late for something important ⏰", type: "bad", rarity: "common" },
  { text: "you will fail a test 😵‍💫", type: "bad", rarity: "common" },
  { text: "you’ll get caught in the rain 🌧️", type: "bad", rarity: "common" },
  { text: "someone’s thinking of you 💭", type: "good", rarity: "rare" },
  { text: "you will find something you lost 🔍", type: "good", rarity: "rare" },
  { text: "you will get a compliment today 😊", type: "good", rarity: "rare" },
  { text: "a surprise is waiting for you 🎁", type: "good", rarity: "rare" },
  { text: "you will make a new friend 🤝", type: "good", rarity: "rare" },
  { text: "you will achieve your goals for today 🎯", type: "good", rarity: "rare" },
  { text: "you will have a great day ahead 🌞", type: "good", rarity: "rare" },
  { text: "you will discover a hidden talent 🎨", type: "good", rarity: "rare" },
  { text: "you will receive good news 📬", type: "good", rarity: "rare" },
  { text: "you will find money unexpectedly 💰", type: "good", rarity: "rare" },
  { text: "you will enjoy a delicious meal 🍲", type: "good", rarity: "rare" },
  { text: "you will have a relaxing day 🛀", type: "good", rarity: "rare" },
  { text: "you will accomplish something great today 🏆", type: "good", rarity: "rare" },
  { text: "you will receive a thoughtful gift 🎁", type: "good", rarity: "rare" },
  { text: "you will experience a moment of joy 😊", type: "good", rarity: "rare" },
  { text: "you will find a new opportunity 🌟", type: "good", rarity: "rare" },

];

const tossKeepContainer = document.createElement("div");
tossKeepContainer.id = "toss-keep-container";
tossKeepContainer.style.display = "flex";
tossKeepContainer.style.justifyContent = "center";
tossKeepContainer.style.gap = "10px";
tossKeepContainer.style.marginTop = "10px"; // less space

// Toss button
const tossBtn = document.createElement("button");
tossBtn.textContent = `🗑️ Toss (${dailyTosses})`;
tossBtn.id = "toss-btn";
tossBtn.style.fontSize = "1.2rem";
tossBtn.style.padding = "10px 20px";

// Keep button
const keepBtn = document.createElement("button");
keepBtn.textContent = `⭐️ Keep (${dailyKeeps})`;
keepBtn.id = "keep-btn";
keepBtn.style.fontSize = "1.2rem";
keepBtn.style.padding = "10px 20px";

// Append buttons to container
tossKeepContainer.appendChild(tossBtn);
tossKeepContainer.appendChild(keepBtn);
newFortuneBtn.parentNode.appendChild(tossKeepContainer);

// --- Functions ---
function revealFortune() {
  cookie1.classList.add("shake");

  setTimeout(() => {
    cookie1.classList.remove("shake");
    cookie1.style.display = "none";
    cookie2.style.display = "block";
    fortuneEl.style.display = "block";

    currentFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    fortuneEl.textContent = currentFortune.text;
  }, 400);
}

function updateStats() {
  document.getElementById("level").textContent = userLevel;
  document.getElementById("good-count").textContent = goodFortunesCollected;
  localStorage.setItem("level", userLevel);
  localStorage.setItem("goodFortunes", goodFortunesCollected);
  localStorage.setItem("collectedFortunes", JSON.stringify(collectedFortunes));
}

// Load stats from localStorage
userLevel = parseInt(localStorage.getItem("level")) || 1;
goodFortunesCollected = parseInt(localStorage.getItem("goodFortunes")) || 0;
collectedFortunes = JSON.parse(localStorage.getItem("collectedFortunes")) || [];
updateStats();

// --- Event Listeners ---
// Another Fortune
newFortuneBtn.addEventListener("click", () => {
  cookie1.style.display = "block";
  cookie2.style.display = "none";
  fortuneEl.style.display = "none";
  revealFortune();
});

// Toss a fortune
tossBtn.addEventListener("click", () => {
  if (!currentFortune) return;
  if (dailyTosses <= 0) return alert("No tosses left today!");
  dailyTosses--;
  tossBtn.textContent = `🗑️ Toss (${dailyTosses})`;

  // Only reveal new fortune if user wants
  fortuneEl.textContent = ""; // optional: clear fortune
  currentFortune = null;
});

// Keep a fortune
keepBtn.addEventListener("click", () => {
  if (!currentFortune) return;
  if (dailyKeeps <= 0) return alert("No keeps left today!");
  dailyKeeps--;
  keepBtn.textContent = `⭐️ Keep (${dailyKeeps})`;

  collectedFortunes.push(currentFortune.text);
  if (currentFortune.rarity === "rare") rareFortunes.push(currentFortune.text);

  if (currentFortune.type === "good") {
    goodFortunesCollected++;
    if (goodFortunesCollected >= levelUpThreshold) {
      userLevel++;
      goodFortunesCollected = 0;
      alert(`🎉 Congrats! You've leveled up to Level ${userLevel}!`);
    }
  }

  updateStats();
  // Keep the fortune displayed until user clicks "Another Fortune"
});

// Dark Mode toggle
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌑 Dark Mode";
});

// Music toggle

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicToggle.textContent = "🔊 Music On";
  } else {
    music.pause();
    musicToggle.textContent = "🔇 Music Off";
  }
});

// Auto-play music once on first click
document.body.addEventListener(
  "click",
  () => {
    if (music.paused) music.play().catch(() => {});
  },
  { once: true }
);

