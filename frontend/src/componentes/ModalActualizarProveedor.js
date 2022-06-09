import { Modal } from "react-bootstrap"
import { FormularioProveedor } from "./FormularioProveedor"

export const ModalActualizarProveedor = ({ id, show, onHide, onReLoad, datosProveedor }) => {
    // Generación del componente ModalActualizarProveedor para actualizar provedores
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
                <b>RUC: {datosProveedor.ruc}</b>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            {/* Componente del formulario de proveedor*/}
            <FormularioProveedor tipo={'actualizar'} proveedor={datosProveedor} onReLoad={() => { onReLoad() }} onHide={() => { onHide(false) }} />
        </Modal.Body>
    </Modal>
}