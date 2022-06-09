import { Card } from "react-bootstrap"

export const CardProducto = ({ cardData }) => {
    // Generación del componente CARD para productos con el contenido correspondiente 
    // Junto con una imagen representativa
    // Titulo, descripción y precio correspondiente al producto
    return <>
        <Card key={cardData.id} style={{ width: '280px', margin: '24px' }}> {/* Uso del elemento card de bootstrap */}
            <Card.Img variant="top" src={cardData.imagen} style={{ padding: '8px' }} />
            <Card.Body>
                <Card.Title style={{ textAlign: 'center' }} >{cardData.nombre}</Card.Title>
                <Card.Text>
                    {cardData.descripcion}
                </Card.Text>
                <Card.Title style={{ textAlign: 'center' }}>
                    <b>Precio: </b>${parseFloat(cardData.precio).toFixed(2)}
                </Card.Title>
            </Card.Body>
        </Card>
    </>
}