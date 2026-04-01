document.addEventListener('DOMContentLoaded', () => {
  const rozHeader = document.querySelector('.header-container-roz');
  const btnDwonload = document.querySelector('.main-contents .btn-wrap');
  const triggerPoint = 46; // 필요하면 조정

  window.addEventListener('scroll', () => {
    if (window.scrollY > triggerPoint) {
      rozHeader.classList.add('is-fixed');
      btnDwonload.classList.add('is-fixed');
    } else {
      rozHeader.classList.remove('is-fixed');
      btnDwonload.classList.remove('is-fixed');
    }
  });
});



// ## floating menu 
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');
    const floatMenu = document.querySelector('.floating-util-container');
    const topBtn = document.querySelector('.top-btn-wrap');
    function updateFloatingUI() {
      const footerTop = footer.offsetTop;
      const footerHeight = footer.offsetHeight;
      const scrollBottom = window.scrollY + window.innerHeight;

      if (scrollBottom >= footerTop) {
        // footer에 닿으면
        floatMenu.classList.add('is-stop');
        topBtn.classList.add('is-stop');

        floatMenu.style.bottom = `${footerHeight}px`;

      } else {
        floatMenu.classList.remove('is-stop');

        floatMenu.style.bottom = `0px`;
      }
    }

    // scroll top
    topBtn.querySelector('button').addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', updateFloatingUI);
    window.addEventListener('resize', updateFloatingUI);
  });

