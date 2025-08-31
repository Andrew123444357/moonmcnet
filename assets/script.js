// ---- Settings you can change ----
const SERVER_IP = 'play.yourserver.net'; // change to your IP/host

// Copy IP to clipboard button
const copyBtn = document.getElementById('copyIp');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      copyBtn.textContent = '✅';
      setTimeout(() => (copyBtn.textContent = '📋'), 1200);
    } catch (e) {
      alert('Could not copy. IP: ' + SERVER_IP);
    }
  });
}

// Footer year (if used)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
