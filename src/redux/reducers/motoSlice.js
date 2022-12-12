import { createSlice } from "@reduxjs/toolkit";

export const motoSlice = createSlice({
    name: "moto",
    initialState: {
        id: "",
        date: "",
        Facturas: [],
        auxFacturas: [],
        motorcycleWashing: 0,
    },
    reducers: {
        addData: (state, { payload }) => {
            const { id, date, Facturas, motorcycleWashing } = payload;

            state.id = id;
            state.date = date;
            state.Facturas = Facturas.sort((a, b) => a.id - b.id);
            state.auxFacturas = state.Facturas;
            state.motorcycleWashing = motorcycleWashing;
        },
        search: (state, { payload }) => {
            state.auxFacturas = state.Facturas.filter((fac) => fac.Motorcycle.plaque.includes(payload));
        },
        restoreAll: (state) => {
            state.auxFacturas = state.Facturas;
        }
    }
});

export const { addData, search, restoreAll } = motoSlice.actions;
export default motoSlice.reducer;