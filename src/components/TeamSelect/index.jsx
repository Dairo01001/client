import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../services/team";
import { addTeams } from "../../redux/reducers/teamSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TeamSelect = ({ TeamId, handleChangeMoto }) => {
  const teams = useSelector((state) => state.team.teams);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!teams) {
      getTeams().then((data) => {
        dispatch(addTeams(data));
      });
    }
  }, []);

  return (
    teams && (
      <FormControl fullWidth>
        <InputLabel id="team">Equipo</InputLabel>
        <Select
          labelId="team"
          name="TeamId"
          label="Equipos"
          value={TeamId}
          onChange={handleChangeMoto}
        >
          {teams.map(({ id, name }) => (
            <MenuItem key={id} value={id} >
                {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
};

export default TeamSelect;
