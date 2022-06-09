import { Card } from "react-bootstrap"

export const CardProducto = ({ cardData }) => {
    return <>
        <Card key={cardData.id} style={{ width: '280px', margin: '24px' }}>
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