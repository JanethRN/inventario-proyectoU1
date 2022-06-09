import { Row, Container } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { BarraNavegacion } from "../componentes/BarraNavegacion";
import { CardProducto } from "../componentes/Card";

export const Catalogo = ({ user }) => {
    //Inicialización de varibles
    let [data, setData] = useState([]);
    // Función propia de react para la inicialización de variables y llamadas a APIs cada vez que nuestro componente se renderice
    useEffect(
        () => {
            obtenerProductos();
        }, []);
    
    // Funcion anonima para obtener la lista de productos agrupados por categorias
    const obtenerProductos = async () => {
        // Petición de datos al API FLASK
        const res = await fetch('http://localhost:5000/productos-por-categoria');
        // Conversión de la respuesta del API en json 
        const resData = await res.json();
        setData(resData);
    };

    // Generación de la página de CATÁLOGO con:
    // El componente Barra de navegación y un contenedor con el contenido de la página
    // Junto los componentes de CardProducto
    return (
        <>
            <BarraNavegacion /> {/* Componente de la barra de navagación*/}
            <br />
            <br />
            <h2 className="text-center justify-content-center">CATÁLOGO DE PRODUCTOS</h2>
            <br />
            <Container> {/* Contenedor del contenido de la pagina */}
                {
                    data.map(
                        (categoriaProductos, index) => (
                            <Container key={'tabla-container-' + index}> {/* Contenedor de las tarjetas de productos por categoria */}
                                <br />
                                <h3 style={{ textAlign: 'center' }}>{categoriaProductos[index].categoria}</h3>
                                <br />
                                <Row> {/* Generación de las tarjetas de productos */}
                                    {categoriaProductos.map(
                                        (producto) => (
                                            <CardProducto key={producto.codigo} cardData={producto} />
                                        )
                                    )}
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
