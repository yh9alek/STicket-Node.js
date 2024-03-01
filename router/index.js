import express from "express";
import json from "body-parser";
export const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { 
        pagina: 'login',
        selected: 1,
        env: {
            seccion: '',
        },
    });
});

router.get('/acerca', (req, res) => {
    res.render('index', { 
        pagina: 'acerca',
        selected: 2,
        env: {
            seccion: '',
        },
    });
});

router.get('/home', (req, res) => {
    res.render('index', { 
        pagina: 'usertickets',
        env: {
            seccion: 'Mis Tickets',
        },
    });
});

router.get('/solicitud', (req, res) => {
    res.render('index', { 
        pagina: 'solicitud',
        env: {
            seccion: 'Solicitar Ticket',
        },
    });
});

router.get('/perfil', (req, res) => {
    res.render('index', { 
        pagina: 'perfil',
        env: {
            seccion: 'Perfil',
        },
    });
});

router.get('/verticket', (req, res) => {
    res.render('index', { 
        pagina: 'verticket',
        env: {
            seccion: 'Ticket #',
        },
    });
});

export default { router };