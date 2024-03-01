import express from "express";
import json from "body-parser";
export const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {titulo: "Mi primer página ejs",
                         nombre: "Yohan Alek Plazola Arangure"});
});

export default { router };