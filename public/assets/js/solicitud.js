const iconos = document.querySelectorAll('.icono');
const prioridades = document.querySelectorAll('.prioridad');

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
    });
});

prioridades.forEach(prioridad => {
    prioridad.addEventListener('click', e => {
        e.preventDefault();
        prioridades.forEach(p => p.classList.remove('pselected'));
        if(!prioridad.classList.contains('pselected')) {
            prioridad.classList.add('pselected');
        }
    });
});