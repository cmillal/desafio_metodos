const listaTareas = document.querySelector("#listaTareas"); 
const tareaInput = document.querySelector("#nuevaTarea"); 
const agregarBtn = document.querySelector("#agregarTarea"); 

const totalTareasSpan = document.querySelector("#totalTareas"); 
const tareasRealizadasSpan = document.querySelector("#tareasRealizadas"); 

const tareas = [];

/
function renderizarTareas() {
    let html = "";
    if (tareas.length === 0) {
        html = "<li>No hay tareas todavía.</li>";
    } else {
        for (let i = 0; i < tareas.length; i++) {
            const tarea = tareas[i];
      
            html += `
                <li data-id="${tarea.id}" class="${tarea.realizada ? 'tarea-realizada' : ''}">
                    <span>${tarea.descripcion}</span>
                    <button onclick="borrarTarea(${tarea.id})">Eliminar</button>
                </li>
            `;
        }
    }
    listaTareas.innerHTML = html;
    actualizarResumen(); 
}

function actualizarResumen() {
    const total = tareas.length;
       const realizadas = tareas.filter(tarea => tarea.realizada).length;

    totalTareasSpan.textContent = total;
    tareasRealizadasSpan.textContent = realizadas;
}

// EventListener para el botón "Agregar"
agregarBtn.addEventListener("click", function() {
    const nuevaTareaDescripcion = tareaInput.value.trim();

    if (nuevaTareaDescripcion === "") {
        alert("Por favor, ingresa la descripción de la tarea.");
        return;
    }

    // Agrega la nueva tarea como un objeto con un ID único, la descripción y 'realizada' en false
    tareas.push({ id: Date.now(), descripcion: nuevaTareaDescripcion, realizada: false });
    tareaInput.value = ""; // Limpia el input

    // Llama a la función para actualizar la lista y el resumen en el HTML
    renderizarTareas();
});

// Función para borrar una tarea por su ID
function borrarTarea(id) { // Nombre de la función actualizado
    const index = tareas.findIndex(tarea => tarea.id === id);

    if (index !== -1) {
        tareas.splice(index, 1);
    }

    renderizarTareas();
}

// Nueva función para alternar el estado 'realizada' de una tarea
function toggleRealizada(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.realizada = !tarea.realizada; // Invierte el estado (true a false, false a true)
        renderizarTareas(); // Vuelve a renderizar la lista para aplicar el nuevo estilo y actualizar el resumen
    }
}

// EventListener para el clic en los elementos de la lista (para marcar como realizada)
listaTareas.addEventListener("click", function(event) {
    // Aseguramos que el clic fue en un 'li' y no en el botón de eliminar
    if (event.target.tagName === 'LI' || event.target.tagName === 'SPAN') {
        // Encontramos el 'li' padre si el clic fue en el span
        const listItem = event.target.tagName === 'SPAN' ? event.target.closest('li') : event.target;
        
        // Obtenemos el ID de la tarea desde el atributo data-id
        const id = parseInt(listItem.dataset.id);
        if (!isNaN(id)) { // Nos aseguramos de que el ID sea un número válido
            toggleRealizada(id);
        }
    }
});


// Llama a renderizarTareas inicialmente para mostrar el mensaje de "No hay tareas"
// o cualquier tarea precargada si existiera, y para inicializar el resumen.
renderizarTareas();