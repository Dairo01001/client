import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBrands } from "../../redux/reducers/brandSlice";
import { getBrands } from "../../services/brand";

const BrandSelect = ({ BrandId, handleChangeMoto }) => {
  const brands = useSelector((state) => state.brand.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!brands) {
      getBrands().then((data) => {
        dispatch(addBrands(data));
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    brands && (
      <FormControl fullWidth>
        <InputLabel id="brand">Marca</InputLabel>
        <Select
          labelId="brand"
          name="BrandId"
          label="Marcas"
          value={BrandId}
          onChange={handleChangeMoto}
        >
          {brands.map(({ id, brand }) => (
            <MenuItem key={id} value={id}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
};

export default BrandSelect;
