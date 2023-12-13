const conexion = require('../database/db');

//Metodo para listar usuarios
const obtenerListaUsuarios = (callback) => {
    const sql = 'SELECT name, lastname, rol, email, celular, cedula, id FROM users';
    conexion.query(sql, (error, results) => {
        if (error) {
            console.error('Error al obtener la lista de usuarios:', error);
            callback('Error al obtener la lista de usuarios', null);
        } else {
            callback(null, results);
        }
    });
};

//Metodo para eliminar usuarios
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // Realizar la eliminación del usuario
        conexion.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
            if (error) {
                res.render('pages/usuarios', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Error al eliminar al usuario",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'usuarios'
                });
            } else {
                // Después de la eliminación, obtener la lista actualizada de usuarios
                obtenerListaUsuarios((err, usuarios) => {
                    if (err) {
                        res.render('pages/usuarios', {
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "Error al obtener la lista de usuarios",
                            alertIcon: 'error',
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'usuarios'
                        });
                    } else {
                        res.redirect('/usuarios?exito=true');
                    }
                });
            }
        });
    } catch (error) {
        res.render('pages/usuarios', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Error en el servidor",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: 'usuarios'
        });
    }
};


module.exports = { obtenerListaUsuarios, eliminarUsuario };
