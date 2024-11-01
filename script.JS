const categorias = [
    {
        id: 1,
        nombre: "Razones por las que te amo",
        icono: "❤️",
        color: "#FF69B4",
        testamentos: [
            "Te amo por tu dulzura infinita",
            "Te amo por tu forma de hacerme sonreír",
            "Te amo por cómo iluminas mis días"
        ]
    },
    {
        id: 2,
        nombre: "Momentos especiales",
        icono: "✨",
        color: "#9370DB",
        testamentos: [
            "Nuestro primer beso fue mágico",
            "Cada abrazo tuyo es especial",
            "Me encanta cuando me sorprendes"
        ]
    },
    {
        id: 3,
        nombre: "Sueños juntos",
        icono: "🌟",
        color: "#20B2AA",
        testamentos: [
            "Sueño con envejecer a tu lado",
            "Quiero viajar por el mundo contigo",
            "Imagino nuestro futuro juntos"
        ]
    },
    {
        id: 4,
        nombre: "Detalles que amo de ti",
        icono: "💝",
        color: "#FF1493",
        testamentos: [
            "Amo cómo arruga tu nariz cuando sonríes",
            "Amo tus ojitos cuando estás feliz",
            "Amo cada detalle que te hace única"
        ]
    },
    {
        id: 5,
        nombre: "Promesas de amor",
        icono: "🤍",
        color: "#4169E1",
        testamentos: [
            "Prometo amarte cada día más",
            "Prometo ser tu apoyo incondicional",
            "Prometo hacerte feliz siempre"
        ]
    },
    {
        id: 6,
        nombre: "Cambios de Aurora",
        icono: "👩🏽",
        color: "#4B0082",
        testamentos: [
            "Recuerdo nuestra primera cita",
            "Recuerdo nuestras risas juntos",
            "Recuerdo cada momento especial"
        ]
    },
    {
        id: 7,
        nombre: "Pensamientos de amor",
        icono: "💭",
        color: "#FFB6C1",
        testamentos: [
            "Pienso en ti cada momento del día",
            "Eres el primer pensamiento al despertar",
            "Mis pensamientos siempre te pertenecen"
        ]
    },
    {
        id: 8,
        nombre: "Secretos de Amor",
        icono: "🔐",
        color: "#FF1493",
        testamentos: [
            "Guardo cada nota que me escribes",
            "Sonrío cada vez que pienso en ti",
            "Me encanta verte dormir"
        ]
    },
    {
        id: 9,
        nombre: "Nuestras Aventuras",
        icono: "🌟",
        color: "#4B0082",
        testamentos: [
            "Nuestro primer viaje juntos",
            "Esa vez que nos perdimos",
            "Nuestra aventura bajo la lluvia"
        ]
    },
    {
        id: 10,
        nombre: "Momentos Graciosos",
        icono: "😊",
        color: "#FF69B4",
        testamentos: [
            "Cuando te caíste y no podías parar de reír",
            "Tus chistes malos que me hacen reír",
            "Nuestras fotos haciendo caras chistosas"
        ]
    },
    {
        id: 11,
        nombre: "Deseos Futuros",
        icono: "✨",
        color: "#9400D3",
        testamentos: [
            "Quiero despertar cada día a tu lado",
            "Sueño con crear miles de recuerdos juntos",
            "Imagino una vida llena de aventuras contigo"
        ]
    },
    {
        id: 12,
        nombre: "Mis Favoritos",
        icono: "⭐",
        color: "#FFD700",
        testamentos: []
    }
];

// Al inicio del archivo, agregar las variables globales necesarias
let paginaActual = 1;
const categoriasPorPagina = 4;
let indiceTestamento = 0;
let testamentos = [];
let categoriaIndex = 0;
let favoritos = [];
let reacciones = JSON.parse(localStorage.getItem('reaccionesTestamentos')) || {};

// Variables para controlar la dirección
let paginaAnterior = 1;

// Agregar al inicio del archivo, después de las variables
const coloresError = ['#ff69b4', '#ff1493', '#ff0000', '#9370DB', '#4169E1', '#20B2AA'];
let intentos = 0;

let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Función para toggle del tema
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Cambiar el icono del botón
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
}

