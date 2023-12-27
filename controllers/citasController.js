const conexion = require('../database/db');

// Método para guardar citas médicas
const guardarCita = async (req, res) => {
  try {
    const { fecha, horaInicio, horaFin, pacienteId, doctorId, descripcion } = req.body;
    
    // Realizar la inserción de la cita médica en la base de datos
    const sql = 'INSERT INTO citasmedicas (fecha, hora_inicio, hora_fin, paciente_id, doctor_id, descripcion) VALUES (?, ?, ?, ?, ?, ?)';
    conexion.query(sql, [fecha, horaInicio, horaFin, pacienteId, doctorId, descripcion], (error, results) => {
      if (error) {
        res.render('pages/citas', {
          alert: true,
          alertTitle: "Error",
          alertMessage: "Error al guardar la cita médica",
          alertIcon: 'error',
          showConfirmButton: true,
          timer: false,
          ruta: 'citas'
        });
      } else {
        res.render('pages/citas', {
          alert: true,
          alertTitle: "Éxito",
          alertMessage: "La cita médica se ha creado con éxito",
          alertIcon: 'success',
          showConfirmButton: true,
          timer: false,
          ruta: 'citas'
        });
      }
    });
  } catch (error) {
    res.render('pages/citas', {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Error en el servidor",
      alertIcon: 'error',
      showConfirmButton: true,
      timer: false,
      ruta: 'citas'
    });
  }
};

module.exports = { guardarCita };
