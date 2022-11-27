import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAuxiliars } from "../../redux/reducers/employeeSlice";
import { getAuxiliares } from "../../services/axiliar";
import Loading from "../Loading";
import TableList from "../TableList";

const AuxiliarTable = () => {
  const auxiliars = useSelector((state) => state.employee.auxiliars);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auxiliars) {
      getAuxiliares().then((data) => {
        dispatch(addAuxiliars(data));
      });
    }
  }, []);

  if (!auxiliars) {
    return <Loading />;
  }

  return (
    <div style={{ paddingTop: 20 }}>
      <TableList data={auxiliars} />
    </div>
  );
};

export default AuxiliarTable;
