import { Button, Image, Modal, Row } from "react-bootstrap"

export const ModalAlerta = ({ show, onHide, tipo, onReLoad, datosEliminar }) => {

    // Especificaicón de las opciones necesarias para la petición al api FLASK
    const requestOptions = {
        method: 'DELETE',
        mode: 'cors'
    };

    // Funcion para eliminar un producto mediante el codigo del producto atravez de
    // Una petición al API de productos de Flask
    const eliminarProducto = async (codigo) => {
        // Petición al API FLASK
        await fetch('http://localhost:5000/productos/' + codigo, requestOptions);
        onReLoad(); // Ejecución de la funcion recibida por referencia para recargar los datos de la lista de productos
        onHide(false); // Ejecución de la funcion recibida por referencia para ocultar el modal de la pantalla
    }

    // Funcion para eliminar un proveedor mediante el ruc del provedor atravez de
    // Una petición al API de proveedores de Flask
    const eliminarProveedor = async (ruc) => {
        // Petición al API FLASK
        await fetch('http://localhost:5000/proveedores/' + ruc, requestOptions);
        onReLoad(); // Ejecución de la funcion recibida por referencia para recargar los datos de la lista de proveedores
        onHide(false); // Ejecución de la funcion recibida por referencia para ocultar el modal de la pantalla
    }

    // Verificación de tipo de modal que se debe crear en la pantalla 
    if (tipo === 'producto') {
        // Generación del modal de alerta de eliminación de productos
        // Con el uso del elemento Modal de bootstrap, Row, Image y Button
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
                <Row > {/* Contenido del modal con el mensaje de eliminación de producto */}
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

            <Modal.Footer > {/* Botones del modal para ejecutar las acciones de eliminar y cancelar */}
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
        // Generación del modal de alerta de eliminación de proveedores
        // Con el uso del elemento Modal de bootstrap, Row, Image y Button
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
                <Row >  {/* Contenido del modal con el mensaje de eliminación de proveedor */}
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

            <Modal.Footer >{/* Botones del modal para ejecutar las acciones de eliminar y cancelar */}
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