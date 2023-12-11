const conexion = require('../database/db');

const obtenerListaUsuarios = (callback) => {
    const sql = 'SELECT name, lastname, rol, email, celular, cedula FROM users';
    conexion.query(sql, (error, results) => {
        if (error) {
            console.error('Error al obtener la lista de usuarios:', error);
            callback('Error al obtener la lista de usuarios', null);
        } else {
            callback(null, results);
        }
    });
};


module.exports = { obtenerListaUsuarios };
