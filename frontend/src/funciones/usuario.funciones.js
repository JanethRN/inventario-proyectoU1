// Funciones utlizadas para la gestión de los datos de login del usaurio

// Función encarcada de obtener los datos almacenados en el almacenamiento local del navegador
export function obtenerDatosUsuario() {
    return JSON.parse(localStorage.getItem('datosUsaurio'));
}
// Función encarcada de cuardar los datos almacenados en el almacenamiento local del navegador
export function guardarDatosUsuario(datosusuario) {
    localStorage.setItem('datosUsaurio', JSON.stringify(datosusuario));
}
// Función encarcada de borrar los datos almacenados en el almacenamiento local del navegador
export function borrarDatosUsuario() {
    localStorage.clear();
}