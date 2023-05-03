const preloader = document.querySelector('.preloader')

window.addEventListener('load', () => {
    preloader.classList.add('preloader-hide')

    setTimeout(() => {
        preloader.remove()
        document.body.style.overflow = 'visible'
    }, 300)
})