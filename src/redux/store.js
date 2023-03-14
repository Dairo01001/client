import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import userReducer from "./reducers/userSlice";
import employeeReducer from "./reducers/employeeSlice";
import teamSlice from "./reducers/teamSlice";
import comboSlice from "./reducers/comboSlice";
import colorSlice from "./reducers/colorSlice";
import brandSlice from "./reducers/brandSlice";
import facturaSlice from "./reducers/faturaSlice";
import motoSlice from "./reducers/motoSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    employee: employeeReducer,
    team: teamSlice,
    combo: comboSlice,
    color: colorSlice,
    brand: brandSlice,
    factura: facturaSlice,
    motos: motoSlice,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
