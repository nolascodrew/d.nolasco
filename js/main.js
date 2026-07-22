  // floating contact widget
  const fabBtn = document.getElementById('fabBtn');
  const fabMenu = document.getElementById('fabMenu');
  function setFab(open){
    fabBtn.classList.toggle('is-open', open);
    fabMenu.classList.toggle('is-open', open);
    fabBtn.setAttribute('aria-expanded', String(open));
  }
  fabBtn?.addEventListener('click', ()=>{
    setFab(!fabMenu.classList.contains('is-open'));
  });
  document.addEventListener('click', (e)=>{
    if(fabMenu.classList.contains('is-open') && !e.target.closest('.fab-wrap')){
      setFab(false);
    }
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') setFab(false);
  });

  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const links = document.querySelector('nav.links');

  function setMenu(open){
    links.classList.toggle('nav-open', open);
    menuBtn.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  menuBtn?.addEventListener('click', () => {
    setMenu(!links.classList.contains('nav-open'));
  });
  document.querySelectorAll('nav.links a').forEach(a=>{
    a.addEventListener('click', ()=> setMenu(false));
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') setMenu(false);
  });
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 900) setMenu(false);
  });

  // scroll reveal
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduceMotion && 'IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); } });
    }, {threshold:0.12});
    document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el=>el.classList.add('in-view'));
  }

  // 3D tilt on frames
  if(!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches){
    document.querySelectorAll('.tilt').forEach(el=>{
      const maxTilt = 8;
      el.addEventListener('mousemove', (e)=>{
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * maxTilt;
        const ry = (px - 0.5) * maxTilt;
        el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
      });
      el.addEventListener('mouseleave', ()=>{
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      });
    });
  }

  // running timecode in hero frame
  const tcEl = document.getElementById('tc');
  if(tcEl && !reduceMotion){
    let frame = 0;
    const fps = 24;
    function pad(n){ return String(n).padStart(2,'0'); }
    function tick(){
      frame++;
      const ff = frame % fps;
      let totalSec = Math.floor(frame / fps);
      const ss = totalSec % 60;
      let totalMin = Math.floor(totalSec / 60);
      const mm = totalMin % 60;
      const hh = Math.floor(totalMin / 60);
      tcEl.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
    }
    setInterval(tick, 1000/fps);
  }