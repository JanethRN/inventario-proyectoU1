import { useState } from "react";
import { Image, Modal, Row } from "react-bootstrap"
import { FormularioProducto } from "./FormularioProducto"

export const ModalActualizarProducto = ({ id, show, onHide, onReLoad, datosProducto }) => {
    
    // const [alertaShow, setAlertaShow] = useState(show);
    // const [ hide, setHide] = useState(onHide);
    // onReLoad();
    // onHide(false);

    return <Modal
            id = {id}
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{ textAlign: 'center'}} closeButton>
                <Modal.Title style={{ textAlign: 'center', width: '100%'}}>
                <b>{datosProducto.codigo.toUpperCase()}</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <FormularioProducto tipo={'actualizar'} producto={datosProducto} onReLoad={()=>{onReLoad()}} onHide={()=>{onHide(false)}} />
            </Modal.Body>
        </Modal>
}