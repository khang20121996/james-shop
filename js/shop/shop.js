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

function main() {
  handleRangePriceSlider();
  console.log("Shop js running");
}

setTimeout(() => {
  main();
}, 1000);
