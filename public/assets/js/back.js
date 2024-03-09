const back = document.querySelector('.sections');
back.style.fontWeight = 'bold';


back.addEventListener('click', e => {
    window.history.back();
});