function mostrarErrorNombre() {
    const mensajeError = document.getElementById('error-nombre');
    const tamanoBase = 16; // Tamaño base en pxeles
    
    // Aumentar el tamaño con cada intento (máximo 24px)
    const nuevoTamano = Math.min(tamanoBase + (intentos * 2), 24);
    
    // Cambiar color y tamaño
    mensajeError.style.fontSize = `${nuevoTamano}px`;
    mensajeError.style.color = coloresError[intentos % coloresError.length];
    mensajeError.style.display = 'block';
    
    // Agregar animación de shake
    mensajeError.style.animation = 'shake 0.5s ease-in-out';
    
    intentos++;
    
    // Quitar la animación después de que termine
    setTimeout(() => {
        mensajeError.style.animation = '';
    }, 500);
}

// Asegurarnos de que el loader se inicie cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar el loader primero
    startLoader();
    
    // Cargar favoritos guardados
    const favoritosGuardados = localStorage.getItem('testamentosFavoritos');
    if (favoritosGuardados) {
        favoritos = JSON.parse(favoritosGuardados);
        const categoriaFavoritos = categorias.find(c => c.nombre === "Mis Favoritos");
        if (categoriaFavoritos) {
            const favoritosActualizados = favoritos.map(f => {
                const categoriaOriginal = categorias.find(c => c.nombre === f.categoria);
                if (categoriaOriginal && categoriaOriginal.testamentos[f.index]) {
                    return {
                        texto: categoriaOriginal.testamentos[f.index],
                        info: `${categoriaOriginal.nombre} - ${f.index + 1}`
                    };
                }
                return null;
            }).filter(f => f !== null);
            
            categoriaFavoritos.testamentos = favoritosActualizados.map(f => f.texto);
            categoriaFavoritos.infoCategorias = favoritosActualizados.map(f => f.info);
        }
    }
    
    // Configurar tema inicial
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-icon').textContent = '☀️';
    }
    
    // Agregar evento al botón
    document.getElementById('toggleTheme').addEventListener('click', toggleTheme);
    
    // Configurar el evento del botón comenzar
    document.getElementById('btn-comenzar').addEventListener('click', function() {
        const nombreInput = document.getElementById('nombre');
        const nombreIngresado = nombreInput.value.toLowerCase().trim();
        const nombresPermitidos = ["auro", "aurora", "aurori"];
        
        // Ocultar todos los mensajes de error primero
        document.getElementById('error-mensaje').style.display = 'none';
        document.getElementById('error-nombre').style.display = 'none';
        document.getElementById('mensaje-easter-egg').style.display = 'none';

        // Validar el nombre
        if (!nombreIngresado) {
            document.getElementById('error-mensaje').style.display = 'block';
            return;
        }

        // Verificar si es un nombre permitido
        if (nombresPermitidos.includes(nombreIngresado)) {
            document.getElementById('nombre-usuario').textContent = 
                nombreIngresado.charAt(0).toUpperCase() + nombreIngresado.slice(1);
            mostrarMenu('menu-categorias');
            mostrarCategorias();
        } else if (nombreIngresado === 'dulce') {
            document.getElementById('mensaje-easter-egg').style.display = 'block';
        } else {
            document.getElementById('error-nombre').style.display = 'block';
        }
    });

    // También permitir enviar con Enter
    document.getElementById('nombre').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('btn-comenzar').click();
        }
    });

    createFloatingHearts();

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('SW registrado correctamente:', registration);
                })
                .catch(error => {
                    console.log('Error al registrar SW:', error);
                });
        });
    }
});

// Función del loader ajustada para mostrar textos cada 31%
function startLoader() {
    const progreso = document.getElementById('progreso');
    const porcentajeTexto = document.getElementById('porcentaje');
    const textos = [
        document.getElementById('texto1'),
        document.getElementById('texto2'),
        document.getElementById('texto3'),
        document.getElementById('texto4')
    ];
    let porcentaje = 0;
    let textoActual = 0;

    function mostrarTextoAleatorio() {
        textos.forEach(texto => texto.style.opacity = "0");
        textos[textoActual].style.opacity = "1";
        textoActual = (textoActual + 1) % textos.length;
    }

    const intervalo = setInterval(() => {
        if (porcentaje >= 100) {
            clearInterval(intervalo);
            setTimeout(() => {  // Agregar delay extra al final
                document.getElementById('loader-container').style.display = 'none';
                document.getElementById('menu-nombres').style.display = 'block';
            }, 1000);
        } else {
            porcentaje += 0.5;
            progreso.style.width = porcentaje + '%';
            porcentajeTexto.textContent = Math.round(porcentaje) + '%';
            
            if (porcentaje % 31 === 0) {
                mostrarTextoAleatorio();
            }
        }
    }, 50);  // Mantener la velocidad pero agregar delay al final

    mostrarTextoAleatorio();
}

