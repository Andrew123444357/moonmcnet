// ---------- Settings ----------
const SERVER_IP = 'play.moon-mc.net'; // copied when clicking the players chip

// ---------- Toast helper ----------
const toast = document.getElementById('toast');
function showToast(msg='Copied'){ if(!toast) return;
  toast.textContent = msg; toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 1100);
}

// ---------- Click-to-copy on "Online Players" ----------
const players = document.getElementById('players');
async function doCopy() {
  try {
    await navigator.clipboard.writeText(SERVER_IP);
    showToast('Copied');
  } catch {
    alert('IP: ' + SERVER_IP);
  }
}
if (players){
  players.addEventListener('click', doCopy);
  players.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') doCopy();});
}
