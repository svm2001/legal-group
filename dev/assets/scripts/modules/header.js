import { disablePageScroll, enablePageScroll } from 'scroll-lock'

export default function header() {
  const header = document.querySelector('header')
  const burger = document.querySelector('.burger')
  const burgerOpen = document.querySelector('.header__burger-trigger')
  const burgerClose = document.querySelector('.header__burger-open')
  const modalBtn = document.querySelector('.js-burger-modal')

  if (!header) return

  if (window.innerWidth <= 1200) {

    const close = () => {
      burger.classList.remove('open')
      burgerOpen.classList.remove('hidden')
      burgerClose.classList.remove('visible')
      document.querySelector('.header__burger-wa').style.display = 'block'
      enablePageScroll(header)
    }

    const open = () => {
      burger.classList.add('open')
      burgerClose.classList.add('visible')
      burgerOpen.classList.add('hidden')
      document.querySelector('.header__burger-wa').style.display = 'none'
      disablePageScroll(header)
    }

    if(burgerOpen) burgerOpen.addEventListener('click', () => open())
    if(burgerClose) burgerClose.addEventListener('click', () => close())
    if(modalBtn) modalBtn.addEventListener('click', () => close())
  }
}
