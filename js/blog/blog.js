import { blogApi } from "../api/productApi";
import { setImage, setTextContent } from "../utils/common";
function createBlogItem(blog) {
  if (!blog) return;
  const template = document.getElementById("blogItemTemplate");
  if (template) {
    const blogItem = template.content.firstElementChild.cloneNode(true);

    setImage(blogItem, ".blog-item__img img", blog?.thumbnail);
    setTextContent(blogItem, ".blog-item__title", blog?.title);
    setTextContent(blogItem, ".blog-item__date", blog?.date);
    setTextContent(
      blogItem,
      ".blog-item__content",
      `${blog?.content[0].slice(0, 200)} ...`
    );
    // setLink(blogItem, ".blog-item__link")

    return blogItem;
  }
}

function renderBlog(blogList) {
  if (!blogList) return;

  const blogListElement = document.querySelector(".blog-page .blog-list");
  if (blogListElement) {
    blogList.forEach((blog) => {
      const blogElement = createBlogItem(blog);
      blogListElement.appendChild(blogElement);
    });
  }
}

async function main() {
  // call API fetch data

  let blogList;
  try {
    blogList = await blogApi.getAll();
    renderBlog(blogList);

    console.log("Blog loaded");
  } catch (error) {
    console.log(error, "can't fetch data");
  }
}

(() => {
  const location = window.location.pathname;
  if (location === "/blog") {
    setTimeout(() => {
      main();
    }, 3000);
  }
})();