function mostrarTestamentoPorCategoria(index) {
    categoriaIndex = index;
    const categoria = categorias[index];
    testamentos = categoria.testamentos;
    indiceTestamento = 0;
    
    // Actualizar título de la categoría
    document.getElementById('categoria-titulo').textContent = categoria.nombre;
    
    // Actualizar color de fondo del testamento según la categoría
    const testamentoContainer = document.getElementById('testamento-container');
    testamentoContainer.style.backgroundColor = categoria.color;
    
    // Mostrar el menú de testamentos
    mostrarMenu('menu-testamentos');
    
    // Mostrar el primer testamento con carga
    mostrarTestamento();
}

// Función para mostrar categorías
function mostrarCategorias() {
    const contenedorCategorias = document.getElementById('categoria-container');
    const direccion = paginaActual > paginaAnterior ? 'left' : 'right';
    
    // Efecto de salida
    contenedorCategorias.style.opacity = '0';
    
    setTimeout(() => {
        const inicio = (paginaActual - 1) * categoriasPorPagina;
        const fin = inicio + categoriasPorPagina;
        
        // Limpiar el contenedor
        contenedorCategorias.innerHTML = '';
        
        // Mostrar las categorías
        for (let i = inicio; i < fin && i < categorias.length; i++) {
            const categoria = categorias[i];
            const categoriaDiv = document.createElement('div');
            categoriaDiv.className = 'categoria-item fade-in';
            categoriaDiv.style.backgroundColor = categoria.color;
            categoriaDiv.innerHTML = `
                <div class="categoria-icono">${categoria.icono}</div>
                <div class="categoria-nombre">${categoria.nombre}</div>
            `;
            categoriaDiv.onclick = () => mostrarTestamentoPorCategoria(i);
            contenedorCategorias.appendChild(categoriaDiv);
        }

        // Aplicar animación según dirección
        contenedorCategorias.style.opacity = '1';
        contenedorCategorias.className = `slide-${direccion}`;
        
        // Actualizar el número de página
        actualizarNumeroPagina();
        
    }, 300);
}

// Función para actualizar el número de página
function actualizarNumeroPagina() {
    const totalPaginas = Math.ceil(categorias.length / categoriasPorPagina);
    const numeroPagina = document.getElementById('numero-pagina');
    numeroPagina.textContent = `${paginaActual}/${totalPaginas}`;
}

// Funciones de navegación de categorías
function anteriorCategoria() {
    if (paginaActual > 1) {
        paginaAnterior = paginaActual;
        paginaActual--;
        mostrarCategorias();
    }
}

function siguienteCategoria() {
    const totalPaginas = Math.ceil(categorias.length / categoriasPorPagina);
    if (paginaActual < totalPaginas) {
        paginaAnterior = paginaActual;
        paginaActual++;
        mostrarCategorias();
    }
}

// Función para mostrar/ocultar menús
function mostrarMenu(menuId) {
    document.getElementById('menu-nombres').style.display = 'none';
    document.getElementById('menu-categorias').style.display = 'none';
    document.getElementById('menu-testamentos').style.display = 'none';
    document.getElementById(menuId).style.display = 'block';
}

