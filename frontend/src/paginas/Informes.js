import { Navigate } from 'react-router-dom';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { Container, Tab, Tabs } from "react-bootstrap";
import { BarraNavegacion } from "../componentes/BarraNavegacion";
import { InformeProductos } from '../componentes/InformeProductos';
import { InformeSinStock } from '../componentes/InformeSinStock';

export const Informes = () => {

    // Validación para controlar el acceso a la pagina
    // Con la redirección a la pagina de inicio
    // si la aplicación no registra los datos del usuario logueado
    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    // Generación de la página de INFORMES con:
    // El componente Barra de navegación y un contenedor con el contenido de la página
    // Junto con el componente InformeProductos y InformeSinStock
    return (
        <>
            <BarraNavegacion /> {/* Componente de la barra de navagación*/}
            <Container> {/* Contenedor del contenido de la pagina */}
                <h2 style={{ margin: '24px', textAlign: 'center' }}>
                    MÓDULO DE INFORMES
                </h2>
                 {/* Generación de las subpestañas de contenido*/}
                <Tabs defaultActiveKey="nuevo_roducto" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="nuevo_roducto" title="Informe Monetario">
                        <InformeProductos /> {/* Componente del informe monetario de productos */}
                    </Tab>
                    <Tab eventKey="gestión_roductos" title="Informe de Productos sin Stock" className='container'>
                        <InformeSinStock /> {/* Componente del informe de Prodcutos sin stock */}
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}
