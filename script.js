/* ======================
   🔒 ระบบรหัสลับ
====================== */
function checkPassword() {
  const pass = document.getElementById("password").value;
  if (pass === "143") {
    document.getElementById("lock").style.display = "none";
    document.getElementById("game").style.display = "block";
    loadQuestion();
  } else {
    document.getElementById("lockResult").innerHTML = "รหัสไม่ถูกนะ 😝";
  }
}

/* ======================
   ❓ คำถามทั้ง 5 ข้อ
====================== */
const questions = [
  {
    q: "เรารู้จักกันวันไหน 💕",
    choices: ["1 ม.ค.", "14 ก.พ.", "31 ธ.ค."],
    answer: 1
  },
  {
    q: "เธอชอบเราเพราะอะไร 😆",
    choices: ["หล่อมาก", "นิสัยดี", "เพราะมันใช่"],
    answer: 2
  },
  {
    q: "เวลาเธองอน เราควรทำยังไง 🥺",
    choices: ["เงียบใส่", "ปล่อยไป", "ง้อทันที"],
    answer: 2
  },
  {
    q: "เพลงไหนที่ฟังแล้วนึกถึงกัน 🎵",
    choices: ["เพลงรัก", "เพลงเศร้า", "ทุกเพลง"],
    answer: 2
  },
  {
    q: "คนที่เรารักที่สุดคือใคร ❤️",
    choices: ["เพื่อน", "ครอบครัว", "เธอไง"],
    answer: 2
  }
];

let current = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");

/* ======================
   ▶️ โหลดคำถาม
====================== */
function loadQuestion() {
  resultEl.innerHTML = "";
  const q = questions[current];
  questionEl.innerHTML = q.q;
  choicesEl.innerHTML = "";

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.innerHTML = choice;
    btn.onclick = () => checkAnswer(index);
    choicesEl.appendChild(btn);
  });
}

/* ======================
   ✅ เช็กคำตอบ
====================== */
function checkAnswer(index) {
  const buttons = document.querySelectorAll("#choices button");
  buttons.forEach(btn => btn.disabled = true);

  if (index === questions[current].answer) {
    resultEl.innerHTML = "ถูกต้อง 💖";
    navigator.vibrate(200);
    confettiHeart();

    setTimeout(() => {
      current++;
      if (current < questions.length) {
        loadQuestion();
      } else {
        showFinal();
      }
    }, 800);
  } else {
    resultEl.innerHTML = "ยังไม่ใช่น้า 😝";
    navigator.vibrate([100, 50, 100]);
    buttons.forEach(btn => btn.disabled = false);
  }
}

/* ======================
   🎉 หัวใจโปรย
====================== */
function confettiHeart() {
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = "24px";
    heart.style.animation = "fall 2s linear";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }
}

/* ======================
   💝 หน้าสุดท้าย
====================== */
function showFinal() {
  questionEl.innerHTML = "เซอไพรส์สุดท้าย 💝";
  choicesEl.innerHTML = `
    <p>ขอบคุณที่ผ่านทุกข้อมาได้นะ 💕</p>
    <img src="couple.jpg" style="width:100%;border-radius:15px;margin:10px 0;">
    <p>รักเธอมากที่สุดเลย 🥰</p>
    <button onclick="share()">📱 ส่งให้แฟน</button>
  `;
  resultEl.innerHTML = "";
}

/* ======================
   📱 แชร์ให้แฟน
====================== */
function share() {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({
      title: "เกมลับของเรา 💕",
      text: "ลองเล่นดูนะ เค้าทำให้เธอ ❤️",
      url: url
    });
  } else {
    alert("คัดลอกลิงก์นี้ไปส่งให้แฟนได้เลย 💌\n" + url);
  }

}
