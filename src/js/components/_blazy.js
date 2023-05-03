import Blazy from 'blazy';

document.addEventListener("DOMContentLoaded", () => {
    let blazy = new Blazy({
        container: '.popup-instruction-visible',
        selector: 'img',
        offset: 100,
    });
});