import { Navigate } from 'react-router-dom';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { Container } from "react-bootstrap";
import { BarraNavegacion } from "../componentes/BarraNavegacion";
import { FormularioStock } from '../componentes/FormularioStock';

export const StockProducto = () => {

    // Validación para controlar el acceso a la pagina
    // Con la redirección a la pagina de inicio
    // si la aplicación no registra los datos del usuario logueado
    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    // Generación de la página de STOCK de Productos con:
    // El componente Barra de navegación y un contenedor con el contenido de la página
    // Junto con el componente Formulario Stock
    return (
        <>
            <BarraNavegacion /> {/* Componente de la barra de navagación*/}
            <Container> {/* Contenedor del contenido de la pagina */}
                <h2 style={{ margin: '24px', textAlign: 'center' }}>
                    MÓDULO DE STOCK DE PRODUCTO
                </h2>
                <FormularioStock /> {/* Componente del formulario de stock*/}
            </Container>
        </>
    );
}
