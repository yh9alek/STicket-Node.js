const iconos = document.querySelectorAll('.icono');
const prioridades = document.querySelectorAll('.prioridad');
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