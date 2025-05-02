import './index.scss'
import main from '@/assets/scripts/main'
import tabs from "@/assets/scripts/modules/tabs.js"
import { reviewSlider } from "@/assets/scripts/modules/reviewSlider.js"
window.onload = () => {
  main()
  reviewSlider()
  const services = document.querySelector('.services')

  document.querySelectorAll('.js-amo-button').forEach(button => {
    button.addEventListener('click', () => {
      const isInServicesCard = button.closest('.services-card')
      if (isInServicesCard) {
        window.hystModal.close()
        setTimeout(() => window.kronosOnlineForm.modal.show(), 300)
      } else window.kronosOnlineForm.modal.show()
    })
  })

  if(services) {
    const servicesModalCustomBtnClose = services.querySelectorAll('.services-card__modal-bottom-close')
    servicesModalCustomBtnClose.forEach(button => button.addEventListener('click', () => window.hystModal.close()))

    tabs({
      tabParentSelector: '.services',
      tabHeaderSelector: '.services__tabs-item',
      tabHeaderActiveClass: 'active',
      tabItemSelector: '.services__content',
      tabItemActiveClass: 'active',
      event: 'click',
    })
  }
}
