import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';

export const ListaCategorias = () => {
    let [data, setData] = useState([]);
    useEffect(
        () => {
            obtenerCategorias();
        }, []);

    const obtenerCategorias = async () => {
        const res = await fetch('http://localhost:5000/categorias');
        const resData = await res.json();
        setData(resData)
    };

    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

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
