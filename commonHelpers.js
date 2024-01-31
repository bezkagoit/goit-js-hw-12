import{S as p,a as y,i as L}from"./assets/vendor-951421c8.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const v="https://pixabay.com/api",w="41971380-5e7df6cf95dc1cfc66e370c4e",t={form:document.getElementById("search-form"),resultContainer:document.getElementById("result-container"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector('[data-action="load-more"]')},l="is-hidden",s={page:1,query:"",maxPage:0,perPage:40};t.form.addEventListener("submit",B);function d(a){L.error({position:"topRight",message:a})}async function B(a){a.preventDefault(),t.resultContainer.innerHTML="",s.page=1,t.loader.classList.remove(l),t.loadMoreBtn.classList.add(l),t.loadMoreBtn.addEventListener("click",u);const n=a.currentTarget;if(s.query=n.elements.query.value.trim(),!s.query){t.loader.classList.add(l);return}try{const{hits:o,totalHits:i}=await m(s);o.length===0&&d("Sorry, there are no images matching your search query. Please try again!"),s.maxPage=Math.ceil(i/s.perPage),f(o),o.length>0&&o.length!==i&&t.loadMoreBtn.classList.remove(l),s.page===s.maxPage&&d("That's all we find!")}catch{d("Something wrong!")}finally{n.reset(),t.loader.classList.add(l)}}async function u(){s.page+=1,t.loader.classList.remove(l),t.loadMoreBtn.disabled=!0;try{const{hits:a}=await m(s);f(a),b()}catch{d("Something wrong!")}finally{t.loader.classList.add(l),t.loadMoreBtn.disabled=!1}s.page===s.maxPage&&(t.loadMoreBtn.classList.add(l),t.loadMoreBtn.removeEventListener("click",u),d("That's all we find!"))}const M=new p(".gallery a",{captionsData:"alt",captionDelay:250});function m({query:a,page:n=1,perPage:o}){return y.get(`${v}/`,{params:{key:w,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:o,page:n}}).then(({data:i})=>i)}function f(a){const n=a.map(({webformatURL:o,largeImageURL:i,tags:e,likes:r,views:c,comments:h,downloads:g})=>`<li class="gallery-item">
            <a href="${i}">
  <img class="gallery-image" src="${o}" alt="${e}" width="360" heigth="200"></a>
  <div class="stats-block">
         <div class="stats">
             <h2 class="title">Likes</h2>
             <p class="amount">${r}</p>
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
             <p class="amount">${g}</p>
          </div>

   </div>
</li>`).join("");t.resultContainer.insertAdjacentHTML("beforeend",n),M.refresh()}function b(){if(s.page>1){const a=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:a.height*2,left:0,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
