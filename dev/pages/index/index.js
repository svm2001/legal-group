import './index.scss'
import main from '@/assets/scripts/main'
window.onload = () => {
  main()
  window.kronosOnlineForm.button.hide()

  document.querySelectorAll('.js-amo-button').forEach(button => {
    button.addEventListener('click', () => {
      window.kronosOnlineForm.modal.show()
    })
  })
}
