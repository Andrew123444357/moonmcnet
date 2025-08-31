// ---------- Settings you can change ----------
const SERVER_IP = 'play.yourserver.net'; // change to your host/ip

// ---------- Copy IP button ----------
const copyBtn = document.getElementById('copyIp');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = 'Copy IP'), 1100);
    } catch {
      alert('IP: ' + SERVER_IP);
    }
  });
}

// ---------- Footer year (if used) ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Animated background (canvas starfield) ----------
const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d', { alpha: true });
let stars = [];
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  const count = Math.min(250, Math.floor((w * h) / 6000));
  stars = new Array(count).fill(0).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random() * 0.9 + 0.1,          // depth [0.1..1]
    r: Math.random() * 1.1 + 0.2,          // radius
    s: Math.random() * 0.35 + 0.05,        // speed
    tw: Math.random() * Math.PI * 2        // twinkle phase
  }));
}
resize();
window.addEventListener('resize', resize);

function tick(t) {
  ctx.clearRect(0, 0, w, h);

  // subtle gradient glow
  const g = ctx.createRadialGradient(w*0.5, h*0.1, 0, w*0.5, h*0.1, Math.max(w,h));
  g.addColorStop(0, 'rgba(139,92,246,0.14)');
  g.addColorStop(0.35, 'rgba(34,197,94,0.10)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  for (const s of stars) {
    s.x += s.s * s.z;                 // parallax drift
    s.y += s.s * 0.4;
    if (s.x > w + 10) s.x = -10;
    if (s.y > h + 10) s.y = -10;

    const tw = 0.65 + Math.sin(t/600 + s.tw) * 0.35; // twinkle
    ctx.globalAlpha = 0.5 + 0.5 * tw * s.z;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * (0.6 + s.z), 0, Math.PI*2);
    ctx.fillStyle = '#e6e9ef';
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
