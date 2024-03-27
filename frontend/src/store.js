import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./state/article/slice";
import { userReducer } from "./state/user/slice";

const store = configureStore({
  reducer: {
    articleState: articleReducer,
    userState: userReducer,
  },
});
export default store;
