import { Navigate } from 'react-router-dom';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { Container } from "react-bootstrap";
import { BarraNavegacion } from "../componentes/BarraNavegacion";
import { FormularioStock } from '../componentes/FormularioStock';

export const StockProducto = () => {

    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    return (
        <>
            <BarraNavegacion />
            <Container>
                <h2 style={{ margin: '24px', textAlign: 'center' }}>
                    MÓDULO DE STOCK DE PRODUCTO
                </h2>
                {/* <Tabs defaultActiveKey="nuevo_roducto" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="nuevo_roducto" title="Ingresar Nuevo Producto"> */}
                        <FormularioStock />
                    {/* </Tab>
                    <Tab eventKey="gestión_roductos" title="Gestionar Productos" className='container'> */}
                        {/* <ListaProductos /> */}
                    {/* </Tab>
                </Tabs> */}
            </Container>
        </>
    );
}
