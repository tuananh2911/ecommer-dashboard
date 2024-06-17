import axios from "axios";
import { server } from "../../server";

const localhost = 'https://huycodelo.id.vn/api';
// get all sellers --- admin
export const loginSeller = (dataUser) => async (dispatch) => {
    try {
        dispatch({
            type: "LoadSellerRequest",
        });
        const { data } = await axios.post(`${localhost}/vendor/login`, dataUser, {
            withCredentials: false,
        });

        dispatch({
            type: "LoadSellerSuccess",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "LoadSellerFail",
            //   payload: error.response.data.message,
        });
    }
};
