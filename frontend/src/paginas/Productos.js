import { Navigate } from 'react-router-dom';
import { Tabs, Tab, Container } from "react-bootstrap";
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { BarraNavegacion } from '../componentes/BarraNavegacion';
import { FormularioProducto } from '../componentes/FormularioProducto';
import { ListaProductos } from '../componentes/ListaProductos';

export const Productos = () => {

    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    return (
        <>
            <BarraNavegacion />
            <Container>
                <h2 style={{ margin: '24px', textAlign: 'center' }}>
                    MÓDULO DE PRODUCTOS
                </h2>
                <Tabs defaultActiveKey="nuevo_roducto" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="nuevo_roducto" title="Ingresar Nuevo Producto">
                        <FormularioProducto />
                    </Tab>
                    <Tab eventKey="gestión_roductos" title="Gestionar Productos" className='container'>
                        <ListaProductos />
                    </Tab>
                </Tabs>
            </Container>

        </>
    );
}
