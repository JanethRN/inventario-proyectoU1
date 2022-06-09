import { Form, Button, Row, Col} from "react-bootstrap";
import { useEffect, useState } from 'react';

export const FormularioCategoria = () => {
    // Inicialización de variables
    const [codigoCategoria, setCodigoCategoria] = useState("");
    const [nombre, setNombre] = useState("");
    let [categorias, setCategorias] = useState([]);
    const [validated, setValidated] = useState(false);
    
    // Función propia de react para la inicialización de variables y llamadas a APIs cada vez que nuestro componente se renderice
    useEffect(
        () => {
            obtenerCategorias(); // Ejecución de la funcion para cargar la lista de ccategorias
    }, []);
    
    // Especificaicón de las opciones necesarias para la petición al api FLASK
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            id: '' + categorias.length,
            nombre: nombre,
            codigo: codigoCategoria
        }),
        mode: 'cors',
    };

    // Funcion para agregar un nueva categoria mediante
    // Una petición al API de categorias de Flask
    const agregarCategoria = async () => {
        // Petición al API FLASK
        const res = await fetch('http://localhost:5000/categorias', requestOptions);
        // Ejecución de la funcion para recargar la pagina con los nuevos datos
        window.location.reload(false);
    };

    // Funcion para obtener la lsita de categorias mediante
    // Una petición al API de categorias de Flask
    const obtenerCategorias = async () => {
        // Petición al API FLASK
        const resData = await fetch('http://localhost:5000/categorias');
        // Conversión a json
        const resCategorias = await resData.json();
        //Almacenamiento de las categorias y generación del nuevo codigo de categoria
        setCategorias(resCategorias);
        setCodigoCategoria(
            'CAT-' + (resCategorias.length + 1 ), 
        )
    };

    // Funcion para comprobar si los datos ingresados en le formulario son validos
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();// Funcion para detener la carga de pantalla tras el summit del formulario
        // Validación para conprobar si el formulario e svalido
        if (form.checkValidity() === false) {
            // Si no es valido se muestran los errores correspondientes
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    // Generación del formulario de proveedores
    return (
        <>
            <div className='container'>
                <h3 className="text-center justify-content-center">Ingresar una Nueva Categoría</h3>
                <br />
                {/* Creación del formulario de productos, con el elemento de Form de Bootstrap*/}
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
