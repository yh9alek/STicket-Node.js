const botonesFiltro = document.querySelectorAll('.bt:not(.todos_estado):not(.abierto):not(.cerrado)');
const botonesEstado = document.querySelectorAll('.bt:not(.todos):not(.regular):not(.medio):not(.critico)');

const btnBuscar = document.querySelector('.inp.buscar');

const logicaSeleccionBotones = (...botones) => {
    botones.forEach(b => {
        b.forEach(boton => boton.addEventListener('click', e => {
            b.forEach(boton => {
                if(boton.classList.contains('selected')) {
                    boton.classList.remove('selected');
                }
            });
            if(!boton.classList.contains('selected')) {
                boton.classList.add('selected');
            }
        }));
    });
}

logicaSeleccionBotones(botonesFiltro, botonesEstado);