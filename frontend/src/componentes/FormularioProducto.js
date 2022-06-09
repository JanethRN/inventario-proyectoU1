import { Navigate } from 'react-router-dom';
import { Form, Button, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { BarraNavegacion } from "./BarraNavegacion";
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';

export const FormularioProducto = () => {
    let [categorias, setCategorias] = useState([]);
    let [proveedores, setProveedores] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(
        () => {
            obtenerProductos();
            obtenerProveedores();
        }, []);

    const obtenerProductos = async () => {
        const res = await fetch('http://localhost:5000/categorias');
        const resCategorias = await res.json();
        console.log(resCategorias);
        setCategorias(resCategorias);
    };

    const obtenerProveedores = async () => {
        const res = await fetch('http://localhost:5000/proveedores');
        const resProveedores = await res.json();
        console.log(resProveedores);
        setProveedores(resProveedores);
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
                <h3 className="text-center justify-content-center">Ingresar un Nuevo Producto</h3>
                <br />
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group className="mb-3" controlId="validationCustom01" as={Row}>
                        <Form.Label column sm="2">Codigo *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Codigo" required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" as={Row}>
                        <Form.Label column sm="2">Nombre *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Nombre" required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" as={Row}>
                        <Form.Label column sm="2">Categoria *</Form.Label>
                        <Col sm="10">
                            <Form.Select type="text" placeholder="Categoria" required>
                                <option>Seleccionar Categoria</option>
                                {
                                    categorias.map(
                                        (categoria) => {
                                            return <option key={categoria.codigo} value={categoria.codigo}>{categoria.nombre}</option>
                                        }
                                    )
                                }
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" as={Row}>
                        <Form.Label column sm="2">Proveedor *</Form.Label>
                        <Col sm="10">
                            <Form.Select type="text" placeholder="Proveedor" required>
                                <option>Seleccionar Proveedor</option>
                                {
                                    proveedores.map(
                                        (proveedor) => {
                                            return <option key={proveedor.ruc} value={proveedor.ruc}>{proveedor.nombre}</option>
                                        }
                                    )
                                }
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" as={Row}>
                        <Form.Label column sm="2">Precio *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Precio" required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" as={Row}>
                        <Form.Label column sm="2">Cantidad *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Cantidad" required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" as={Row}>
                        <Form.Label column sm="2">Descripción *</Form.Label>
                        <Col sm="10">
                            <Form.Control as="textarea" rows={3} placeholder="Descripción" required />
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
