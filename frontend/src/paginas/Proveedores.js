import { Navigate } from 'react-router-dom';
import { Tabs, Tab, Container } from "react-bootstrap";
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { BarraNavegacion } from '../componentes/BarraNavegacion';
import { FormularioProveedor } from '../componentes/FormularioProveedor';
import { ListaProveedores } from '../componentes/ListaProveedores';

export const Proveedores = () => {

    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    return (
        <>
            <BarraNavegacion />

            <Container>
                <h2 style={{ margin: '24px', textAlign: 'center' }}>
                    MÓDULO DE PROVEEDORES
                </h2>
                <Tabs defaultActiveKey="nuevo_proveedor" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="nuevo_proveedor" title="Ingresar Nuevo Proveedor">
                        <FormularioProveedor tipo="agregar" />
                    </Tab>
                    <Tab eventKey="gestion_proveedor" title="Gestionar Proveedores" className='container'>
                        <ListaProveedores />
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}
