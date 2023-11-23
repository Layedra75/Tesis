const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {vistaRegistro, vistaPrincipal, vistaUsuarios} = require('../controllers/PageControllers')

//router para las vistas
router.get('/', authController.isAuthenticated, vistaPrincipal)
router.get('/register', authController.isAuthenticated, vistaRegistro )
router.get('/usuarios', authController.isAuthenticated, vistaUsuarios);


router.get('/login', (req, res) => {
    const alert = req.query.error === 'incorrect';
    res.render('authentication/login', { alert, layout: false });
});


//router para los métodos del controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = router