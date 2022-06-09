import { Button, Image, Modal, Row } from "react-bootstrap"

export const ModalMensajeAdvertencia = ({ show, onHide, tipo }) => {
    // Validación del tipo de mensaje debe mostrarse en pantalla
    if (tipo === 'stock') {
        // Generación del componente de Mensaje de Advertencia con:
        // El componente Barra de navegación y un contenedor con el contenido del componente
        // Con el uso del elemento Modal de bootstrap, Row y Button
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
                <Row >  {/* Elemento Row de Bootstrap */}
                    <span style={{ textAlign: 'center', width: '100%' }}>
                        El codigo que ingreso no esta registtrado en el sistema.
                        Verifica el código o ingresalo como un nuevo producto.
                        <br />
                    </span>
                    <br />
                </Row>

            </Modal.Body>

            <Modal.Footer >
                {/* Elemento Botton de Bootstrap con la acción de cancelar*/}
                <Button variant="outline-success" onClick={onHide}>
                    Continuar
                </Button>
            </Modal.Footer>
        </Modal>
    }
}