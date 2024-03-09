import { config } from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
    config();
}

const app = express();
const port = 3000;

import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

import flash from 'express-flash'; // Para mensajes temporales que se muestran al usuario después de realizar ciertas acciones
import session from 'express-session'; // Middleware de gestión de sesiones para Express
import methodOverride from 'method-override'; // Middleware que permite a las aplicaciones Express usar métodos HTTP como PUT o DELETE en formularios HTML
import passport from 'passport'; // Middleware de autenticación para Node.js

import bcrypt from 'bcrypt';
import initialize from './passport-config.js';

import usuariosDB from './models/usuarios-querys.js';
import ticketsDB from './models/tickets-querys.js';
import mensajesDB from './models/mensajes-querys.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(__dirname + '/public'));

let usuarios = null;
let tickets = null;
let admin = null;
let mensajes = null;

async function obtenerDatos() {
    usuarios = await usuariosDB.getTodos();
}

async function obtenerTickets(fkU) {
    tickets = await ticketsDB.getTickets(fkU);
}

async function obtenerTodos() {
    tickets = await ticketsDB.getTodos();
}

async function obtenerAdmin(id) {
    admin = await usuariosDB.getAdmin(id);
}

async function obtenerMensajes(id) {
    mensajes = await mensajesDB.getMensajes(id);
}

obtenerDatos();

setTimeout(() => {
    initialize(passport,
        correo => usuarios.find(usuario => usuario.correo === correo),
        id => usuarios.find(usuario => usuario.id === id),
    );
}, 100);

// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', checkNotAuthenticated, (req, res) => {
    obtenerDatos();
    res.render('index', {
        pagina: 'login',
        selected: 1,
        env: {
            seccion: '',
        },
    });
});

app.post('/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
}));

app.get('/acerca', (req, res) => {
    res.render('index', { 
        pagina: 'acerca',
        selected: 2,
        env: {
            seccion: '',
        },
    });
});

app.get('/home', checkAuthenticated, (req, res) => {
    if(req.user.isAdmin) throw new Error('Acceso Negado');
    obtenerTickets(req.user.id);
    setTimeout(() => {
        res.render('index', { 
            pagina: 'usertickets',
            user: req.user,
            env: {
                seccion: 'Mis Tickets',
                tickets: tickets,
            },
        });
    }, 100);
});

app.get('/solicitud', checkAuthenticated, (req, res) => {
    if(req.user.isAdmin) throw new Error('Acceso Negado');
    res.render('index', { 
        pagina: 'solicitud',
        user: req.user,
        env: {
            seccion: 'Solicitar Ticket',
        },
    });
});

app.post('/solicitud', checkAuthenticated, (req, res) => {
    if(req.user.isAdmin) throw new Error('Acceso Negado');
    ticketsDB.insertar(req.body.titulo,
                       req.body.descripcion,
                       parseInt(req.body.icono), 
                       parseInt(req.body.prioridad),
                       req.user.id,       
                       1,
                       0,
                       formatearFecha());
    res.redirect('/');
});

app.get('/editar', checkAuthenticated, (req, res) => {
    if(req.user.isAdmin) throw new Error('Acceso Negado');
    let ticket = null;
    setTimeout(() => {
        if(req.query.id){
            ticket = tickets.find(ticket => ticket.id === parseInt(req.query.id));
        }
        res.render('index', { 
            pagina: 'editar',
            user: req.user,
            env: {
                seccion: 'Editar Ticket',
                ticket: ticket,
            },
        });
    }, 100);
});

app.post('/editar', checkAuthenticated, (req, res) => {
    if(req.user.isAdmin) throw new Error('Acceso Negado');
    ticketsDB.editar(req.body.titulo,
                     req.body.descripcion,
                     parseInt(req.body.icono),
                     parseInt(req.body.prioridad),
                     parseInt(req.body.id));
    res.redirect(`/verticket?id=${req.body.id}`);
});

// Perfil es dinámico con el rol (admin - user), ambos comparten la misma interfaz de perfil
app.get('/perfil', checkAuthenticated, (req, res) => {
    res.render('index', { 
        pagina: 'perfil',
        user: req.user,
        env: {
            seccion: 'Perfil',
        },
    });
});

app.get('/verticket', checkAuthenticated, (req, res) => {
    if(req.user.isAdmin) throw new Error('Acceso Negado');
    obtenerTickets(req.user.id);
    setTimeout(() => {
        const ticket = tickets.find(ticket => ticket.id === parseInt(req.query.id));
        obtenerAdmin(ticket.fkAdmin);
        obtenerMensajes(ticket.id);
        setTimeout(() => {
            res.render('index', { 
                pagina: 'verticket',
                user: req.user,
                env: {
                    seccion: `Ticket #${ticket.id}`,
                    ticket: ticket,
                    admin: admin[0],
                    mensajes: mensajes,
                },
            });
        }, 100);
    }, 100);
});

app.post('/verticket', checkAuthenticated, (req, res) => {
    if(req.user.isAdmin) throw new Error('Acceso Negado');
    obtenerTickets(req.user.id);
    ticketsDB.cerrar(req.body.id, formatearFecha());
    res.redirect(`/verticket?id=${req.body.id}`);
});

// Esta ruta se usa para enviar los mensajes al backend, es compartida por ambos roles (admin - user)
app.post('/message', checkAuthenticated, (req, res) => {
    const mensaje = req.body.mensaje;
    mensajesDB.insertar(mensaje, req.body.idTicket, req.body.idEmisor, req.body.idReceptor, formatearFecha());
    if(!req.user.isAdmin) {
        res.redirect(`/verticket?id=${req.body.idTicket}`);
    }
    else {
        res.redirect(`/averticket?idUser=${req.body.idReceptor}&idTicket=${req.body.idTicket}`);
    }
});

