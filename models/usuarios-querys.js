import conexion from './conexion.js';

const usuariosDB = {};

usuariosDB.getUsuarioId = function(id) {
    const consulta = "SELECT * from usuarios WHERE id = ?;";
    conexion.query(consulta, [id], function(err, res) {
        if (err) {
            console.log("Surgió un error");
        }
        else {
            console.log("Se buscó con éxito");
        }
    });
};

usuariosDB.insertar = function(usuario = '', pass = '', nombre = '', correo = '', celular = '', puesto = '', departamento = '', isAdmin = false) {
    const consulta = "INSERT INTO usuarios (usuario, pass, nombre, correo, celular, puesto, departamento, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    conexion.query(consulta, [usuario, pass, nombre, correo, celular, puesto, departamento, isAdmin], function(err, res) {
        if (err) {
            console.log("Surgió un error");
        }
        else {
            console.log("Se insertó con éxito");
        }
    });
};

usuariosDB.getTodos = function() {
    return new Promise((resolve, reject) => {
        var sqlConsulta = "SELECT * FROM usuarios;";
        conexion.query(sqlConsulta, null, function (err, res) {
            if (err) {
                console.log("Surgio un error");
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });
}

usuariosDB.getUsuariosEmail = function(email) {
    return new Promise((resolve, reject) => {
        var sqlConsulta = "SELECT * FROM usuarios WHERE email = ?;";
        conexion.query(sqlConsulta, [email], function (err, res) {
            if (err) {
                console.log("Surgio un error");
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });
}

export default usuariosDB;