import { start } from "@popperjs/core";

export function setImage(parent, seletor, urlImg) {
  const element = parent.querySelector(seletor);
  if (!element) return;

  element.src = urlImg;
  element.addEventListener("error", () => {
    element.src = "https://via.placeholder.com/728x90.png?text=thumbnail";
  });
}

export function setNameProduct(parent, seletor, name) {
  const element = parent.querySelector(seletor);
  if (!element) return;

  element.textContent = name;
  element.addEventListener("error", () => {
    element.textContent = "can't display";
  });
}

export function setTextContent(parent, seletor, text) {
  const element = parent.querySelector(seletor);
  if (!element) return;

  element.textContent = text;
  element.addEventListener("error", () => {
    element.textContent = "can't display";
  });
}

export function setPriceProduct(parent, seletor, price) {
  const element = parent.querySelector(seletor);
  if (!element) return;

  if (price === 0) {
    element.style.display = "none";
  }

  element.textContent = `$${price}.00`;
  element.addEventListener("error", () => {
    element.textContent = "can't display";
  });
}

export function hideSaleElement(parent, seletor, price) {
  const element = parent.querySelector(seletor);
  if (!element) return;

  if (price === 0) {
    element.style.display = "none";
  }
}

export function setLink(parent, seletor, id) {
  const element = parent.querySelector(seletor);
  if (!element) return;

  element.href = `/shop/detail?id=${id}`;
}

export function setRating(parent, seletor, rates) {
  const element = parent.querySelector(seletor);
  if (!element) return;

  const startList = element.querySelectorAll("li i");

  for (let i = 0; i < rates; i++) {
    startList[i].style.color = "#ffb21e";
  }
}
