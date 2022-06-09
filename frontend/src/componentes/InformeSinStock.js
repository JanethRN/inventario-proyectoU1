import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';

export const InformeSinStok = () => {
    let [data, setData] = useState([]);

    useEffect(
        () => {
            obtenerProductos();
        }, []);

    const obtenerProductos = async () => {
        const res = await fetch('http://localhost:5000/informe-sin-stock');
        const resData = await res.json();
        setData(resData);
    };


    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

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
