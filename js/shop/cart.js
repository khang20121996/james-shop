import {
  setImage,
  setNameProduct,
  setPriceProduct,
  setTextContent,
} from "../utils/common";

function handleRemoveCart(liElement) {
  const listCart = JSON.parse(localStorage.getItem("cart"));
  const newListCart = listCart.filter(
    (cartItem) => Number(cartItem.cartId) !== Number(liElement.dataset.id)
  );

  localStorage.setItem("cart", JSON.stringify(newListCart));
  liElement.style.display = "none";
}

function createCartItemPc(product) {
  if (!product) return;

  const templateElement = document.getElementById("cartItemPc");

  if (templateElement) {
    const liElement = templateElement.content.firstElementChild.cloneNode(true);
    const removeCartElement = liElement.querySelector(".cart__item--delete");

    setImage(liElement, ".cart__item-img", product.imageUrl[0]);
    setPriceProduct(liElement, ".cart__item-price", product.price);
    setPriceProduct(
      liElement,
      ".cart__item-total",
      product.price * product.quantityCart
    );
    setNameProduct(liElement, ".cart__item-name", product.name);
    setTextContent(
      liElement,
      ".cart__item-quantity",
      `x${product.quantityCart}`
    );
    liElement.dataset.id = product.cartId;

    if (removeCartElement) {
      removeCartElement.addEventListener("click", (e) => {
        handleRemoveCart(liElement);
        setSubTotalCart();
      });
    }

    return liElement;
  }
}

function createCartItemMobile(product) {
  if (!product) return;

  const templateElement = document.getElementById("cartItemMobile");

  if (templateElement) {
    const liElement = templateElement.content.firstElementChild.cloneNode(true);
    const removeCartElement = liElement.querySelector(".cart__item--delete");

    setImage(liElement, ".cart__item-mobile-img", product.imageUrl[0]);
    setPriceProduct(liElement, ".cart__item-mobile-price", product.price);
    setPriceProduct(
      liElement,
      ".cart__item-mobile-total",
      product.price * product.quantityCart
    );
    setNameProduct(liElement, ".cart__item-mobile-name", product.name);
    setTextContent(
      liElement,
      ".cart__item-mobile-quantity",
      `x${product.quantityCart}`
    );
    liElement.dataset.id = product.cartId;
    liElement.dataset.total = product.price * product.quantityCart;

    if (removeCartElement) {
      removeCartElement.addEventListener("click", (e) => {
        console.log("click");
        handleRemoveCart(liElement);
        setSubTotalCart();
      });
    }

    return liElement;
  }
}

function renderListCart(productList) {
  if (!productList) return;

  const ulElementPc = document.querySelector(".cart__list-pc");
  const ulElementMobile = document.querySelector(".cart .cart__list-mobile");

  if (ulElementPc) {
    productList.forEach((product) => {
      const liElement = createCartItemPc(product);

      ulElementPc.appendChild(liElement);
    });
  }

  if (ulElementMobile) {
    productList.forEach((product) => {
      const liElement = createCartItemMobile(product);
      ulElementMobile.appendChild(liElement);
    });
  }
}

function setSubTotalCart() {
  const listCart = JSON.parse(localStorage.getItem("cart"));
  const subTotalElement = document.querySelector(".cart__total-price");
  let totalPrice = 0;
  if (!subTotalElement || !listCart) return;

  listCart.forEach((item) => {
    totalPrice += item.price * item.quantityCart;
  });

  subTotalElement.textContent = `${totalPrice}.00$`;
}

function main() {
  const data = JSON.parse(localStorage.getItem("cart"));
  renderListCart(data);
  setSubTotalCart(data);
  //   console.log(data);
}

(() => {
  setTimeout(() => {
    const location = window.location.pathname;
    if (location === "/shop/cart") {
      main();
    }
  }, 3000);
})();
