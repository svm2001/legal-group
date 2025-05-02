export function contacts() {
  const contacts = document.querySelector('.contacts')
  if (!contacts) return

  const map = contacts.querySelector('#map')
  let coordinates = map.getAttribute('data-map-coords')
  let coordsArr
  try {
    coordsArr = JSON.parse(coordinates).map(Number)
    if (!Array.isArray(coordsArr) || coordsArr.length !== 2 || coordsArr.some(isNaN)) throw new Error('Invalid coords')
  } catch (e) {
    coordsArr = null
  }
  const zoom = map.getAttribute('data-initial-zoom')

  const isDesktop = window.innerWidth > 1199

  ymaps.ready(() => {
    if (!coordsArr) {
      const errorDiv = document.createElement('div')
      errorDiv.textContent = 'Ошибка: некорректные координаты для карты.'
      errorDiv.style.cssText = 'color:red;font-size:18px;text-align:center;padding-top:90px;'
      map.innerHTML = ''
      map.appendChild(errorDiv)
      return
    }
    const mapInstance = new ymaps.Map('map', {
      center: coordsArr,
      zoom: isDesktop ? zoom : zoom - 1,
      controls: ['zoomControl', 'fullscreenControl'],
      suppressMapOpenBlock: true
    })
    const myPlacemark = new ymaps.Placemark(coordsArr, {}, {
      iconLayout: 'default#image',
      iconImageHref: './images/pin.svg',
      iconImageSize: isDesktop ? [80, 97] : [50, 61],
      iconImageOffset: isDesktop ? [-40, -97] : [-25, -61]
    })
    mapInstance.geoObjects.add(myPlacemark)
  })
}
