const iconos = Array.from(document.querySelectorAll('.icono'));
const prioridades = Array.from(document.querySelectorAll('.prioridad'));
const icono__selected = document.querySelector('.icono__selected');
const prioridad__selected = document.querySelector('.prioridad__selected');

const reemplazarImagen = (icono, selected = false) => {
    let nuevoSrc = icono.src;
    let sub = nuevoSrc.substring(nuevoSrc.length - 7);
    let arr = nuevoSrc.split('');
    arr.length -= 7;
    sub = (selected) ? sub.replace('-b', '-s') :
                       sub.replace('-s', '-b');
    nuevoSrc = arr.join('') + sub;
    icono.src = nuevoSrc;
}

(() => {
    for(let i = 0; i < parseInt(icono__selected.value); i++) {
        if(iconos[i].classList.contains('selected')) {
            iconos[i].classList.remove('selected');
            reemplazarImagen(iconos[i]);
        }
        if((i + 1) === parseInt(icono__selected.value)) {
            iconos[i].classList.add('selected');
            reemplazarImagen(iconos[i], true);
        }
    }

    for(let i = 0; i < parseInt(prioridad__selected.value); i++) {
        if(prioridades[i].classList.contains('pselected')) {
            prioridades[i].classList.remove('pselected');
        }
        if((i + 1) === parseInt(prioridad__selected.value)) {
            prioridades[i].classList.add('pselected');
        }
    }
})();

iconos.forEach(icono => {
    icono.addEventListener('click', e => {
        iconos.forEach(i => {
            if(i.classList.contains('selected')){
                i.classList.remove('selected');
                reemplazarImagen(i);
            }
        });
        if(!icono.classList.contains('selected')){
            icono.classList.add('selected');
            reemplazarImagen(icono, true);
        }
        for(let i = 0; i < iconos.length; i++) {
            if(iconos[i].classList.contains('selected')) {
                icono__selected.value = i + 1;
                break;
            }
        }
    });
});

prioridades.forEach(prioridad => {
    prioridad.addEventListener('click', e => {
        e.preventDefault();
        prioridades.forEach(p => p.classList.remove('pselected'));
        if(!prioridad.classList.contains('pselected')) {
            prioridad.classList.add('pselected');
        }
        for(let i = 0; i < prioridades.length; i++) {
            if(prioridades[i].classList.contains('pselected')) {
                prioridad__selected.value = i + 1;
                break;
            }
        }
    });
});