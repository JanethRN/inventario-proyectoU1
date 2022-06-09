import { useState, useEffect } from 'react';

export const InformeProductos = () => {
    // Inicialización de variables
    let [data, setData] = useState([]);
    let [total, setTotal] = useState([]);
    
    // Función propia de react para la inicialización de variables y llamadas a APIs cada vez que nuestro componente se renderice
    useEffect(
        () => {
            obtenerInformeProductos();
        }, []);
    
    // Funcion para cargar la lista de informe monetario de productos mediante
    // Una petición al API de productos de Flask
    const obtenerInformeProductos = async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/informe-productos');
        // Conversión de la respuesta del API en json 
        const resData = await res.json();
        // Sumatoria total del precio por la cantidad de cada producto
        const total = resData.reduce((sumatoria, datosProducto) => ( typeof datosProducto.total == "number" ? sumatoria + datosProducto.total : sumatoria), 0);
        setData(resData); // Almacenamiento de los datos recibidos como respuesta a la petición
        setTotal(total); // Almacenamiento de la sumatoria total monetaria de los productos
    };

    // Generación de la la tabla de informe monetario de productos apartir de la lista obtenida del api de Flask
    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">Informe Monetario de Productos</h3>
                <br />
                <table className="table table-striped">
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeo de los datos obtenidos con el API de FLASK para obtener los proyectos y añadirlos a la tabla */}
                        {data.map((producto) => (
                            <tr style={{ textAlign: 'center' }} key={producto.id}>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>$ {parseFloat(producto.precio).toFixed(2)}</td>
                                <td>{producto.cantidad}</td>
                                <td>$ {parseFloat(producto.total).toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr style={{ textAlign: 'center' }} key='TotalMonetario'>
                            
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><b>TOTAL</b></td>
                            <td><b>$ {parseFloat(total).toFixed(2)}</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
