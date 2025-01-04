
import rootReducer from "../Reducer";
import thunk from "redux-thunk";
import reduxPromise from "redux-promise";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2,
  };
  
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware: [reduxPromise, thunk]
})

export const persistor = persistStore(store);


