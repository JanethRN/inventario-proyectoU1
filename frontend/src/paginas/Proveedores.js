import { Navigate } from 'react-router-dom';
import { Tabs, Tab, Container } from "react-bootstrap";
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { BarraNavegacion } from '../componentes/BarraNavegacion';
import { FormularioProveedor } from '../componentes/FormularioProveedor';
import { ListaProveedores } from '../componentes/ListaProveedores';

export const Proveedores = () => {

    // Validación para controlar el acceso a la pagina
    // Con la redirección a la pagina de inicio
    // si la aplicación no registra los datos del usuario logueado
    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    // Generación de la página de PROVEEDORES:
    // El componente Barra de navegación y un contenedor con el contenido de la página
    // Junto con el componente FormularioProveedor y ListaProveedores
    return (
        <>
            <BarraNavegacion /> {/* Componente de la barra de navagación*/}
            <Container> {/* Contenedor del contenido de la pagina */}
                <h2 style={{ margin: '24px', textAlign: 'center' }}>
                    MÓDULO DE PROVEEDORES
                </h2>
                 {/* Generación de las subpestañas de contenido*/}
                <Tabs defaultActiveKey="nuevo_proveedor" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="nuevo_proveedor" title="Ingresar Nuevo Proveedor">
                        <FormularioProveedor tipo="agregar" />  {/* Componente del formulario de proveedor*/}
                    </Tab>
                    <Tab eventKey="gestion_proveedor" title="Gestionar Proveedores" className='container'>
                        <ListaProveedores /> {/* Componente de la lista de proveedores */}
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}
