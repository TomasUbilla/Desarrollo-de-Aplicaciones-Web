const mostrarOcultarImagen = function() {
    var img = document.getElementById('hidden-image');
    var audio = document.getElementById('audio');
    
    // Verifica si la imagen está oculta y cambia su estado
    if (img.style.display === 'none' || img.style.display === '') {
        img.style.display = 'block'; // Muestra la imagen
        audio.play();
    } else {
        img.style.display = 'none'; // Oculta la imagen
        audio.pause(); // Pausa el audio si estaba sonando
        audio.currentTime = 0; // Reinicia el audio
    }
};