import conexion from './conexion.js';

const mensajesDB = {};

mensajesDB.insertar = function(mensaje = '', fkTicket, fkEmisor, fkReceptor, fecha = '', isNotificacion = false) {
    const consulta = `INSERT INTO mensajes (mensaje, fkTicket, fkEmisor, fkReceptor, fecha, isNotificacion) 
                                    VALUES (?, ?, ?, ?, ?, ?)`;
    conexion.query(consulta, [mensaje, fkTicket, fkEmisor, fkReceptor, fecha, isNotificacion], (err, res) => {
        if(err) {
            console.log('Surgió un error: ' + err);
        }
        else {
            console.log('Se mandó con éxito');
        }
    });
}

mensajesDB.getMensajes = function(fkTicket) {
    const consulta = `SELECT * FROM mensajes WHERE fkTicket = ?`;
    return new Promise((resolve, reject) => {
        conexion.query(consulta, [fkTicket], (err, res) => {
            if(err) {
                console.log('Surgió un error: ' + err);
                reject(res);
            }
            else {
                console.log('Se mandó con éxito');
                resolve(res);
            }
        });
    });
}

export default mensajesDB;