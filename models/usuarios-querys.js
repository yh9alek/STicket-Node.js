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

usuariosDB.insertar = function(usuario, pass, nombre, celular, codigo, puesto, departamento, isAdmin = false, foto = null) {
    const correo = `${new Date().getFullYear()}00@site.com`;
    if(pass === '' || nombre === '' || celular === '' || codigo === '' || puesto === '' || departamento === '') {
        throw new Error('No se pueden insertar campos vacíos...');
    }
    const consulta = "INSERT INTO usuarios (usuario, pass, nombre, correo, celular, codigo, puesto, departamento, isAdmin, foto, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    conexion.query(consulta, [usuario, pass, nombre, correo, celular, codigo, puesto, departamento, isAdmin, foto, 1], function(err, res) {
        if (err) {
            console.log("Surgió un error: " + err);
        }
        else {
            console.log("Se insertó con éxito");
        }
    });
};

usuariosDB.corregirEmail = function(email = '', id) {
    const consulta = "UPDATE usuarios SET correo = ? WHERE id = ?";
    conexion.query(consulta, [email, id], (err, res) => {
        if (err) {
            console.log("Surgió un error: " + err);
        }
        else {
            console.log("Se corrigió el email con éxito");
        }
    });
}

usuariosDB.editar = function(usuario, nombre, puesto, departamento, celular, codigo, foto = null, id) {
    const consulta = `UPDATE usuarios SET usuario = ?, nombre = ?, puesto = ?, departamento = ?, celular = ?, codigo = ?${foto ? ', foto = ?' : ''} WHERE id = ?;`;
    conexion.query(consulta, foto ? [usuario, nombre, puesto, departamento, celular, codigo, foto, id] : [usuario, nombre, puesto, departamento, celular, codigo, id], (err, res) => {
        if (err) {
            console.log("Surgió un error: " + err);
        }
        else {
            console.log("Se editó con éxito");
        }
    });
}

usuariosDB.editarConfiguracion = function(pass, foto = null, id) {
    const consulta = `UPDATE usuarios SET pass = ? ${foto ? ', foto = ?' : ''} WHERE id = ?;`;
    conexion.query(consulta, foto ? [pass, foto, id] : [pass, id], (err, res) => {
        if (err) {
            console.log("Surgió un error: " + err);
        }
        else {
            console.log("Se configuró con éxito");
        }
    });
}

usuariosDB.editarFoto = function(foto = null, id) {
    if(foto) {
        const consulta = `UPDATE usuarios SET foto = ? WHERE id = ?;`;
        conexion.query(consulta, [foto, id], (err, res) => {
            if (err) {
                console.log("Surgió un error: " + err);
            }
            else {
                console.log("Se configuró con éxito");
            }
        });
    }
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