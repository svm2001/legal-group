export function prices() {
  const prices = document.querySelector('.prices');
  if (!prices) return;

  const accordionList = prices.querySelector('.prices__list');
  const accordionItems = prices.querySelectorAll('.accordion__item');

  const initializeAccordion = () => {
    accordionItems.forEach(item => {
      const button = item.querySelector('.accordion__title');
      const content = item.querySelector('.accordion__description');
      
      if (content.classList.contains('active')) {
        content.style.height = content.scrollHeight + 'px';
      } else {
        content.style.height = '0';
      }
    });
  };

  const open = (button, content) => {
    closeAllDrops(button, content);
    content.style.height = content.scrollHeight + 'px';
    button.classList.add('active');
    content.classList.add('active');

    setTimeout(() => {
      if (window.innerWidth < 1200) {
        const rect = button.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 86;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }  
    }, 500)
  };

  const close = (button, content) => {
    button.classList.remove('active');
    content.classList.remove('active');
    content.style.height = '0';
  };

  const closeAllDrops = (activeButton, activeContent) => {
    accordionItems.forEach(item => {
      const button = item.querySelector('.accordion__title');
      const content = item.querySelector('.accordion__description');
      
      if (button !== activeButton && content !== activeContent) {
        close(button, content);
      }
    });
  };

  accordionList.addEventListener('click', (event) => {
    const target = event.target.closest('.accordion__title');
    if (target) {
      const parent = target.closest('.accordion__item');
      const content = parent.querySelector('.accordion__description');
      
      content.classList.contains('active')
        ? close(target, content)
        : open(target, content);
    }
  });

  initializeAccordion();
}
