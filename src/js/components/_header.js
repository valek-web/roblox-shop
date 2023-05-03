document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    const heroLink = document.querySelector('.hero__link'); 
 
    window.addEventListener('scroll', () => {
        if (document.documentElement.getBoundingClientRect().top < -(document.querySelector('.hero').clientHeight + 90)) {
            header.classList.add('header_active');
            hero.classList.add('hero_active');
        } 

        if (document.documentElement.getBoundingClientRect().top < -(document.querySelector('.hero').clientHeight + 100)) {
            header.classList.add('header_active_middle');
        } 
        
        else {
            header.classList.remove('header_active');
            hero.classList.remove('hero_active');
        }
    });

    const burgerButton = document.querySelector('.burger-button');

    if (burgerButton) {
        const burgerMenu = document.querySelector('.burger-menu');

        burgerButton.addEventListener('click', (e) => {
            document.body.classList.toggle('scroll-disabled');
            burgerMenu.classList.toggle('burger-menu_active');
            header.classList.toggle('header_burger_active');
            e.currentTarget.classList.toggle('burger-button_active');
        });

        const burgerLink = document.querySelectorAll('.nav-mobile_link');

        burgerLink.forEach((link) => {
            link.addEventListener('click', () => {
                document.body.classList.remove('scroll-disabled');
                burgerMenu.classList.remove('burger-menu_active');
                burgerButton.classList.remove('burger-button_active');
                header.classList.remove('header_burger_active');
            });
        })
    }

 
});
