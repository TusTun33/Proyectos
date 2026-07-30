// PRIMERA SECCION
// Tu primer script externo
console.log('Archivo externo cargado correctamente');

// Crear un elemento dinamicamente
const parrafo = document.createElement('p');
parrafo.textContent = 'Este parrafo fue creado con JavaScript';
document.body.appendChild(parrafo);

//Diferentes niveles de logging
console.log('Informacion general');
console.info('Mensaje informativo');
console.warn('Advertencia');
console.error('Error');
console.debug('Debug (solo visible si habilitado)');

// Tablas para datos estructurales / array
const usuarios = [
    { nombre: 'Ana', edad: 25 },
    { nombre: 'Luis', edad: 30 },
];
console.table(usuarios);

//Contadores 
for (let i = 0; i < 3; i++) {
    console.count('Iteracion');
}

//Temporizador que mide en cuanto tiempo se ejecuta la funcion
console.time('operacion');
// codigo a medir
console.timeEnd('operacion');

//Grupos colapsables
console.group('Usuario');
console.log('Nombre: Ana');
console.log('Edad: 25');
console.groupEnd('Usuario'); 

//SEGUNDA SECCION    VARIABLES, TIPOS DE DATOS Y OPERADORES

// ❌ var (evitar - tiene problemas de scope)
 var nombre = 'Ana';
 var nombre = 'Luis';
// ✅ let (variables que cambian)
let edad = 25;
edad = 26;
// let edad = 30; // ❌ Error: ya declarada

// ✅ const (variables constantes - RECOMENDADO)
const PI = 3.14159;
const USUARIO = { nombre: 'Ana' };
// PI = 3.14; // ❌ Error: no se puede reasignar

// PERO: los objetos/arrays const SÍ se pueden mutar
USUARIO.nombre = 'Luis'; //Permitido
USUARIO.edad = 30; //Permitido    