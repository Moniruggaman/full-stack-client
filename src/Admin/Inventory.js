
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';

const Inventory = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://click-valley.herokuapp.com/Inventory`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    function deleteProduct(id) {
        fetch(`https://click-valley.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                console.log('deleted successfully', result);
            })


    }
    return (
        <div className="container w-100 table-responsive" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3> Product Inventory</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Item Remove</th>
                    </tr>
                </thead>
            </Table>
            {
                products.map(product => (
                    <div key={product._id}>
                        <Table striped bordered hover size="sm" >
                            <tbody>
                                <tr>
                                    <td >{product.name}</td>
                                    <td >{product.price}</td>
                                    <td ><button onClick={() => deleteProduct(`${product._id}`)}>Delete</button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                ))
            }
        </div>
    );
};

export default Inventory;