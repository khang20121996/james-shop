function handleSlickProduct() {
  $(".product-detail__slick").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  });
}

function main() {
  handleSlickProduct();
  console.log("product detail loaded");
}

setTimeout(() => {
  const location = window.location.pathname;
  if (location === "/shop/detail") {
    main();
  }
}, 3000);