// Modificar la función mostrarTestamento para incluir los bordes
function mostrarTestamento() {
    const contenido = document.getElementById('contenido-testamento');
    const categoriaInfo = document.getElementById('categoria-info');
    const numeroPagina = document.getElementById('numero-pagina-testamento');
    const favoritoBtn = document.querySelector('.favorito-btn');
    
    // Ocultar elementos durante la carga
    categoriaInfo.style.display = 'none';
    numeroPagina.style.visibility = 'hidden';
    favoritoBtn.style.visibility = 'hidden';
    
    // Eliminar reacciones anteriores si existen
    const reaccionesAnteriores = document.querySelector('.reacciones-container');
    if (reaccionesAnteriores) {
        reaccionesAnteriores.remove();
    }
    
    // Mostrar "Cargando" con la clase para la animación
    contenido.textContent = "Cargando";
    contenido.className = 'loading';
    
    setTimeout(() => {
        // Mostrar el testamento
        contenido.textContent = testamentos[indiceTestamento];
        contenido.className = '';
        
        // Actualizar y mostrar número de página
        numeroPagina.textContent = `${indiceTestamento + 1}/${testamentos.length}`;
        numeroPagina.style.visibility = 'visible';
        
        // Mostrar botón de favoritos
        favoritoBtn.style.visibility = 'visible';
        
        // Verificar si es favorito
        const categoriaActual = categorias[categoriaIndex].nombre;
        const esFavorito = favoritos.some(f => 
            f.categoria === categoriaActual && 
            f.index === indiceTestamento
        );
        favoritoBtn.classList.toggle('activo', esFavorito);
        
        // Mostrar info de categoría si estamos en favoritos
        if (categoriaActual === "Mis Favoritos") {
            categoriaInfo.textContent = categorias[categoriaIndex].infoCategorias[indiceTestamento];
            categoriaInfo.style.display = 'block';
        } else {
            // Solo agregar reacciones si NO estamos en favoritos
            agregarReacciones();
        }
    }, 2000);
}

// Agregar funciones de navegación de testamentos
function anteriorTestamento() {
    if (indiceTestamento > 0) {
        indiceTestamento--;
        mostrarTestamento();
    }
}

function siguienteTestamento() {
    if (indiceTestamento < testamentos.length - 1) {
        indiceTestamento++;
        mostrarTestamento();
    }
}

// Función para volver al menú de categorías
function volverMenu() {
    mostrarMenu('menu-categorias');
}

// Función mejorada para toggle favorito
function toggleFavorito() {
    const favoritoBtn = document.querySelector('.favorito-btn');
    let esFavorito = false;

    if (categorias[categoriaIndex].nombre === "Mis Favoritos") {
        // Eliminar de favoritos
        favoritos.splice(indiceTestamento, 1);
        favoritoBtn.classList.remove('activo');
        
        // Actualizar los testamentos
        obtenerTestamentosFavoritos();
        
        if (favoritos.length === 0) {
            const contenido = document.getElementById('contenido-testamento');
            contenido.textContent = "Aún no tienes testamentos favoritos. ¡Marca algunos con la ⭐!";
            document.querySelector('.navegacion-testamentos').style.display = 'none';
            document.getElementById('categoria-info').style.display = 'none';
        } else {
            if (indiceTestamento >= favoritos.length) {
                indiceTestamento = favoritos.length - 1;
            }
            mostrarTestamento();
        }
    } else {
        const categoriaActual = categorias[categoriaIndex].nombre;
        esFavorito = favoritos.some(f => 
            f.categoria === categoriaActual && 
            f.index === indiceTestamento
        );
        
        if (esFavorito) {
            // Remover de favoritos
            const index = favoritos.findIndex(f => 
                f.categoria === categoriaActual && 
                f.index === indiceTestamento
            );
            favoritos.splice(index, 1);
            favoritoBtn.classList.remove('activo');
        } else {
            // Agregar a favoritos
            favoritos.push({
                categoria: categoriaActual,
                index: indiceTestamento
            });
            favoritoBtn.classList.add('activo');
        }
    }
    
    localStorage.setItem('testamentosFavoritos', JSON.stringify(favoritos));
    obtenerTestamentosFavoritos();
}

// Agregar función para obtener los testamentos favoritos
function obtenerTestamentosFavoritos() {
    const favoritosGuardados = favoritos.map(f => {
        const categoria = categorias.find(c => c.nombre === f.categoria);
        if (categoria && categoria.nombre !== "Mis Favoritos") {
            return {
                texto: categoria.testamentos[f.index],
                info: `${categoria.nombre} - ${f.index + 1}`
            };
        }
        return null;
    }).filter(t => t !== null);
    
    const categoriaFavoritos = categorias.find(c => c.nombre === "Mis Favoritos");
    if (categoriaFavoritos) {
        categoriaFavoritos.testamentos = favoritosGuardados.map(f => f.texto);
        categoriaFavoritos.infoCategorias = favoritosGuardados.map(f => f.info);
    }
}

