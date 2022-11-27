import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColors } from "../../redux/reducers/colorSlice";
import { getColors } from "../../services/color";

const ColorSelect = ({ ColorId, handleChangeMoto }) => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.color.colors);

  useEffect(() => {
    if (!colors) {
      getColors().then((data) => {
        dispatch(addColors(data));
      });
    }
  }, []);

  return (
    colors && (
      <FormControl fullWidth>
        <InputLabel id="color">Color</InputLabel>
        <Select
          labelId="color"
          name="ColorId"
          label="Color"
          value={ColorId}
          onChange={handleChangeMoto}
        >
          {colors.map(({ id, color }) => (
            <MenuItem key={id} value={id}>
              {color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
};

export default ColorSelect;
