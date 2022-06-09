import { Navigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { BarraNavegacion } from "./BarraNavegacion";

export const Catalogo = ({ user }) => {

    let [data, setData] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(
        () => {
            obtenerProductos();
        }, []);

    const obtenerProductos = async () => {
        const res = await fetch('http://localhost:5000/productos');
        const resData = await res.json();
        setData(resData)
    };


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <>
            <BarraNavegacion />

            <br />
            <br />
            <h2 className="text-center justify-content-center">CATÁLOGO DE PRODUCTOS</h2>
            <br />
            <Container>
                <Row>
                    {data.map((producto) => (
                        <Card key={producto.id} style={{ width: '280px', margin: '24px' }}>
                            <Card.Img variant="top" src={producto.imagen} style={{ padding: '8px' }} />
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }} >{producto.nombre}</Card.Title>
                                <Card.Text>
                                    {producto.descripcion}
                                </Card.Text>
                                <Card.Title style={{ textAlign: 'center' }}>
                                    <b>Precio: </b>${parseFloat(producto.precio).toFixed(2)}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>

            {/* <table className="table table-striped">
                <thead>
                    <tr>
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
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.cantidad}</td>
                            <td>{producto.descripcion}</td>
                            <td>
                                <Button variant="outline-success" type="submit">Actualizar</Button>
                                <br />
                                <br />
                                <Button variant="outline-danger" type="summir">Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </>
    );
}
