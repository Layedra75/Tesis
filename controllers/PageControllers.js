const usuarioController = require('./UserController');

const vistaRegistro = (req, res) => {
  res.render("authentication/register", { alert: false });
};

const vistaPrincipal = (req, res) => {
  res.render("pages/pacientes");
};

const vistaUsuarios = (req, res) => {
  usuarioController.obtenerListaUsuarios((error, usuarios) => {
      if (error) {
          console.error('Error al obtener la lista de usuarios:', error);
          // Puedes agregar un mensaje de error a la respuesta si lo deseas
          res.status(500).send('Error al obtener la lista de usuarios');
      }else {
        res.render('pages/usuarios', { usuarios });
      }
  });
};

module.exports = {
  vistaRegistro,
  vistaPrincipal,
  vistaUsuarios
};
