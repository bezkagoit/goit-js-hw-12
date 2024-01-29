import{i as d,S as p,a as y}from"./assets/vendor-951421c8.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?a.credentials="include":e.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();const L="https://pixabay.com/api",v="41971380-5e7df6cf95dc1cfc66e370c4e",t={form:document.getElementById("search-form"),resultContainer:document.getElementById("result-container"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector('[data-action="load-more"]')},l="is-hidden",s={page:1,query:"",maxPage:0,perPage:40};t.form.addEventListener("submit",w);async function w(o){o.preventDefault(),t.resultContainer.innerHTML="",s.page=1,t.loader.classList.remove(l),t.loadMoreBtn.classList.add(l),t.loadMoreBtn.addEventListener("click",m);const i=o.currentTarget;if(s.query=i.elements.query.value.trim(),!s.query){t.loader.classList.add(l);return}try{const{hits:r,totalHits:n}=await u(s);r.length===0&&d.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),s.maxPage=Math.ceil(n/s.perPage),g(r),r.length>0&&r.length!==n&&t.loadMoreBtn.classList.remove(l),s.page===s.maxPage&&d.info({position:"topRight",message:"That's all we find!"})}catch{d.error({position:"topRight",message:"Something wrong!"})}finally{i.reset(),t.loader.classList.add(l)}}async function m(){s.page+=1,t.loader.classList.remove(l),t.loadMoreBtn.disabled=!0;try{const{hits:o}=await u(s);g(o),M()}catch{d.error({position:"topRight",message:"Something wrong!"})}finally{t.loader.classList.add(l),t.loadMoreBtn.disabled=!1}s.page===s.maxPage&&(t.loadMoreBtn.classList.add(l),t.loadMoreBtn.removeEventListener("click",m),d.info({position:"topRight",message:"That's all we find!"}))}const B=new p(".gallery a",{captionsData:"alt",captionDelay:250});function u({query:o,page:i=1,perPage:r}){return y.get(`${L}`,{params:{key:v,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:r,page:i}}).then(({data:n})=>n)}function g(o){const i=o.map(({webformatURL:r,largeImageURL:n,tags:e,likes:a,views:c,comments:h,downloads:f})=>`<li class="gallery-item">
            <a href="${n}">
  <img class="gallery-image" src="${r}" alt="${e}" width="360" heigth="200"></a>
  <div class="stats-block">
         <div class="stats">
             <h2 class="title">Likes</h2>
             <p class="amount">${a}</p>
         </div>
         <div class="stats">
             <h2 class="title">Views</h2>
             <p class="amount">${c}</p>
         </div>
          <div class="stats">
              <h2 class="title">Comments</h2>
             <p class="amount">${h}</p>
         </div>
          <div class="stats">
             <h2 class="title">Downloads</h2>
             <p class="amount">${f}</p>
          </div>

   </div>
</li>`).join("");t.resultContainer.innerHTML=i,B.refresh()}function M(){if(s.page>1){const o=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:o.height*2,left:0,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
