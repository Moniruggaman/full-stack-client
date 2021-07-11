import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { UserContext } from '../App';

const OrderDetail = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [ordered, setOrdered] = useState([]);
    console.log(ordered);

    useEffect(() => {
        fetch(`http://localhost:5055/ordered?email=` + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            authorization: `Bearer  ${sessionStorage.getItem('authToken')}`

        })
            .then(res => res.json())
            .then(data => setOrdered(data))
    }, [loggedInUser.email])

    return (
        <div>
            <h4>Product ordered by the customers.</h4>
            {
                ordered.map(pd => <Card style={{ width: '20rem' }} className="px-4 mr-auto" key={pd._id} product={pd}>
                    <Card.Img variant="top" src={pd.product.imageURL} />
                    <Card.Body>
                        <Card.Text>
                            <p>Customer Name: {pd.shipment.name}</p>
                            <p>Email: {pd.email}</p>
                            <p>Address: {pd.shipment.address}</p>
                            <p>Product Name: {pd.product.name}</p>
                            <p>Product Price: {pd.product.price}</p>
                            <p>Ordered Quantity: {pd.product.quantity}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>)
            }
        </div>
    );
};

export default OrderDetail;