// Función para agregar las reacciones al testamento
function agregarReacciones() {
    const reaccionesDiv = document.createElement('div');
    reaccionesDiv.className = 'reacciones-container';
    
    const testamentoId = `${categorias[categoriaIndex].nombre}-${indiceTestamento}`;
    const reaccionesGuardadas = reacciones[testamentoId] || {};
    
    const reaccionesEmojis = [
        { emoji: '💚', nombre: 'amor' },
        { emoji: '😭', nombre: 'triste' },
        { emoji: '🤔', nombre: 'pensativo' },
        { emoji: '🥺', nombre: 'tierno' }
    ];
    
    reaccionesEmojis.forEach(({emoji, nombre}) => {
        const btn = document.createElement('div');
        btn.className = 'reaccion-btn';
        btn.innerHTML = emoji;
        
        // Verificar si esta reacción específica está activa
        if (reaccionesGuardadas[nombre]) {
            btn.classList.add('activo');
            // Agregar el contador si hay una reacción guardada
            let contador = document.createElement('span');
            contador.className = 'contador-reaccion';
            contador.textContent = '1';
            btn.appendChild(contador);
        }
        
        btn.onclick = () => {
            // Desactivar todas las demás reacciones y sus contadores
            reaccionesDiv.querySelectorAll('.reaccion-btn').forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.classList.remove('activo');
                    const contador = otherBtn.querySelector('.contador-reaccion');
                    if (contador) {
                        contador.remove();
                    }
                }
            });
            
            toggleReaccion(nombre, testamentoId, btn);
        };
        
        reaccionesDiv.appendChild(btn);
    });
    
    document.getElementById('testamento-container').appendChild(reaccionesDiv);
}

// Función para toggle de reacción
function toggleReaccion(nombre, testamentoId, btn) {
    if (!reacciones[testamentoId]) {
        reacciones[testamentoId] = {};
    }
    
    // Limpiar otras reacciones para este testamento
    Object.keys(reacciones[testamentoId]).forEach(key => {
        delete reacciones[testamentoId][key];
    });
    
    if (!reacciones[testamentoId][nombre]) {
        reacciones[testamentoId][nombre] = 1;
        btn.classList.add('activo');
        
        // Agregar el contador
        let contador = document.createElement('span');
        contador.className = 'contador-reaccion';
        contador.textContent = '1';
        btn.appendChild(contador);
    } else {
        delete reacciones[testamentoId][nombre];
        btn.classList.remove('activo');
        
        // Remover el contador si existe
        const contador = btn.querySelector('.contador-reaccion');
        if (contador) {
            contador.remove();
        }
    }
    
    localStorage.setItem('reaccionesTestamentos', JSON.stringify(reacciones));
}

// Agregar al inicio del archivo o donde están los event listeners
document.addEventListener('keydown', function(e) {
    // Solo si estamos en el menú de categorías o testamentos
    const menuCategorias = document.getElementById('menu-categorias');
    const menuTestamentos = document.getElementById('menu-testamentos');
    
    if (menuCategorias.style.display === 'block') {
        // Navegación en el menú de categorías
        switch(e.key) {
            case 'ArrowLeft':
                anteriorCategoria();
                break;
            case 'ArrowRight':
                siguienteCategoria();
                break;
            case 'Enter':
                // Seleccionar la categoría actual
                const categorias = document.querySelectorAll('.categoria-item');
                const categoriaActual = categorias[(paginaActual - 1) * categoriasPorPagina];
                if (categoriaActual) {
                    categoriaActual.click();
                }
                break;
        }
    }
    
    if (menuTestamentos.style.display === 'block') {
        // Navegación en los testamentos
        switch(e.key) {
            case 'ArrowLeft':
                anteriorTestamento();
                break;
            case 'ArrowRight':
                siguienteTestamento();
                break;
            case 'Escape':
                volverMenu();
                break;
            case ' ': // Tecla espaciadora
            case 'f':
            case 'F':
                toggleFavorito();
                break;
        }
    }
});

