import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { useState } from 'react';
import { Link, useNavigate, Navigate } from "react-router-dom";
import { userData } from '../config/data-config';
import { Bienvenida } from "./Bienvenida";
import { BarraNavegacion } from "./BarraNavegacion";
import { guardarDatosUsuario, obtenerDatosUsuario } from "../funciones/usuario.funciones";

export const Login = () => {
    // let datosLogin = {};
    const navigate = useNavigate();

    const [mensajeError, setMensajeError] = useState("");

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        // 'Access-Control-Allow-Origin': 'http://localhost:3000' },
        body: JSON.stringify({
            nombreUsuario: name,
            password: password
        }),
        mode: 'cors'
    };

    const enviarDatosLogin = async () => {
        const res = await fetch('http://localhost:5000/login', requestOptions);
        const resData = await res.json();
        // setData(resData);
        // (resData.login);
        if (resData.login) {
            userData.nombreUsuario = resData.datosUsuario.nombreUsuario;
            userData.rol = resData.datosUsuario.rol;
            userData.correo = resData.datosUsuario.correo;
            // localStorage.setItem('userData', userData);
            guardarDatosUsuario(userData);
            navigate('/inicio');
            // return <Navigate to="/" replace />;
        } else {
            userData.nombreUsuario = "";
            userData.rol = "";
            userData.correo = "";
            localStorage.setItem('userData', userData);
            setMensajeError('Usuario no registrado');
        }

    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        return enviarDatosLogin();
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    
    
    if (obtenerDatosUsuario() !== null) {
        if (obtenerDatosUsuario().nombreUsuario !== '' && obtenerDatosUsuario().rol === 'administrador') {
            return <Navigate to="/inicio" replace />;
        }
    }

    


    return <>

        <BarraNavegacion />

        <Container>
            <Row>
                <Col sm={7} style={{ margin: 'auto', alignItems: 'center' }}>
                    <Bienvenida />
                </Col>

                <Col sm={1}>
                </Col>

                <Col sm={4} style={{ margin: 'auto', alignItems: 'center' }}>
                    <div style={{ paddingBottom: '48px', width: '100%' }}>

                        <br />
                        <h3 style={{ textAlign: 'center' }}>
                            INICIAR SESIÓN
                        </h3>
                        <br />
                        <Form validated={validated} onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <Form.Group className="mb-3" controlId="formBasicNombreUsuario">
                                <Form.Label>Nombre de usuario *</Form.Label>
                                <Form.Control onChange={e => setName(e.target.value)} value={name || ""} type="text" pattern="^[a-zA-Z]*[_.-]*[0-9]*$" placeholder="Ingrese el nombre de usuario" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Contraseña *</Form.Label>
                                <Form.Control type={passwordShown ? "text" : "password"} onChange={e => setPassword(e.target.value)} value={password || ""} placeholder="Contraseña" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Mostrar password" onClick={togglePassword} />
                            </Form.Group>
                            
                            <div style={{ textAlign: 'center', margin: 'auto' }}>
                                {
                                    mensajeError !== '' ? <label style={{ color: 'red' }}><i>* {mensajeError}</i><br/><br/></label> :  <label>{mensajeError}</label>
                                }
                            </div>
                            <div className="text-center justify-content-center">
                                <Button variant="outline-success" type="submit">Iniciar Sesión</Button>
                                <br />
                                <label><br />- o -</label>
                                <br />
                                <br />
                                <Link to="/invitado">
                                    <Button variant="outline-primary" >Ingresar Como Invitado</Button>
                                </Link>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>

        </Container>
    </>
}