const listaTareas = document.querySelector("#listaTareas"); 
const tareaInput = document.querySelector("#nuevaTarea"); 
const agregarBtn = document.querySelector("#agregarTarea"); 

// Nuevos elementos para el resumen
const totalTareasSpan = document.querySelector("#totalTareas"); 
const tareasRealizadasSpan = document.querySelector("#tareasRealizadas"); 


const tareas = [];


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


agregarBtn.addEventListener("click", function() {
    const nuevaTareaDescripcion = tareaInput.value.trim();

    if (nuevaTareaDescripcion === "") {
        alert("Por favor, ingresa la descripción de la tarea.");
        return;
    }

    
    tareas.push({ id: Date.now(), descripcion: nuevaTareaDescripcion, realizada: false });
    tareaInput.value = ""; // Limpia el input

    
    renderizarTareas();
});


function borrarTarea(id) { 
    const index = tareas.findIndex(tarea => tarea.id === id);

    if (index !== -1) {
        tareas.splice(index, 1);
    }

    renderizarTareas();
}


function toggleRealizada(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.realizada = !tarea.realizada; 
        renderizarTareas(); // 
    }
}


listaTareas.addEventListener("click", function(event) {
   
    if (event.target.tagName === 'LI' || event.target.tagName === 'SPAN') {
        
        const listItem = event.target.tagName === 'SPAN' ? event.target.closest('li') : event.target;
        
        
        const id = parseInt(listItem.dataset.id);
        if (!isNaN(id)) { 
            toggleRealizada(id);
        }
    }
});


renderizarTareas();