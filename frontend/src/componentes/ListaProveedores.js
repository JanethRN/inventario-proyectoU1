import { Navigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { ModalAlerta } from './ModalAlerta';
import { ModalActualizarProveedor } from './ModalActualizarProveedor';

export const ListaProveedores = () => {
    let [data, setData] = useState([]);

    const [alertaShow, setAlertaShow] = useState(false);
    const [modalActualizar, setModalActualizar] = useState(false);
    const [datosProveedorActual, setDatosProveedorActual] = useState({
        ciudad: "",
        correo_electronico: "",
        direcion: "",
        id: "",
        nombre: "",
        provincia: "",
        ruc: "",
        telefono: "",
    });

    useEffect(
        () => {
            obtenerProveedores();
        }, []);

    const obtenerProveedores = async () => {
        const res = await fetch('http://localhost:5000/proveedores');
        const resData = await res.json();
        setData(resData)
    };

    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    const mostrarAlertaBorrar = (proveedor) => {
        setDatosProveedorActual(proveedor);
        setAlertaShow(true);
    }

    const mostrarActualizarProducto = (proveedor) => {
        setDatosProveedorActual(proveedor);
        setModalActualizar(true);
    }

    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">Gestionar Proveedores</h3>
                <br />
                <table className="table table-striped">
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>RUC</th>
                            <th>Nombre</th>
                            <th>Provincia</th>
                            <th>Ciudad</th>
                            <th>Dirección</th>
                            <th>Telefono</th>
                            <th>Correo electronico</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((proveedor) => (
                            <tr style={{ textAlign: 'center' }} key={proveedor.ruc}>
                                <td>{proveedor.ruc}</td>
                                <td>{proveedor.nombre}</td>
                                <td>{proveedor.provincia}</td>
                                <td>{proveedor.ciudad}</td>
                                <td>{proveedor.direcion}</td>
                                <td>{proveedor.telefono}</td>
                                <td>{proveedor.correo_electronico}</td>
                                <td>
                                    <Button variant="outline-success" type="button" onClick={() => mostrarActualizarProducto(proveedor)}>Actualizar</Button>
                                    <br />
                                    <br />
                                    <Button variant="outline-danger" type="button" onClick={() => mostrarAlertaBorrar(proveedor)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ModalActualizarProveedor
                    id={'modal-actualizar-' + datosProveedorActual.ruc}
                    show={modalActualizar}
                    onHide={() => setModalActualizar(false)}
                    onReLoad={() => obtenerProveedores()}
                    datosProveedor={datosProveedorActual}
                />

                <ModalAlerta
                    id={'alerta-' + datosProveedorActual.ruc}
                    show={alertaShow}
                    onHide={() => setAlertaShow(false)}
                    tipo={'proveedor'}
                    onReLoad={() => obtenerProveedores()}
                    datosEliminar={datosProveedorActual}
                />

            </div >
        </>
    );
}
