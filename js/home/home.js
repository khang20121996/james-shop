//handle automatic navigation slider banner
function handleAutoNavSlider() {
  let couter = 1;
  setInterval(() => {
    document.getElementById("radio" + couter).checked = true;
    couter++;

    if (couter > 2) {
      couter = 1;
    }
  }, 8000);
}

// create slick slider feature product with Slick library
function handleFeatureProdSlick() {
  $(".featured-product .featured-product-list").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
}

// create slick slider brand logo with Slick library
function hanldeBrandsSlick() {
  $(".brand-list").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
}

function main() {
  handleAutoNavSlider();
  handleFeatureProdSlick();
  hanldeBrandsSlick();
  console.log("Home loaded");
}

setTimeout(() => {
  const location = window.location.pathname;
  console.log(location);
  if (location === "/") {
    main();
  }
}, 3000);
