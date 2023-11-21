
const vistaRegistro = (req, res) => {
  res.render("authentication/register", { alert: false });
};

const vistaPrincipal = (req, res) => {
  res.render("pages/pacientes");
};


module.exports = {
  vistaRegistro,
  vistaPrincipal,
};
