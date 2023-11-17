const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

//metodo para registrarse
exports.register = async (req, res) => {
    try {
        const { name, lastname, cedula, date, email, celular, pass, rol } = req.body;
        if (!name || !lastname || !cedula || !date || !email || !celular || !pass || !rol) {
            return res.status(400).json({ message: 'Por favor, complete todos los campos' });
        }

        // Validación del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'El correo electrónico no es válido' });
        }

        // Verificar si el correo electrónico ya está registrado
        conexion.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (results.length > 0) {
                return res.render('register', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "El correo electrónico ya está registrado",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'register'
                });
            }

            // Si el correo electrónico no está registrado, continuar con el registro
            const passHash = await bcryptjs.hash(pass, 8);
            conexion.query('INSERT INTO users (name, lastname, email, pass, rol, cedula, celular, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [name, lastname, email, passHash, rol, cedula, celular, date], (error, results) => {
                    if (error) {
                        res.render('register', {
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "Error al registrar",
                            alertIcon: 'error',
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'register'
                        });
                    } else {
                        res.render('register', {
                            alert: true,
                            alertTitle: "Registro exitoso",
                            alertMessage: "Registro exitoso",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'register'
                        });
                    }
                });
        });

    } catch (error) {
        res.render('register', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Error en el servidor",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: 'register'
        });
    }
};


//metodo para login
exports.login = async(req,res)=>{
    try {
        const email = req.body.email
        const pass = req.body.pass        

        if(!email|| !pass ){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM users WHERE email = ?', [email], async (error, results)=>{
                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass)) ){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                }else{
                    //inicio de sesión    
                    const id = results[0].id    
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })

                   const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                   res.cookie('jwt', token, cookiesOptions)
                   res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                   })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//metodo de autenticacion
exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

//metodo logout
exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/')
}