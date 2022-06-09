import { Form, Button, Row, Col} from "react-bootstrap";
import { useEffect, useState } from 'react';

export const FormularioCategoria = () => {

    const [codigoCategoria, setCodigoCategoria] = useState("");
    const [nombre, setNombre] = useState("");
    let [categorias, setCategorias] = useState([]);
    const [validated, setValidated] = useState(false);
    
    useEffect(
        () => {
            obtenerCategorias();
    }, []);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            // codigo: datosProducto.codigo,
            // nuevaCantidad: totalCantidad
            id: '' + categorias.length,
            nombre: nombre,
            codigo: codigoCategoria
        }),
        mode: 'cors',
    };

    const agregarCategoria = async () => {
        const res = await fetch('http://localhost:5000/categorias', requestOptions);
        const resProducto = await res.json();
        obtenerCategorias();
        window.location.reload(false);
    };

    const obtenerCategorias = async () => {
        const resData = await fetch('http://localhost:5000/categorias');
        const resCategorias = await resData.json();
        // console.log(resCategorias);
        setCategorias(resCategorias);
        setCodigoCategoria(
            'CAT-' + (resCategorias.length + 1 ), 
        )
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        console.log(nombre)
        setValidated(true);
    };


    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">Ingresar una Nueva Categoría</h3>
                <br />
                <Form validated={validated} onSubmit={handleSubmit} >
                    <Form.Group className="mb-3" controlId="formBasicCodigo" as={Row}>
                        <Form.Label column sm="2">Codigo *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" 
                                onChange={e => setCodigoCategoria(e.target.value)} value={codigoCategoria}
                                disabled
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNombre" as={Row}>
                        <Form.Label column sm="2">Nombre Categoría *</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Nombre"
                                onChange={e => setNombre(e.target.value)} value={nombre}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <div className="text-center justify-content-center">
                        <Button
                            variant="outline-success"
                            type="submit"
                            onClick={() => {agregarCategoria()}}
                        >
                            Agregar
                        </Button>
                    </div>
                </Form>
                <br />
                <br />
                <br />
            </div>
        </>
    );
}
