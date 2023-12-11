const conexion = require('../database/db');

// Método para registrar pacientes
exports.registerPatient = async (req, res) => {
    try {
        const { nombre, apellido, cedula, fecha_nacimiento, genero, direccion, telefono, correo } = req.body;
        
        if (!nombre || !apellido || !cedula || !fecha_nacimiento || !genero || !direccion || !telefono || !correo) {
            return res.status(400).json({ message: 'Por favor, complete todos los campos' });
        }

        // Verificar si la cédula ya está registrada
        const cedulaExistente = await new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM Pacientes WHERE cedula = ?', [cedula], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.length > 0);
                }
            });
        });

        if (cedulaExistente) {
            return res.render('pages/registerPatient', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "La cédula ya se encuentra registrada",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'registerPatient'
            });
        }

        // Realizar el registro del paciente
        conexion.query('INSERT INTO Pacientes (nombre, apellido, cedula, fecha_nacimiento, genero, direccion, telefono, correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellido, cedula, fecha_nacimiento, genero, direccion, telefono, correo], (error, results) => {
                if (error) {
                    res.render('pages/registerPatient', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Error al registrar al paciente",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'registerPatient'
                    });
                } else {
                    res.render('pages/registerPatient', {
                        alert: true,
                        alertTitle: "Registro exitoso",
                        alertMessage: "Registro exitoso del paciente",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'registerPatient'
                    });
                }
            });

    } catch (error) {
        res.render('pages/registerPatient', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Error en el servidor",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: 'registerPatient'
        });
    }
};




