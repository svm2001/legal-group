export function prices() {
  const prices = document.querySelector('.prices')
  if (!prices) return

  const priceElements = prices.querySelectorAll('.prices__list-item-price span')
  const listItems = prices.querySelectorAll('.prices__list-item')
  const showAllBtn = prices.querySelector('.btn--arrow')
  const listInner = prices.querySelector('.prices__list-inner')

  const getItemsHeight = (items) => Array.from(items).reduce((sum, item) => {
    const s = window.getComputedStyle(item)
    return sum + Math.max(item.clientHeight + parseFloat(s.marginTop) + parseFloat(s.marginBottom), 59)
  }, 0)

  const setBtnText = (text) => {
    const btnText = showAllBtn?.querySelector('.btn--arrow-text')
    if (btnText) {
      btnText.style.opacity = '0'
      setTimeout(() => {
        btnText.innerText = text
        btnText.style.opacity = '1'
      }, 100)
    }
  }

  const fadeList = (show) => {
    listInner.style.opacity = show ? '1' : '0.66'
    listInner.style.transition = 'opacity 0.3s, height 0.3s'
  }

  if (listItems.length <= 9 && showAllBtn) showAllBtn.style.display = 'none'

  if (listItems.length > 9 && listInner) {
    listInner.style.height = getItemsHeight(Array.from(listItems).slice(0, 9)) + 'px'
    listInner.style.overflow = 'hidden'
    fadeList(true)
  }

  if (showAllBtn && listInner) {
    let expanded = false
    showAllBtn.addEventListener('click', () => {
      fadeList(false)
      setTimeout(() => {
        if (!expanded) {
          listInner.style.height = getItemsHeight(listItems) + 'px'
          setTimeout(() => {
            listInner.style.height = 'auto'
            fadeList(true)
          }, 300)
          setBtnText('Скрыть')
        } else {
          listInner.style.height = getItemsHeight(listItems) + 'px'
          setTimeout(() => {
            listInner.style.height = getItemsHeight(Array.from(listItems).slice(0, 9)) + 'px'
            fadeList(true)
          }, 100)
          setBtnText('Смотреть все')
        }
        expanded = !expanded
      }, 100)
    })
  }

  priceElements.forEach(element => {
    const price = parseInt(element.textContent)
    if (price >= 1000) element.textContent = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  })
}
