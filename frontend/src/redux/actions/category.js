import axios from "axios";
import {server} from "../../server";
const localhost = 'https://huycodelo.id.vn/api';
export const getCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllCategoriesRequest",
        });

        const { data } = await axios.get(`${localhost}/categories`);
        dispatch({
            type: "getAllCategoriesSuccess",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "getAllCategoriesFailed",
            payload: error.response.data.message,
        });
    }
};
