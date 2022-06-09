import { useState, useEffect } from 'react';

export const InformeSinStock = () => {
    // Inicialización de variables
    let [data, setData] = useState([]);

    // Función propia de react para la inicialización de variables y llamadas a APIs cada vez que nuestro componente se renderice
    useEffect(
        () => {
            obtenerInformeProductosSinStock(); // Ejecución de la funcion para cargar la lista de productos
        }, []);

    // Funcion para cargar la lista de informe sin stock registrados mediante
    // Una petición al API de productos de Flask
    const obtenerInformeProductosSinStock = async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/informe-sin-stock');
        // Conversión de la respuesta del API en json 
        const resData = await res.json();
        setData(resData); // Almacenamiento de los datos recibidos como respuesta a la petición
    };

    // Generación de la la tabla de productos sin stock apartir de la lista obtenida del api de Flask
    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">Informe de Productos sin Stock</h3>
                <br />
                <table className="table table-striped">
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Proveedor</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Descripcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeo de los datos obtenidos con el API de FLASK para obtener las categorias y añadirlos a la tabla */}
                        {data.map((producto) => (
                            <tr style={{ textAlign: 'center' }} key={producto.id}>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.categoria}</td>
                                <td>{producto.proveedor}</td>
                                <td>${parseFloat(producto.precio).toFixed(2)}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.descripcion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
