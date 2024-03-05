import mysql from "mysql2";

var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sticket",
});

conexion.connect(function(err) {
    if(err) console.log("Surgió un error al conectar", err);
    else console.log("Se conectó con éxito 😊");
});

export default conexion;