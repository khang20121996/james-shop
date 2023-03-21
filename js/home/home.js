import { productApi } from "../api/productApi";
import {
  hideSaleElement,
  setImage,
  setLink,
  setNameProduct,
  setPriceProduct,
  setRating,
  setTextContent,
} from "../utils/common";
import throttle from "lodash.throttle";
import { renderShoppingCart } from "../../main";

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

//
export function handleAddToCart(product, toastElement) {
  if (toastElement) {
    toastElement.style.display = "block";
    setTimeout(() => {
      toastElement.style.display = "none";
    }, 2000);
  }

  product.cartId = Math.floor(Math.random() * 100000);

  const data = localStorage.getItem("cart");
  let length;
  if (!data) {
    localStorage.setItem("cart", JSON.stringify([product]));
    length = 1;
  } else {
    const listCart = JSON.parse(data);
    listCart.push(product);
    localStorage.setItem("cart", JSON.stringify(listCart));
    length = listCart.length;
  }

  renderShoppingCart(product, length);
}

// render product from data fetched from api
export function renderFeatureProduct(
  productList,
  productListElement,
  wrapProductElement
) {
  if (!productList || !Array.isArray(productList) || !productListElement)
    return;

  // Delete the previous product list
  productListElement.textContent = "";

  function createFeatureProductElement(product) {
    if (!product) return;
    // get template product item UI

    let templateElement;
    if (wrapProductElement) {
      templateElement = document.getElementById("templateShopFeatureProduct");
    } else {
      templateElement = document.getElementById("templateFeatureProduct");
    }
    if (!templateElement) return;

    // clone element from template product
    const productElement =
      templateElement.content.firstElementChild.cloneNode(true);
    const addToCartElement = productElement.querySelector(
      ".featured-product__item-link--cart"
    );
    const toastElement = productElement.querySelector(".toastsCartSuccess");

    // set product attributes (function set from common.js)
    setLink(productElement, ".featured-product__item-link", product?.id);
    setLink(productElement, ".featured-product__item-name", product?.id);
    setLink(productElement, ".featured-product__item-readmore", product?.id);

    setImage(
      productElement,
      ".featured-product__item-img",
      product?.imageUrl[0]
    );
    setNameProduct(
      productElement,
      ".featured-product__item-name",
      product?.name
    );
    setPriceProduct(
      productElement,
      ".featured-product__item-price",
      product?.price
    );
    setPriceProduct(
      productElement,
      ".featured-product__item-sale",
      product?.discountPrice
    );
    hideSaleElement(
      productElement,
      ".featured-product__item-link--sale",
      product?.discountPrice
    );
    setRating(
      productElement,
      ".featured-product__item-start-rate",
      product?.rating
    );

    // handle description if it has
    setTextContent(
      productElement,
      ".featured-product__item-description",
      `${product?.description.substr(0, 160)} . . .`
    );

    // set event when click add to cart
    addToCartElement.addEventListener("click", (e) => {
      e.preventDefault();
      const newProduct = { ...product };
      newProduct.quantityCart = 1;
      handleAddToCart(newProduct, toastElement);
    });

    return productElement;
  }

  // For each product to render the UI
  productList.forEach((product) => {
    const productElement = createFeatureProductElement(product);

    productListElement.appendChild(productElement);
  });
}

export function renderProduct(productList, productListElement) {
  if (!productList || !Array.isArray(productList || !productListElement))
    return;

  function createProduct(product) {
    if (!product) return;

    // get template product item UI
    const templateElement = document.getElementById("templateProduct");
    if (!templateElement) return;

    // clone element from template product
    const productElement =
      templateElement.content.firstElementChild.cloneNode(true);

    setLink(productElement, ".product-item__img", product?.id);
    setLink(productElement, ".product-item__info-name", product?.id);
    setImage(productElement, ".product-item__img img", product?.imageUrl[0]);
    setNameProduct(productElement, ".product-item__info-name", product?.name);
    setRating(productElement, ".product-item__info-start", product?.rating);
    setPriceProduct(
      productElement,
      ".product-item__info-price",
      product?.discountPrice
    );
    setPriceProduct(
      productElement,
      ".product-item__info-discount",
      product?.price
    );

    return productElement;
  }

  // random auto an array has 4 elements
  for (let i = 0; i < 4; i++) {
    const productElement = createProduct(productList[i]);
    productListElement.appendChild(productElement);
  }
}

async function main() {
  // call API fetch data
  let productList;
  try {
    productList = await productApi.getAll();
    const productListElement = document.querySelector(
      ".home .featured-product-list"
    );
    const newProductListElement = document.querySelector(
      ".products .new-product__list"
    );
    const saleProductListElement = document.querySelector(
      ".products .sale-product__list"
    );
    const bestSellProductListElement = document.querySelector(
      ".products .best-sell-product__list"
    );
    const saleProductList = productList.filter(
      (product) => product.discountPrice > 0
    );
    const bestSellProductList = productList.filter(
      (product) => product.rating === 5
    );

    renderFeatureProduct(productList, productListElement);
    renderProduct(productList, newProductListElement);
    renderProduct(saleProductList, saleProductListElement);
    renderProduct(bestSellProductList, bestSellProductListElement);
    handleAutoNavSlider();
    handleFeatureProdSlick();
    hanldeBrandsSlick();
    console.log("Home loaded");
  } catch (error) {
    console.log(error, "can't fetch data");
  }
}

(() => {
  const location = window.location.pathname;
  if (location === "/") {
    setTimeout(() => {
      main();
    }, 3000);
  }
})();
