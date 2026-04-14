(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),window.addEventListener(`DOMContentLoaded`,()=>{document.body.classList.add(`dark`);let e=document.querySelector(`#themeToggle`),t=document.querySelector(`#loading`),n=document.querySelector(`#showFavs`),r=document.querySelector(`#agents`),i=document.querySelector(`#search`),a=document.querySelector(`#roleFilter`),o=document.querySelector(`#sort`),s=document.querySelector(`#modal`),c=document.querySelector(`#closeModal`),l=document.querySelector(`#modalImg`),u=document.querySelector(`#modalName`),d=document.querySelector(`#modalRole`),f=document.querySelector(`#modalAbilities`),p=document.querySelector(`#username`),m=document.querySelector(`#saveName`),h=[],g=JSON.parse(localStorage.getItem(`favorites`))||[];e.addEventListener(`change`,()=>{document.body.classList.toggle(`light`),document.body.classList.toggle(`dark`)});let _=e=>{l.src=e.displayIcon,u.textContent=e.displayName,d.textContent=e.role?.displayName||`No role`;let t=``;e.abilities.forEach(e=>{if(!e.displayName)return;let n=e.slot===`Ultimate`;t+=`
        <div class="ability ${n?`ultimate`:``}">
          <div class="ability-header">
            ${e.displayIcon?`<img src="${e.displayIcon}" class="ability-icon" />`:``}
            <h3>${e.displayName} ${n?`⭐`:``}</h3>
          </div>
          <p class="ability-text hidden">${e.description}</p>
        </div>
      `}),f.innerHTML=t,document.querySelectorAll(`.ability-header`).forEach(e=>{e.addEventListener(`click`,()=>{e.nextElementSibling.classList.toggle(`hidden`)})}),s.classList.add(`show`)};c.onclick=()=>s.classList.remove(`show`),s.onclick=e=>{e.target===s&&s.classList.remove(`show`)},document.addEventListener(`keydown`,e=>{e.key===`Escape`&&s.classList.remove(`show`)});let v=async()=>{t.style.display=`block`,h=(await(await fetch(`https://valorant-api.com/v1/agents`)).json()).data,S(h),t.style.display=`none`},y=()=>{localStorage.setItem(`favorites`,JSON.stringify(g))},b=e=>{g.find(t=>t.uuid===e.uuid)?g=g.filter(t=>t.uuid!==e.uuid):g.push(e),y(),S(h)},x=e=>g.some(t=>t.uuid===e.uuid),S=e=>{let t=``;e.forEach(e=>{t+=`
        <div class="card" data-id="${e.uuid}">
          <img src="${e.displayIcon}" />
          <h2>${e.displayName}</h2>
          <p>Role: ${e.role?.displayName||`No role`}</p>
          <p>Abilities: ${e.abilities.length}</p>
          <p>UUID: ${e.uuid.slice(0,6)}</p>
          <p>Playable: ${e.isPlayableCharacter?`Yes`:`No`}</p>

          <button class="fav-btn" data-id="${e.uuid}">
            ${x(e)?`❤️`:`🤍`}
          </button>
        </div>
      `}),r.innerHTML=t,document.querySelectorAll(`.fav-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),b(h.find(t=>t.uuid===e.dataset.id))})}),r.addEventListener(`click`,e=>{let t=e.target;for(;t&&!t.classList.contains(`card`);)t=t.parentElement;t&&_(h.find(e=>e.uuid===t.dataset.id))})},C=()=>{let e=h,t=i.value.toLowerCase();e=e.filter(e=>e.displayName.toLowerCase().includes(t));let n=a.value;if(n!==`all`&&(e=e.filter(e=>e.role?.displayName===n)),o){let t=o.value;t===`az`&&e.sort((e,t)=>e.displayName.localeCompare(t.displayName)),t===`za`&&e.sort((e,t)=>t.displayName.localeCompare(e.displayName))}S(e)};i.addEventListener(`input`,C),a.addEventListener(`change`,C),o&&o.addEventListener(`change`,C),n.addEventListener(`click`,()=>{S(g)}),m&&p&&m.addEventListener(`click`,()=>{if(p.value.length<3){alert(`Name must be at least 3 characters`);return}localStorage.setItem(`username`,p.value),alert(`Saved!`)}),v()});