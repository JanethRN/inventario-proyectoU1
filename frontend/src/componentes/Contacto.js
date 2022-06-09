import { Row, Col, Container } from "react-bootstrap";
import { BarraNavegacion } from "./BarraNavegacion";
import { Image } from "react-bootstrap";

export const Contacto = () => {

    return <>
        <BarraNavegacion />
        <Container>
            {/* https://img.freepik.com/vector-gratis/gente-compra-tienda-herramientas-ilustracion-dibujos-animados-hombre-plano-comprador-personajes-cliente-comprando-equipos-caja-herramientas-reparacion-casa_169479-804.jpg*/}
            <div className="text-center justify-content-center" style={{ margin: '0px' }}>

                <h2 style={{ margin: '24px', marginTop: '56px' }}>
                    CONTÁCTANOS A:
                </h2>
                <br/>
                <Row>
                    <Col>
                        <h4 style={{ margin: '24px' }}>
                            Redes Sociales
                        </h4>
                        <div style={{ margin: 'auto' }}>
                            <div style={{ textAlign: 'justify', margin: 'auto', width: '100%', maxWidth: '300px' }}>
                                <span>
                                    <b>Facebook: </b> @Ferreteria ESPE
                                    <br/>
                                    <b>Instagram: </b> @Ferreteria ESPE Oficial
                                    <br/>
                                    <b>Twiter:</b> @Ferreteria ESPE
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col >
                        <h4 style={{ margin: '24px'}}>
                            Dirección
                        </h4>
                        <span style={{ margin: 'auto'}}>
                            Avenida Principal, Calle 5, N-400, En toda la esquina.
                        </span>
                    </Col>
                    <Col >
                        <h4 style={{ margin: '24px'}}>
                            Teléfonos
                        </h4>
                        <span style={{ margin: 'auto'}}>
                            3010-559 / 0997-656-858
                        </span>
                    </Col>
                </Row>
                {/* <span >
                    Además, en nuestra ferreteria tendrá una atención preferencial y personalizada, ya que para Ferreteria ESPE lo más importante es usted.
                </span> */}
                <br />
                <br />
                <br />
                <Image style={{ width: '100%', height: 'auto', maxHeight: '500px', maxWidth: '1000px', borderRadius: '24px' }} src="https://img.freepik.com/vector-gratis/gente-compra-tienda-herramientas-ilustracion-dibujos-animados-hombre-plano-comprador-personajes-cliente-comprando-equipos-caja-herramientas-reparacion-casa_169479-804.jpg?w=1000" />
            </div>
        </Container>
    </>
}