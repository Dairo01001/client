import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../services/team";
import { addTeams } from "../../redux/reducers/teamSlice";
import Loading from "../Loading";
import Row from "./Row";

const TeamTable = () => {
  const teams = useSelector((state) => state.team.teams);
  const dispath = useDispatch();

  useEffect(() => {
    if (!teams) {
      getTeams().then((data) => {
        dispath(addTeams(data));
      });
    }
  }, []);

  if (!teams) {
    return <Loading />;
  }

  return (
    <TableContainer sx={{marginTop: 5}} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nombre Equipo</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => (
            <Row key={team.id} {...team} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamTable;
