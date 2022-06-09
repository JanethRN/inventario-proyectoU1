import { Modal } from "react-bootstrap"
import { FormularioProducto } from "./FormularioProducto"

export const ModalActualizarProducto = ({ id, show, onHide, onReLoad, datosProducto }) => {
    // Generación del componente ModalActualizarProducto para actualizar productos
    // Con el uso del elemento Modal de bootstrap y el componente FormularioProducto
    return <Modal
        id={id}
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header style={{ textAlign: 'center' }} closeButton>
            <Modal.Title style={{ textAlign: 'center', width: '100%' }}>
                <b>{datosProducto.codigo.toUpperCase()}</b>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            {/* Componente del formulario de producto*/}
            <FormularioProducto tipo={'actualizar'} producto={datosProducto} onReLoad={() => { onReLoad() }} onHide={() => { onHide(false) }} />
        </Modal.Body>
    </Modal>
}