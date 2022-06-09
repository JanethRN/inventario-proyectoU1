import { Navigate } from 'react-router-dom';
import { Tabs, Tab, Container } from "react-bootstrap";
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { BarraNavegacion } from '../componentes/BarraNavegacion';
import { FormularioProducto } from '../componentes/FormularioProducto';
import { ListaProductos } from '../componentes/ListaProductos';
import { useState, useEffect } from 'react';

export const Productos = () => {

    let [data, setData] = useState([]);
    
    const handleCallback = (childData) =>{
        setData(...childData)
    }
    
    useEffect(
        () => {
            obtenerProductos();
        }, []
    );

    const obtenerProductos = async () => {
        const res = await fetch('http://localhost:5000/productos');
        const resData = await res.json();
        setData(resData);
    };


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
                        <FormularioProducto tipo={'agregar'} producto={null}/>
                    </Tab>
                    <Tab eventKey="gestión_roductos" title="Gestionar Productos" className='container'>
                        <ListaProductos datosProductos = {data}/>
                    </Tab>
                </Tabs>
            </Container>

        </>
    );
}
