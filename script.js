// 1. SELECCIÓN DE ELEMENTOS DEL DOM
// Usamos const porque la referencia al elemento en el DOM no va a cambiar.
// document.querySelector busca el primer elemento que coincida con el selector CSS.
const themeToggleButton = document.querySelector('#theme-toggle');
const greetingElement = document.querySelector('#dynamic-greeting');
const bodyElement = document.querySelector('body');

// 2. FUNCIONALIDAD DE MODO OSCURO / CLARO
// Añadimos un "escucha" al evento 'click' del botón
themeToggleButton.addEventListener('click', () => {
    // TU CÓDIGO AQUÍ:
    // 1. Usa bodyElement.classList.toggle('dark-mode') para añadir o quitar la clase.
    bodyElement.classList.toggle('dark-mode');
    // 2. Cambia el emoji del botón: si el body tiene la clase 'dark-mode', pon '☀️', si no, pon '🌙'.
    
    if (bodyElement.classList.contains('dark-mode')) {
        themeToggleButton.textContent = '☀️';
    } else {
        themeToggleButton.textContent = '🌙';
    }
    // Pista: puedes usar bodyElement.classList.contains('dark-mode') para comprobarlo.
    
});

// 3. SALUDO DINÁMICO SEGÚN LA HORA
// Creamos una función que se ejecuta al cargar la página
const setDynamicGreeting = () => {
    // TU CÓDIGO AQUÍ:
    // 1. Crea una variable con la hora actual: const hour = new Date().getHours();
    const hour = new Date().getHours();
    // 2. Usa un if/else if/else para determinar el saludo:
    //    - Si hour < 12: "¡Buenos días! ☀️"
    if (hour < 12) {
        greetingElement.textContent = '¡Buenos días! ☀️';
    }
    else if (hour >= 12 && hour < 20) {
        greetingElement.textContent = '¡Buenas tardes! 🌤️';
    }
    else {
        greetingElement.textContent = '¡Buenas noches! 🌙';
    }
    //    - Si hour >= 12 y hour < 20: "¡Buenas tardes! 🌤️"
    //    - Si hour >= 12 y hour < 19: "¡Buenas tardes! 🌤️"
    //    - Si no: "¡Buenas noches! 🌙"
    // 3. Asigna ese texto a greetingElement.textContent
    
};

// Ejecutamos la función del saludo inmediatamente
setDynamicGreeting();

// ==========================================
// HITO 2: RENDERIZADO DINÁMICO DE PROYECTOS
// array
// nombrearray.map
// ==========================================

// 1. Nuestra "base de datos" local: un Array de Objetos
const proyectos = [
    {
        titulo: "Portafolio Profesional",
        descripcion: "Mi sitio web personal construido con HTML, CSS y JavaScript Vanilla, aplicando buenas prácticas del DOM.",
        imagen: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=60",
        enlace: "#"
    },
    {
        titulo: "Calculadora de Gastos",
        descripcion: "Aplicación web para trackear gastos mensuales con gráficos dinámicos y almacenamiento local.",
        imagen: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=500&q=60",
        enlace: "#"
    },
    {
        titulo: "Buscador de Películas",
        descripcion: "App que consume una API externa (como TMDB) para mostrar información, pósters y valoraciones en tiempo real.",
        imagen: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=60",
        enlace: "#"
    },
    {
        titulo: "Buscador de Películas",
        descripcion: "App que consume una API externa (como TMDB) para mostrar información, pósters y valoraciones en tiempo real.",
        imagen: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=60",
        enlace: "#"
    }
];

// 2. Seleccionamos el contenedor vacío del HTML
const projectsContainer = document.querySelector('#projects-container');

// 3. Función que transforma los datos en HTML
const renderProyectos = () => {
    // .map() recorre el array 'proyectos'. 
    // Por cada 'proyecto', devuelve un string (texto) con su estructura HTML.
    // ¡Fíjate en las comillas invertidas ` y en cómo usamos ${} para inyectar las variables!
    const proyectosHTML = proyectos.map(proyecto => {
        return `
            <article class="project-card">
                <img src="${proyecto.imagen}" alt="Imagen del proyecto ${proyecto.titulo}">
                <div class="project-card-content">
                    <h4>${proyecto.titulo}</h4>
                    <p>${proyecto.descripcion}</p>
                    <a href="${proyecto.enlace}" target="_blank">Ver Proyecto</a>
                </div>
            </article>
        `;
    });

    // .map() nos devuelve un array de strings: ["<article>...</article>", "<article>...</article>", ...]
    // .join('') une todos esos strings en un solo bloque de texto gigante, sin separadores.
    const htmlFinal = proyectosHTML.join('');

    // Inyectamos ese bloque gigante de HTML dentro del contenedor del DOM.
    projectsContainer.innerHTML = htmlFinal;
};

// 4. Ejecutamos la función para que se "pinten" los proyectos al cargar la página
renderProyectos();



