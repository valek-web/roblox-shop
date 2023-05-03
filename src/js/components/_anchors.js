document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"').forEach(link => {

        link.addEventListener('click', function(e) {
            e.preventDefault();
    
            let href = this.getAttribute('href').substring(1);
            const scrollTarget = document.getElementById(href);
            const topOffset = document.querySelector('.header').offsetHeight;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset - 0;
    
            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth',
            })
        })
    })
})
