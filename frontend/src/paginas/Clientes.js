import { Navigate } from 'react-router-dom';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { Container } from "react-bootstrap";
import { BarraNavegacion } from "../componentes/BarraNavegacion";
import { Image } from "react-bootstrap";

export const Clientes = () => {

    // Validación para controlar el acceso a la pagina
    // Con la redirección a la pagina de inicio
    // si la aplicación no registra los datos del usuario logueado
    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    // Generación de la página de CLIENTES con:
    // El componente Barra de navegación y un contenedor con el contenido de la página
    return (
        <>
            <BarraNavegacion /> {/* Componente de la barra de navagación*/}
            <Container> {/* Contenedor del contenido de la pagina */}
                <div className="text-center justify-content-center" style={{ margin: '0px' }}>

                    <h2 style={{ margin: '24px', marginTop: '56px' }}>
                        MÓDULO DE CLIENTES
                    </h2>
                    <br />
                    <br />

                    <h3 >
                        <i>
                            "No existen registros para mostrar."
                        </i>
                    </h3>
                    <br />
                    <Image style={{ width: '100%', height: 'auto', minWidth: '200px' }} src="https://img.freepik.com/vector-gratis/interior-ferreteria-personas-que-eligen-compran-herramientas-bricolaje-trabajos-mantenimiento-construccion-renovacion-tienda-herramientas-clientes-dentro-ilustracion-vector-plano-dibujos-animados_341509-3187.jpg?w=1000" />
                </div>
            </Container>
        </>
    );
}
