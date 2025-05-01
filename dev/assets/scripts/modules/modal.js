let hystModal;

export default function modal() {
  const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth
  const header = document.querySelector('header')
  hystModal = new HystModal({
    linkAttributeName: 'data-hystmodal',
    waitTransitions: true,
    backscroll: true,
    beforeOpen: function(modal) {
      const scrollbarWidth = getScrollbarWidth();
      if(header && window.innerWidth > 1200) {
        header.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    },
    afterClose: function(modal) {
      if(header && window.innerWidth > 1200) {
        header.style.paddingRight = '';
        document.body.style.paddingRight = '';
      }
    }
  });
  window.hystModal = hystModal;
  return hystModal;
}
