import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { ModalProducto } from './ModalProducto';

export const ListaProductosPorCategoria = () => {
    // Inicialización de variables
    let [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
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
            obtenerProductos();
        }, []);

    // Funcion para cargar la lista de productos agrupados por categorias atravez de
    // Una petición al API de productos-categorias de Flask
    const obtenerProductos = async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/productos-por-categoria');
        // Conversión de la respuesta del API en json 
        const resData = await res.json();
        setData(resData);  // Almacenamiento de los datos recibidos como respuesta a la petición
    };

    // Funcion para mostrar la tarjeta de producto
    const mostrarProductoCard = (producto) => {
        // Almacenamiento de los datos del producto seleccionado
        setDatosProductoActual(producto);
        // Almacenamiento del estado de mostrar tarjeta en pantalla en verdadero
        setModalShow(true);
    }

    // Generación de la la tabla de productos apartir de la lista agrupada de productos por categoria obtenidos del api de Flask
    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">Lista de Productos por Categoría</h3>
                <br />
                {/* Primer mapeo de los datos obtenidos con el API de FLASK para obtener los grupos de categorias */}
                {data.map(
                    (categoriaProductos, index) => (
                        <Container key={'tabla-container-' + index}>
                            <br />
                            <h3 style={{ textAlign: 'center' }}>{categoriaProductos[index].categoria}</h3>
                            <br />
                            <table key={'tabla-' + index} className="table table-striped">
                                <thead>
                                    <tr key={'tabla-title' + index} style={{ textAlign: 'center' }}>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Descripción</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {/* Segundo mapeo de los datos obtenidos con el API de FLASK para obtener los productos de cada grupo de categoria */}
                                    {categoriaProductos.map(
                                        (producto) => (
                                            <tr style={{ textAlign: 'center' }} key={producto.id}>
                                                <td>{producto.codigo}</td>
                                                <td>{producto.nombre}</td>
                                                <td>$ {parseFloat(producto.precio).toFixed(2)}</td>
                                                <td>{producto.descripcion}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    {/* Boton para ejecutar la accion de mostrar prodcuto */}
                                                    <Button
                                                        onClick={() => mostrarProductoCard(producto)}
                                                        variant="outline-info"
                                                        type="summir"
                                                        style={{ margin: '8px 0px' }}
                                                    >
                                                        Ver Producto
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            <br />
                            {/* Construcción del componente del ModalActualizarProveedor*/}

                            <ModalProducto
                                id={'cat-modal-' + datosProductoActual.codigo}
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                datosProducto={datosProductoActual}
                            />
                        </Container>
                    )
                )}
            </div>
        </>
    );
}
