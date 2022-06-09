export function obtenerDatosUsuario () {
    return JSON. parse(localStorage.getItem('datosUsaurio'));
}

export function guardarDatosUsuario (datosusuario) {
    localStorage.setItem('datosUsaurio', JSON.stringify(datosusuario)); 
}

export function borrarDatosUsuario () {
    localStorage.clear();
}