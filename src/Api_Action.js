import api from "./BasaApi";
import qs from "qs";
export const FetchBlogApi = async (page, rowsPerPage, title) => {
  try {
    const { data } = await api.get("/blog/get-all", {
      params: { page, rowsPerPage, title },
    });
    return data;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};
export const SingleBlogApi = async (id) => {
  try {
    const response = await api.get(`/blog/single-blog/` + id);
    return response.data.blog;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const FetchAllCatalogueApi = async () => {
  try {
    const { data } = await api.get("/catalogue/get-all");
    return data.catlogue;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const FetchBannerApi = async () => {
  try {
    const response = await api.get(`/banner/get-all`);

    console.log("response" + response.data.getBanner);
    return response.data.getBanner;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const FetchAllProductsApi = async (search, filter, page, limit) => {
  try {
    // Flatten search at top level, filter remains nested
    // const queryString = qs.stringify({ search, page, limit, filter }, { encode: false });
    const { data } = await api.post(`/product/feed-filter`, {
      search,
      filter,
      page,
      limit,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const GetSingleProductApi = async (id) => {
  try {
    const { data } = await api.get(`/product/one-product-detail/${id}`);
    return data.product;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};

export const SimilarProductApi = async (category, id) => {
  try {
    const { data } = await api.get(`/product/similar-product`, {
      params: { category, id },
    });
    return data.product;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};
export const BestSellingProductApi = async (category) => {
  try {
    const { data } = await api.get(`/product/hot-product`, {
      params: { category },
    });
    return data;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};
export const ShareProductApi = async (id) => {
  try {
    const { data } = await api.get(`/product/share/${id}`);
    
    return data;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};

export const AddAddressApi = async (address) => {
  try {
    const { data } = await api.post(`/user/address`, address);
    return data;
  } catch (error) {
    console.log("error", error);
    return error.response.data;
  }
};
export const GetAddressApi = async () => {
  try {
    const { data } = await api.get(`/user/address`);
    return data;
  } catch (error) {
    console.log("error", error);
    return error.response.data;
  }
};
export const UpdateAddressApi = async (id, address) => {
  try {
    const { data } = await api.patch(`/user/address/${id}`, address);
    return data;
  } catch (error) {
    console.log("error", error);
    return error.response.data;
  }
};
export const UpdateUserProfileApi = async (id, address) => {
  try {
    const { data } = await api.patch(`/user/profile/${id}`, address);
    return data;
  } catch (error) {
    console.log("error", error);
    return error.response.data;
  }
};

export const CreateOrderApi = async (order) => {
  try {
    const { data } = await api.post("/order", order);
    return data;
  } catch (error) {
    console.log("error", error);
    return error.response?.data;
  }
};

export const getCMSApi = async () => {
  try {
    const { data } = await api.get(`/cms`);
    return data.cms;
  } catch (error) {
    console.log("error", error);
    return error.response.data;
  }
};

export const getOnePolicyApi = async (id) => {
  try {
    const { data } = await api.get(`/policy/` + id);
    return data.policy;
  } catch (error) {
    console.log("error", error);
    return error.response.data;
  }
};
export const getOneProfileApi = async (id) => {
  try {
    const { data } = await api.get(`/user/profile/` + id);
    return data;
  } catch (error) {
    console.log("error", error);
    return error.response.data;
  }
};
export const GetOneUserOrderApi = async (id) => {
  try {
    const { data } = await api.get("/get-onelist/" + id);
    return data;
  } catch (error) {
    return error.response;
  }
};
export const CreateSubscribeEmailApi = async (email) => {
  try {
    const { data } = await api.post("/user/subscribe", { email });
    return data;
  } catch (error) {
    return error.response.data;
  }
};
export const CreateContactUsApi = async (payload) => {
  try {
    const { data } = await api.post(`/contact-us`, payload);

    console.log("response" + data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const getTestimonialApi = async () => {
  try {
    const { data } = await api.get(`/testimonial`);
    return data;
  } catch (error) {
    console.log("error", error);
    return error.response.data;
  }
};
