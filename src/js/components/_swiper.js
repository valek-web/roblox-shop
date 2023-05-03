import Swiper, { Navigation, Pagination, Autoplay, Parallax } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Parallax]);

const promoSlider = document.querySelector('.promo-slider');

const sliderPromo = new Swiper(promoSlider, {
    loop: true,
    containerModifierClass: 'promo-slider-',
    slidesPerView: 3,
    // slidesPerGroup: 3,
    // loop: true,
    centeredSlides: true,
    initialSlide: 1,
    parallax: true,
     autoplay: {
      delay: 3000,
       disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        spaceBetween: 30,
        slidesPerView: 1,
      },
      365: {
        spaceBetween: 60,
        slidesPerView: 1.5,
        parallax: true,
      },
      480: {
        spaceBetween: 60,
        slidesPerView: 1.8,
      },
      540: {
        spaceBetween: 80,
        slidesPerView: 2,
      },
      768: {
        spaceBetween: 60,
        slidesPerView: 3,
      },
      992: {
        spaceBetween: 80,
      },
      1300: {
        spaceBetween: 140,
      },
    },
   
  

    pagination: {
      el: '.promo-slider__pagination.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
});

const sliderReviews = new Swiper('.comments-ticker', {
  // direction: 'horizontal',
  speed: 1000,

  // slidesPerGroup: 3,
  // loop: true,
  initialSlide: 1,
 
  // containerModifierClass: 'promo-slider-',
  // autoplay: {
  //     autoplay: true,
  //     delay: 1000
  // },
  // effect: 'fade',
  // fadeEffect: {
  //   crossFade: true
  // },
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1.8,
      centeredSlides: true,
    },
    992: {
      slidesPerView: 2,
      centeredSlides: true,
    },
    1300: {
      slidesPerView: 2.5,
      centeredSlides: true,
    },
  },
  navigation: {
      prevEl: '.comments__slider_prev.slider-prev',
      nextEl: '.comments__slider_next.slider-next'
  },
  pagination: {
    el: '.comments__pagination.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
});


