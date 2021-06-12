const basicLightbox = require('basiclightbox');
import "../../node_modules/basiclightbox/dist/basicLightbox.min.css"

const refs = getRefs();

export default refs.gallery.onclick = (e) => {
    if (!e.target.getAttribute('data')) {
        return;
    }

    const linkImg = ev.target.getAttribute('data');
    const instance = basicLightbox.create(`
     <div class="modal" >
        <img class='img' src=${linkImg} alt="image" allowfullscreen>
     </div>
 `);
    instance.show();
    document.querySelector('.modal').onclick = (e) => {
    instance.close();
}
};