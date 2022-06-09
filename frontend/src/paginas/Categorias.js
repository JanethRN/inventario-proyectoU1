import { Navigate } from 'react-router-dom';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { Container, Tab, Tabs } from "react-bootstrap";
import { BarraNavegacion } from "../componentes/BarraNavegacion";
import { FormularioCategoria } from '../componentes/FormularioCategoria';
import { ListaProductosPorCategoria } from '../componentes/ListaProductosPorCategoria';
import { ListaCategorias } from '../componentes/ListaCategorias';

export const Categorias = () => {

    // Validación para controlar el acceso a la pagina
    // Con la redirección a la pagina de inicio
    // si la aplicación no registra los datos del usuario logueado
    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }
    
    // Validación para controlar el acceso a la pagina
    // Con la muestra solo del componente de lista de productos por categoria 
    // Solo para el usuario INVITADOs
    if (obtenerDatosUsuario().nombreUsuario !== '' && obtenerDatosUsuario().rol == 'invitado') {
        return (
            <>
                <BarraNavegacion /> {/* Componente de la barra de navagación*/}
                <Container> {/* Contenedor del contenido de la pagina */}
                    <br/>
                    <br/> 
                    <ListaProductosPorCategoria /> {/* Componente de la lista de productos agrupados por categoría  */}
                </Container>
            </>
        );
    }

    // Generación de la página de CATEGORÍAS con:
    // El componente Barra de navegación y un contenedor con el contenido de la página
    // Junto con el componente FormularioCategoria, ListaCategorias y ListaProductosPorCategoria
    return (
        <>
            
            <BarraNavegacion /> {/* Componente de la barra de navagación*/}
            <Container> {/* Contenedor del contenido de la pagina */}
                <h2 style={{ margin: '24px', textAlign: 'center' }}>
                    MÓDULO DE CATEGORÍAS
                </h2>
                 {/* Generación de las subpestañas de contenido*/}
                <Tabs defaultActiveKey="nueva_categoria" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="nueva_categoria" title="Ingresar Nueva Categoria">
                        <FormularioCategoria />{/* Componente del formulario de categoria */}
                    </Tab>
                    <Tab eventKey="lista_categorias" title="Lista de categorias" className='container'>
                        <ListaCategorias /> {/* Componente de la lista de categorias */}
                    </Tab>
                    <Tab eventKey="productos_categorias" title="Lista de productos por categorias" className='container'>
                        <ListaProductosPorCategoria /> {/* Componente de la lista de productos agrupados por categoría  */}
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}
