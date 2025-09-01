// Settings
const SERVER_IP = 'play.moon-mc.net';

// Toast
const toast = document.getElementById('toast') || (() => {
  const el = document.createElement('div');
  el.id = 'toast'; el.className = 'toast'; el.setAttribute('aria-live','polite');
  document.body.appendChild(el); return el;
})();
function showToast(msg='Copied'){ toast.textContent = msg; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'), 1100); }

// Copy IP
const copyBtn = document.getElementById('copyIp');
async function doCopy(){ try{ await navigator.clipboard.writeText(SERVER_IP); showToast('Copied'); } catch { alert('IP: ' + SERVER_IP); } }
if(copyBtn){ copyBtn.addEventListener('click', doCopy); copyBtn.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') doCopy(); }); }

// Animated star field overlay (light, minimal)
const cvs = document.getElementById('stars'); const ctx = cvs.getContext('2d', {alpha:true}); let W=0,H=0,ST=[];
function size(){ W=cvs.width=window.innerWidth; H=cvs.height=window.innerHeight; const n=Math.min(180,Math.floor(W*H/15000)); ST=new Array(n).fill(0).map(()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*.9+.1,s:Math.random()*.3+.05,r:Math.random()*1+0.3,t:Math.random()*6.28})); }
function loop(t){ ctx.clearRect(0,0,W,H); for(const s of ST){ s.x+=s.s*s.z; s.y+=s.s*.35; if(s.x>W+8) s.x=-8; if(s.y>H+8) s.y=-8; const a=.5+.5*Math.sin(t/800+s.t)*s.z; ctx.globalAlpha=a*.6; ctx.beginPath(); ctx.arc(s.x,s.y,s.r*(.6+s.z),0,6.283); ctx.fillStyle='#e6e9ef'; ctx.fill(); } ctx.globalAlpha=1; requestAnimationFrame(loop); }
size(); window.addEventListener('resize', size); requestAnimationFrame(loop);
