const file = document.querySelector('.inp.imagen');
const img = document.querySelector('.laimagen');

file.addEventListener('change', e => {
    const files = e.target.files;
    const file = files[files.length - 1];
    if(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});