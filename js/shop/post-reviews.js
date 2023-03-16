import * as yup from "yup";
import * as dayjs from "dayjs";
import { productApi } from "../api/productApi";
import { setRating, setTextContent } from "../utils/common";

function handleSelectRatingForm() {
  const starList = document.querySelectorAll(
    ".product-detail__tab-reviews-form li i"
  );
  starList.forEach((item) => {
    item.addEventListener("click", () => {
      let i;
      for (i = 0; i < 5; i++) {
        if (i <= Number(item.dataset.id)) {
          starList[i].classList.remove("fa-regular");
          starList[i].classList.add("fa-solid");
        } else {
          starList[i].classList.remove("fa-solid");
          starList[i].classList.add("fa-regular");
        }
      }
    });
  });
}

function setFieldError(form, name, error) {
  const element = form.querySelector(`[name="${name}"]`);
  if (element) {
    element.setCustomValidity(error);
    setTextContent(
      element.parentElement,
      ".product-detail__tab-reviews-form--invalid-feedback",
      error
    );
  }
}

function getReviewSchema() {
  return yup.object().shape({
    content: yup.string().required("Please enter your review!"),
    name: yup.string().required("Please enter your name!"),
    email: yup
      .string()
      .required("Please enter your email!")
      .email("Please enter a valid email!"),
  });
}

async function validateReview(form, reviewValues) {
  try {
    // reset previous errors
    ["content", "name", "email"].forEach((name) =>
      setFieldError(form, name, "")
    );

    const schema = getReviewSchema();
    await schema.validate(reviewValues, { abortEarly: false });
  } catch (error) {
    const errorLog = {};

    if (error.name === "ValidationError" && Array.isArray(error.inner)) {
      for (const validationError of error.inner) {
        const name = validationError.path;

        // ignore if the field is already logged
        if (errorLog[name]) continue;

        // set field error and mark as logged
        setFieldError(form, name, validationError.message);
        errorLog[name] = true;
      }
    }
  }

  const isValid = form.checkValidity();
  if (!isValid) form.classList.add("was-validated");
  return isValid;
}

function getReviewValues(form) {
  const rate = document.querySelectorAll(
    ".product-detail__tab-reviews-form .fa-solid"
  );
  const formValues = { rating: rate.length, date: Date.now() };

  const data = new FormData(form);
  for (const [key, value] of data) {
    formValues[key] = value;
  }

  return formValues;
}

function createReviewItem(review) {
  if (!review) return;
  const reviewTemplate = document.getElementById("reviewTemplate");
  if (reviewTemplate) {
    const liElement = reviewTemplate.content.firstElementChild.cloneNode(true);
    setRating(liElement, ".product-detail__start-rate", review.rating);
    setTextContent(
      liElement,
      ".product-detail__tab-reviews-item--name",
      review.name
    );
    setTextContent(
      liElement,
      ".product-detail__tab-reviews-item--content",
      review.content
    );
    setTextContent(
      liElement,
      ".product-detail__tab-reviews-item--date",
      dayjs(Number(review.date)).format("MMM D, YYYY h:mm A")
    );

    return liElement;
  }
}

function renderReviewQuantity(quantity) {
  const reviewQuantity = document.querySelector(
    ".product-detail__tab-reviews--quantity"
  );
  reviewQuantity.textContent = `(${quantity})`;
}

function renderReviewList(listReview) {
  if (!listReview) return;
  const ulElement = document.querySelector(
    ".product-detail__tab-reviews-detail--list"
  );

  if (ulElement) {
    listReview.forEach((review) => {
      createReviewItem(review);
      const li = createReviewItem(review);
      ulElement.appendChild(li);
    });
  }
}

function handleFullFieldReview(params, reviewValues) {
  const payload = {
    id: Math.floor(Math.random() * 10000),
    productId: params,
    avatar:
      "https://demo.roadthemes.com/james/wp-content/uploads/2016/01/admin_avatar_1453715255-60x60.png",
    ...reviewValues,
  };
  return payload;
}

async function handlePostSubmitReview(params, reviewValues) {
  try {
    // Post new comment to data base
    const payload = handleFullFieldReview(params, reviewValues);
    const data = JSON.stringify(payload);
    const newRiview = await productApi.postReview(data);

    // render new comment to DOM
    renderReviewList([reviewValues]);
  } catch (error) {
    console.log("Post comment is fail", error);
  }
}

export async function initPostReviews(params) {
  const form = document.querySelector(".product-detail__tab-reviews-form");
  const contentInput = form.querySelector("[name=content]");
  const nameInput = form.querySelector("[name=name]");
  const emailInput = form.querySelector("[name=email]");
  console.log(params);
  try {
    const listReview = await productApi.getCommentById(params);
    console.log(listReview);
    // const lengthReviewList = listReview.length;
    // renderReviewList(listReview);
    // renderReviewQuantity(lengthReviewList);

    // if (!form) return;
    // handleSelectRatingForm();

    // let submitting = false;
    // let submit = false;
    // form.addEventListener("submit", async (e) => {
    //   e.preventDefault();
    //   if (submitting) return;

    //   submitting = true;
    //   submit = true;
    //   const reviewValues = getReviewValues(form);
    //   const valid = await validateReview(form, reviewValues);

    //   if (valid) {
    //     handlePostSubmitReview(params, reviewValues);
    //     // reset value in form when valid
    //     ["content", "name", "email"].forEach(
    //       (name) => (form.querySelector(`[name="${name}"]`).value = "")
    //     );
    //   }

    //   submitting = false;
    // });

    // emailInput.addEventListener("input", (e) => {
    //   if (submit) {
    //     const values = getReviewValues(form);
    //     validateReview(form, { ...values, email: e.target.value });
    //   }
    // });

    // nameInput.addEventListener("input", (e) => {
    //   if (submit) {
    //     const values = getReviewValues(form);
    //     validateReview(form, { ...values, name: e.target.value });
    //   }
    // });

    // contentInput.addEventListener("input", (e) => {
    //   if (submit) {
    //     const values = getReviewValues(form);
    //     validateReview(form, { ...values, content: e.target.value });
    //   }
    // });
  } catch (error) {
    console.log("Can't fetch reviews data", error);
  }
}
