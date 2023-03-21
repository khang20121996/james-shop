import { productApi } from "../api/productApi";
import { renderFeatureProduct, renderProduct } from "../home/home";

function getBrandFromFilter() {
  const brandList = document.querySelectorAll(".sidebar__filter-by-brand a");
  let brand;

  brandList.forEach((item) => {
    if (item.classList.contains("active")) {
      brand = item;
    }
  });

  return brand.dataset.id;
}

function handleInputFieldPrice(minValue, maxValue) {
  const maxElement = document.querySelector(
    ".shop .sidebar .sidebar__filter-by-price--field-max"
  );
  const minElement = document.querySelector(
    ".shop .sidebar .sidebar__filter-by-price--field-min"
  );

  if (!maxElement || !minElement) return;
  if (maxValue - minValue >= 0) {
    maxElement.textContent = `$${maxValue}`;
    minElement.textContent = `$${minValue}`;
  } else {
    return;
  }
}

//handle filtering by price with "range"
function handleRangePriceSlider() {
  const rangeInput = document.querySelectorAll(
    ".shop .sidebar__filter-by-price--range-input input"
  );
  const progress = document.querySelector(
    ".shop .sidebar__filter-by-price--progress"
  );
  let priceGap = 0;

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minRange = parseInt(rangeInput[0].value);
      let maxRange = parseInt(rangeInput[1].value);

      if (maxRange - minRange < priceGap) {
        if (e.target.className === "sidebar__filter-by-price--range-min") {
          rangeInput[0].value = maxRange - priceGap;
        } else {
          rangeInput[1].value = minRange + priceGap;
        }
      } else {
        progress.style.left = (minRange / rangeInput[0].max) * 100 + "%";
        progress.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
      }

      handleInputFieldPrice(minRange, maxRange);
    });
  });
}

// handle filter change option
function handleSelectSorting(sort, order) {
  const selectWrapElement = document.querySelector(
    ".shop .product-list .product-list__sort-select"
  );
  const selectListElement = document.querySelector(
    ".shop .product-list .product-list__sort-select-list"
  );

  const selectElement = document.querySelectorAll(
    ".shop .product-list .product-list__sort-select-list li"
  );
  const selectNameElement = document.querySelector(
    ".shop .product-list .product-list__sort-select-name"
  );

  if (!sort || !order) {
    selectNameElement.textContent = selectElement[0].textContent;
  }

  selectNameElement.addEventListener("click", (e) => {
    selectListElement.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (
      !selectListElement.contains(e.target.parentElement) &&
      !selectWrapElement.contains(e.target.parentElement)
    ) {
      selectListElement.style.display = "none";
    }
  });

  selectElement.forEach((item) => {
    if (item.dataset.sort === sort && item.dataset.order === order) {
      selectNameElement.textContent = item.textContent;
    }
    item.addEventListener("click", (e) => {
      // const newSelectName = e.target.textContent;
      selectNameElement.textContent = e.target.textContent;
      selectListElement.style.display = "none";
    });
  });
}

//handle formatting changes of product list
function handleManualGridChanges() {
  const gridElement = document.getElementById("shopIconGrid");
  const listElement = document.getElementById("shopIconList");

  // Check whether the list display is checked or not
  if (listElement.classList.contains("active")) {
    const productListItemWrapElement = document.querySelectorAll(
      ".featured-product__item-wrap"
    );
    const productListItemElement = document.querySelectorAll(
      ".featured-product__item"
    );

    productListItemWrapElement.forEach((item) => {
      item.classList.remove("col-xl-3");
      item.classList.remove("col-md-6");
      item.classList.add("col-12");
    });

    productListItemElement.forEach((item) => {
      item.classList.add("featured-product__item--list");
    });
  }

  // handle button format display when click
  gridElement.addEventListener("click", (e) => {
    const productListItemWrapElement = document.querySelectorAll(
      ".featured-product__item-wrap"
    );
    const productListItemElement = document.querySelectorAll(
      ".featured-product__item"
    );
    console.log("click");
    if (!gridElement.classList.contains("active")) {
      gridElement.classList.add("active");
      listElement.classList.remove("active");

      productListItemWrapElement.forEach((item) => {
        item.classList.remove("col-12");
        item.classList.add("col-xl-3");
        item.classList.add("col-md-6");
      });

      productListItemElement.forEach((item) => {
        item.classList.remove("featured-product__item--list");
      });
    }
  });

  listElement.addEventListener("click", (e) => {
    const productListItemWrapElement = document.querySelectorAll(
      ".featured-product__item-wrap"
    );
    const productListItemElement = document.querySelectorAll(
      ".featured-product__item"
    );

    if (!listElement.classList.contains("active")) {
      listElement.classList.add("active");
      gridElement.classList.remove("active");

      productListItemWrapElement.forEach((item) => {
        item.classList.remove("col-xl-3");
        item.classList.remove("col-md-6");
        item.classList.add("col-12");
      });

      productListItemElement.forEach((item) => {
        item.classList.add("featured-product__item--list");
      });
    }
  });
}

