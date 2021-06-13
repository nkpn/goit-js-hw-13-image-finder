import './sass/main.scss';
import ApiService from './js/apiService';
import getRefs from './js/get-refs';
import ImageCardTemplate from './templates/image-card.hbs';
const basicLightbox = require('basiclightbox');
import "./../node_modules/basiclightbox/dist/basicLightbox.min.css"
const debounce = require('lodash.debounce');

//* Pnotify
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';
// import { alert, error, success, defaults, defaultStack } from '@pnotify/core';
// defaults.maxTextHeight = null; //* убрал колесо прокрутки у pnotify alert

const refs = getRefs();
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', modal)


function onSearch(e) {
    e.preventDefault();
    apiService.query = e.currentTarget.elements.query.value.trim();
    apiService.resetPage();
    apiService.fetchImages()
    .then(renderImage);
    clearGallery();
    showLoadBtn()
}

function renderImage(data) {
    const markup = ImageCardTemplate(data);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onLoadMore() {
    apiService.fetchImages()
        .then(renderImage)
        .then(scrollIntoView)
    
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

function scrollIntoView() {
    refs.endContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function showLoadBtn() {
    refs.loadMoreButton.classList.add('is-open');
}

function modal() {
    refs.gallery.onclick = (e) => {
        const linkImg = e.target.getAttribute('data');
        const instance = basicLightbox.create(`
            <div class="modal" >
                <img class='img' src=${linkImg} alt="image" allowfullscreen>
            </div>
        `);
        instance.show();
        document.querySelector('.modal').onclick = (e) => {
            instance.close();
        }
    }
}

