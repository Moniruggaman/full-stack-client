
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';

const Inventory = () => {

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:5055/Inventory`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    function deleteProduct(id){
        fetch(`http://localhost:5055/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
    .then(result => {
        console.log('deleted successfully', result);
    })

        
    }
    return (
        <div className="container w-100 table-responsive" style={{ maxWidth: '800px', margin: '0 auto'}}>
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
                    <Table striped bordered hover key={product._id}>
                        <tbody>
                            <tr>
                                <td >{product.name}</td>
                                <td >{product.price}</td>
                                <td ><button onClick={() =>deleteProduct(`${product._id}`)}>Delete</button></td>
                            </tr>
                        </tbody>
                    </Table>

                ))
            }
        </div>
    );
};

export default Inventory;