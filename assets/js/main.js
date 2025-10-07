function toggleMenu(){
  const m = document.getElementById('menu');
  const btns = document.getElementsByClassName('menu-btn');
  if(getComputedStyle(m).display === 'flex'){ m.style.display='none'; }
  else { m.style.display='flex'; m.style.flexDirection='column'; }
}
// auto-close on resize > 900px
window.addEventListener('resize',()=>{ if(window.innerWidth>900){ const m=document.getElementById('menu'); if(m) m.style.display='flex'; }});
