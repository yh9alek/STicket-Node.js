import conexion from './conexion.js';

const ticketsDB = {};

ticketsDB.getTickets = function(fkU) {
    return new Promise((resolve, reject) => {
        var sqlConsulta = "SELECT * FROM tickets WHERE fkUsuario = ?;";
        conexion.query(sqlConsulta, [fkU], function (err, res) {
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

ticketsDB.getTodos = function() {
    return new Promise((resolve, reject) => {
        var sqlConsulta = "SELECT * FROM tickets ORDER BY id DESC;";
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

ticketsDB.getTicket = function(id) {
    return new Promise((resolve, reject) => {
        var sqlConsulta = "SELECT * FROM tickets WHERE id= ?;";
        conexion.query(sqlConsulta, [id], function (err, res) {
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

ticketsDB.insertar = function(titulo = '', descripcion = '', icono = 0, prioridad = 0, fkUsuario = 0, estado = 0, isRespondido = 0, fecha = '') {
    const consulta = `INSERT INTO tickets (titulo, descripcion, icono, prioridad, fkUsuario, fkAdmin, estado, isRespondido, fecha, fechaCierre) 
                      VALUES (?, ?, ?, ?, ?, NULL, ?, ?, ?, NULL);`;

    conexion.query(consulta, [titulo, descripcion, icono, 
                              prioridad, fkUsuario, estado, 
                              isRespondido, fecha], function(err, res) {
        if (err) {
            console.log("Surgió un error: " + err);
        }
        else {
            console.log("Se insertó con éxito");
        }
    });
}

ticketsDB.editar = function(titulo = '', descripcion = '', icono = 1, prioridad = 1, id) {
    const consulta = `UPDATE tickets SET titulo = ?, descripcion = ?, icono = ?, prioridad = ? WHERE id = ?;`;
    conexion.query(consulta, [titulo, descripcion, icono, prioridad, id], function(err, res) {
        if (err) {
            console.log("Surgió un error: " + err);
        }
        else {
            console.log("Se editó con éxito");
        }
    });
}

export default ticketsDB;