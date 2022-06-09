import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';

export const FormularioProveedor = ({tipo, proveedor, onReLoad, onHide}) => {
    // Inicialización de variables
    const [validated, setValidated] = useState(false);
    const [datosProveedor, setDatosProveedor] = useState({
        id: "0",
        ruc: "",
        nombre: "",
        direccion: "",
        provincia: "",
        ciudad: "",
        telefono: "",
        correo_electronico: ""
    });

    // Funcion para obtener los datos de proveedores mediante
    // Una petición al API de proveedores de Flask para generar el id del proveedor
    // O almacenar el proveedor que se recibe como parametro para actualizarlo
    const obtenerProveedores = async () => {
        // Verificación del tipo de formulario que se construira
        if (tipo === 'agregar') {
            // Si es de tipo agregar se realizara la petición al API de Flask
            const res = await fetch('http://localhost:5000/proveedores');
            // Conversion a json
            const resData = await res.json();
            // almacenamiento de los datos  de proveedores
            setDatosProveedor({
                ...datosProveedor,
                id: "" + resData.length + ""
            });
        } else {
            // Si es de otro tipo se verificara si existen datoos de un proveedor
            if(proveedor !== undefined) {
                // si existen datos de provedor recibido como parametro, este será almacenado
                setDatosProveedor({
                    ...proveedor,
                });
            }
        }
    };

    // Función propia de react para la inicialización de variables y llamadas a APIs cada vez que nuestro componente se renderice
    useEffect(
        () => {
            obtenerProveedores();// Ejecución de la funcion para cargar la lista de proveedores
        }, []);

    // Funcion para comprobar si los datos ingresados en le formulario son validos
    const handleSubmit = (event) => {
        event.preventDefault(); // Funcion para detener la carga de pantalla tras el summit del formulario
        const form = event.currentTarget;
        // Validación para conprobar si el formulario e svalido 
        if (form.checkValidity() === false) {
            // Si no es valido se muestran los errores correspondientes
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(true);
            // Si el formulario es valido segun el tipo de formulario que se lleno,
            // Se realizara la agregación o actualización del proveedor
            if (tipo === 'agregar') {
                return agregarProveedor(); // Ejecución de la funcion para agregar un nuevo proveedor
            } else {
                return actualizarProveedor(); // Ejecución de la funcion para actualizar un proveedor
            }
        }
        
    };

    // Especificaicón de las opciones necesarias para la petición al api FLASK
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(datosProveedor),
        mode: 'cors',
    };

    // Funcion para agregar un proveedor atravez de
    // Una petición al API de proveedores de Flask
    const agregarProveedor= async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/proveedores', requestOptions);
        // Ejecución de la funcion para recargar la pagina con los nuevos datos
        window.location.reload(false);
    };

    // Especificaicón de las opciones necesarias para la petición de actualización al api FLASK
    const requestOptionsUpdate = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(datosProveedor),
        mode: 'cors',
    };

    // Funcion para actualziar un proveedor atravez de
    // Una petición al API de proveedores de Flask
    const actualizarProveedor = async () => {
        // Petición al API FLASK
        await fetch('http://localhost:5000/proveedores', requestOptionsUpdate);
        onReLoad(); // Ejecución de la funcion recibida por referencia para recargar los datos de la lista de proveedores
        onHide(false); // Ejecución de la funcion recibida por referencia para ocultar el modal de la pantalla
    };
    
    // Funcion para tomar el valor de los imputs y almacenarlo en el objeto datosProveedor
    const handleInputChange = (event) => {
        setDatosProveedor({
            ...datosProveedor,
            [event.target.name] : event.target.value
        })
    }

    // Funcion para actualizar el estado del boton segun el tipo de formulario
    const actualizarEstadoBoton = () => {
        if (tipo === 'agregar') {
            return 'Agregar';
        } else {
            if(proveedor !== undefined) {
                return 'Actualizar';
            }
        } 
    }
    
    // Funcion para actualizar el estado del titulo segun el tipo de formulario
    const actualizarEstadoTitulo = () => {
        if (tipo === 'agregar') {
            return 'Ingresar un Nuevo Proveedor';
        } else {
            if(proveedor !== undefined) {
                return 'Actualizar Proveedor';
            }
        } 
    }
    // Generación del formulario de proveedores
    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">
                    {actualizarEstadoTitulo()}
                </h3>
                <br />
                {/* Creación del formulario de proveedores, con el elemento de Form de Bootstrap*/}
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group className="mb-3" controlId="formBasicRUC" as={Row}>
                        <Form.Label column sm="2">RUC *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="RUC" onChange={handleInputChange} name="ruc" value={datosProveedor.ruc} required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNombre" as={Row}>
                        <Form.Label column sm="2">Nombre *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Nombre" onChange={handleInputChange} name="nombre" value={datosProveedor.nombre} required />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicDirecion" as={Row}>
                        <Form.Label column sm="2">Dirección *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Dirección" onChange={handleInputChange} name="direccion" value={datosProveedor.direccion} required />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicProvincia" as={Row}>
                        <Form.Label column sm="2">Provincia *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Provincia" onChange={handleInputChange} name="provincia" value={datosProveedor.provincia} required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCiudad" as={Row}>
                        <Form.Label column sm="2">Ciudad *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Ciudad" onChange={handleInputChange} name="ciudad" value={datosProveedor.ciudad} required />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicTelefono" as={Row}>
                        <Form.Label column sm="2">Teléfono *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Teléfono" onChange={handleInputChange} name="telefono" value={datosProveedor.telefono} required />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail" as={Row}>
                        <Form.Label column sm="2">Correo Electrónico *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" placeholder="Correo Electrónico" onChange={handleInputChange} name="correo_electronico" value={datosProveedor.correo_electronico} required />
                        </Col>
                    </Form.Group>

                    <div className="text-center justify-content-center">
                        <Button variant="outline-success" type="submit">
                            { actualizarEstadoBoton() }
                        </Button>
                    </div>
                </Form>
                <br />
                <br />
                <br />
            </div>
        </>
    );
}
