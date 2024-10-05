// Funciones de validación específicas
const validateName = (name) => {
  const lengthValid = name.trim().length >= 3 && name.trim().length <= 80;
  const isAlpha = /^[a-zA-Z\s]+$/.test(name.trim());
  return lengthValid && isAlpha;
};
const validateEmail = (email) => {
  if (!email) return false;
  return email.length > 15 && /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
};
const validatePhoneNumber = (phoneNumber) => {
  return phoneNumber.length >= 8 && /^[0-9]+$/.test(phoneNumber);
};
const validateSelect = (select) => {
  return !!select; // Retorna true si select tiene un valor
};
const validateFiles = (files) => {
  if (!files) return false;
  const lengthValid = files.length >= 1 && files.length <= 3;
  const typeValid = Array.from(files).every(file => 
    file.type.startsWith("image/") || file.type === "application/pdf"
  );
  return lengthValid && typeValid;
};
const validateYear = (text) => {
  const number = parseInt(text, 10);
  return !isNaN(number) && Number.isInteger(number) && number >= 1 && number <= 99;
};

// Función para validar cada campo
const validateField = (field) => {
  switch (field.name.split('_')[0]) {
      case 'nombre':
      case 'nameD':
          return validateName(field.value);
      case 'email':
          return validateEmail(field.value);
      case 'year':
          return validateYear(field.value);
      case 'phone':
          return validatePhoneNumber(field.value);
      case 'select-region':
      case 'select-comuna':
      case 'select-type':
      case 'select-state':
          return validateSelect(field.value);
      case 'files':
          return validateFiles(field.files);
      default:
          return field.checkValidity(); // Validación nativa del navegador
  }
};

// Cargamos rápido el DOM (a diferencia de usar window.onload)
document.addEventListener("DOMContentLoaded", () => {
  let formCount = 1; // Contador de formularios de dispositivos

  // Botón para agregar un nuevo formulario de dispositivo
  const addButton = document.getElementById('add-btn');
  const formContainer = document.getElementById('form-container');

  addButton.addEventListener('click', () => {
    formCount++; // Incrementa el contador

    // Encuentra el último formulario de dispositivo en el contenedor
    const lastForm = formContainer.querySelector('.device-form:last-of-type');
    const newForm = lastForm.cloneNode(true);

    // Actualiza los atributos de los campos clonados
    newForm.querySelectorAll('input, select, textarea').forEach((field) => {
      const originalId = field.id;
      if (originalId) { // Solo si el campo tiene ID, se asigna un nuevo ID
        field.id = originalId.split('_')[0] + '_' + formCount;
      }
      field.name = field.name.split('_')[0] + '_' + formCount; // Nuevo nombre único
      field.value = ''; // Limpiamos
    });

    const title = newForm.querySelector('h3'); // Encuentra el título del formulario clonado
    if (title) {
      title.textContent = `Dispositivo ${formCount}`; // Actualiza el número del dispositivo
    }

    formContainer.appendChild(newForm); // Añade el formulario clonado al contenedor
  });

  // Validación de formularios al enviar
  const submitButton = document.getElementById('submit-btn');
  submitButton.addEventListener('click', () => {
    let isValid = true;
    let forms = document.querySelectorAll('.device-form');
    let invalidInputs = [];

    forms.forEach((form) => {
      const fields = form.querySelectorAll('input, select, textarea');
      fields.forEach((field) => {
        if (!validateField(field)) {
          invalidInputs.push(field.name);
          isValid = false;
        }
      });
    });

    if (!isValid) {
      displayValidationErrors(invalidInputs);
    } else {
      showConfirmationMessage();
    }
  });
});

// Función para mostrar errores de validación
const displayValidationErrors = (invalidInputs) => {
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");

  validationListElem.textContent = "";
  invalidInputs.forEach(input => {
    let listElement = document.createElement("li");
    listElement.innerText = input;
    validationListElem.append(listElement);
  });
  validationMessageElem.innerText = "Los siguientes campos son inválidos:";
  validationBox.style.backgroundColor = "#ffdddd";
  validationBox.style.borderLeftColor = "#f44336";
  validationBox.hidden = false;
};

// Función para confirmacion pre publicación
const showConfirmationMessage = () => {
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");

  // Mostrar mensaje de confirmación
  validationMessageElem.innerText = "¿Confirma que desea publicar esta donación?";
  validationListElem.innerHTML = ""; // Limpiar contenido previo

  // Botón para confirmar
  let confirmButton = document.createElement("button");
  confirmButton.innerText = "Sí, confirmo";
  confirmButton.style.marginRight = "10px";
  confirmButton.addEventListener("click", () => {
    displayThankYouMessage();
  });

  // Botón para cancelar
  let cancelButton = document.createElement("button");
  cancelButton.innerText = "No, quiero volver al formulario";
  cancelButton.addEventListener("click", () => {
    validationBox.hidden = true;
    document.querySelectorAll('.device-form').forEach(form => form.style.display = 'block');
  });

  validationListElem.appendChild(confirmButton);
  validationListElem.appendChild(cancelButton);

  validationBox.style.backgroundColor = "#fff";
  validationBox.style.borderLeftColor = "#000";
  validationBox.hidden = false;
};

// Función de confirmación post publicación
const displayThankYouMessage = () => {
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");

  validationMessageElem.innerText = "Hemos recibido la información de su donación. Muchas gracias.";
  validationListElem.innerHTML = ""; 

  // Botón para volver a la portada
  let backButton = document.createElement("button");
  backButton.innerText = "Volver a la portada";
  backButton.addEventListener("click", () => {
    window.location.href = "../html/index.html";
  });

  validationListElem.appendChild(backButton);

  validationBox.style.backgroundColor = "#ddffdd";
  validationBox.style.borderLeftColor = "#4CAF50";
  validationBox.hidden = false;
};
