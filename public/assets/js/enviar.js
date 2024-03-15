const file = document.querySelector('.inp.imagen');
const form = document.querySelector('.enviar');

file.addEventListener('change', e => {
    form.submit();
});
