import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';

export const FormularioProducto = ({tipo, producto, onHide, onReLoad}) => {
    let [categorias, setCategorias] = useState([]);
    let [proveedores, setProveedores] = useState([]);
    const [validated, setValidated] = useState(false);

    const [datosProducto, setDatosProducto] = useState({
        id: 0,
        nombre: "",
        codigo: "",
        categoria: "",
        proveedor: "",
        precio: 0.00,
        cantidad: 0,
        descripcion: "",
        imagen: "",
    });

    useEffect(
        () => {
            obtenerCategorias();
            obtenerProveedores();
            obtenerProductos();
        },[]);


    const obtenerProductos = async () => {
        if (tipo == 'agregar') {
            const res = await fetch('http://localhost:5000/productos');
            const resData = await res.json();
            setDatosProducto({
                ...datosProducto,
                id: "" + resData.length + "",
                codigo: 'PROD-' + resData.length,
                image: 'https://ingcoecuador.com/wp-content/uploads/2020/07/uni.png'
            });
        } else {
            if(producto !== undefined) {
                setDatosProducto({
                    ...producto,
                });
            }
        }
    };

    const obtenerCategorias = async () => {
        const res = await fetch('http://localhost:5000/categorias');
        const resCategorias = await res.json();
        setCategorias(resCategorias);
    };

    const obtenerProveedores = async () => {
        const res = await fetch('http://localhost:5000/proveedores');
        const resProveedores = await res.json();
        setProveedores(resProveedores);
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(datosProducto),
        mode: 'cors',
    };

    const agregarProducto = async () => {
        const res = await fetch('http://localhost:5000/productos', requestOptions);
        // obtenerProductos();
        window.location.reload(false);
    };
    
    const requestOptionsUpdate = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(datosProducto),
        mode: 'cors',
    };

    const actualizarProducto = async () => {
        const res = await fetch('http://localhost:5000/productos', requestOptionsUpdate);
        const resProducto = await res.json();
        obtenerProductos();
        console.log(resProducto)
        onReLoad();
        onHide(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(true);
            if (tipo == 'agregar') {
                return agregarProducto();
            } else {
                return actualizarProducto();
            }
        }
       
    };

    const handleInputChange = (event) => {
        setDatosProducto({
            ...datosProducto,
            [event.target.name]: event.target.value
        })
    }

    const actualizarEstadoBoton = () => {
        if (tipo == 'agregar') {
            return 'Agregar';
        } else {
            if(producto !== undefined) {
                return 'Actualizar';
            }
        } 
    }
    
    const actualizarEstadoTitulo = () => {
        if (tipo == 'agregar') {
            return 'Ingresar un Nuevo Producto';
        } else {
            if(producto !== undefined) {
                return 'Actualizar Producto';
            }
        } 
    }

    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">
                    {(actualizarEstadoTitulo())}
                </h3>
                <br />
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group className="mb-3" controlId="formBasicCodigo" as={Row}>
                        <Form.Label column sm="2">Codigo *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Codigo" onChange={handleInputChange} name="codigo" value={datosProducto.codigo} disabled />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNombre" as={Row}>
                        <Form.Label column sm="2">Nombre *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Nombre" onChange={handleInputChange} name="nombre" value={datosProducto.nombre} required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCategoria" as={Row}>
                        <Form.Label column sm="2">Categoria *</Form.Label>
                        <Col sm="10">
                            <Form.Select type="text" placeholder="Categoria" onChange={handleInputChange} name="categoria" value={datosProducto.categoria} required>
                                <option value={""}>Seleccionar Categoria</option>
                                {
                                    categorias.map(
                                        (categoria) => {
                                            return <option key={categoria.codigo} value={categoria.nombre}>{categoria.nombre}</option>
                                        }
                                    )
                                }
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicProveedor" as={Row}>
                        <Form.Label column sm="2">Proveedor *</Form.Label>
                        <Col sm="10">
                            <Form.Select type="text" placeholder="Proveedor" onChange={handleInputChange} name="proveedor" value={datosProducto.proveedor} required>
                                <option value={""}>Seleccionar Proveedor</option>
                                {
                                    proveedores.map(
                                        (proveedor) => {
                                            return <option key={proveedor.ruc} value={proveedor.nombre}>{proveedor.nombre}</option>
                                        }
                                    )
                                }
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrecio" as={Row}>
                        <Form.Label column sm="2">Precio *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="number" placeholder="Precio" onChange={handleInputChange} name="precio" value={datosProducto.precio} required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCantidad" as={Row}>
                        <Form.Label column sm="2">Cantidad *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="number" placeholder="Cantidad" onChange={handleInputChange} name="cantidad" value={datosProducto.cantidad} required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescripcion" as={Row}>
                        <Form.Label column sm="2">Descripción *</Form.Label>
                        <Col sm="10">
                            <Form.Control as="textarea" rows={3} placeholder="Descripción" onChange={handleInputChange} name="descripcion" value={datosProducto.descripcion} required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicImagen" as={Row}>
                        <Form.Label column sm="2" >URL Imagen *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="URL Imagen" onChange={handleInputChange} name="imagen" value={datosProducto.imagen} />
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
