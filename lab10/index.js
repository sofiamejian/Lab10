let tareas = [];

const inputNuevaTarea = document.getElementById('nueva-tarea');
const botonAgregarTarea = document.getElementById('agregar-tarea');
const mensajeAviso = document.getElementById('mensaje-aviso');
const botonCerrarAviso = document.getElementById('cerrar-aviso');

class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.estado = 'pendiente';
    }
}

function agregarTarea() {
    const nombreTarea = inputNuevaTarea.value.trim();
    
    if (nombreTarea === '') {
        mostrarAviso();
        return;
    }
    
    const nuevaTarea = new Tarea(nombreTarea);
    tareas.push(nuevaTarea);
    inputNuevaTarea.value = '';
    renderTareas();
}

function renderTareas() {
    const pendientesUl = document.getElementById('pendientes');
    const haciendoUl = document.getElementById('haciendo');
    const completadasUl = document.getElementById('completadas');

    pendientesUl.innerHTML = '';
    haciendoUl.innerHTML = '';
    completadasUl.innerHTML = '';

    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');

        const tareaTexto = document.createElement('div');
        tareaTexto.classList.add('tarea-texto');
        tareaTexto.textContent = tarea.nombre;

        li.appendChild(tareaTexto); 

        const botonContainer = document.createElement('div');
        botonContainer.classList.add('boton-container');

        if (tarea.estado === 'pendiente') {
            const botonMover = document.createElement('button');
            botonMover.textContent = '→ En Proceso';
            botonMover.onclick = () => moverTarea(index, 'haciendo');
            botonContainer.appendChild(botonMover);
            pendientesUl.appendChild(li);
        } else if (tarea.estado === 'haciendo') {
            const botonMoverPendiente = document.createElement('button');
            botonMoverPendiente.textContent = '← Pendiente';
            botonMoverPendiente.onclick = () => moverTarea(index, 'pendiente');

            const botonMoverCompletada = document.createElement('button');
            botonMoverCompletada.textContent = '→ Completada';
            botonMoverCompletada.onclick = () => moverTarea(index, 'completada');

            botonContainer.appendChild(botonMoverPendiente);
            botonContainer.appendChild(botonMoverCompletada);
            haciendoUl.appendChild(li);
        } else if (tarea.estado === 'completada') {
            completadasUl.appendChild(li);
        }

        li.appendChild(botonContainer);
    });
}

function moverTarea(index, nuevoEstado) {
    tareas[index].estado = nuevoEstado;
    renderTareas();
}

function mostrarAviso() {
    mensajeAviso.style.display = 'block';
}

botonCerrarAviso.onclick = function () {
    mensajeAviso.style.display = 'none';
}

botonAgregarTarea.addEventListener('click', agregarTarea);