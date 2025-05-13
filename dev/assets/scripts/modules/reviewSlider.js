import { Swiper } from '../../../../node_modules/swiper/swiper-bundle.min.mjs'
import 'swiper/css'

export function reviewSlider() {
  const slider = document.querySelector('.reviews__slider.swiper')

  if (!slider) return

  const swiper = new Swiper(slider, {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    centeredSlides: false,
    freeMode: false,
    loop: false,
    initialSlide: 0,
    spaceBetween: 12,
    slideToClickedSlide: true,
    autoHeight: false,
    draggable: true,
    speed: 300,
    navigation: {
      nextEl: '.reviews__slider-arrows-item--next',
      prevEl: '.reviews__slider-arrows-item--prev'
    },
    // breakpoints: {
    //   1200: {
    //     freeMode: false,
    //   }
    // },
    on: {
      init: function () {
        if(window.innerWidth > 1199) {
          updateSlideStyles(this);
        }
      },
      // slideChange: function () {
      //   if(window.innerWidth > 1199) {
      //     updateSlideStyles(this);
      //   }
      // }
    }
  })

  // function updateSlideStyles(swiper) {
  //   swiper.slides.forEach((slide, index) => {
  //     if (index > swiper.activeIndex + 2) {
  //       slide.classList.add('slide-dimmed');
  //     } else {
  //       slide.classList.remove('slide-dimmed');
  //     }
  //   });
  // }

  // const container = document.querySelector('.reviews .container')
  // const plug = document.querySelector('.reviews .plug')
  // if(window.innerWidth >= 1368) {
  //   plug.style.width = ((document.documentElement.clientWidth - container.offsetWidth) / 2) + 252 + `px`
  // }
  //  else {
  //   plug.style.width = ((document.documentElement.clientWidth - container.offsetWidth) / 2) + 242 + `px`
  // }
  //
  // if(window.innerWidth > 1199) {
  //   const counterValue = document.querySelector('.reviews__slider-counter-value')
  //   const counterSum = document.querySelector('.reviews__slider-counter-sum')
  //
  //   if (counterValue && counterSum) {
  //     counterSum.textContent = String(swiper.slides.length).padStart(2, '0')
  //     counterValue.textContent = String(swiper.realIndex + 1).padStart(2, '0')
  //
  //     swiper.on('slideChange', () => {
  //       setTimeout(() => {
  //         counterValue.textContent = String(swiper.realIndex + 1).padStart(2, '0')
  //       }, 320)
  //     })
  //   }
  // } else  {
  //   if(document.querySelector('.reviews__slider-info')) document.querySelector('.reviews__slider-info').remove()
  // }
}
