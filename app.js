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
import usuariosDB from './models/usuarios-querys.js';
import initialize from './passport-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(__dirname + '/public'));

let usuarios = null;

async function obtenerDatos() {
    usuarios = await usuariosDB.getTodos();
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
    successRedirect: '/home',
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
    res.render('index', { 
        pagina: 'usertickets',
        user: req.user,
        env: {
            seccion: 'Mis Tickets',
        },
    });
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
    res.render('index', { 
        pagina: 'verticket',
        user: req.user,
        env: {
            seccion: 'Ticket #',
        },
    });
});

/* Rutas para el administrador */

app.get('/admintickets', checkAuthenticated, (req, res) => {
    res.render('index', { 
        pagina: 'admintickets',
        user: req.user,
        env: {
            seccion: 'Tickets del sistema',
        },
    });
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

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/home');
    }
    next();
}

// Iniciar el servidor
app.listen(port, () => {
    console.log("Iniciando el servidor en el puerto " + port);
});