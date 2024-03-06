const btnCerrar = document.querySelector('.cerrar');
const dialog = document.querySelector('.dialog');
const background = document.querySelector('.background');

const btnNo = document.querySelector('button.op');

const html = document.querySelector('html');

btnCerrar.addEventListener('click', e => {
    e.preventDefault();
    if(!dialog.classList.contains('active')) {
        background.classList.add('active');
        dialog.classList.add('active');
        html.style.overflow = 'hidden';
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