import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCombos } from "../../services/combo";
import { addCombos } from "../../redux/reducers/comboSlice";

const ComboSelect = ({ ComboId, handleChangeMoto }) => {
  const combos = useSelector((state) => state.combo.combos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!combos) {
      getCombos().then((data) => {
        dispatch(addCombos(data));
      });
    }
  }, []);

  return (
    combos && (
      <FormControl fullWidth>
        <InputLabel id="combo">Combos</InputLabel>
        <Select
          labelId="combo"
          name="ComboId"
          label="Combos"
          value={ComboId}
          onChange={handleChangeMoto}
        >
          {combos.map(({ id, title, price }) => (
            <MenuItem key={id} value={id}>
              {`${title} ${price}$`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
};

export default ComboSelect;
