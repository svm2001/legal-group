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
    }
  })
}
