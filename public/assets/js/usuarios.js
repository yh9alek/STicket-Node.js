const usuarios = document.querySelector('.usuarios__contenedor');
const dialog = document.querySelector('.dialog');
const background = document.querySelector('.background');

const btnNo = document.querySelector('button.op');

const html = document.querySelector('html');


usuarios.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.closest('button.eliminar')) {
        if(!dialog.classList.contains('active')) {
            background.classList.add('active');
            dialog.classList.add('active');
            html.style.overflow = 'hidden';
        }
        const boton = e.target.closest('button.eliminar');
        const usuario = boton.parentNode;
        dialog.querySelector('p > span').textContent = usuario.querySelector('.usuario__nombre').textContent;
    }
});

btnNo.addEventListener('click', e => {
    e.preventDefault();
    if(dialog.classList.contains('active')) {
        background.classList.remove('active');
        dialog.classList.remove('active');
        html.style.overflow = 'scroll';
    }
});