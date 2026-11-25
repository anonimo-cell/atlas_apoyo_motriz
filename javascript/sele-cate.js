// ==========================================
// CARGA INICIAL: RESETEO TOTAL AL RECARGAR
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // Borramos todo de memoria (tanto bajo coste como comercializado)
    localStorage.removeItem('categoriaGuardadaNombre');
    localStorage.removeItem('subcategoriaGuardada');
    localStorage.removeItem('categoriaGuardadaNombre-com');
    localStorage.removeItem('subcategoriaGuardada-com');

    // Reseteamos Bajo Coste
    resetearFormularioDOM('');
    // Reseteamos Comercializado
    resetearFormularioDOM('-com');
});

function resetearFormularioDOM(sufijo) {
    const btnN1 = document.getElementById(`valor-n1${sufijo}`);
    const btnN2 = document.getElementById(`valor-n2${sufijo}`);
    const imgN1 = document.getElementById(`icono-elegido-n1${sufijo}`);
    const imgN2 = document.getElementById(`icono-elegido-n2${sufijo}`);

    if (btnN1) btnN1.innerText = "No seleccionada";
    if (btnN2) btnN2.innerText = "No seleccionada";
    
    if (imgN1) { imgN1.src = ""; imgN1.style.display = "none"; }
    if (imgN2) { imgN2.src = ""; imgN2.style.display = "none"; }
}

// ==========================================
// FUNCIONES DE APERTURA Y CIERRE (CON SUFIJO)
// ==========================================
function abrirModalCate1(sufijo = '') {
    // Guardamos temporalmente en qué formulario estamos trabajando mediante un atributo global o dataset
    window.formularioActivoActual = sufijo;
    mostrarAvisoCategoria(sufijo, '');
    abrirModal('modal-categorias1');
}

function mostrarAvisoCategoria(sufijo, mensaje) {
    const aviso = document.getElementById(`aviso-categoria${sufijo}`);
    if (!aviso) return;

    aviso.textContent = mensaje;
    aviso.hidden = !mensaje;
}

function abrirModalNivel2(sufijo = window.formularioActivoActual || '') {
    window.formularioActivoActual = sufijo;
    const cat1 = localStorage.getItem(`categoriaGuardadaNombre${sufijo}`);

    if (!cat1 || cat1 === "No seleccionada") {
        mostrarAvisoCategoria(sufijo, 'Selecciona primero una categoría.');
        return;
    }

    mostrarAvisoCategoria(sufijo, '');

    const mapa = {
        "Autonomía y cuidado": "modal-autonomia",
        "Ocio": "modal-ocio",
        "Movilidad y orientación": "modal-movilidad",
        "Comunicación": "modal-comunica",
        "Tareas cotidianas": "modal-productividad"
    };

    const idModal = mapa[cat1.trim()];

    if (idModal) {
        abrirModal(idModal);
    }
}

// ==========================================
// LÓGICA DE SELECCIÓN Y CASCADA
// ==========================================

// ==========================================
// LÓGICA DE SELECCIÓN: CATEGORÍA NIVEL 1
// ==========================================
// ==========================================
// LÓGICA DE SELECCIÓN: CATEGORÍA NIVEL 1
// ==========================================
function seleccionarCatenivel1(boton) {
    const sufijo = window.formularioActivoActual || '';
    mostrarAvisoCategoria(sufijo, '');
    const nuevoTexto = boton.querySelector('.btn-cate-txt').innerText.trim();
    const textoAnterior = localStorage.getItem(`categoriaGuardadaNombre${sufijo}`);

    // Si la categoría cambia, borramos el Nivel 2 del formulario correspondiente
    if (nuevoTexto !== textoAnterior) {
        localStorage.removeItem(`subcategoriaGuardada${sufijo}`);

        // Limpiamos textos
        const btnN2 = document.getElementById(`valor-n2${sufijo}`);
        if (btnN2) btnN2.innerText = "No seleccionada";

        // Limpiamos imágenes
        const imgN2 = document.getElementById(`icono-elegido-n2${sufijo}`);
        if (imgN2) { imgN2.src = ""; imgN2.style.display = "none"; }
    }

    // Guardamos y actualizamos Nivel 1
    localStorage.setItem(`categoriaGuardadaNombre${sufijo}`, nuevoTexto);
    const btnN1 = document.getElementById(`valor-n1${sufijo}`);
    if (btnN1) btnN1.innerText = nuevoTexto;

    // MAGIA DE LA IMAGEN (Nivel 1)
    const imgElement = boton.querySelector('img');
    const iconSrc = imgElement ? imgElement.getAttribute('src') : null;
    const imgDestino = document.getElementById(`icono-elegido-n1${sufijo}`);

    if (imgDestino) {
        if (iconSrc) {
            imgDestino.src = iconSrc;
            imgDestino.style.display = 'block';
        } else {
            imgDestino.src = '';
            imgDestino.style.display = 'none';
        }
    }

    // --- MAGIA: SI EL NIVEL 1 ES "OTROS", AUTOCOMPLETAR NIVEL 2 ---
    if (nuevoTexto.toLowerCase() === 'otros') {
        
        // Forzar Nivel 2 a "Otros"
        localStorage.setItem(`subcategoriaGuardada${sufijo}`, 'Otros');
        const btnN2 = document.getElementById(`valor-n2${sufijo}`);
        if (btnN2) btnN2.innerText = 'Otros';
        
        const imgDestinoN2 = document.getElementById(`icono-elegido-n2${sufijo}`);
        if (imgDestinoN2) {
            if (iconSrc) {
                imgDestinoN2.src = iconSrc;
                imgDestinoN2.style.display = 'block';
            } else {
                imgDestinoN2.src = '';
                imgDestinoN2.style.display = 'none';
            }
        }
    }

    cerrarModal('modal-categorias1');
}

// ==========================================
// LÓGICA DE SELECCIÓN: CATEGORÍA NIVEL 2
// ==========================================
function seleccionarCategoria2(boton) {
    const sufijo = window.formularioActivoActual || '';
    mostrarAvisoCategoria(sufijo, '');
    const nuevoTexto = boton.querySelector('.btn-cate-txt').innerText.trim();

    // Guardamos y actualizamos Nivel 2
    localStorage.setItem(`subcategoriaGuardada${sufijo}`, nuevoTexto);
    const btnN2 = document.getElementById(`valor-n2${sufijo}`);
    if (btnN2) btnN2.innerText = nuevoTexto;

    // MAGIA DE LA IMAGEN (Nivel 2)
    const imgElement = boton.querySelector('img');
    const iconSrc = imgElement ? imgElement.getAttribute('src') : null;
    const imgDestinoN2 = document.getElementById(`icono-elegido-n2${sufijo}`);

    if (imgDestinoN2) {
        if (iconSrc) {
            imgDestinoN2.src = iconSrc;
            imgDestinoN2.style.display = 'block';
        } else {
            imgDestinoN2.src = '';
            imgDestinoN2.style.display = 'none';
        }
    }

    cerrarModal(boton);
}
