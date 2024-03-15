const back = document.querySelector('.sections');
back.style.fontWeight = 'bold';

back.addEventListener('click', e => {
    if (window.location.href === document.referrer) {
        window.history.go(-2);
    } else {
        window.history.back();
    }
});