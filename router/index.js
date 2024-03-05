/*import express from "express";

export const router = express.Router();

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

router.get('/', checkNotAuthenticated, (req, res) => {
    obtenerDatos();
    res.render('index', { 
        pagina: 'login',
        selected: 1,
        env: {
            seccion: '',
        },
    });
});

router.post('/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true,
}));

router.get('/acerca', (req, res) => {
    res.render('index', { 
        pagina: 'acerca',
        selected: 2,
        env: {
            seccion: '',
        },
    });
});

router.get('/home', checkAuthenticated, (req, res) => {
    res.render('index', { 
        pagina: 'usertickets',
        user: req.user,
        env: {
            seccion: 'Mis Tickets',
        },
    });
});

router.get('/solicitud', checkAuthenticated, (req, res) => {
    res.render('index', { 
        pagina: 'solicitud',
        admin: false,
        env: {
            seccion: 'Solicitar Ticket',
        },
    });
});

// Perfil es dinámico con el rol (admin - user), ambos comparten la misma interfaz de perfil
router.get('/perfil', checkAuthenticated, (req, res) => {
    res.render('index', { 
        pagina: 'perfil',
        admin: req.body.admin,
        env: {
            seccion: 'Perfil',
        },
    });
});

router.get('/verticket', checkAuthenticated, (req, res) => {
    res.render('index', { 
        pagina: 'verticket',
        admin: false,
        env: {
            seccion: 'Ticket #',
        },
    });
});

/* Rutas para el administrador

router.get('/admintickets', checkAuthenticated, (req, res) => {
    res.render('index', { 
        pagina: 'admintickets',
        admin: true,
        env: {
            seccion: 'Tickets del sistema',
        },
    });
});

router.get('/averticket', checkAuthenticated, (req, res) => {
    res.render('index', { 
        pagina: 'averticket',
        admin: true,
        env: {
            seccion: 'Ticket #',
        },
    });
});

router.delete('/logout', (req, res) => {
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

export default { router };*/