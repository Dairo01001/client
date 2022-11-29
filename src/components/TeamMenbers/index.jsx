import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeEmployeeTeam } from "../../redux/reducers/teamSlice";

const TeamMenbers = () => {
  const employeesTeam = useSelector((state) => state.team.employeesTeam);
  const dispatch = useDispatch();

  return (
    <List>
      {employeesTeam.map(({ id, names, surnames }) => {
        return (
          <ListItem key={id}>
            <ListItemButton onClick={() => dispatch(removeEmployeeTeam(id))}>
              <ListItemText primary={`${names} ${surnames}`}></ListItemText>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default TeamMenbers;
