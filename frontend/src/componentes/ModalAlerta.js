import { Button, Image, Modal, Row } from "react-bootstrap"

export const ModalAlerta = ({ show, onHide, tipo, onReLoad, datosEliminar }) => {


    const requestOptions = {
        method: 'DELETE',
        mode: 'cors'
    };


    const eliminarProducto = async (codigo) => {
        await fetch('http://localhost:5000/productos/' + codigo, requestOptions);
        onReLoad();
        onHide(false);
    }


    const eliminarProveedor = async (ruc) => {
        await fetch('http://localhost:5000/proveedores/' + ruc, requestOptions);
        onReLoad();
        onHide(false);
    }

    if (tipo == 'producto') {

        return <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{ textAlign: 'center' }} closeButton>
                <Modal.Title style={{ textAlign: 'center', width: '100%' }}>
                    <b>¿Seguro quiere eliminar este producto?</b>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Row >
                    <span style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
                        Se eliminara el producto {datosEliminar.nombre}.
                        Una vez eliminado el producto no se podra recuperar.
                        <br />
                        ¿Que desea hacer?
                        <br />
                        <br />
                    </span>
                    <Image variant="top" src={datosEliminar.imagen} style={{ margin: 'auto', padding: '8px', width: '50%' }} />
                    <h4 style={{ textAlign: 'center', marginTop: '12px' }}>
                        <b>{datosEliminar.nombre.toUpperCase()}</b>
                    </h4>
                    <br />
                </Row>

            </Modal.Body>

            <Modal.Footer >

                <Button variant="outline-danger" onClick={
                    () => {
                        eliminarProducto(datosEliminar.codigo);
                    }
                }>
                    Eliminar
                </Button>
                <Button variant="outline-success" onClick={onHide}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    } else {

        return <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{ textAlign: 'center' }} closeButton>
                <Modal.Title style={{ textAlign: 'center', width: '100%' }}>
                    <b>¿Seguro quiere eliminar este proveedor?</b>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Row >
                    
                    <h4 style={{ textAlign: 'center', marginTop: '12px' }}>
                        <b>{datosEliminar.nombre.toUpperCase()}</b>
                    </h4>

                    <br />
                    <span style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
                        Se eliminara el proveedor {datosEliminar.nombre}.
                        Una vez eliminado el proveedor no se podra recuperar.
                        <br />
                        ¿Que desea hacer?
                        <br />
                        <br />
                    </span>
                </Row>

            </Modal.Body>

            <Modal.Footer >

                <Button variant="outline-danger" onClick={
                    () => {
                        eliminarProveedor(datosEliminar.ruc);
                    }
                }>
                    Eliminar
                </Button>
                <Button variant="outline-success" onClick={onHide}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    }

}