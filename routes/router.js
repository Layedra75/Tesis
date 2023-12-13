const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const pacienteRegister = require('../controllers/pacienteRegister')
const pacienteController = require('../controllers/pacienteController')
const usuarioController = require('../controllers/UserController')
const {vistaRegistro, vistaPrincipal, vistaUsuarios, registerPatient, vistaPacientes} = require('../controllers/PageControllers')

//router para las vistas
router.get('/', authController.isAuthenticated, vistaPrincipal)
router.get('/pacientes', authController.isAuthenticated, vistaPacientes)
router.get('/register', authController.isAuthenticated, vistaRegistro )
router.get('/usuarios', authController.isAuthenticated, vistaUsuarios)
router.get('/registerPatient', authController.isAuthenticated, registerPatient)

//router para login
router.get('/login', (req, res) => {
    const alert = req.query.error === 'incorrect';
    res.render('authentication/login', { alert, layout: false });
});

//router para eliminar usuario (Trabajador)
router.get('/eliminar-usuario/:id', usuarioController.eliminarUsuario);
//router para eliminar paciente
router.get('/eliminar-paciente/:cedula', pacienteController.deletePatient);

//router para el metodo de pacienteController
router.post('/registerPatient', pacienteRegister.registerPatient)


//router para los métodos del authController
router.post('/register', authController.register)
router.post('/login',authController.login)
router.get('/logout', authController.logout)

module.exports = router