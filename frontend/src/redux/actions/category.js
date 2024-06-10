import axios from "axios";
import {server} from "../../server";
const localhost = 'http://localhost:5000/api';
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