// fetch data from API
async function handlePagination() {
  const pageList = document.querySelectorAll(
    ".product-list__pagination-item-link"
  );

  const productListElement = document.querySelector(
    ".shop .featured-product-list"
  );
  if (!pageList || !productListElement) return;

  // render for the first time when changing the list from filters
  let stringParam = getStringQueryParams();
  if (!stringParam) {
    stringParam = "?_sort=&_order=&_page=1&_limit=12&brand_like=";
    setQueryParams();
  }
  const productList = await getByBrand(`?${stringParam}`);

  renderFeatureProduct(productList, productListElement, true);
  handleManualGridChanges();

  // handle when user clicks on pages in pagination
  let i;
  const pageListLength = pageList.length;
  for (i = 0; i < pageListLength; i++) {
    pageList[i].addEventListener("click", async (e) => {
      e.preventDefault();
      const param = getQueryParams();
      param.page = e.target.textContent;
      setQueryParams(param);
      const newStringParam = getStringQueryParams();
      const list = await getByBrand(`?${newStringParam}`);

      renderFeatureProduct(list, productListElement, true);
      handleManualGridChanges();

      // go to top product list when click pagination
      if (window.screen.width <= 1024) {
        document.body.scrollTop = 1200;
        document.documentElement.scrollTop = 1200;
      } else {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    });
  }
}

async function handleDisplayPagination(pageParam) {
  const pageList = document.querySelectorAll(
    ".product-list__pagination-item-link"
  );
  if (!pageList) return;
  console.log(pageParam);
  if (pageParam === 1) {
    const stringParam = getStringQueryParams();
    const productList = await getByBrand(`?${stringParam}`);
    const productListLength = productList.length;

    if (productListLength < 12) {
      for (let i = 1; i < pageList.length; i++) {
        pageList[i].style.display = "none";
      }
    } else {
      for (let i = 1; i < pageList.length; i++) {
        pageList[i].style.display = "block";
      }
    }
  }

  if (!pageParam) {
    pageList.forEach((item) => {
      item.classList.remove("active");
    });
    pageList[0].classList.add("active");
  }
  pageList.forEach((item) => {
    if (item.textContent === pageParam) {
      item.classList.add("active");
    }
  });

  // set parameter when pagination is clicked
  pageList.forEach((page) => {
    page.addEventListener("click", (e) => {
      e.preventDefault();
      pageList.forEach((item) => {
        item.classList.remove("active");
      });
      page.classList.add("active");
    });
  });
}

//
function handleSortingFilter() {
  const selectionListElement = document.querySelectorAll(
    ".shop .product-list .product-list__sort-select-list li"
  );

  function handleSortingByBrand(brand, sortName, param) {
    switch (sortName) {
      case "default":
        setQueryParams({
          ...param,
          sort: "",
          order: "",
          page: 1,
          limit: 12,
          brand: brand,
        });
        handlePagination();
        break;

      case "rating":
        setQueryParams({
          ...param,
          sort: "rating",
          order: "desc",
          page: 1,
          limit: 12,
          brand: brand,
        });
        handlePagination();
        break;

      case "lowtohight":
        setQueryParams({
          ...param,
          sort: "price",
          order: "asc",
          page: 1,
          limit: 12,
          brand: brand,
        });
        handlePagination();
        break;

      case "highttolow":
        setQueryParams({
          ...param,
          sort: "price",
          order: "desc",
          page: 1,
          limit: 12,
          brand: brand,
        });
        handlePagination();
        break;

      default:
        console.log("default");
        break;
    }
  }

  selectionListElement.forEach((item) => {
    item.addEventListener("click", () => {
      // handle the display of the active element of pagination
      handleDisplayPagination();
      const brand = getBrandFromFilter();
      const param = getQueryParams();

      if (brand === "all") {
        switch (item.dataset.id) {
          case "default":
            setQueryParams({ ...param, sort: "", order: "" });
            handlePagination();
            break;

          case "rating":
            setQueryParams({
              ...param,
              sort: "rating",
              order: "desc",
            });
            handlePagination();
            break;

          case "lowtohight":
            setQueryParams({ ...param, sort: "price", order: "asc" });
            handlePagination();
            break;

          case "highttolow":
            setQueryParams({
              ...param,
              sort: "price",
              order: "desc",
            });
            handlePagination();
            break;

          default:
            return;
        }
      } else {
        handleSortingByBrand(brand, item.dataset.id, param);
      }
    });
  });
}

function handleFilterProductByBrands(brandParam) {
  const quantityBrandListElement = document.querySelectorAll(
    ".sidebar__filter-by-brand span"
  );
  const brandListElement = document.querySelectorAll(
    ".sidebar__filter-by-brand a"
  );
  if (!quantityBrandListElement || !brandListElement) return;

  if (!brandParam || brandParam === "") {
    brandListElement[0].classList.add("active");
  } else {
    brandListElement.forEach((brandItem) => {
      if (brandItem.dataset.id === brandParam) {
        brandItem.classList.add("active");
      }
    });
  }

  // Show product quantity by brand
  quantityBrandListElement.forEach(async (brandElement) => {
    let brandList;
    if (brandElement.dataset.id === "all") {
      brandList = await getAllData();
    } else {
      brandList = await getByBrand(`?brand_like=${brandElement.dataset.id}`);
    }

    brandElement.textContent = `  (${brandList.length})`;
  });

  // handle event when clicking on the each brand
  brandListElement.forEach((brandElement) => {
    brandElement.addEventListener("click", (e) => {
      e.preventDefault();
      brandListElement.forEach((item) => {
        if (item.classList.contains("active")) item.classList.remove("active");
      });
      brandElement.classList.add("active");

      if (brandElement.dataset.id === "all") {
        setQueryParams();
      } else {
        setQueryParams({ brand: brandElement.dataset.id });
      }
      handleDisplayPagination();
      handlePagination();
      handleSelectSorting();
    });
  });
}

function handleFilterByPrice() {
  const formElement = document.querySelector(".sidebar__filter-by-price");
  const buttonElememt = formElement.querySelector(" button");
  const minPrice = formElement.querySelector(
    ".sidebar__filter-by-price--field-min"
  );
  const maxPrice = formElement.querySelector(
    ".sidebar__filter-by-price--field-max"
  );

  buttonElememt.addEventListener("click", async (e) => {
    e.preventDefault();
    const min = minPrice.textContent.slice(1);
    const max = maxPrice.textContent.slice(1);
    // const brand = getBrandFromFilter();
    const param = getQueryParams();
    setQueryParams({ ...param, price_gte: min, price_lte: max });
    handlePagination();
    handleDisplayPagination();
    handleSelectSorting();
  });
}

async function getAllData(queryparams) {
  let productList;
  try {
    productList = await productApi.getAll(queryparams);
  } catch (error) {
    console.log(error, "can't fetch data");
  }

  return productList;
}

async function getByBrand(queryparams) {
  let productList;
  try {
    productList = await productApi.getByBrand(queryparams);
  } catch (error) {
    console.log(error, "can't fetch data");
  }

  return productList;
}

function setQueryParams(param) {
  const newParam = {
    sort: "",
    order: "",
    page: 1,
    limit: 12,
    brand: "",
    price_gte: 0,
    price_lte: 250,
    ...param,
  };
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.set("_sort", newParam.sort);
  searchParams.set("_order", newParam.order);
  searchParams.set("_page", newParam.page);
  searchParams.set("_limit", newParam.limit);
  searchParams.set("brand_like", newParam.brand);
  searchParams.set("price_gte", newParam.price_gte);
  searchParams.set("price_lte", newParam.price_lte);

  let newRelativePathQuery =
    window.location.pathname + "?" + searchParams.toString();
  history.pushState(null, "", newRelativePathQuery);
}

function getQueryParams() {
  const param = {
    sort: "",
    order: "",
    page: 1,
    limit: 12,
    price_gte: 0,
    price_lte: 250,
    brand: "",
  };
  let searchParams = new URLSearchParams(window.location.search);
  param.sort = searchParams.get("_sort");
  param.order = searchParams.get("_order");
  param.page = searchParams.get("_page");
  param.limit = searchParams.get("_limit");
  param.brand = searchParams.get("brand_like");
  param.price_gte = searchParams.get("price_gte");
  param.price_lte = searchParams.get("price_lte");

  return param;
}

function getStringQueryParams() {
  // let searchParams = new URLSearchParams(window.location.search);
  var stringParams = window.location.href.split("?");
  return stringParams[1];
}

async function renderFeatureShopProduct() {
  const productList = await getAllData();
  const sidebarProductListElement = document.querySelector(
    ".shop .sidebar__feature-product"
  );
  const bestSellProductList = productList.filter(
    (product) => product.rating === 5
  );

  renderProduct(bestSellProductList, sidebarProductListElement);
}

function main() {
  const params = getQueryParams();

  handleDisplayPagination(params.page);
  handleFilterProductByBrands(params.brand);
  handleSelectSorting(params.sort, params.order);
  handleRangePriceSlider();
  handleManualGridChanges();
  handlePagination();
  handleSortingFilter();
  handleFilterByPrice();
  renderFeatureShopProduct();
  console.log("Shop loaded");
}

(() => {
  const location = window.location.pathname;

  if (location === "/shop") {
    setTimeout(() => {
      main();
    }, 3000);
  }
})();
