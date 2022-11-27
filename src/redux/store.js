import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import employeeReducer from "./reducers/employeeSlice";
import teamSlice from "./reducers/teamSlice";
import comboSlice from "./reducers/comboSlice";
import colorSlice from "./reducers/colorSlice";
import brandSlice from "./reducers/brandSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    employee: employeeReducer,
    team: teamSlice,
    combo: comboSlice,
    color: colorSlice,
    brand: brandSlice,
  },
});
