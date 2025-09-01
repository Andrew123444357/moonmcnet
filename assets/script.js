// Minimal, bespoke particle effect (subtle bokeh + pixel sparks)
(function(){
  const canvas = document.getElementById('fx');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  let W=0,H=0, P=[], PIX=[];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

    const dots = Math.min(110, Math.floor(W*H/22000));
    const pix  = Math.min(60, Math.floor(W*H/50000));

    P = new Array(dots).fill(0).map(()=>({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*1.4+0.6,
      s: Math.random()*0.3+0.05,
      t: Math.random()*Math.PI*2
    }));

    PIX = new Array(pix).fill(0).map(()=>({
      x: Math.random()*W,
      y: Math.random()*H,
      sz: Math.floor(Math.random()*3+2),    // pixel square size
      sp: Math.random()*0.25+0.05,
      rot: Math.random()*Math.PI,
      tw: Math.random()*Math.PI*2
    }));
  }
  resize();
  window.addEventListener('resize', resize);

  function frame(t){
    ctx.clearRect(0,0,W,H);

    // Bokeh dots
    for(const p of P){
      p.x += p.s*0.6; p.y += p.s*0.35;
      if(p.x>W+5) p.x = -5;
      if(p.y>H+5) p.y = -5;
      const a = 0.35 + 0.35*Math.sin(t/900 + p.t);
      ctx.globalAlpha = a;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.283); ctx.fillStyle = '#e6e9ef'; ctx.fill();
    }

    // Pixel sparks (minecraft-y)
    ctx.globalAlpha = 0.35;
    for(const s of PIX){
      s.y -= s.sp;
      if(s.y < -6) { s.y = H+6; s.x = Math.random()*W; }
      const a = 0.5 + 0.5*Math.sin(t/800 + s.tw);
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.fillStyle = `rgba(230,233,239,${0.25*a})`;
      ctx.fillRect(-s.sz/2, -s.sz/2, s.sz, s.sz);
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    if(!reduce) requestAnimationFrame(frame);
  }
  if(!reduce) requestAnimationFrame(frame);
})();
