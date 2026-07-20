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