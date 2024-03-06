import usuariosDB from "./models/usuarios-querys.js";
import ticketsDB from "./models/tickets-querys.js";

async function obtenerDatos() {
    return await usuariosDB.getTodos();
}

async function obtenerTickets(fkU) {
    return await ticketsDB.getTickets(fkU);
}

async function obtenerTicket(id) {
    return await ticketsDB.getTicket(id);
}

export default {
    obtenerDatos,
    obtenerTickets,
    obtenerTicket,
};