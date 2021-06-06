import './sass/main.scss';
import apiService from './js/apiService';
import getRefs from './js/get-refs';
import ImageCardTemplate from './templates/image-card.hbs';
const debounce = require('lodash.debounce');

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error, success, defaults, defaultStack } from '@pnotify/core';
defaults.maxTextHeight = null; //* убрал колесо прокрутки у pnotify alert

import * as basicLightbox from 'basiclightbox'
//const basicLightbox = require('basiclightbox')

const refs = getRefs();

function onSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const searchQuery = e.target.value.trim();

    return apiService.fetchImage(imageName)
        .then(renderImage(data))
        .catch(onFetchError)
}

function renderImage(image) {
    const markup = ImageCardTemplate(image);
    refs.gallery.innerHTML = markup;
}