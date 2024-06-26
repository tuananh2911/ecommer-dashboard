import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
};

export const categoryReducer = createReducer(initialState, {


    // get categories
    getAllCategoriesRequest: (state) => {state.isLoading = true},
    getAllCategoriesSuccess: (state,action) => {
        state.isLoading = false;
        state.categories = action.payload;
    },
    getAllCategoriesFailed:(state,action)=>{
        state.isLoading = false;
        state.error = action.payload;
    }
});
