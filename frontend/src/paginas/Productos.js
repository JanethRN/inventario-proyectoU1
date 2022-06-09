import { Navigate } from 'react-router-dom';
import { Tabs, Tab, Container } from "react-bootstrap";
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { BarraNavegacion } from '../componentes/BarraNavegacion';
import { FormularioProducto } from '../componentes/FormularioProducto';
import { ListaProductos } from '../componentes/ListaProductos';

export const Productos = () => {

    // Validación para controlar el acceso a la pagina
    // Con la redirección a la pagina de inicio
    // si la aplicación no registra los datos del usuario logueado
    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    // Generación de la página de PRODUCTOS con:
    // El componente Barra de navegación y un contenedor con el contenido de la página
    // Junto con el componente FormularioProducto y ListaProductos
    return (
        <>
            <BarraNavegacion /> {/* Componente de la barra de navagación*/}
            <Container> {/* Contenedor del contenido de la pagina */}
                <h2 style={{ margin: '24px', textAlign: 'center' }}>
                    MÓDULO DE PRODUCTOS
                </h2>
                 {/* Generación de las subpestañas de contenido*/}
                <Tabs defaultActiveKey="nuevo_roducto" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="nuevo_roducto" title="Ingresar Nuevo Producto">
                        <FormularioProducto tipo={'agregar'} producto={null} /> {/* Componente del formulario de producto*/}
                    </Tab>
                    <Tab eventKey="gestión_roductos" title="Gestionar Productos" className='container'>
                        <ListaProductos /> {/* Componente de la lista de productos */}
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}
