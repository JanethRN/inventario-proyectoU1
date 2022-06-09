import { Container } from "react-bootstrap";
import { BarraNavegacion } from "../componentes/BarraNavegacion";
import { Bienvenida } from "../componentes/Bienvenida";
import { Navigate } from "react-router-dom";
import { obtenerDatosUsuario } from "../funciones/usuario.funciones";

export const Inicio = () => {
    // Validación para controlar el acceso a la pagina
    // Con la redirección a la pagina raiz
    // si la aplicación no registra los datos de un usuario logueado
    if (!obtenerDatosUsuario()) {
        // Redireción a la ruta rais de la aplicación
        return <Navigate to="/" replace />;
    }

    // Validación para controlar el acceso a la pagina
    // Con la redirección a la pagina raiz
    // si la aplicación registra datos de un usuario logueado pero estos estan vacios
    if (obtenerDatosUsuario().nombreUsuario === '' && obtenerDatosUsuario().rol === '') {
        // Redireción a la ruta rais de la aplicación
        return <Navigate to="/" replace />;
    }

    // Validación para controlar el acceso a la pagina
    // Con la redirección a la pagina raiz
    // si la aplicación registra datos de un usuario logueado pero estos pertenecen al Usuario INVITADO
    if (obtenerDatosUsuario().nombreUsuario !== '' && obtenerDatosUsuario().rol === 'invitado') {
        // Redireción a la ruta rais de la aplicación
        return <Navigate to="/" replace />;
    }
    
    // Generación de la página de INICIO con:
    // El componente Barra de navegación y un contenedor con el contenido de la página
    // Junto con el componente Bienvenida
    return <>
        <BarraNavegacion/>
        <Container>
            <Bienvenida />
        </Container>
    </>
}