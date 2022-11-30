import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCombos } from "../../services/combo";
import { addCombos } from "../../redux/reducers/comboSlice";

const ComboSelect = ({ ComboId, handleChangeFactura }) => {
  const combos = useSelector((state) => state.combo.combos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!combos) {
      getCombos().then((data) => {
        dispatch(addCombos(data));
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    combos && (
      <FormControl fullWidth>
        <InputLabel id="combo">Combo</InputLabel>
        <Select
          labelId="combo"
          name="ComboId"
          label="Combos"
          value={ComboId}
          onChange={handleChangeFactura}
        >
          {combos.map(({ id, name, price }) => (
            <MenuItem
              key={id}
              value={id}
              onClick={() =>
                handleChangeFactura({ target: { name: "price", value: price } })
              }
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
};

export default ComboSelect;
