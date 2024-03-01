import express from "express";
import json from "body-parser";
export const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {pagina: 'login'});
});

router.get('/home', (req, res) => {
    res.render('index', {pagina: 'usertickets'});
});

router.get('/solicitud', (req, res) => {
    res.render('index', {pagina: 'solicitud'});
});

router.get('/perfil', (req, res) => {
    res.render('index', {pagina: 'perfil'});
});

export default { router };