// ==========================================
// HITO 3: FORMULARIO Y VALIDACIÓN EN TIEMPO REAL
// submit captura el envio del formulario con el click y con el enter
// event.preventDefault() evita que se recargue la pagina 
// Para verificar la info en tiempo real, se escucha el "input" (Cuando escribe) y el "blur" (caundo sale del campo)
// ==========================================

const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const successMessage = document.querySelector('#success-message');

// Función auxiliar para mostrar error
const showError = (input, message) => {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error-message');
    
    errorDisplay.innerText = message;
    input.classList.add('error');
    input.classList.remove('success');
};

// Función auxiliar para mostrar éxito en un campo
const showSuccess = (input) => {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error-message');
    
    errorDisplay.innerText = '';
    input.classList.remove('error');
    input.classList.add('success');
};

// Validación de Email con Expresión Regular (Regex) básica pero efectiva
const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// 1. Validación en tiempo real (cuando el usuario escribe o sale del campo)
const checkInputs = () => {
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    // Validar Nombre
    if (nameValue === '') {
        showError(nameInput, 'El nombre no puede estar vacío');
    } else {
        showSuccess(nameInput);
    }

    // Validar Email
    if (emailValue === '') {
        showError(emailInput, 'El correo es obligatorio');
    } else if (!isValidEmail(emailValue)) {
        showError(emailInput, 'Introduce un correo válido (ej: tu@email.com)');
    } else {
        showSuccess(emailInput);
    }

    // Validar Mensaje
    if (messageValue === '') {
        showError(messageInput, 'El mensaje no puede estar vacío');
    } else {
        showSuccess(messageInput);
    }
};

// Escuchamos el evento 'input' para validar mientras el usuario escribe
nameInput.addEventListener('input', checkInputs);
emailInput.addEventListener('input', checkInputs);
messageInput.addEventListener('input', checkInputs);

// 2. Manejo del envío del formulario
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    checkInputs();

    const hasErrors = document.querySelectorAll('.error').length > 0;

    if (!hasErrors) {
        // Deshabilitar el botón mientras se envía
        const submitBtn = document.querySelector('#submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // Hacer petición al backend
            const response = await fetch('http://localhost:8000/enviar-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: messageInput.value.trim()
                })
            });

            if (!response.ok) {
                throw new Error('Error al enviar el mensaje');
            }

            // Éxito
            successMessage.style.display = 'block';
            contactForm.reset();
            document.querySelectorAll('.success').forEach(input => {
                input.classList.remove('success');
            });

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, intenta más tarde.');
        } finally {
            // Rehabilitar el botón
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensaje';
        }
    }
});


// ==========================================
// HITO 4: CONSUMO DE API DE GITHUB
// async/await para manejar codigo asincrono
// try/catch para manejar errores
// fetch() para consumir una api real
// .sort() .slice() para manipular datos
// ==========================================

const reposContainer = document.querySelector('#repos-container');
const loadingMessage = document.querySelector('#loading-message');
const errorMessage = document.querySelector('#error-message');
const githubProfileLink = document.querySelector('#github-profile-link');

// ⚠️ CAMBIA ESTO POR TU USUARIO DE GITHUB
const GITHUB_USERNAME = 'TusTun33'; // Ejemplo: 'octocat'

// Actualizamos el enlace al perfil
githubProfileLink.href = `https://github.com/${GITHUB_USERNAME}`;

// Función asíncrona para obtener los repos de GitHub
const fetchGitHubRepos = async () => {
    // 1. Mostramos el mensaje de carga
    loadingMessage.style.display = 'block';
    errorMessage.style.display = 'none';

    try {
        // 2. Hacemos la petición a la API de GitHub
        // La URL es: https://api.github.com/users/{usuario}/repos
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);

        // 3. Si la respuesta no es OK (código 200-299), lanzamos un error
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // 4. Convertimos la respuesta JSON a un array de objetos JavaScript
        const repos = await response.json();

        // 5. Ocultamos el mensaje de carga
        loadingMessage.style.display = 'none';

        // 6. Ordenamos los repos por estrellas (los más populares primero)
        const reposOrdenados = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

        // 7. Tomamos solo los 6 primeros (para no saturar la página)
        const topRepos = reposOrdenados.slice(0, 6);

        // 8. Renderizamos los repos (usando .map() y .join() como en el Hito 2)
        renderRepos(topRepos);

    } catch (error) {
        // Si algo falla (sin internet, usuario no existe, etc.), mostramos el error
        console.error('Error al obtener repos:', error);
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
    }
};

// Función para pintar los repos en el DOM
const renderRepos = (repos) => {
    const reposHTML = repos.map(repo => {
        return `
            <article class="repo-card">
                <h4>${repo.name}</h4>
                <p>${repo.description || 'Sin descripción disponible.'}</p>
                <div class="repo-stats">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    <span>💻 ${repo.language || 'N/A'}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" style="margin-top: 15px; display: inline-block;">
                    Ver en GitHub →
                </a>
            </article>
        `;
    });

    reposContainer.innerHTML = reposHTML.join('');
};

// Ejecutamos la función al cargar la página
fetchGitHubRepos();

