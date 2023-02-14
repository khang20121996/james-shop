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

function handleSelectSorting() {
  const selectWrapElement = document.querySelector(
    ".shop .product-list .product-list__sort-select"
  );
  const selectElement = document.querySelector(
    ".shop .product-list .product-list__sort-select-list"
  );
  const selectListElement = document.querySelectorAll(
    ".shop .product-list .product-list__sort-select-list li"
  );
  const selectNameElement = document.querySelector(
    ".shop .product-list .product-list__sort-select-name"
  );
  const styleSelectListElement = window.getComputedStyle(selectElement);

  selectWrapElement.addEventListener("click", (e) => {
    styleSelectListElement.display === "none"
      ? (selectElement.style.display = "block")
      : (selectElement.style.display = "none");
  });

  document.addEventListener("click", (e) => {
    if (
      !selectElement.contains(e.target.parentElement) &&
      !selectWrapElement.contains(e.target.parentElement)
    ) {
      selectElement.style.display = "none";
    }
  });

  selectListElement.forEach((item) => {
    item.addEventListener("click", (e) => {
      const newSelectName = e.target.textContent;
      selectNameElement.textContent = newSelectName;
    });
  });
}

function handleManualGridChanges() {
  const gridElement = document.getElementById("shopIconGrid");
  const listElement = document.getElementById("shopIconList");
  const productListItemWrapElement = document.querySelectorAll(
    ".featured-product__item-wrap"
  );
  const productListItemElement = document.querySelectorAll(
    ".featured-product__item"
  );

  gridElement.addEventListener("click", (e) => {
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

function main() {
  handleRangePriceSlider();
  handleSelectSorting();
  handleManualGridChanges();
  console.log("Shop loaded");
}

setTimeout(() => {
  const location = window.location.pathname;
  if (location === "/shop") {
    main();
  }
}, 3000);