/* Rutas para el administrador */

app.get('/admintickets', checkAuthenticated, (req, res) => {
    if(!req.user.isAdmin) throw new Error('Acceso Negado');
    obtenerTodos();
    obtenerDatos();
    let enEspera = null;
    setTimeout(() => {
        enEspera = tickets.filter(ticket => !ticket.isRespondido && ticket.estado).length;
        res.render('index', { 
            pagina: 'admintickets',
            user: req.user,
            env: {
                seccion: 'Tickets del sistema',
                tickets: tickets,
                usuarios: usuarios,
                enEspera: enEspera,
            },
        });
    }, 100);
});

app.get('/averticket', checkAuthenticated, (req, res) => {
    if(!req.user.isAdmin) throw new Error('Acceso Negado');
    let ticket = null;
    let usuario = null;
    obtenerTickets(req.query.idUser);
    setTimeout(() => {
        ticket = tickets.find(ticket => ticket.id === parseInt(req.query.idTicket));
        usuario = usuarios.find(user => user.id === parseInt(req.query.idUser));
        obtenerAdmin(ticket.fkAdmin);
        obtenerMensajes(ticket.id);
        setTimeout(() => {
            res.render('index', {
                pagina: 'averticket',
                user: req.user,
                env: {
                    seccion: `Ticket #${ticket.id}`,
                    ticket: ticket,
                    usuario: usuario,
                    admin: admin[0],
                    mensajes: mensajes,
                },
            });
        }, 100);
    }, 100);
});

app.post('/averticket', checkAuthenticated, (req, res) => {
    if(!req.user.isAdmin) throw new Error('Acceso Negado');
    ticketsDB.atender(1, req.user.id, req.body.idTicket);
    res.redirect(`/averticket?idUser=${req.body.idUser}&idTicket=${req.body.idTicket}`);
});

app.get('/usuarios', checkAuthenticated, (req, res) => {
    if(!req.user.isAdmin) throw new Error('Acceso Negado');
    obtenerDatos();
    setTimeout(() => {
        res.render('index', {
            pagina: 'usuarios',
            user: req.user,
            env: {
                seccion: `Usuarios`,
                usuarios: usuarios,
            },
        });
    }, 100);
});

app.get('/crearusuario', checkAuthenticated, (req, res) => {
    if(!req.user.isAdmin) throw new Error('Acceso Negado');
    res.render('index', {
        pagina: 'crearusuario',
        user: req.user,
        env: {
            seccion: `Crear nuevo Usuario`,
        },
    });
});

app.post('/crearusuario', checkAuthenticated, async (req, res) => {
    if(!req.user.isAdmin) throw new Error('Acceso Negado');
    try {
        let hashedPassword = null;
        if(checarContraseña(req.body.pass, req.body.cpass)) {
            hashedPassword = await bcrypt.hash(req.body.pass, 10);
        }
        usuariosDB.insertar(formatearUsuario(req.body.nombre),
                        hashedPassword,
                        req.body.nombre,
                        req.body.email,
                        req.body.numero,
                        req.body.codigo,
                        req.body.puesto, 
                        req.body.departamento,
                        parseInt(req.body.isAdmin),
                        req.body.foto.toString());
    res.redirect('/usuarios');
    } catch(err){
        throw new Error('Surgió un error: ' + err);
    }
});

app.get('/editarusuario', checkAuthenticated, (req, res) => {
    if(!req.user.isAdmin) throw new Error('Acceso Negado');
    obtenerDatos();
    let usuario = usuarios.find(usuario => usuario.usuario === req.query.usuario);
    setTimeout(() => {
        res.render('index', {
            pagina: 'editarusuario',
            user: req.user,
            env: {
                usuario: usuario,
                seccion: `Editar Usuario`,
            },
        });
    });
});

app.post('/editarusuario', checkAuthenticated, (req, res) => {
    if(!req.user.isAdmin) throw new Error('Acceso Negado');
    console.log(req.body.nombre);
    usuariosDB.editar(formatearUsuario(req.body.nombre),
                      req.body.nombre,
                      req.body.puesto,
                      req.body.departamento,
                      req.body.celular,
                      req.body.codigo,
                      req.body.id);
    res.redirect('/usuarios');
});

app.post('/verperfil', checkAuthenticated, (req, res) => {
    if(!req.user.isAdmin) throw new Error('Acceso Negado');
    obtenerDatos();
    let usuario = usuarios.find(usuario => usuario.usuario === req.body.usuario);
    setTimeout(() => {
        res.render('index', {
            pagina: 'verperfil',
            user: req.user,
            env: {
                ant: req.body.ant,
                usuario: usuario,
                seccion: `Perfil de @${usuario.usuario}`,
            },
        });
    }, 100);
});

app.delete('/logout', (req, res) => {
    req.logout(function() {
        res.redirect('/');
    });
});

function checarContraseña(pass, cpass) {
    return pass === cpass ? pass : '';
}

function formatearUsuario(usuario) {
    const partes = usuario.split(' ');
    return partes[0] + partes[1];
}

function formatearFecha() {
    const date = new Date();
    // Ajustar la hora al huso horario local
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 19).replace('T', ' ');
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        if(req.user.isAdmin)
            return res.redirect('/admintickets');
        else
            return res.redirect('/home');
    }
    next();
}

// Iniciar el servidor
app.listen(port, () => {
    console.log("Iniciando el servidor en el puerto " + port);
});