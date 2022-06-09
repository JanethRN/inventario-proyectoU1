import { Form, Button, Row, Col, InputGroup, FormControl, Container } from "react-bootstrap";
import { useState } from 'react';
import { ModalMensajeAdvertencia } from "./ModalMensajeAdvertencia";

export const FormularioStock = () => {
    let [data, setData] = useState([]);
    const [alertaShow, setAlertaShow] = useState(false);
    const [codigoProducto, setCodigoProducto] = useState("");
    const [nuevaCantidad, setNuevaCantidad] = useState(0);
    const [totalCantidad, setTotalCantidad] = useState(0);

    const [datosProducto, setDatosProducto] = useState({
        id: 0,
        nombre: "",
        codigo: "",
        proveedor: "",
        precio: 0.00,
        cantidad: 0,
    });

    const obtenerProductoPorCodigo = async () => {
        if (codigoProducto !== '') {
            const res = await fetch('http://localhost:5000/producto/' + codigoProducto);
            const resData = await res.json();
            setData(resData)
            if (resData.encontrado) {
                setDatosProducto({
                    ...datosProducto,
                    nombre: resData.datosProducto.nombre,
                    codigo: resData.datosProducto.codigo,
                    proveedor: resData.datosProducto.proveedor,
                    precio: resData.datosProducto.precio,
                    cantidad: resData.datosProducto.cantidad
                });

                if (nuevaCantidad > 0) {
                    setTotalCantidad(
                        parseInt(nuevaCantidad) + parseInt(resData.datosProducto.cantidad)
                    );
                } else {
                    setTotalCantidad(parseInt(resData.datosProducto.cantidad));
                }
            } else {
                mostrarAlerta();
                setDatosProducto({
                    ...datosProducto,
                    nombre: '',
                    codigo: '',
                    proveedor: '',
                    precio: 0,
                    cantidad: 0
                })
            }
        }
    };


    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            ...data.datosProducto,
            cantidad: totalCantidad
        }),
        mode: 'cors',
    };


    const actulizarStock = async () => {
        const res = await fetch('http://localhost:5000/stock', requestOptions);
        const resProducto = await res.json();
        setCodigoProducto(datosProducto.codigo);
        setTotalCantidad(0);
        setNuevaCantidad(0);
        setDatosProducto(
            resProducto
        );
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        actulizarStock();
    };

    const handleInputChange = (event) => {
        setDatosProducto({
            ...datosProducto,
            [event.target.name]: event.target.value
        })
    }

    const actualizarCantidadTotal = (cantidad) => {
        setNuevaCantidad(cantidad);
        if (cantidad > 0) {
            setTotalCantidad(
                parseInt(cantidad) + parseInt(datosProducto.cantidad)
            );
        } else {
            setTotalCantidad(parseInt(datosProducto.cantidad));
        }
    }


    const mostrarAlerta = () => {
        setAlertaShow(true);
    }


    return (
        <>
            <div className='container'>
                <br />
                <h3 className="text-center justify-content-center">Buscar por Código de Producto</h3>
                <br />
                <InputGroup className="mb-3">
                    <FormControl
                        onChange={e => setCodigoProducto(e.target.value)} value={codigoProducto}
                        placeholder="Buscar producto por Código de Producto"
                        required
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={() => { obtenerProductoPorCodigo() }}>
                        Buscar
                    </Button>
                </InputGroup>
                <br />

                <Container>
                    <h3 className="text-center justify-content-center">Ingresar Stock a un Producto</h3>
                    <br />
                    <br />

                    <Form onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicCodigo" as={Row}>
                            <Form.Label column sm="2">Código Producto*</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Código Producto" onChange={handleInputChange} name="codigo" value={datosProducto.codigo} disabled />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNombre" as={Row}>
                            <Form.Label column sm="2">Nombre Producto *</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Nombre Producto" onChange={handleInputChange} name="nombre" value={datosProducto.nombre} disabled />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNombre" as={Row}>
                            <Form.Label column sm="2">Proveedor Producto *</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Proveedor Producto" onChange={handleInputChange} name="proveedor" value={datosProducto.proveedor} disabled />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNombre" as={Row}>
                            <Form.Label column sm="2">Precio *</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Precio" onChange={handleInputChange} name="precio" value={'$ ' + parseFloat(datosProducto.precio).toFixed(2)} disabled />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNombre" as={Row}>
                            <Col sm="2"></Col>
                            <Form.Label style={{ textAlign: 'center' }} column sm="3"> Cantidad Actual *</Form.Label>
                            <Col sm="4">
                                <Form.Control type="text" placeholder="Cantidad Actual" onChange={handleInputChange} name="cantidad" value={datosProducto.cantidad} disabled />
                            </Col>
                            <Col sm="2"></Col>
                        </Form.Group>
                        <Form.Group style={{ margin: 'auto' }} className="mb-3" controlId="formBasicNombre" as={Row}>

                            <Col sm="2"></Col>
                            <Form.Label style={{ textAlign: 'center' }} column sm="3">Candidad a aumentar *</Form.Label>
                            <Col sm="4">
                                <Form.Control type="number" placeholder="Candidad a aumentar" onChange={e => { actualizarCantidadTotal(e.target.value) }} value={nuevaCantidad} />
                            </Col>
                            <Col sm="2"></Col>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNombre" as={Row}>
                            <Col sm="2"></Col>
                            <Form.Label style={{ textAlign: 'center' }} column sm="3">Cantidad Total *</Form.Label>
                            <Col sm="4">
                                <Form.Control type="text" placeholder="Cantidad Total" onChange={e => setTotalCantidad(e.target.value)} value={totalCantidad} disabled />
                            </Col>
                            <Col sm="2"></Col>
                        </Form.Group>

                        <div className="text-center justify-content-center">
                            <Button variant="outline-success" type="submit">Agregar</Button>
                        </div>
                    </Form>
                </Container>
                <br />
                <br />
                <br />
            </div>
            <ModalMensajeAdvertencia
                tipo={'stock'}
                show={alertaShow}
                onHide={() => setAlertaShow(false)}
            />
        </>
    );
}
