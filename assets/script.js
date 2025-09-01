// IP to copy
const SERVER_IP = 'play.moon-mc.net';

// Toast
const toast = document.getElementById('toast');
function showToast(msg='Copied'){
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 1100);
}

// Click-to-copy for Online Players
const players = document.getElementById('players');
async function copyIP(){
  try{
    await navigator.clipboard.writeText(SERVER_IP);
    showToast('Copied');
  }catch{
    alert('IP: ' + SERVER_IP);
  }
}
if(players){
  players.addEventListener('click', copyIP);
  players.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') copyIP(); });
}
