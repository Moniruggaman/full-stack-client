import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { UserContext } from '../App';
import './OrderDetail.css';

const OrderDetail = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [ordered, setOrdered] = useState([]);
   
    useEffect(() => {
        fetch(`https://click-valley.herokuapp.com/ordered?email=` + loggedInUser.email, {
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
            <h4 className="text-center">Your order detail.</h4>
            <div className="order-cart mt-4">
            {
                ordered.map(pd => <div className="order-cart" key={pd._id} product={pd}>
                    <Card style={{ width: '18rem', background: '#eee' }} className="px-2">
                        <Card.Img variant="top" style={{height: '50%'}} src={pd.product.imageURL} />
                        <Card.Body>
                            <Card.Text>
                                <p><b> Customer Name:</b> {pd.shipment.name}</p>
                                <p><b>Email:</b> {pd.email}</p>
                                <p><b>Address:</b> {pd.shipment.address}</p>
                                <p><b>Product Name:</b> {pd.product.name}</p>
                                <p><b>Product Price:</b>{pd.product.price}</p>
                                <p><b>Ordered Quantity:</b> {pd.product.quantity}</p>
                                <p><b>Order Time:</b> {pd.orderTime}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>)
            }
            </div>
        </div>
    );
};

export default OrderDetail;