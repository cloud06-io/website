document.addEventListener("DOMContentLoaded", function () {
  const scrollImages = document.getElementById("portofolio-case");
  const scrollLength = scrollImages.scrollWidth - scrollImages.clientWidth;
  const leftButton = document.getElementById("portofolio-left");
  const rightButton = document.getElementById("portofolio-right");

  function checkScroll() {
    const currentScroll = scrollImages.scrollLeft;
    if (currentScroll === 0) {
      leftButton.style.setProperty('display', 'none');
      rightButton.style.setProperty('display', 'block');
    } else if (currentScroll === scrollLength) {
      leftButton.style.setProperty('display', 'block');
      rightButton.style.setProperty('display', 'none');
    } else {
      leftButton.style.setProperty('display', 'block');
      rightButton.style.setProperty('display', 'block');
    }
  }

  scrollImages.addEventListener("scroll", checkScroll);
  window.addEventListener("resize", checkScroll);
  checkScroll();

  leftButton.addEventListener("click", leftScroll);
  rightButton.addEventListener("click", rightScroll);

  const srollSize = window.screen.width > 768 ? (window.screen.width / 4) : window.screen.width;
  function leftScroll() {
    scrollImages.scrollBy({
      left: -window.screen.width,
      behavior: "smooth"
    });
  }

  function rightScroll() {
    scrollImages.scrollBy({
      left: window.screen.width,
      behavior: "smooth"
    });
  }

});
