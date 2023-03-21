import axiosClient from "./axiosClient";

export const productApi = {
  getAll(params) {
    const url = "products";
    return axiosClient.get(url, { params });
  },

  getById(id) {
    const url = `products/${id}`;
    return axiosClient.get(url);
  },

  getCommentById(id) {
    const url = `products/${id}/comments`;
    return axiosClient.get(url);
  },

  getByBrand(params) {
    const url = `products${params}`;
    return axiosClient.get(url);
  },

  postReview(data) {
    const url = "comments";
    return axiosClient.post(url, data);
  },

  searchProduct(data) {
    const url = `products?q=${data}`;
    return axiosClient.get(url);
  },
};
