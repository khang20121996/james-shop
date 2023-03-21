// use throttle technique to handle scroll . event
import throttle from "lodash.throttle";
import {
  setImage,
  setNameProduct,
  setPriceProduct,
  setTextContent,
} from "./js/utils/common";

// handle header blur when user scrolling
function handleBlurHeader() {
  const headerElement = document.querySelector("header");
  if (!headerElement) return;
  window.addEventListener(
    "scroll",
    throttle(() => {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        headerElement.style.backgroundColor = "rgba(229, 229, 229, 0.5)";
      } else {
        headerElement.style.backgroundColor = "rgba(229, 229, 229, 1)";
      }
    }, 1000)
  );
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
  if (!goToTopElement || window.innerWidth <= 480) return;

  window.addEventListener(
    "scroll",
    throttle(() => {
      if (
        document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400
      ) {
        goToTopElement.classList.add("active");
      } else {
        goToTopElement.classList.remove("active");
      }
    }, 1000)
  );

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
  // const preLoaderElement = document.getElementById("preLoader");
  // if (!preLoaderElement) return;
  // preLoaderElement.style.display = "none";
  // console.log("loader stop");
}

function setSubTotalCart() {
  const subTotalElement = document.querySelector(
    ".header-inner__icon-cart .cart__item--subtotal"
  );
  if (!subTotalElement) return;
  const listCart = JSON.parse(localStorage.getItem("cart"));
  const notificationCartElement = document.querySelector(
    ".header-inner__icon-cart--detail-note"
  );

  if (listCart.length > 0) {
    notificationCartElement.style.display = "none";
  } else {
    notificationCartElement.style.display = "block";
  }

  if (listCart) {
    let total = 0;
    if (Array.isArray(listCart)) {
      listCart.forEach((product) => {
        total += product.price * product.quantityCart;
      });
    } else {
      total = listCart.price;
    }
    subTotalElement.textContent = `$${total}.00`;
  }
}

export function renderShoppingCart(listCart, length = 0) {
  if (!listCart) return;

  function removeCartItem(liElement) {
    //remove cart item from local Storage
    const listCart = JSON.parse(localStorage.getItem("cart"));
    const newListCart = listCart.filter(
      (cartItem) => Number(cartItem.cartId) !== Number(liElement.dataset.id)
    );

    localStorage.setItem("cart", JSON.stringify(newListCart));
    liElement.style.display = "none";

    const cartQuantityElement = document.querySelector(
      ".header-inner__icon-cart .header-inner__icon-cart--quantity"
    );
    if (cartQuantityElement) {
      let length = cartQuantityElement.textContent;
      length--;
      cartQuantityElement.textContent = length;
    }
    setSubTotalCart();
  }

  function createCartElement(product) {
    const template = document.getElementById("cartItem");
    if (!template || !product) return;

    const liElement = template.content.firstElementChild.cloneNode(true);
    const deleteElement = liElement.querySelector(".cart__item--delete");

    setImage(liElement, ".cart__item-mobile-img", product.imageUrl[0]);
    setTextContent(liElement, ".cart__item-mobile-name", product.name);
    setPriceProduct(liElement, ".cart__item-mobile-price", product.price);
    setPriceProduct(
      liElement,
      ".cart__item-mobile-total",
      product.price * product.quantityCart
    );
    setTextContent(
      liElement,
      ".cart__item-mobile-quantity",
      `x${product.quantityCart}`
    );
    liElement.dataset.id = product.cartId;

    // remove cart item
    if (deleteElement) {
      deleteElement.addEventListener("click", (e) => {
        removeCartItem(liElement);
      });
    }

    return liElement;
  }

  const ulElement = document.querySelector(
    ".header-inner__icon-cart--detail .cart__list-mobile"
  );
  const cartQuantityElement = document.querySelector(
    ".header-inner__icon-cart .header-inner__icon-cart--quantity"
  );

  if (cartQuantityElement) {
    cartQuantityElement.textContent = length;
  }

  if (ulElement) {
    if (Array.isArray(listCart)) {
      listCart.forEach((product) => {
        const liElement = createCartElement(product);
        ulElement.appendChild(liElement);
      });
    } else {
      const liElement = createCartElement(listCart);
      ulElement.appendChild(liElement);
    }
  }

  setSubTotalCart();
}

function handleSearchProduct() {
  const formSearch = document.querySelector(
    ".header-inner__icon-search--input"
  );
  if (formSearch) {
    const inputElement = formSearch.querySelector("input");

    formSearch.addEventListener("submit", (e) => {
      const valueSearch = inputElement.value;
      e.preventDefault();
      window.location.assign(`/shop/search?q=${valueSearch}`);
      console.log("click", valueSearch);
    });
  }
}

window.addEventListener("load", () => {
  handlePreloader();
});

function main() {
  const data = localStorage.getItem("cart");
  const listCart = JSON.parse(data);
  handleBlurHeader();
  handleClickGotoTop();
  handleCircleSlider();
  renderShoppingCart(listCart, listCart?.length);
  handleSearchProduct();
  console.log("Main loaded");
}

setTimeout(() => {
  main();
}, 3000);
