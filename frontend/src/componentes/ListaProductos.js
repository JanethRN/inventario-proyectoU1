import { Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { ModalProducto } from './ModalProducto';
import { ModalAlerta } from './ModalAlerta';
import { ModalActualizarProducto } from './ModalActualizarProducto';

export const ListaProductos = () => {
    // Inicialización de variables
    let [data, setData] = useState([{}]);
    const [modalShow, setModalShow] = useState(false);
    const [modalActualizar, setModalActualizar] = useState(false);
    const [alertaShow, setAlertaShow] = useState(false);
    const [datosProductoActual, setDatosProductoActual] = useState({
        cantidad: 0,
        categoria: "",
        codigo: "",
        descripcion: "",
        id: "",
        imagen: "",
        nombre: "",
        precio: 0,
        proveedor: ""
    });

    // Función propia de react para la inicialización de variables y llamadas a APIs cada vez que nuestro componente se renderice
    useEffect(
        () => {
            obtenerProductos();// Ejecución de la funcion para cargar la lista de productos
        }, []
    );

    // Funcion para cargar la lista de todos productos registrados mediante
    // Una petición al API de productos de Flask
    const obtenerProductos = async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/productos');
        // Conversión de la respuesta del API en json 
        const resData = await res.json();
        setData(resData); // Almacenamiento de los datos recibidos como respuesta a la petición
    };

    // Funcion para mostrar la tarjeta de producto
    const mostrarProductoCard = (producto) => {
        // Almacenamiento de los datos del producto seleccionado
        setDatosProductoActual(producto);
        // Almacenamiento del estado de mostrar tarjeta en pantalla en verdadero
        setModalShow(true);
    }

    // Funcion para mostrar el formulario de actualización de producto
    const mostrarActualizarProducto = (producto) => {
        // Almacenamiento de los datos del producto seleccionado
        setDatosProductoActual(producto);
        // Almacenamiento del estado de mostrar formulario en pantalla en verdadero
        setModalActualizar(true);
    }

    // Funcion para mostrar la alerta de eliminación de producto
    const mostrarAlertaBorrar = (producto) => {
        // Almacenamiento de los datos del producto seleccionado
        setDatosProductoActual(producto);
        // Almacenamiento del estado de mostrar alerta en pantalla en verdadero
        setAlertaShow(true);
    }

    // Generación de la la tabla de productos apartir de la lista obtenida del api de Flask
    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">Gestionar Productos</h3>
                <br />
                <table key={'lista-productos'} className="table table-striped">
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Descripcion</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody key={'lista-productos-body'}>
                        {/* Mapeo de los datos obtenidos con el API de FLASK para obtener los productos y añadirlos a la tabla */}
                        {data.map((producto) => (
                            <tr style={{ textAlign: 'center' }} key={'prod-' + producto.codigo}>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.categoria}</td>
                                <td>${parseFloat(producto.precio).toFixed(2)}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.descripcion}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {/* Botones del acción para ejecutar las acciones de mostrar, actualizar y eliminar */}
                                    <Button id={'ver-' + producto.codigo} variant="outline-info" type="button" style={{ margin: '8px 0px' }} onClick={() => mostrarProductoCard(producto)}>Ver Producto</Button>
                                    <br />
                                    <Button variant="outline-success" type="submit" style={{ margin: '8px 0px' }} onClick={() => mostrarActualizarProducto(producto)} >Actualizar</Button>
                                    <br />
                                    <Button id={'button-editar' + producto.codigo} variant="outline-danger" type="button" style={{ margin: '8px 0px' }} onClick={() => mostrarAlertaBorrar(producto)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Construcción del componente del ModalProducto*/}
                <ModalProducto
                    id={'modal-' + datosProductoActual.codigo}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    datosProducto={datosProductoActual}
                />

                {/* Construcción del componente del ModalActualizarProducto*/}
                <ModalActualizarProducto
                    id={'modal-actualizar-' + datosProductoActual.codigo}
                    show={modalActualizar}
                    onHide={() => setModalActualizar(false)}
                    onReLoad={() => obtenerProductos()}
                    datosProducto={datosProductoActual}
                />

                {/* Construcción del componente del ModalAlerta*/}
                <ModalAlerta
                    id={'alerta-' + datosProductoActual.codigo}
                    show={alertaShow}
                    onHide={() => setAlertaShow(false)}
                    tipo={'producto'}
                    onReLoad={() => obtenerProductos()}
                    datosEliminar={datosProductoActual}
                />
            </div>
        </>
    );
}
