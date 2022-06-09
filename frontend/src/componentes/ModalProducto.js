import { Image, Modal, Row } from "react-bootstrap"

export const ModalProducto = ({ id, show, onHide, datosProducto }) => {
    // Generación del componente ModalProducto para mostrar el producto completo
    // Con el uso del elemento Modal de bootstrap, Row e Image
    return <Modal
        id={id}
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header style={{ textAlign: 'center' }} closeButton>
            <Modal.Title style={{ textAlign: 'center', width: '100%' }}>
                <b>{datosProducto.nombre.toUpperCase()}</b>
            </Modal.Title>
        </Modal.Header>

        <Modal.Body >
            <Row > {/* Contenido del modal con los datos del producto */}
                <h6 style={{ textAlign: 'center', marginTop: '16px', marginBottom: '24px' }}>
                    <b>Código: </b> {datosProducto.codigo}
                </h6>

                <Image variant="top" src={datosProducto.imagen} style={{ margin: 'auto', padding: '8px', width: '50%' }} />

                <span style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>

                    <h5>
                        <b>Descripción</b>
                    </h5>
                    {datosProducto.descripcion}
                    <br />
                    <br />
                </span>

                <h4 style={{ textAlign: 'center', marginTop: '24px' }}>
                    <b>Precio: </b>${parseFloat(datosProducto.precio).toFixed(2)}
                </h4>
            </Row>
        </Modal.Body>
    </Modal>
}