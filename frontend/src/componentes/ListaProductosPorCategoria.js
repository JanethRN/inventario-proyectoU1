import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { Button, Container } from 'react-bootstrap';
import { ModalProducto } from './ModalProducto';

export const ListaProductosPorCategoria = () => {
    let [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    useEffect(
        () => {
            obtenerProductos();
        }, []);

    const obtenerProductos = async () => {
        const res = await fetch('http://localhost:5000/productos-por-categoria');
        const resData = await res.json();
        const total = resData.reduce((sumatoria, datosProducto) => (typeof datosProducto.total == "number" ? sumatoria + datosProducto.total : sumatoria), 0);
        setData(resData);
    };

    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">Lista de Productos por Categoría</h3>
                <br />
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
                                    {
                                        categoriaProductos.map(
                                            (producto) => (
                                                <tr style={{ textAlign: 'center' }} key={producto.id}>
                                                    <td>{producto.codigo}</td>
                                                    <td>{producto.nombre}</td>
                                                    <td>$ {parseFloat(producto.precio).toFixed(2)}</td>
                                                    <td>{producto.descripcion}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Button
                                                            onClick={() => setModalShow(true)}
                                                            variant="outline-info"
                                                            type="summir"
                                                            style={{ margin: '8px 0px' }}
                                                        >
                                                            Ver Producto
                                                        </Button>

                                                        <ModalProducto
                                                            show={modalShow}
                                                            onHide={() => setModalShow(false)}
                                                            datosProducto={producto}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                            <br />
                        </Container>
                    )
                )}
            </div>
        </>
    );
}
