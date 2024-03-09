import conexion from './conexion.js';

const usuariosDB = {};

usuariosDB.getAdmin = function(id) {
    return new Promise((resolve, reject) => {
        const consulta = "SELECT * FROM usuarios WHERE isAdmin = 1 AND id = ?;";
        conexion.query(consulta, [id], function(err, res) {
            if (err) {
                console.log("Surgió un error");
                reject(res);
            }
            else {
                console.log("Se buscó con éxito");
                resolve(res);
            }
        });
    });
};

usuariosDB.insertar = function(usuario, pass, nombre, correo, celular, codigo, puesto, departamento, isAdmin = false, foto = '') {
    if(pass === '' || nombre === '' || correo === '' || celular === '' || codigo === '' || puesto === '' || departamento === '') {
        throw new Error('No se pueden insertar campos vacíos...');
    }
    const consulta = "INSERT INTO usuarios (usuario, pass, nombre, correo, celular, codigo, puesto, departamento, isAdmin, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    conexion.query(consulta, [usuario, pass, nombre, correo, celular, codigo, puesto, departamento, isAdmin, foto], function(err, res) {
        if (err) {
            console.log("Surgió un error: " + err);
        }
        else {
            console.log("Se insertó con éxito");
        }
    });
};

usuariosDB.editar = function(usuario, nombre, puesto, departamento, celular, codigo, id) {
    const consulta = 'UPDATE usuarios SET usuario = ?, nombre = ?, puesto = ?, departamento = ?, celular = ?, codigo = ? WHERE id = ?;';
    conexion.query(consulta, [usuario, nombre, puesto, departamento, celular, codigo, id], (err, res) => {
        if (err) {
            console.log("Surgió un error: " + err);
        }
        else {
            console.log("Se editó con éxito");
        }
    });
}

usuariosDB.getTodos = function() {
    return new Promise((resolve, reject) => {
        var sqlConsulta = "SELECT * FROM usuarios;";
        conexion.query(sqlConsulta, null, function (err, res) {
            if (err) {
                console.log("Surgio un error: " + err);
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
                console.log("Surgio un error: " + err);
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });
}

export default usuariosDB;