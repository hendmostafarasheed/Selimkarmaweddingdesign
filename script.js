// Glitter + falling rose petals on both pages
(function(){
 const c=document.getElementById('glitter'); if(!c)return; const ctx=c.getContext('2d'); let w,h,pts=[];
 function resize(){w=c.width=innerWidth*devicePixelRatio;h=c.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);w=innerWidth;h=innerHeight;pts=Array.from({length:65},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.5+.4,a:Math.random(),s:Math.random()*.018+.006}))}
 function draw(){ctx.clearRect(0,0,w,h);for(const p of pts){p.a+=p.s;if(p.a>1||p.a<0)p.s*=-1;ctx.globalAlpha=Math.max(.05,p.a);ctx.fillStyle=Math.random()>.72?'#d21a32':'#ddd';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}resize();addEventListener('resize',resize);draw();
})();
(function(){const box=document.getElementById('petals');if(!box)return;function petal(){const p=document.createElement('i');p.className='petal'+(Math.random()>.82?' silver':'');p.style.left=Math.random()*100+'vw';p.style.animationDuration=(6+Math.random()*7)+'s';p.style.animationDelay=Math.random()*2+'s';p.style.setProperty('--drift',(Math.random()*180-90)+'px');p.style.transform='rotate('+Math.random()*180+'deg)';box.appendChild(p);setTimeout(()=>p.remove(),15000)}setInterval(petal,900);for(let i=0;i<9;i++)setTimeout(petal,i*250)})();
const target=new Date('2026-11-08T18:00:00+02:00').getTime();const cd=document.getElementById('countdown');
if(cd){function tick(){const d=target-Date.now();if(d<=0){cd.innerHTML='<div class="unit" style="grid-column:1/-1"><strong>♥</strong><span>THE CELEBRATION HAS STARTED</span></div>';return}const days=Math.floor(d/86400000),h=Math.floor(d%86400000/3600000),m=Math.floor(d%3600000/60000),s=Math.floor(d%60000/1000);cd.innerHTML=`<div class="unit"><strong>${days}</strong><span>DAYS</span></div><div class="unit"><strong>${String(h).padStart(2,'0')}</strong><span>HOURS</span></div><div class="unit"><strong>${String(m).padStart(2,'0')}</strong><span>MINUTES</span></div><div class="unit"><strong>${String(s).padStart(2,'0')}</strong><span>SECONDS</span></div>`}tick();setInterval(tick,1000)}
const total=document.getElementById('total');if(total){const key='selim-karma-celebrations';total.textContent=localStorage.getItem(key)||0;document.getElementById('celebrate').onclick=e=>{let n=Number(localStorage.getItem(key)||0)+1;localStorage.setItem(key,n);total.textContent=n;const x=document.createElement('span');x.className='heart';x.textContent='♥';x.style.left=e.clientX-10+'px';x.style.top=e.clientY-10+'px';document.body.appendChild(x);setTimeout(()=>x.remove(),900)}}
const share=document.getElementById('share');if(share)share.onclick=async()=>{const data={title:'Selim & Karma — Wedding Invitation',text:'You are invited to celebrate Selim & Karma • 08/11/2026 • 6:00 PM – 12:00 AM • Sheraton Cairo',url:location.href};if(navigator.share){try{await navigator.share(data)}catch(e){}}else{try{await navigator.clipboard.writeText(location.href);alert('Invitation link copied!')}catch(e){alert('Copy the link from your browser to share the invitation.')}}};
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Background music: starts when the invitation opens when the browser allows autoplay.
(function(){
 const audio=document.getElementById('bgMusic');
 const toggle=document.getElementById('musicToggle');
 const openBtn=document.getElementById('openInvitation');
 if(openBtn){openBtn.addEventListener('click',()=>{try{sessionStorage.setItem('playWeddingMusic','1')}catch(e){}})}
 if(!audio)return;
 audio.volume=.45;
 function update(){if(toggle){toggle.classList.toggle('playing',!audio.paused);toggle.innerHTML=audio.paused?'♫ <span>Play Music</span>':'♫ <span>Music On</span>'}}
 async function start(){try{await audio.play();update()}catch(e){if(toggle)toggle.classList.add('needs-tap');}}
 audio.addEventListener('play',update); audio.addEventListener('pause',update);
 if(toggle)toggle.addEventListener('click',()=>{if(audio.paused)start();else{audio.pause();update()}});
 // Attempt autoplay immediately on the invitation page.
 start();
})();
