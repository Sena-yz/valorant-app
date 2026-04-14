(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),window.addEventListener(`DOMContentLoaded`,()=>{document.body.classList.add(`dark`);let e=document.querySelector(`#themeToggle`);e.addEventListener(`change`,()=>{e.checked?(document.body.classList.add(`light`),document.body.classList.remove(`dark`)):(document.body.classList.add(`dark`),document.body.classList.remove(`light`))});let t=document.querySelector(`#loading`),n=document.querySelector(`#showFavs`),r=document.querySelector(`#agents`),i=document.querySelector(`#search`),a=document.querySelector(`#roleFilter`),o=[],s=JSON.parse(localStorage.getItem(`favorites`))||[],c=document.querySelector(`#modalAbilities`),l=document.querySelector(`#modal`),u=document.querySelector(`#closeModal`),d=document.querySelector(`#modalImg`),f=document.querySelector(`#modalName`),p=document.querySelector(`#modalRole`),m=e=>{d.src=e.displayIcon,f.textContent=e.displayName,p.textContent=e.role?.displayName||`No role`;let t=``;e.abilities.forEach((e,n)=>{if(!e.displayName)return;let r=e.slot===`Ultimate`;t+=`
      <div class="ability ${r?`ultimate`:``}">
      
        <div class="ability-header" data-index="${n}">
          ${e.displayIcon?`<img src="${e.displayIcon}" class="ability-icon" />`:``}
          <h3>${e.displayName} ${r?`⭐`:``}</h3>
        </div>

        <p class="ability-text hidden">${e.description}</p>

      </div>
    `}),c.innerHTML=t,document.querySelectorAll(`.ability-header`).forEach(e=>{e.addEventListener(`click`,()=>{e.nextElementSibling.classList.toggle(`hidden`)})}),l.classList.add(`show`)};u.onclick=()=>{l.classList.remove(`show`)},l.onclick=e=>{e.target===l&&l.classList.remove(`show`)},document.addEventListener(`keydown`,e=>{e.key===`Escape`&&l.classList.remove(`show`)});let h=async()=>{t.style.display=`block`,o=(await(await fetch(`https://valorant-api.com/v1/agents`)).json()).data,y(o),t.style.display=`none`},g=()=>{localStorage.setItem(`favorites`,JSON.stringify(s))},_=e=>{s.find(t=>t.uuid===e.uuid)?s=s.filter(t=>t.uuid!==e.uuid):s.push(e),g(),y(o)},v=e=>s.some(t=>t.uuid===e.uuid),y=e=>{let t=``;e.forEach(e=>{t+=`
      <div class="card" data-id="${e.uuid}">
        <img src="${e.displayIcon}" />
        <h2>${e.displayName}</h2>
        <p>${e.role?.displayName||`No role`}</p>

        <button class="fav-btn" data-id="${e.uuid}">
          ${v(e)?`❤️`:`🤍`}
        </button>
      </div>
    `}),r.innerHTML=t,document.querySelectorAll(`.fav-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),_(o.find(t=>t.uuid===e.dataset.id))})}),r.addEventListener(`click`,e=>{let t=e.target;for(;t&&!t.classList.contains(`card`);)t=t.parentElement;t&&m(o.find(e=>e.uuid===t.dataset.id))})},b=()=>{let e=o,t=i.value.toLowerCase();e=e.filter(e=>e.displayName.toLowerCase().includes(t));let n=a.value;n!==`all`&&(e=e.filter(e=>e.role?.displayName===n)),y(e)};i.addEventListener(`input`,b),a.addEventListener(`change`,b),n.addEventListener(`click`,()=>{y(s)}),h()});