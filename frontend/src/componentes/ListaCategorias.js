import { useState, useEffect } from 'react';

export const ListaCategorias = () => {
    // Inicialización de variables
    let [data, setData] = useState([]);

    // Función propia de react para la inicialización de variables y llamadas a APIs cada vez que nuestro componente se renderice
    useEffect(
        () => {
            obtenerCategorias(); // Ejecución de la funcion para cargar la lista de categorias
        }, []);

    // Funcion para cargar la lista de categorias mediante
    // Una petición al API de categorias de Flask
    const obtenerCategorias = async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/categorias');
        // Conversión de la respuesta del API en json 
        const resData = await res.json();
        setData(resData) // Almacenamiento de los datos recibidos como respuesta a la petición
    };

    // Generación de la tabla de categorias apartir de la lista obtenida del api de Flask
    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">Lista de Categorías</h3>
                <br />
                <table className="table table-striped">
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>codigo</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeo de los datos obtenidos con el API de FLASK para obtener las categorias y añadirlos a la tabla */}
                        {data.map((categoria) => (
                            <tr style={{ textAlign: 'center' }} key={categoria.id}>
                                <td>{categoria.codigo}</td>
                                <td>{categoria.nombre}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    );
}
