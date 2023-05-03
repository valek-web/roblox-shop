import Aos from 'aos'
document.addEventListener('DOMContentLoaded', () => {
    Aos.init({
        offset: 30,
        // offset: 100,
        duration: 500,
        easing: 'easy-in-out',
        // delay: 500,
        delay: 300,
        once: true,
        anchorPlacement: 'top-bottom',
    })

    const imageAos = document.querySelectorAll('.advantages-card__image')

    if (document.documentElement.clientWidth < 1460) {
        imageAos.forEach((e) => {
            e.dataset.aos = 'fade'
        })
    }
})
