import { configureStore  } from "@reduxjs/toolkit";
import articleReducer from "./state/article/slice";

 const store = configureStore({
  reducer: {
    articles: articleReducer,
  },
});
export default store;