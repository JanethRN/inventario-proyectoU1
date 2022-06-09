// import { useEffect, useRef, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// // import './sidebar.scss';

// const sidebarNavItems = [
//     {
//         display: 'Dashboard',
//         // icon: <i className='bx bx-home'></i>,
//         to: '/',
//         section: ''
//     },
//     {
//         display: 'Getting Started',
//         // icon: <i className='bx bx-star'></i>,
//         to: '/started',
//         section: 'started'
//     },
//     {
//         display: 'Calendar',
//         // icon: <i className='bx bx-calendar'></i>,
//         to: '/calendar',
//         section: 'calendar'
//     },
//     {
//         display: 'User',
//         // icon: <i className='bx bx-user'></i>,
//         to: '/user',
//         section: 'user'
//     },
//     {
//         display: 'Orders',
//         // icon: <i className='bx bx-receipt'></i>,
//         to: '/order',
//         section: 'order'
//     },
// ]

// export const BarraNavegacion = () => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [stepHeight, setStepHeight] = useState(0);
//     const sidebarRef = useRef();
//     const indicatorRef = useRef();
//     const location = useLocation();

//     useEffect(() => {
//         setTimeout(() => {
//             const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
//             indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
//             setStepHeight(sidebarItem.clientHeight);
//         }, 50);
//     }, []);

//     // change active index
//     useEffect(() => {
//         const curPath = window.location.pathname.split('/')[1];
//         const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
//         setActiveIndex(curPath.length === 0 ? 0 : activeItem);
//     }, [location]);

//     return <div className='sidebar'>
//         <div className="sidebar__logo">
//             Animate
//         </div>
//         <div ref={sidebarRef} className="sidebar__menu">
//             <div
//                 ref={indicatorRef}
//                 className="sidebar__menu__indicator"
//                 style={{
//                     transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
//                 }}
//             ></div>
//             {
//                 sidebarNavItems.map((item, index) => (
//                     <Link to={item.to} key={index}>
//                         <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
//                             {/* <div className="sidebar__menu__item__icon">
//                                 {item.icon}
//                             </div> */}
//                             <div className="sidebar__menu__item__text">
//                                 {item.display}
//                             </div>
//                         </div>
//                     </Link>
//                 ))
//             }
//         </div>
//     </div>;
// };


import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { borrarDatosUsuario, obtenerDatosUsuario } from "../funciones/usuario.funciones";
// import { userData } from '../config/data-config';

export const BarraNavegacion = () => {
    // const [userData, setUserData] = useState('');

    // const getUserData = () => {
    //     const datosusaurio =  localStorage.getItem('userData');
    //     console.log(datosusaurio.toString());
    //     return datosusaurio;
    // }

    // useEffect(() => {
    //     setUserData(getUserData());
    // }, []);

    const cerrarSesion = () => {
        borrarDatosUsuario();
        // return <Navigate to="/inicio" replace />; 
    }

    if (obtenerDatosUsuario() === null) {
        return <Navbar bg="primary" variant="dark" expand='xl'>
            <Container>
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

    if (obtenerDatosUsuario().nombreUsuario !== '' && obtenerDatosUsuario().rol === 'administrador') {

        (obtenerDatosUsuario());
        return <Navbar bg="primary" variant="dark" expand='xl'>
            <Container>
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
    } else {

        return <Navbar bg="primary" variant="dark" expand='xl'>
            <Container>
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
}