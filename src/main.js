import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '41971380-5e7df6cf95dc1cfc66e370c4e';

const refs = {
  form: document.getElementById('search-form'),
  resultContainer: document.getElementById('result-container'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const hiddenClass = 'is-hidden';
const params = {
  page: 1,
  query: '',
  maxPage: 0,
  perPage: 40,
};

refs.form.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();
  refs.resultContainer.innerHTML = '';
  params.page = 1;

  refs.loader.classList.remove(hiddenClass);
  refs.loadMoreBtn.classList.add(hiddenClass);
  refs.loadMoreBtn.addEventListener('click', handleLoadMore);
  const form = event.currentTarget;
  params.query = form.elements.query.value.trim();

  if (!params.query) {
    refs.loader.classList.add(hiddenClass);
    return;
  }

  try {
    const { hits, totalHits } = await searchPicturesByParams(params);

    if (hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }

    params.maxPage = Math.ceil(totalHits / params.perPage);

    createMarkup(hits);

    if (hits.length > 0 && hits.length !== totalHits) {
      refs.loadMoreBtn.classList.remove(hiddenClass);
    }

    if (params.page === params.maxPage) {
      iziToast.info({
        position: 'topRight',
        message: "That's all we find!",
      });
    }
  } catch (err) {
    iziToast.error({
      position: 'topRight',
      message: 'Something wrong!',
    });
  } finally {
    form.reset();
    refs.loader.classList.add(hiddenClass);
  }
}

async function handleLoadMore() {
  params.page += 1;
  refs.loader.classList.remove(hiddenClass);
  refs.loadMoreBtn.disabled = true;
  try {
    const { hits } = await searchPicturesByParams(params);

    createMarkup(hits);
    scrollDown();
  } catch (err) {
    iziToast.error({
      position: 'topRight',
      message: 'Something wrong!',
    });
  } finally {
    refs.loader.classList.add(hiddenClass);
    refs.loadMoreBtn.disabled = false;
  }
  if (params.page === params.maxPage) {
    refs.loadMoreBtn.classList.add(hiddenClass);
    refs.loadMoreBtn.removeEventListener('click', handleLoadMore);
    iziToast.info({
      position: 'topRight',
      message: "That's all we find!",
    });
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function searchPicturesByParams({ query, page = 1, perPage }) {
  return axios
    .get(`${BASE_URL}/`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page,
      },
    })
    .then(({ data }) => data);
}

function createMarkup(hits) {
  const markUp = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
            <a href="${largeImageURL}">
  <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360" heigth="200"></a>
  <div class="stats-block">
         <div class="stats">
             <h2 class="title">Likes</h2>
             <p class="amount">${likes}</p>
         </div>
         <div class="stats">
             <h2 class="title">Views</h2>
             <p class="amount">${views}</p>
         </div>
          <div class="stats">
              <h2 class="title">Comments</h2>
             <p class="amount">${comments}</p>
         </div>
          <div class="stats">
             <h2 class="title">Downloads</h2>
             <p class="amount">${downloads}</p>
          </div>

   </div>
</li>`
    )
    .join('');
  refs.resultContainer.innerHTML = markUp;
  lightbox.refresh();
}

function scrollDown() {
  if (params.page > 1) {
    const scrollItem = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
    window.scrollBy({
      top: scrollItem.height * 2,
      left: 0,
      behavior: 'smooth',
    });
  }
}
