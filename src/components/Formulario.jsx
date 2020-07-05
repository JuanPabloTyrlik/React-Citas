import React, { Fragment, useState } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
  const [cita, setCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
    id: uuid(),
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  const submitCita = (e) => {
    e.preventDefault();
    // Validar

    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      setError(true);
      return;
    }
    if (error) setError(false);
    
    // Asignar ID

    setCita({
      ...cita,
      id: uuid(),
    });

    // Crear Cita

    crearCita(cita);

    // Resetear Form

    setCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
      id: uuid(),
    });
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Mikasa"
          onChange={handleChange}
          value={mascota}
        />

        <label>Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Juan Pablo"
          onChange={handleChange}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={handleChange}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={handleChange}
          value={hora}
        />

        <label>Síntomas</label>
        <textarea
          type="text"
          name="sintomas"
          className="u-full-width"
          onChange={handleChange}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;
