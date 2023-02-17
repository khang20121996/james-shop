// handle image product with Slick library
function handleSlickProduct() {
  $(".product-detail__slick").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  });
}

// change the main image of the product when clicking on the image in the "slick slider"
function handleImgProductDisplay() {
  const listImageElement = document.querySelectorAll(
    ".product-detail__slick-item img"
  );
  const mainImageElement = document.querySelector(".product-detail__img img");

  if (!listImageElement || !mainImageElement) return;

  listImageElement.forEach((item) => {
    item.addEventListener("click", () => {
      mainImageElement.src = item.src;
      handleZoomImage();
    });
  });
}

// handle enlarging the main image of the product with modal
function handleProductModal() {
  const buttonZoomIn = document.querySelector(".product-detail__img-icon-show");
  const modalElement = document.getElementById("productModal");
  const imageModalElement = document.querySelector(
    ".product-modal__content img"
  );
  const closeButton = document.querySelector(".product-modal__content-icon");
  const mainImageElement = document.querySelector(".product-detail__img img");

  if (!buttonZoomIn) return;

  buttonZoomIn.addEventListener("click", () => {
    modalElement.style.display = "block";
    imageModalElement.src = mainImageElement.src;
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modalElement.style.display = "none";
    });
  }

  modalElement.addEventListener("click", (e) => {
    if (e.target == modalElement) {
      modalElement.style.display = "none";
    }
  });
}

// enlarge the image when hovering over it
function handleZoomImage() {
  const mainImageElement = document.querySelector(
    ".product-detail .product-detail__img-main"
  );
  const resultImageElement = document.querySelector(
    ".product-detail .product-detail__img-zoom"
  );

  // create lens
  let lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");

  /*insert lens:*/
  mainImageElement.parentElement.insertBefore(lens, mainImageElement);

  /*calculate the ratio between result DIV and lens:*/
  let cx = resultImageElement.offsetWidth / lens.offsetWidth;
  let cy = resultImageElement.offsetHeight / lens.offsetHeight;

  /*set background properties for the result DIV:*/
  resultImageElement.style.backgroundImage =
    "url('" + mainImageElement.src + "')";

  resultImageElement.style.backgroundSize =
    mainImageElement.width * cx + "px " + mainImageElement.height * cy + "px";

  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  mainImageElement.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  mainImageElement.addEventListener("touchmove", moveLens);

  mainImageElement.addEventListener("mouseover", () => {
    mainImageElement.style.opacity = 0;
  });

  mainImageElement.addEventListener("mouseout", () => {
    mainImageElement.style.opacity = 1;
  });

  function moveLens(e) {
    let pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);

    /*calculate the position of the lens:*/
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;

    /*prevent the lens from being positioned outside the image:*/
    if (x > mainImageElement.width - lens.offsetWidth) {
      x = mainImageElement.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > mainImageElement.height - lens.offsetHeight) {
      y = mainImageElement.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }

    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";

    /*display what the lens "sees":*/
    resultImageElement.style.backgroundPosition =
      "-" + x * cx + "px -" + y * cy + "px";
  }

  function getCursorPos(e) {
    let a,
      x = 0,
      y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = mainImageElement.getBoundingClientRect();

    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;

    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}

// handle tab reviews and tab description
function handleProductTab() {
  const descriptionButton = document.querySelector(
    ".product-detail .product-detail__tab-description--button"
  );
  const reviewsButton = document.querySelector(
    ".product-detail .product-detail__tab-reviews--button"
  );
  const descriptionElement = document.querySelector(
    ".product-detail .product-detail__tab-description"
  );
  const reviewsElement = document.querySelector(
    ".product-detail .product-detail__tab-reviews"
  );

  if (
    !descriptionButton ||
    !reviewsButton ||
    !descriptionElement ||
    !reviewsElement
  )
    return;

  descriptionButton.addEventListener("click", () => {
    if (descriptionButton.classList.contains("active")) {
      return;
    } else {
      descriptionButton.classList.add("active");
      reviewsButton.classList.remove("active");
      descriptionElement.style.display = "block";
      reviewsElement.style.display = "none";
    }
  });

  reviewsButton.addEventListener("click", () => {
    if (reviewsButton.classList.contains("active")) {
      return;
    } else {
      reviewsButton.classList.add("active");
      descriptionButton.classList.remove("active");
      reviewsElement.style.display = "block";
      descriptionElement.style.display = "none";
    }
  });
}

function main() {
  handleSlickProduct();
  handleImgProductDisplay();
  handleProductModal();
  handleZoomImage();
  handleProductTab();
  console.log("product detail loaded");
}

setTimeout(() => {
  const location = window.location.pathname;
  if (location === "/shop/detail") {
    main();
  }
}, 3000);
