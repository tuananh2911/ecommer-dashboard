import axios from "axios";
import { server } from "../../server";
const localhost = 'https://huycodelo.id.vn/api';
// create product
export const createProduct =
  (
    newData
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });
      const { data } = await axios.post(
        `${localhost}/products`,
          newData
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${localhost}/products?vendorId=${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${localhost}/products?vendorId=${id}`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data,
    });
  }
};
