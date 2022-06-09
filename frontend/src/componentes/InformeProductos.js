import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';

export const InformeProductos = () => {
    let [data, setData] = useState([]);
    let [total, setTotal] = useState([]);

    useEffect(
        () => {
            obtenerProductos();
        }, []);

    const obtenerProductos = async () => {
        const res = await fetch('http://localhost:5000/informe-productos');
        const resData = await res.json();
        const total = resData.reduce((sumatoria, datosProducto) => ( typeof datosProducto.total == "number" ? sumatoria + datosProducto.total : sumatoria), 0);
        setData(resData);
        setTotal(total);
    };


    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

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
