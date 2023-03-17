// document.addEventListener("click", (e) => {
//   const { target } = e;
//   if (!target.matches("a")) {
//     return;
//   }

//   urlRoute();
// });

const urlRoutes = {
  404: {
    template: "/pages/404-page/index.html",
    title: "",
    description: "",
  },

  "/": {
    template: "./pages/home/index.html",
    title: "",
    description: "",
  },

  "/about": {
    template: "/pages/about-us/index.html",
    title: "",
    description: "",
  },

  "/shop": {
    template: "/pages/shop/index.html",
    title: "",
    description: "",
  },

  "/shop/detail": {
    template: "/pages/shop/product-detail/index.html",
    title: "",
    description: "",
  },

  "/shop/cart": {
    template: "/pages/shop/shopping-cart/index.html",
    title: "",
    description: "",
  },

  "/blog": {
    template: "/pages/blog/index.html",
    title: "",
    description: "",
  },
};

const urlRoute = (event) => {
  event = event || window.event;
  // event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHanler();
};

const urlLocationHanler = async () => {
  let location = window.location.pathname;
  if (location.length == 0) {
    location = "/";
  }

  const route = urlRoutes[location] || urlRoutes[404];
  const html = await fetch(route.template).then((response) => response.text());
  document.getElementById("root").innerHTML = html;

  console.log("route-complete", location);
};

window.onpopstate = urlLocationHanler;
window.route = urlRoute;

(function () {
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
})();
urlLocationHanler();
