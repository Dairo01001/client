import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getGanacias } from "../../services/operator";

const MotosEmployee = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user) {
      Swal.fire("Ups!", "Nesecitas estar logueado!", "error");
      navigate("/");
    } else {
      getGanacias(user.id).then((data) => {
        setData(data);
      });
    }
  }, [user, data, navigate]);

  return <div>
    <h1>Nombres: {data.names}</h1>
    <h1>Apllidos: {data.surnames}</h1>
    <h1>Ganancias dia: {data.gananciasDia}$</h1>
    <h1>Motos lavadas: {data.motorcycleWashing}</h1>
    <h1>Comision: {data.commission}%</h1> 
  </div>;
};

export default MotosEmployee;
