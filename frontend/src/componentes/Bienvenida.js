import { Image } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { obtenerDatosUsuario } from "../funciones/usuario.funciones";

export const Bienvenida = () => {

    return <div className="text-center justify-content-center" style={{ margin: '0px' }}>
        
        <br/>
        <h2 style={{ margin: '24px', marginTop: '56px' }}>
            BIENVENIDOS A FERRETERIA ESPE
        </h2>
        <br/>
        <span >
            En nuestro sitio web encontrará todas las soluciones para los proyectos de su hogar, a un precio inigualable en el mercado.
        </span>
        <br/>
        <br/>
        <span >
            Además, en nuestra ferreteria tendrá una atención preferencial y personalizada, ya que para Ferreteria ESPE lo más importante es usted.
        </span>
        <br/>
        <br/>
        <br/>
        <Image style={{ width: '100%',  height:'auto', maxHeight:'500px', minWidth:'300px', maxWidth:'700px',  borderRadius: '24px' }} src="https://www.canalferretero.com/images/galerias/grande/5f6dbe2079fc4.jpg"/>
    </div>
}