import http from 'http';
import path from 'path';
import express from 'express';
import json from 'body-parser';
import { fileURLToPath } from 'url';
import misRutas from './router/index.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');

// Middleware para manejar datos URL-encoded
app.use(json.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(__dirname + '/public'));

app.use(misRutas.router);

// Iniciar el servidor
app.listen(port, () => {
    console.log("Iniciando el servidor en el puerto " + port);
});