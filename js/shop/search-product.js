import { productApi } from "../api/productApi";
import { renderFeatureProduct } from "../home/home";

function handleSearchForm() {
  const formSearch = document.querySelector(".search-form");
  const productListElement = document.querySelector(".featured-product-list");

  if (formSearch && productListElement) {
    formSearch.addEventListener("submit", async (e) => {
      e.preventDefault();
      const inputValue = formSearch.querySelector("input").value;
      const productSearchList = await productApi.searchProduct(inputValue);

      renderSearchProductList(productSearchList, inputValue);
      // renderFeatureProduct(productSearchList, productListElement, true);

      // set params search
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputValue);
      let newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    });
  }
}

function renderSearchProductList(productList, searchParams) {
  const productListElement = document.querySelector(".featured-product-list");
  const searchNotificationElement = document.querySelector(
    ".search-notification"
  );
  const keywordSearchElement = document.querySelector(".search-keyword");

  if (productList.length === 0) {
    keywordSearchElement.textContent = searchParams;
    searchNotificationElement.style.display = "block";
  } else {
    searchNotificationElement.style.display = "none";
  }
  renderFeatureProduct(productList, productListElement, true);
}

async function main() {
  let searchParams = new URLSearchParams(window.location.search);
  const params = searchParams.get("q");
  const productSearchList = await productApi.searchProduct(params);

  renderSearchProductList(productSearchList, params);
  handleSearchForm();

  console.log("Search loaded");
}

(() => {
  setTimeout(() => {
    const location = window.location.pathname;
    if (location === "/shop/search") {
      main();
    }
  }, 3000);
})();
