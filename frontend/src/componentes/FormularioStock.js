import { Form, Button, Row, Col, InputGroup, FormControl, Container } from "react-bootstrap";
import { useState } from 'react';
import { ModalMensajeAdvertencia } from "./ModalMensajeAdvertencia";

export const FormularioStock = () => {
    // Inicialización de variables
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
    // Funcion para obtner los datos de un producto espedifico mediante el codigo del producto atravez de
    // Una petición al API de productos de Flask
    const obtenerProductoPorCodigo = async () => {
        // Verificación del que el codigo de producto a buscar no este en blanco
        if (codigoProducto !== '') {
            // Petición al API FLASK
            const res = await fetch('http://localhost:5000/producto/' + codigoProducto);
            const resData = await res.json(); // Conversión de la respuesta del API en json
            setData(resData); // Almacenamiento de los datos recibidos como respuesta a la petición

            // verificación para comprobar si el producto fue encontrado
            if (resData.encontrado) {
                // Si el producto fue encontrado se guarda los datos del producto
                setDatosProducto({
                    ...datosProducto,
                    nombre: resData.datosProducto.nombre,
                    codigo: resData.datosProducto.codigo,
                    proveedor: resData.datosProducto.proveedor,
                    precio: resData.datosProducto.precio,
                    cantidad: resData.datosProducto.cantidad
                });
                // Ademas se verifica si la nueva cantidad que ingreso el usuario es mayor a cero
                // para pasar a sumarlo y guardarlo
                if (nuevaCantidad > 0) {
                    // Almacenamiento de la sumatoria de la nueva cantidac con la cantidad actual del producto
                    setTotalCantidad(
                        parseInt(nuevaCantidad) + parseInt(resData.datosProducto.cantidad)
                    );
                } else {
                    // Caso contrario la sumatoria total de cantidades solo sera igual a la cantidad actual del producto
                    setTotalCantidad(parseInt(resData.datosProducto.cantidad));
                }
            } else {
                // Y en el caso de que no se enceuintre el producto que se busca se muetsa 
                // Una alerta en pantalla de producto no encontrado,
                // Y todos los campos del formulario se resetean 
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
    // Especificaicón de las opciones necesarias para la petición al api FLASK
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

    // Funcion para actualizar el stock de un producto atravez de
    // Una petición al API de productos de Flask
    const actulizarStock = async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/stock', requestOptions);
        const resProducto = await res.json(); // Conversión de la respuesta del API en json 
        // Almacenamiento de datos
        setCodigoProducto(datosProducto.codigo);
        setTotalCantidad(0);
        setNuevaCantidad(0);
        setDatosProducto(resProducto);
    };

    // Funcion para ejecutar la acción de summit del formulario
    const handleSubmit = (event) => {
        event.preventDefault(); //Detiene la recarga de la pagina tras el sumit del formulario
        actulizarStock(); // Llamada a la funcion de actualización de stock
    };

    // Funcion para tomar el valor de los imputs y almacenarlo en el objeto Producto
    const handleInputChange = (event) => {
        setDatosProducto({
            ...datosProducto,
            [event.target.name]: event.target.value
        })
    }
    // Función para actualizar la contidad Total de stok
    const actualizarCantidadTotal = (cantidad) => {
        // Almacenamiento del la nueva cantidad ingresada por el usuario
        setNuevaCantidad(cantidad);
        // Veriificación de si la cantidad ingresada es mayor a 0
        if (cantidad > 0) {
            // SI cumple la condición se alamcena la sumatoria del la cantidad ingresada con la cantidad de producto actual 
            // en la cantidad total 
            setTotalCantidad(
                parseInt(cantidad) + parseInt(datosProducto.cantidad)
            );
        } else {
            // Si no se cumple la condición en el valor total se almacenara unicamente la cantidad actualdel producto
            setTotalCantidad(parseInt(datosProducto.cantidad));
        }
    }
    // Funcion para mostrar la alerta de que no existe un producto con el codigo ingresado
    const mostrarAlerta = () => {
        setAlertaShow(true);
    }

    // Generación del formulario para actualizar el stock del producto
    return (
        <>
            <div className='container'>
                <br />
                <h3 className="text-center justify-content-center">Buscar por Código de Producto</h3>
                <br />
                {/* Creación del buscador con los elementos InputGroup, FormControl y Button de bootstrap */}
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

                <Container>  {/* Elemento container de bootstrap para agrupar el formulario y demas contenido*/}
                    <h3 className="text-center justify-content-center">Ingresar Stock a un Producto</h3>
                    <br />
                    <br />
                    {/* Formulario para la actualización de stock del prodcuto */}
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
            {/* Construcción del componente ModalMensajeAdvertencia */}
            <ModalMensajeAdvertencia
                tipo={'stock'}
                show={alertaShow}
                onHide={() => setAlertaShow(false)}
            />
        </>
    );
}
