import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // Sử dụng sessionStorage để lưu trữ
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";
import { categoryReducer } from "./reducers/category";

// Cấu hình persist
const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession,
};

const persistedSellerReducer = persistReducer(persistConfig, sellerReducer);

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: persistedSellerReducer,
    products: productReducer,
    categories: categoryReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export const persistor = persistStore(Store);
export default Store;
