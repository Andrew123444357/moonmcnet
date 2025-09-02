// Subtle sparkle field (lightweight + original)
(function(){
  const c = document.getElementById('fx');
  if(!c) return;
  const x = c.getContext('2d', {alpha:true});
  let W=0,H=0, D=[], P=[];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function size(){
    W = c.width = innerWidth;
    H = c.height = innerHeight;
    const dots = Math.min(120, Math.floor(W*H/22000));
    const pix  = Math.min(64,  Math.floor(W*H/50000));
    D = Array.from({length:dots},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+0.6,s:Math.random()*0.3+0.06,t:Math.random()*6.283}));
    P = Array.from({length:pix },()=>({x:Math.random()*W,y:Math.random()*H,sz:Math.floor(Math.random()*3+2),sp:Math.random()*0.25+0.05,rot:Math.random()*Math.PI,tw:Math.random()*6.283}));
  }
  size(); addEventListener('resize', size);

  function frame(t){
    x.clearRect(0,0,W,H);
    // bokeh dots
    for(const d of D){
      d.x += d.s*0.6; d.y += d.s*0.35;
      if(d.x>W+6) d.x=-6; if(d.y>H+6) d.y=-6;
      const a = 0.35 + 0.35*Math.sin(t/900 + d.t);
      x.globalAlpha = a; x.beginPath(); x.arc(d.x,d.y,d.r,0,6.283); x.fillStyle = '#e6e9ef'; x.fill();
    }
    // pixel sparks
    x.globalAlpha = 0.35;
    for(const p of P){
      p.y -= p.sp; if(p.y<-6){ p.y=H+6; p.x=Math.random()*W; }
      const a = 0.5 + 0.5*Math.sin(t/800 + p.tw);
      x.save(); x.translate(p.x,p.y); x.rotate(p.rot);
      x.fillStyle = `rgba(230,233,239,${0.25*a})`;
      x.fillRect(-p.sz/2, -p.sz/2, p.sz, p.sz);
      x.restore();
    }
    x.globalAlpha = 1;
    if(!reduce) requestAnimationFrame(frame);
  }
  if(!reduce) requestAnimationFrame(frame);
})();