// Función para crear corazones flotantes
function createFloatingHearts() {
    const container = document.createElement('div');
    container.className = 'floating-hearts';
    document.body.appendChild(container);

    // Aumentar corazones iniciales de 8 a 15
    for (let i = 0; i < 15; i++) {
        createHeart(container);
    }

    // Reducir el intervalo de 800ms a 600ms y aumentar límite máximo
    setInterval(() => {
        // Verificar la cantidad actual de corazones
        const heartCount = container.children.length;
        // Aumentar el límite de 12 a 20 corazones en pantalla
        if (heartCount < 25) {
            createHeart(container);
        }
    }, 600);
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💗';
    heart.style.left = Math.random() * 100 + 'vw';
    // Mantener la duración de animación entre 4 y 8 segundos
    heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
    container.appendChild(heart);
    
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// Verificar conexión
window.addEventListener('online', function() {
    console.log('Conexión restaurada');
    // Sincronizar datos
});

window.addEventListener('offline', function() {
    console.log('Sin conexión');
    // Mostrar mensaje al usuario
});

if ('Notification' in window) {
    Notification.requestPermission()
        .then(permission => {
            if (permission === 'granted') {
                // Configurar notificaciones
            }
        });
}

// Reemplazar el código actual de notificaciones por este:
function solicitarPermisoNotificaciones() {
    // Solo intentar si las notificaciones están disponibles
    if ('Notification' in window) {
        // Verificar si ya están bloqueadas
        if (Notification.permission === 'denied') {
            console.log('Las notificaciones fueron bloqueadas por el usuario');
            return;
        }
        
        // Verificar si ya están concedidas
        if (Notification.permission === 'granted') {
            console.log('Permisos de notificación ya concedidos');
            return;
        }
        
        // Mostrar un botón o mensaje al usuario antes de solicitar el permiso
        const btnNotificaciones = document.createElement('button');
        btnNotificaciones.textContent = '¿Deseas recibir notificaciones?';
        btnNotificaciones.className = 'notificaciones-btn';
        btnNotificaciones.onclick = () => {
            Notification.requestPermission()
                .then(permission => {
                    if (permission === 'granted') {
                        console.log('Permisos de notificación concedidos');
                        btnNotificaciones.remove();
                    }
                });
        };
        
        // Agregar el botón en algún lugar apropiado de tu UI
        document.getElementById('menu-nombres').appendChild(btnNotificaciones);
    }
}

// Llamar a la función cuando sea apropiado
document.addEventListener('DOMContentLoaded', () => {
    // ... resto de tu código existente ...
    
    // Solicitar notificaciones solo después de que el usuario interactúe
    document.getElementById('btn-comenzar').addEventListener('click', () => {
        // ... tu código existente ...
        solicitarPermisoNotificaciones();
    });
});

// Agregar al inicio del archivo
let currentOrientation = localStorage.getItem('orientation') || 'portrait';

function toggleOrientation() {
    try {
        const orientationBtn = document.getElementById('toggleOrientation');
        const orientationIcon = orientationBtn.querySelector('.orientation-icon');
        
        currentOrientation = currentOrientation === 'portrait' ? 'landscape' : 'portrait';
        
        // Guardar preferencia
        localStorage.setItem('orientation', currentOrientation);
        
        // Actualizar UI
        document.body.style.orientation = currentOrientation;
        orientationBtn.classList.toggle('landscape');
        
        // Actualizar manifest dinámicamente
        const manifestLink = document.querySelector('link[rel="manifest"]');
        const manifestData = {
            // ... resto del manifest ...
            orientation: currentOrientation
        };
        
        const blob = new Blob([JSON.stringify(manifestData)], {type: 'application/json'});
        const manifestURL = URL.createObjectURL(blob);
        manifestLink.href = manifestURL;
    } catch (error) {
        console.error('Error al cambiar orientación:', error);
    }
}

// Agregar al DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... código existente ...
    
    // Configurar orientación inicial
    const orientationBtn = document.getElementById('toggleOrientation');
    if (currentOrientation === 'landscape') {
        orientationBtn.classList.add('landscape');
    }
    
    orientationBtn.addEventListener('click', toggleOrientation);
});
