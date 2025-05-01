import './index.scss'
import main from '@/assets/scripts/main'
window.onload = () => {
  main()

  document.querySelectorAll('.js-amo-button').forEach(button => {
    button.addEventListener('click', () => {
      window.kronosOnlineForm.modal.show()
    })
  })
}
