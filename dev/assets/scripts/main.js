import lazyLoad from './modules/lazyload'
import modal from './modules/modal'
import validate from './modules/validate'
import phoneMask from './modules/phoneMask'
import header from './modules/header'
import lazyBlocks from './modules/lazy-blocks'
import preloader from 'preloader-js'
export default function main() {
  lazyBlocks()
  lazyLoad()
  modal()
  header()
  validate()
  phoneMask()

  if(document.querySelector('.kronos-online-form-button')) {
    document.querySelector('.kronos-online-form-button').remove()
  }

  

  setTimeout(() => preloader.hide(), 0)
}

window.addEventListener('DOMContentLoaded', () => {
  const headerHeight = document.querySelector('header').offsetHeight;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const offsetPosition = target.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
});
