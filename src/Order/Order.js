import React, { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const Order = () => {

    const [order, setOrder] = useState([]);
    const { _id } = useParams();
   
    useEffect(() => {
        fetch(`http://localhost:5055/order`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [])

    const productAdded = order.find(prd => prd._id == _id);
    console.log(productAdded);

    return (
        <div className="container">
            <h3>Order Summary</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ justifyContent: 'center' }}>
                        <td>{productAdded?.name}</td>
                        <td>{productAdded?.quantity}</td>
                        <td>{productAdded?.price}</td>
                    </tr>
                </tbody>
            </Table>
           <Link to={`/check/${productAdded?._id}`}><button className="btn btn-success" >Check out</button></Link>
        </div>
    );
};

export default Order;