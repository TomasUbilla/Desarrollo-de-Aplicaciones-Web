const validateName = (input) => {
    const lengthValid = input.trim().length >= 3 && input.trim().length <= 80;
    const isAlpha = /^[a-zA-Z\s]+$/.test(input.trim());
    return lengthValid && isAlpha;
  };

const validateCommentLength = (input) => {
    return input.trim().length >= 5;
};

const validateForm = () => {
    // obtener elementos del DOM por el ID
    let nameInput = document.getElementById("comment-name");
    let commentInput = document.getElementById("comment-text");
    let messageContainer = document.getElementById("message-container");
    let messageText = document.getElementById("message-text");
    let backBtn = document.getElementById("back-btn");

    let msg = "";
    let isValid = true;

    if (!validateName(nameInput.value)) {
        msg += "Nombre inválido. Debe tener entre 3 y 80 caracteres.\n";
        nameInput.style.borderColor = "red";
        isValid = false;
    } else {
        nameInput.style.borderColor = "";
    }

    if (!validateCommentLength(commentInput.value)) {
        msg += "Comentario inválido. Debe tener al menos 5 caracteres.\n";
        commentInput.style.borderColor = "red";
        isValid = false;
    } else {
        commentInput.style.borderColor = "";
    }

    if (isValid) {
        msg = "Comentario agregado exitosamente!";
        backBtn.style.display = "block"; // Mostrar botón para regresar
        messageContainer.style.display = "block";
    } else {
        messageContainer.style.display = "block";
    }

    messageText.textContent = msg;
};

const resetForm = () => {
    // Ocultar mensaje y botón
    document.getElementById("message-container").style.display = "none";
    
    // Resetear el formulario
    document.getElementById("comment-form").reset();
    
    // Restablecer el borde de los campos
    document.getElementById("comment-name").style.borderColor = "";
    document.getElementById("comment-text").style.borderColor = "";
    
    // Establecer la fecha actual en el campo de fecha
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    document.getElementById('comment-date').value = today;
};

document.addEventListener('DOMContentLoaded', () => {
    // Establece la fecha actual en el campo de fecha
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    document.getElementById('comment-date').value = today;
});


const showLargeImage = (src) => {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    modalImg.src = src;
    modal.style.display = 'flex';
};

const closeModal = () => {
    document.getElementById('modal').style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
    // Establece la fecha actual en el campo de fecha
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const dateField = document.getElementById('comment-date');
    if (dateField) {
        dateField.value = today;
    }
});

