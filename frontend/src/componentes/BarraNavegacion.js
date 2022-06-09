import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { borrarDatosUsuario, obtenerDatosUsuario } from "../funciones/usuario.funciones";

export const BarraNavegacion = () => {
    // función para cerrar sesión en la aplicación
    const cerrarSesion = () => {
        // Llamada a la función de borrado de datos de usaurio
        borrarDatosUsuario();
    }
    // Verificación de la existencia de los datos de login del usuario en la aplicación
    if (obtenerDatosUsuario() == null) {
        // Generación de la barra de navegación para los usuarios no logueados
        return <Navbar bg="primary" variant="dark" expand='xl'>
            <Container> {/* Contenedor de la barra de navegación */}
                <Navbar.Brand href="/inicio">FERRETERIA ESPE</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end ">
                        <Nav.Link className="nav-link" href="/inicio">Inicio</Nav.Link>
                        <Nav.Link className="nav-link" href="/catalogo">Catalogo</Nav.Link>
                        <Nav.Link className="nav-link" href="/contacto">Contacto</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    }

    // Comprobación de si los datos de login del usuario registrados en la aplicación pertenecen a INVITADO
    if (obtenerDatosUsuario().nombreUsuario !== '' && obtenerDatosUsuario().rol == 'invitado') {
        // Generación de la barra de navegación para el usuario INVITADO
        return <Navbar bg="primary" variant="dark" expand='xl'>
            <Container> {/* Contenedor de la barra de navegación */}
                <Navbar.Brand href="/inicio">FERRETERIA ESPE</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end ">
                        <Nav.Link className="nav-link" href="/inicio">Inicio</Nav.Link>
                        <Nav.Link className="nav-link" href="/categorias">Categorias</Nav.Link>
                        <Nav.Link className="nav-link" href="/catalogo">Catalogo</Nav.Link>
                        <Nav.Link className="nav-link" href="/contacto">Contacto</Nav.Link>
                        <Link to="/">
                            <Button type="button" variant="outline-light" onClick={cerrarSesion}>
                                Cerrar Sesión de Invitado
                            </Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    }

    // Comprobación de si los datos de login del usuario registrados en la aplicación pertenecen a un ADMINISTRADOR
    if (obtenerDatosUsuario().nombreUsuario !== '' && obtenerDatosUsuario().rol == 'administrador') {
        // Generación de la barra de navegación para el usuario ADMINISTRADOR
        return <Navbar bg="primary" variant="dark" expand='xl'>
            <Container> {/* Contenedor de la barra de navegación */}
                <Navbar.Brand href="/inicio">FERRETERIA ESPE</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end ">
                        <Nav.Link className="nav-link" href="/inicio">Inicio</Nav.Link>
                        <Nav.Link className="nav-link" href="/productos">Productos</Nav.Link>
                        <Nav.Link className="nav-link" href="/proveedores">Proveedores</Nav.Link>
                        <Nav.Link className="nav-link" href="/clientes">Clientes</Nav.Link>
                        <Nav.Link className="nav-link" href="/stock-producto">Stock de Producto</Nav.Link>
                        <Nav.Link className="nav-link" href="/informes">Informe</Nav.Link>
                        <Nav.Link className="nav-link" href="/categorias">Categorias</Nav.Link>
                        <Nav.Link className="nav-link" href="/catalogo">Catalogo</Nav.Link>
                        <Nav.Link className="nav-link" href="/contacto">Contacto</Nav.Link>

                        <Link to="/">
                            <Button type="button" variant="outline-light" onClick={cerrarSesion}>
                                Cerrar Sesión
                            </Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>;
    }
}