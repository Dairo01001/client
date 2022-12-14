import { createSlice } from "@reduxjs/toolkit";

export const facturaSlice = createSlice({
  name: "factura",
  initialState: {
    person: {
      phone: "",
      fullName: "",
    },
    moto: {
      plaque: "",
      ColorId: "",
      BrandId: "",
    },
    factura: {
      ComboId: "",
      overrun: "",
      price: "",
      isPaid: true,
      paymentMethod: "Efectivo",
    },
  },
  reducers: {
    changePerson: (state, { payload }) => {
      const { name, value } = payload;
      state.person = { ...state.person, [name]: value };
    },
    setPerson: (state, { payload }) => {
      state.person = payload;
    },
    changeMoto: (state, { payload }) => {
      const { name, value } = payload;
      state.moto = {
        ...state.moto,
        [name]: value,
      };
    },
    setMoto: (state, { payload }) => {
      state.moto = payload;
    },
    changeFactura: (state, { payload }) => {
      const { name, value } = payload;
      state.factura = {
        ...state.factura,
        [name]: value,
      };
    },
    setFactura: (state, { payload }) => {
      state.factura = payload;
    },
  },
});

export const {
  changeFactura,
  changeMoto,
  changePerson,
  setPerson,
  setMoto,
  setFactura,
} = facturaSlice.actions;
export default facturaSlice.reducer;
