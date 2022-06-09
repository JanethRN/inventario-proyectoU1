import { Container } from "react-bootstrap";
import { BarraNavegacion } from "./BarraNavegacion";
import { Bienvenida } from "./Bienvenida";
import { Navigate } from "react-router-dom";
import { obtenerDatosUsuario } from "../funciones/usuario.funciones";

export const Inicio = () => {
    
    if (!obtenerDatosUsuario()) {
        return <Navigate to="/" replace />;
    }

    if (obtenerDatosUsuario().nombreUsuario === '' && obtenerDatosUsuario().rol === '') {
        return <Navigate to="/" replace />;
    }

    if (obtenerDatosUsuario().nombreUsuario !== '' && obtenerDatosUsuario().rol === 'invitado') {
        
        return <Navigate to="/" replace />;
    }

    return <>
        <BarraNavegacion/>
        <Container>
            <Bienvenida />
        </Container>
    </>
}