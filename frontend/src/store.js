import { configureStore  } from "@reduxjs/toolkit";
import articleReducer from "./state/article/slice";

 const store = configureStore({
  reducer: {
    articleState: articleReducer,
  },
});
export default store;