import{a as d,S as u}from"./assets/vendor-8da312b8.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const m="https://pixabay.com/api",f="41971380-5e7df6cf95dc1cfc66e370c4e",i={form:document.getElementById("search-form"),resultContainer:document.getElementById("result-container"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector('[data-action="load-more"]')};i.form.addEventListener("submit",p);async function p(o){o.preventDefault();const r=o.currentTarget,a=r.elements.query.value.trim();if(a){console.log(a);try{const s=await h(a);console.log(s),g(s.hits),i.loadMoreBtn.classList.remove("is-hidden")}catch(s){console.log(s)}finally{r.reset()}}}function h(o){return d.get(`${m}`,{params:{key:f,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:20,page:1}}).then(r=>r.data).catch(r=>{throw new Error("Failed to fetch images")})}let y=new u(".gallery a",{captionsData:"alt",captionDelay:250});function g(o){const r=o.map(({webformatURL:a,largeImageURL:s,tags:e,likes:t,views:n,comments:l,downloads:c})=>`<li class="gallery-item">
            <a href="${s}">
  <img class="gallery-image" src="${a}" alt="${e}" width="370" heigth="300"></a>
  <div class="stats-block">
         <div class="stats">
             <h2 class="title">Likes</h2>
             <p class="amount">${t}</p>
         </div>
         <div class="stats">
             <h2 class="title">Views</h2>
             <p class="amount">${n}</p>
         </div>
          <div class="stats">
              <h2 class="title">Comments</h2>
             <p class="amount">${l}</p>
         </div>
          <div class="stats">
             <h2 class="title">Downloads</h2>
             <p class="amount">${c}</p>
          </div>

   </div>
</li>`).join("");i.resultContainer.innerHTML=r,y.refresh()}
//# sourceMappingURL=commonHelpers.js.map
