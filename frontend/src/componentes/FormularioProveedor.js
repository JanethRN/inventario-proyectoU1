import { Navigate } from 'react-router-dom';
import { Form, Button, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { BarraNavegacion } from "./BarraNavegacion";
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';

export const FormularioProveedor = () => {
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
            <div className='container'>
                <h3 className="text-center justify-content-center">Ingresar un Nuevo Proveedor</h3>
                <br />
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group className="mb-3" controlId="formBasicRUC" as={Row}>
                        <Form.Label column sm="2">RUC *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="RUC" required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNombre" as={Row}>
                        <Form.Label column sm="2">Nombre *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Nombre" required />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicDirecion" as={Row}>
                        <Form.Label column sm="2">Dirección *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Dirección" required />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicProvincia" as={Row}>
                        <Form.Label column sm="2">Provincia *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Provincia" required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCiudad" as={Row}>
                        <Form.Label column sm="2">Ciudad *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Ciudad" required />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicTelefono" as={Row}>
                        <Form.Label column sm="2">Teléfono *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Teléfono" required />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail" as={Row}>
                        <Form.Label column sm="2">Correo Electrónico *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" placeholder="Correo Electrónico" required />
                        </Col>
                    </Form.Group>

                    <div className="text-center justify-content-center">
                        <Button variant="outline-success" type="submit">Agregar</Button>
                    </div>
                </Form>
                <br />
                <br />
                <br />
            </div>
        </>
    );
}
