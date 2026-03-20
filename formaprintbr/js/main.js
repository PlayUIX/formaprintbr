/* ============================================================
   FormaPrint BR — main.js
   Navbar scroll, menu mobile, animações de entrada
   ============================================================ */

const navbar = document.getElementById('navbar');
if(navbar){
  window.addEventListener('scroll',()=>{
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  },{passive:true});
}

// Menu mobile
const toggle   = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if(toggle && navLinks){
  toggle.addEventListener('click',()=>{
    const open = navLinks.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity   = open ? '0' : '';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  navLinks.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',()=>{ navLinks.classList.remove('open'); });
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape') navLinks.classList.remove('open');
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t = document.querySelector(a.getAttribute('href'));
    if(!t) return;
    e.preventDefault();
    window.scrollTo({top: t.getBoundingClientRect().top + window.scrollY - 72, behavior:'smooth'});
  });
});

// Animações de entrada via IntersectionObserver
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const sibs = entry.target.parentElement.querySelectorAll('[data-aos]');
    let delay = 0;
    sibs.forEach((s,i)=>{ if(s===entry.target) delay=i*80; });
    setTimeout(()=>{
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }, delay);
    observer.unobserve(entry.target);
  });
},{threshold:.12, rootMargin:'0px 0px -30px 0px'});

document.querySelectorAll(
  '.benef-item,.step,.preco-box,.aval-card,.vcm-vaga,.mi-features li'
).forEach(el=>{
  el.setAttribute('data-aos','');
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .45s ease, transform .45s ease';
  observer.observe(el);
});

// Parallax leve no card do hero
const cvCard = document.getElementById('cvCard');
if(cvCard){
  window.addEventListener('mousemove',e=>{
    const x = (e.clientX/window.innerWidth  - .5)*10;
    const y = (e.clientY/window.innerHeight - .5)*7;
    cvCard.style.transform = `translateY(0) rotate(${-1+x*.08}deg) perspective(800px) rotateX(${-y*.25}deg) rotateY(${x*.25}deg)`;
  },{passive:true});
  window.addEventListener('mouseleave',()=>{ cvCard.style.transform=''; });
}
