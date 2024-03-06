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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(__dirname + '/public'));

let usuarios = null;
let tickets = null;

async function obtenerDatos() {
    usuarios = await usuariosDB.getTodos();
}

async function obtenerTickets(fkU) {
    tickets = await ticketsDB.getTickets(fkU);
}

async function obtenerTodos() {
    tickets = await ticketsDB.getTodos();
}

obtenerDatos();

setTimeout(() => {
    initialize(passport,
        correo => usuarios.find(user => user.correo === correo),
        id => usuarios.find(user => user.id === id),
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
    res.render('index', { 
        pagina: 'solicitud',
        user: req.user,
        env: {
            seccion: 'Solicitar Ticket',
        },
    });
});

app.get('/editar', checkAuthenticated, (req, res) => {
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
    ticketsDB.editar(req.body.titulo,
                     req.body.descripcion,
                     parseInt(req.body.icono),
                     parseInt(req.body.prioridad),
                     parseInt(req.body.id));
    res.redirect(`/verticket?id=${req.body.id}`);
});

app.post('/solicitud', checkAuthenticated, (req, res) => {
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
    obtenerTickets(req.user.id);
    setTimeout(() => {
        const ticket = tickets.find(ticket => ticket.id === parseInt(req.query.id));
        res.render('index', { 
            pagina: 'verticket',
            user: req.user,
            env: {
                seccion: `Ticket #${ticket.id}`,
                ticket: ticket,
            },
        });
    }, 100);
});

/* Rutas para el administrador */

app.get('/admintickets', checkAuthenticated, (req, res) => {
    obtenerTodos();
    obtenerDatos();
    setTimeout(() => {
        res.render('index', { 
            pagina: 'admintickets',
            user: req.user,
            env: {
                seccion: 'Tickets del sistema',
                tickets: tickets,
                usuarios: usuarios,
            },
        });
    }, 100);
});

app.get('/averticket', checkAuthenticated, (req, res) => {
    res.render('index', { 
        pagina: 'averticket',
        user: req.user,
        env: {
            seccion: 'Ticket #',
        },
    });
});

app.delete('/logout', (req, res) => {
    req.logout(function() {
        res.redirect('/');
    });
});

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