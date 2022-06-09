import { Navigate } from 'react-router-dom';
import { Form, Button, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { BarraNavegacion } from "./BarraNavegacion";
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';

export const ListaProductos = () => {
    let [data, setData] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(
        () => {
            obtenerProductos();
        }, []);

    const obtenerProductos = async () => {
        const res = await fetch('http://localhost:5000/productos');
        const resData = await res.json();
        setData(resData);
    };


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };


    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">Gestionar Productos</h3>
                <br />
                <table className="table table-striped">
                    <thead>
                        <tr style={{textAlign: 'center'}}>
                            <th>Id</th>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Descripcion</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((producto) => (
                            <tr style={{textAlign: 'center'}} key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.categoria}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.descripcion}</td>
                                <td style={{textAlign: 'center'}}>
                                    <Button variant="outline-info" type="summir" style={{margin: '8px 0px'}}>Ver</Button>
                                    <br />
                                    <Button variant="outline-danger" type="summir" style={{margin: '8px 0px'}}>Eliminar</Button>
                                    <br />
                                    <Button variant="outline-success" type="submit" style={{margin: '8px 0px'}}>Actualizar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
