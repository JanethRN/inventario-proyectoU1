import { Row, Container } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { BarraNavegacion } from "../componentes/BarraNavegacion";
import { CardProducto } from "../componentes/Card";

export const Catalogo = ({ user }) => {

    let [data, setData] = useState([]);

    useEffect(
        () => {
            obtenerProductos();
        }, []);

    const obtenerProductos = async () => {
        const res = await fetch('http://localhost:5000/productos-por-categoria');
        const resData = await res.json();
        // const total = resData.reduce((sumatoria, datosProducto) => (typeof datosProducto.total == "number" ? sumatoria + datosProducto.total : sumatoria), 0);
        setData(resData);
    };

    return (
        <>
            <BarraNavegacion />

            <br />
            <br />
            <h2 className="text-center justify-content-center">CATÁLOGO DE PRODUCTOS</h2>
            <br />

            <Container>

                {
                    data.map(
                        (categoriaProductos, index) => (
                            <Container key={'tabla-container-' + index}>

                                <br />
                                <h3 style={{ textAlign: 'center' }}>{categoriaProductos[index].categoria}</h3>
                                <br />
                                <Row>
                                    {

                                        categoriaProductos.map(
                                            (producto) => (
                                                <CardProducto key={producto.codigo} cardData={producto} />
                                            )
                                        )
                                    }

                                </Row>

                                <br />
                            </Container>
                        )
                    )
                }
            </Container>
        </>
    );
}
