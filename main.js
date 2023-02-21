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

// handle footer (lasted tweets with circle slider)
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

// create spinner when page load
function handlePreloader() {
  setTimeout(() => {
    const preLoaderElement = document.getElementById("preLoader");
    if (!preLoaderElement) return;
    preLoaderElement.style.display = "none";
    console.log("loader stop");
  }, 2000);
}

window.addEventListener("load", () => {
  handlePreloader();
});

function main() {
  handleBlurHeader();
  handleClickGotoTop();
  handleCircleSlider();
  console.log("Main loaded");
}

setTimeout(() => {
  main();
}, 3000);
