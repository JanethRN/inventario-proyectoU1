import { Button, Image, Modal, Row } from "react-bootstrap"

export const ModalMensajeAdvertencia = ({ show, onHide, tipo }) => {

    if (tipo == 'stock') {

        return <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{ textAlign: 'center' }} closeButton>
                <Modal.Title style={{ textAlign: 'center', width: '100%' }}>
                    <b>¡Producto no registrado!</b>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Row >
                    <span style={{ textAlign: 'center', width: '100%' }}>
                        El codigo que ingreso no esta registtrado en el sistema.
                        Verifica el código o ingresalo como un nuevo producto.
                        <br />
                    </span>
                    <br />
                </Row>

            </Modal.Body>

            <Modal.Footer >
                <Button variant="outline-success" onClick={onHide}>
                    Continuar
                </Button>
            </Modal.Footer>
        </Modal>
    }
}