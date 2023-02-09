// handle header blur when user scrolling
function handleBlurHeader() {
  const headerElement = document.querySelector("header");
  if (!headerElement) return;

  document.addEventListener("scroll", (event) => {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      headerElement.style.backgroundColor = "rgba(229, 229, 229, 0.5)";
    } else {
      headerElement.style.backgroundColor = "rgba(229, 229, 229, 1)";
    }
  });
}

// handle footer (lasted tweets circle slider)
function handleCircleSlider() {
  let currentSlide = 0;
  let interval;
  const sliderContainer = document.getElementById("footerSlider");
  const sliderList = sliderContainer.querySelectorAll(".footer-slide");
  function startSlider() {
    firstSlide();
    interval = setInterval(() => {
      firstSlide();
    }, 10000);
    function firstSlide() {
      if (currentSlide === 0) {
        sliderList[currentSlide + 2].classList.remove("slidy-footer");
        sliderList[currentSlide].classList.add("slidy-footer");
      } else {
        sliderList[currentSlide - 1].classList.remove("slidy-footer");
        sliderList[currentSlide].classList.add("slidy-footer");
      }
      currentSlide++;
      if (currentSlide === sliderList.length) {
        currentSlide = 0;
      }
    }
  }
  function stopSlider() {
    clearInterval(interval);
  }
  startSlider();
}

// hancle click go to top
function handleClickGotoTop() {
  const goToTopElement = document.getElementById("goToTop");
  if (!goToTopElement) return;

  document.addEventListener("scroll", (event) => {
    if (
      document.body.scrollTop > 400 ||
      document.documentElement.scrollTop > 400
    ) {
      goToTopElement.classList.add("active");
    } else {
      goToTopElement.classList.remove("active");
    }
  });

  goToTopElement.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

function main() {
  handleBlurHeader();
  handleClickGotoTop();
  handleCircleSlider();
  console.log("Main running");
}

setTimeout(() => {
  main();
}, 1000);
