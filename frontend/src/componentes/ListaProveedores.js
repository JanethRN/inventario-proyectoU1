import { Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { ModalAlerta } from './ModalAlerta';
import { ModalActualizarProveedor } from './ModalActualizarProveedor';

export const ListaProveedores = () => {
    // Inicialización de variables
    const [data, setData] = useState([]);
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

    // Función propia de react para la inicialización de variables y llamadas a APIs cada vez que nuestro componente se renderice
    useEffect(
        () => {
            obtenerProveedores(); // Ejecución de la funcion para cargar la lista de proveedores
        }, []);
    
    // Funcion para cargar la lista de proveedores atravez de
    // Una petición al API de proveedores de Flask
    const obtenerProveedores = async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/proveedores');
        // Conversión de la respuesta del API en json 
        const resData = await res.json();
        setData(resData); // Almacenamiento de los datos recibidos como respuesta a la petición
    };
 
    // Funcion para mostrar la alerta de eliminación de proveedor
    const mostrarAlertaBorrar = (proveedor) => {
        // Almacenamiento de los datos proveedor seleccionado
        setDatosProveedorActual(proveedor);
        // Almacenamiento del estado de mostrar alerta en pantalla en verdadero
        setAlertaShow(true);
    }
    
    // Funcion para mostrar el formulario de actualizacióñ de proveedores
    const mostrarActualizarProveedor = (proveedor) => {
        // Almacenamiento de los datos proveedor seleccionado
        setDatosProveedorActual(proveedor);
        // Almacenamiento del estado de mostrar formulario de actualización en pantalla en verdadero
        setModalActualizar(true);
    }

    // Generación de la la tabla de proveedores apartir de la lista de proveedores obtenidos del api de Flask
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
                        {/* Mapeo de los datos obtenidos con el API de FLASK para añadirlo en la tabla de datos */}
                        {data.map((proveedor) => (
                            <tr style={{ textAlign: 'center' }} key={proveedor.ruc}>
                                <td>{proveedor.ruc}</td>
                                <td>{proveedor.nombre}</td>
                                <td>{proveedor.provincia}</td>
                                <td>{proveedor.ciudad}</td>
                                <td>{proveedor.direcion}</td>
                                <td>{proveedor.telefono}</td>
                                <td>{proveedor.correo_electronico}</td>
                                <td>{/* Botones del acción para ejecutar las acciones de mostrar y eliminar */}
                                    <Button variant="outline-success" type="button" onClick={() => mostrarActualizarProveedor(proveedor)}>Actualizar</Button>
                                    <br />
                                    <br />
                                    <Button variant="outline-danger" type="button" onClick={() => mostrarAlertaBorrar(proveedor)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Construcción del componente del ModalActualizarProveedor*/}
                <ModalActualizarProveedor
                    id={'modal-actualizar-' + datosProveedorActual.ruc}
                    show={modalActualizar}
                    onHide={() => setModalActualizar(false)}
                    onReLoad={() => obtenerProveedores()}
                    datosProveedor={datosProveedorActual}
                />

                {/* Construcción del componente del ModalAlerta*/}
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
