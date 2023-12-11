const usuarioController = require('./UserController');
const pacienteController = require('./pacienteController')

//Vista Registro Usuarios(Trabajadores)
const vistaRegistro = (req, res) => {
  res.render("authentication/register", { alert: false });
};

//Vista Registro Pacientes
const registerPatient = (req, res) => {
  res.render("pages/registerPatient", { alert: false });
};

//Vista principal
const vistaPrincipal = (req, res) => {
  res.render("pages/dashboard");
};

//Vista lista de pacientes
const vistaPacientes = (req, res) => {
  pacienteController.obtenerListaPacientes((error, pacientes) => {
      if (error) {
          console.error('Error al obtener la lista de pacientes:', error);
          res.status(500).send('Error al obtener la lista de pacientes');
      }else {
        res.render('pages/pacientes', { pacientes, alert: false  });
      }
  });
};

//Vista lista de usuarios(Trabajadores)
const vistaUsuarios = (req, res) => {
  usuarioController.obtenerListaUsuarios((error, usuarios) => {
      if (error) {
          console.error('Error al obtener la lista de usuarios:', error);
          res.status(500).send('Error al obtener la lista de usuarios');
      }else {
        res.render('pages/usuarios', { usuarios });
      }
  });
};

module.exports = {
  vistaRegistro,
  vistaPrincipal,
  vistaPacientes,
  vistaUsuarios,
  registerPatient
};
