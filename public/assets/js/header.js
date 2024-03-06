const btnMenu = document.querySelector('.menu');
const btnExit = document.querySelector('.exit');
const inputs = document.querySelectorAll('input');
const inputsIcons = document.querySelectorAll('.input > i');

const background = document.querySelector('.background');
const buttons = document.querySelector('.buttons');

const perfil = document.querySelector('.perfil');
const opciones = document.querySelector('.opciones');

const html = document.querySelector('html');

btnMenu.addEventListener('click', e => {
    if(!buttons.classList.contains('active')) {
        buttons.classList.add('active');
        background.classList.add('active');
        html.style.overflow = 'hidden';
    }
});

btnExit.addEventListener('click', e => {
    if(buttons.classList.contains('active')){
        buttons.classList.remove('active');
        background.classList.remove('active');
        html.style.overflow = 'scroll';
    }
});

perfil.addEventListener('mouseenter', e => {
    opciones.classList.add('active');
});

perfil.addEventListener('mouseleave', e => {
    opciones.classList.remove('active');
});