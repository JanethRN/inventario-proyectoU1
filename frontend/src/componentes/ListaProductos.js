import { Navigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { ModalProducto } from './ModalProducto';
import { ModalAlerta } from './ModalAlerta';
import { ModalActualizarProducto } from './ModalActualizarProducto';

export const ListaProductos = (datosProductos) => {
    // console.log(datosProductos);
    let [data, setData] = useState(
        datosProductos.datosProductos
    );
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

    useEffect(
        () => {
            obtenerProductos();
        }, []
    );

    const obtenerProductos = async () => {
        const res = await fetch('http://localhost:5000/productos');
        const resData = await res.json();
        setData(resData);
    };

    // const requestOptions = {
    //     method: 'DELETE',
    //     mode: 'cors'
    // };

    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    const mostrarProductoCard = (producto) => {
        setDatosProductoActual(producto);
        setModalShow(true);
    }


    const mostrarActualizarProducto = (producto) => {
        setDatosProductoActual(producto);
        setModalActualizar(true);
    }

    const mostrarAlertaBorrar = (producto) => {
        setDatosProductoActual(producto);
        setAlertaShow(true);
    }

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
                        {data.map((producto) => (
                            <tr style={{ textAlign: 'center' }} key={producto.codigo}>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.categoria}</td>
                                <td>${parseFloat(producto.precio).toFixed(2)}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.descripcion}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Button id={'ver-'+producto.codigo} variant="outline-info" type="button" style={{ margin: '8px 0px' }} onClick={() => mostrarProductoCard(producto)}>Ver Producto</Button>
                                    <br />
                                    <Button variant="outline-success" type="submit" style={{ margin: '8px 0px' }} onClick={() => mostrarActualizarProducto(producto)} >Actualizar</Button>
                                    <br />
                                    <Button id={'button-editar'+producto.codigo} variant="outline-danger" type="button" style={{ margin: '8px 0px' }} onClick={() => mostrarAlertaBorrar(producto)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ModalProducto
                    id={'modal-'+datosProductoActual.codigo}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    datosProducto={datosProductoActual}
                />
                <ModalActualizarProducto
                    id={'modal-actualizar-'+datosProductoActual.codigo}
                    show={modalActualizar}
                    onHide={() => setModalActualizar(false)}
                    onReLoad={() => obtenerProductos()}
                    datosProducto={datosProductoActual}
                />
                <ModalAlerta
                    id={'alerta-'+datosProductoActual.codigo}
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
