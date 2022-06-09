import { Row, Col, Container } from "react-bootstrap";
import { BarraNavegacion } from "./BarraNavegacion";
// import { Login } from "./Login";
import { Bienvenida } from "./Bienvenida";
import { userData } from '../config/data-config';
// import { userData } from '../config/data-config';
import { Navigate } from "react-router-dom";
import { obtenerDatosUsuario } from "../funciones/usuario.funciones";

export const Inicio = () => {

    
    if (!obtenerDatosUsuario()) {
        return <Navigate to="/" replace />;
    }

    if (obtenerDatosUsuario().nombreUsuario === '' && obtenerDatosUsuario().rol === '') {
        return <Navigate to="/" replace />;
    }

    return <>
        <BarraNavegacion/>
        <Container>
            <Bienvenida />
        </Container>
    </>
}