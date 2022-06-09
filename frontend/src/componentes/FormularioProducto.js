import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';

export const FormularioProducto = ({tipo, producto, onHide, onReLoad}) => {
    // Inicialización de variables
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
    
    // Función propia de react para la inicialización de variables y llamadas a APIs cada vez que nuestro componente se renderice
    useEffect(
        () => {
            obtenerCategorias(); // Ejecución de la funcion para cargar la lista de ccategorias
            obtenerProveedores(); // Ejecución de la funcion para cargar la lista de proveedores
            obtenerProductos(); // Ejecución de la funcion para cargar la lista de productos
        },[]);

    
    // Funcion para obtener los datos de prodcutos mediante
    // Una petición al API de prodtcos de Flask para generar el id y el codigo del producto
    // O almacenar el producto que se recibe como parametro para ser actualizado
    const obtenerProductos = async () => {
        // Verificación del tipo de formulario que se construira
        if (tipo === 'agregar') {
            // Si es de tipo agregar se realizara la petición al API de Flask
            const res = await fetch('http://localhost:5000/productos');
            // Conversion a json
            const resData = await res.json();
            // almacenamiento de los datos  de productos
            setDatosProducto({
                ...datosProducto,
                id: "" + resData.length + "",
                codigo: 'PROD-' + resData.length,
                image: 'https://ingcoecuador.com/wp-content/uploads/2020/07/uni.png'
            });
        } else {
            // Si es de otro tipo se verificara si existen datos de un producto
            if(producto !== undefined) {
                // si existen datos de producto recibido como parametro, este será almacenado para ser actualziado
                setDatosProducto({
                    ...producto,
                });
            }
        }
    };

    // Funcion para obtener todas las categorias mediante
    // Una petición al API de categorias de Flask
    const obtenerCategorias = async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/categorias');
        // Conversión a json
        const resCategorias = await res.json();
        // Almacenamiento de la lista de categorias
        setCategorias(resCategorias);
    };

    // Funcion para obtener todas las proveedores mediante
    // Una petición al API de categorias de Flask
    const obtenerProveedores = async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/proveedores');
        // Conversión a json
        const resProveedores = await res.json();
        // Almacenamiento de la lista de proveedores
        setProveedores(resProveedores);
    };

    // Especificaicón de las opciones necesarias para la petición al api FLASK
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(datosProducto),
        mode: 'cors',
    };
    
    // Funcion para agregar un nuevo producto mediante
    // Una petición al API de productos de Flask
    const agregarProducto = async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/productos', requestOptions);
        // Ejecución de la funcion para recargar la pagina con los nuevos datos
        window.location.reload(false);
    };
    
    // Especificaicón de las opciones necesarias para la petición al api FLASK
    const requestOptionsUpdate = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(datosProducto),
        mode: 'cors',
    };

    // Funcion para actualizar un producto mediante
    // Una petición al API de productos de Flask
    const actualizarProducto = async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/productos', requestOptionsUpdate);
        onReLoad(); // Ejecución de la funcion recibida por referencia para recargar los datos de la lista de productos
        onHide(false); // Ejecución de la funcion recibida por referencia para ocultar el modal de la pantalla
    };

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
            // Se realizara la agregación o actualización del producto
            if (tipo === 'agregar') {
                return agregarProducto();  // Ejecución de la funcion para agregar un nuevo producto
            } else {
                return actualizarProducto(); // Ejecución de la funcion para actualizar un producto
            }
        }
       
    };
    
    // Funcion para tomar el valor de los imputs y almacenarlo en el objeto datosProveedor
    const handleInputChange = (event) => {
        setDatosProducto({
            ...datosProducto,
            [event.target.name]: event.target.value
        })
    }

    // Funcion para actualizar el estado del boton segun el tipo de formulario
    const actualizarEstadoBoton = () => {
        if (tipo === 'agregar') {
            return 'Agregar';
        } else {
            if(producto !== undefined) {
                return 'Actualizar';
            }
        } 
    }
    
    // Funcion para actualizar el estado del titulo segun el tipo de formulario
    const actualizarEstadoTitulo = () => {
        if (tipo === 'agregar') {
            return 'Ingresar un Nuevo Producto';
        } else {
            if(producto !== undefined) {
                return 'Actualizar Producto';
            }
        } 
    }
    
    // Generación del formulario de productos
    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">
                    {(actualizarEstadoTitulo())}
                </h3>
                <br />
                {/* Creación del formulario de productos, con el elemento de Form de Bootstrap*/}
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
