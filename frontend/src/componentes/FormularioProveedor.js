import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';

export const FormularioProveedor = ({tipo, proveedor, onReLoad, onHide}) => {
    let [data, setData] = useState([]);
    const [validated, setValidated] = useState(false);
    const [datosProveedor, setDatosProveedores] = useState({
        id: "0",
        ruc: "",
        nombre: "",
        direccion: "",
        provincia: "",
        ciudad: "",
        telefono: "",
        correo_electronico: ""
    });

    
    const obtenerProveedores = async () => {
        
        if (tipo == 'agregar') {
            const res = await fetch('http://localhost:5000/proveedores');
            const resData = await res.json();
            setDatosProveedores({
                ...datosProveedor,
                id: "" + resData.length + ""
            });
        } else {
            if(proveedor !== undefined) {
                setDatosProveedores({
                    ...proveedor,
                });
            }
        }
    };

    useEffect(
        () => {
            obtenerProveedores();
        }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            if (tipo == 'agregar') {
                return agregarProveedor();
            } else {
                return actualizarProveedor();
            }
        }
        
        setValidated(true);
    };

    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(datosProveedor),
        mode: 'cors',
    };


    const agregarProveedor= async () => {
        const res = await fetch('http://localhost:5000/proveedores', requestOptions);
        const resProducto = await res.json();
        obtenerProveedores();
        window.location.reload(false);
    };

    const requestOptionsUpdate = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(datosProveedor),
        mode: 'cors',
    };

    const actualizarProveedor = async () => {
        await fetch('http://localhost:5000/proveedores', requestOptionsUpdate);
        onReLoad();
        onHide(false);
    };

    const handleInputChange = (event) => {
        setDatosProveedores({
            ...datosProveedor,
            [event.target.name] : event.target.value
        })
    }

    const actualizarEstadoBoton = () => {
        if (tipo == 'agregar') {
            return 'Agregar';
        } else {
            if(proveedor !== undefined) {
                return 'Actualizar';
            }
        } 
    }
    
    const actualizarEstadoTitulo = () => {
        if (tipo == 'agregar') {
            return 'Ingresar un Nuevo Proveedor';
        } else {
            if(proveedor !== undefined) {
                return 'Actualizar Proveedor';
            }
        } 
    }

    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">
                    {actualizarEstadoTitulo()}
                </h3>
                <br />
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
