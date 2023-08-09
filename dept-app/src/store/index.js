// import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./modules/index.js";

const persistConfig = {
  key: "persist-key",
  storage,
};
// const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: reducer,
  middleware: [thunk],
});
// const persistor = persistStore(store);

export default store;
// export { persistor };
