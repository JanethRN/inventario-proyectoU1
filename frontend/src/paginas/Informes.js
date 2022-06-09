import { Navigate } from 'react-router-dom';
import { obtenerDatosUsuario } from '../funciones/usuario.funciones';
import { Container } from "react-bootstrap";
import { BarraNavegacion } from "../componentes/BarraNavegacion";
import { Image } from "react-bootstrap";

export const Informes = () => {

    if (!obtenerDatosUsuario()) {
        return <Navigate to="/inicio" replace />;
    }

    return (
        <>
            <BarraNavegacion />

            <Container>
                {/* https://img.freepik.com/vector-gratis/gente-compra-tienda-herramientas-ilustracion-dibujos-animados-hombre-plano-comprador-personajes-cliente-comprando-equipos-caja-herramientas-reparacion-casa_169479-804.jpg*/}
                <div className="text-center justify-content-center" style={{ margin: '0px' }}>

                    <h2 style={{ margin: '24px', marginTop: '56px' }}>
                        MÓDULO DE STOCK DE INFORMES
                    </h2>
                    <br />
                    <br />

                    <h3 >
                        <i>
                            "No existen registros para mostrar."
                        </i>
                    </h3>
                    <br />
                    <Image style={{ width: '100%', height: 'auto', minWidth: '200px' }} src="https://img.freepik.com/vector-gratis/interior-ferreteria-personas-que-eligen-compran-herramientas-bricolaje-trabajos-mantenimiento-construccion-renovacion-tienda-herramientas-clientes-dentro-ilustracion-vector-plano-dibujos-animados_341509-3187.jpg?w=1000" />
                </div>
            </Container>
        </>
    );
}
