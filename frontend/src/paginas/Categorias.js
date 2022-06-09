import { Navigate } from 'react-router-dom';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { Container, Tab, Tabs } from "react-bootstrap";
import { BarraNavegacion } from "../componentes/BarraNavegacion";
import { FormularioCategoria } from '../componentes/FormularioCategoria';
import { ListaproductosPorCategoria } from '../componentes/ListaProductosPorCategoria';
import { ListaCategorias } from '../componentes/ListaCategorias';

export const Categorias = () => {

    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }


    if (obtenerDatosUsuario().nombreUsuario !== '' && obtenerDatosUsuario().rol === 'invitado') {
        return (
            <>
                
                <BarraNavegacion />
                <Container>
                    <br/>
                    <br/> 
                    <ListaproductosPorCategoria />
                </Container>
            </>
        );
    }
    

    return (
        <>
            
            <BarraNavegacion />
            <Container>
                <h2 style={{ margin: '24px', textAlign: 'center' }}>
                    MÓDULO DE CATEGORÍAS
                </h2>
                <Tabs defaultActiveKey="nueva_categoria" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="nueva_categoria" title="Ingresar Nueva Categoria">
                        <FormularioCategoria />
                    </Tab>
                    <Tab eventKey="lista_categorias" title="Lista de categorias" className='container'>
                        <ListaCategorias />
                    </Tab>
                    <Tab eventKey="productos_categorias" title="Lista de productos por categorias" className='container'>
                        <ListaproductosPorCategoria />
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}
