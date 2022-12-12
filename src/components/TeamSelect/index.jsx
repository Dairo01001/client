import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../services/team";
import {
  addEmployeesTeam,
  addTeamId,
  addTeams,
} from "../../redux/reducers/teamSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TeamSelect = ({ TeamId, setNameTeam}) => {
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
          onChange={(e) => dispatch(addTeamId(e.target.value))}
        >
          {teams.map(({ id, name, Employees }) => (
            <MenuItem
              key={id}
              value={id}
              onClick={() => {
                dispatch(addEmployeesTeam(Employees));
                setNameTeam(name);
              }}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
};

export default TeamSelect;
