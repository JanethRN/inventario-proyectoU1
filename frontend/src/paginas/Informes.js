import { Navigate } from 'react-router-dom';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { Container, Tab, Tabs } from "react-bootstrap";
import { BarraNavegacion } from "../componentes/BarraNavegacion";
import { InformeProductos } from '../componentes/InformeProductos';
import { InformeSinStok } from '../componentes/InformeSinStock';

export const Informes = () => {

    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    return (
        <>
            <BarraNavegacion />

            <Container>
                <h2 style={{ margin: '24px', textAlign: 'center' }}>
                    MÓDULO DE INFORMES
                </h2>
                <Tabs defaultActiveKey="nuevo_roducto" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="nuevo_roducto" title="Informe Monetario">
                        <InformeProductos />
                    </Tab>
                    <Tab eventKey="gestión_roductos" title="Informe de Productos sin Stock" className='container'>
                        <InformeSinStok />
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}
