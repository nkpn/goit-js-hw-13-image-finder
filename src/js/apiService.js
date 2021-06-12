const API_KEY = '21962068-642cbe2e0c24045a0d25727d8';
const BASE_URL = 'https://pixabay.com/api/'

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        const response = await fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`);
        const data = await response.json();
        this.page += 1;
        return data;
    }


    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

