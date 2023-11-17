const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {vistaRegistro, vistaPrincipal} = require('../controllers/PageControllers')

//router para las vistas
router.get('/register', vistaRegistro, authController.isAuthenticated)
router.get('/pacientes', vistaPrincipal, authController.isAuthenticated)


router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})



//router para los métodos del controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = router