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
    } else {

        // return <Modal
        //     show={show}
        //     onHide={onHide}
        //     aria-labelledby="contained-modal-title-vcenter"
        //     centered
        // >
        //     <Modal.Header style={{ textAlign: 'center' }} closeButton>
        //         <Modal.Title style={{ textAlign: 'center', width: '100%' }}>
        //             <b>¿Seguro quiere eliminar este proveedor?</b>

        //         </Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body >
        //         <Row >
                    
        //             <h4 style={{ textAlign: 'center', marginTop: '12px' }}>
        //                 <b>{datosEliminar.nombre.toUpperCase()}</b>
        //             </h4>

        //             <br />
        //             <span style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
        //                 Se eliminara el proveedor {datosEliminar.nombre}.
        //                 Una vez eliminado el proveedor no se podra recuperar.
        //                 <br />
        //                 ¿Que desea hacer?
        //                 <br />
        //                 <br />
        //             </span>
        //         </Row>

        //     </Modal.Body>

        //     <Modal.Footer >

        //         <Button variant="outline-danger" onClick={
        //             () => {
        //                 eliminarProveedor(datosEliminar.ruc);
        //             }
        //         }>
        //             Eliminar
        //         </Button>
        //         <Button variant="outline-success" onClick={onHide}>
        //             Cancelar
        //         </Button>
        //     </Modal.Footer>
        // </Modal>
    }

}