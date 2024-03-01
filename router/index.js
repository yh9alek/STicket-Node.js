import express from "express";
import json from "body-parser";
export const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {pagina: 'login'});
});

export default { router };