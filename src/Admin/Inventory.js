
import React, { useEffect } from 'react';
import { useState } from 'react';
import *as FaIcons from 'react-icons/fa';


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
        <div className="container w-100 table-responsive-sm" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h3 class="mt-5 text-center"> Product Inventory</h3>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Item Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) =>
                            <tr key={product._id}>
                                <th scope="row">{index = index + 1}</th>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><button class="btn btn-danger" onClick={() => deleteProduct(`${product._id}`)}><FaIcons.FaTrash /> Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Inventory;