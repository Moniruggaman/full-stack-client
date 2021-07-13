import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import *as FaIcons from 'react-icons/fa';



const Home = () => {

    const [products, setProducts] = useState([]);

    const [order, setOrder] = useState({});

    useEffect(() => {
        fetch(`https://click-valley.herokuapp.com/products`)
            .then(res => res.json())
            .then(data => setProducts(data))

    }, [])

    const history = useHistory();

    function handleBook(id) {
        fetch(`https://click-valley.herokuapp.com/order/${id}`)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                history.push(`/order/${id}`);
            })
    }

    return (

        <div className="product-card mt-4">
            {
                products.map(pd => <div className="product-card" key={pd._id}
                    product={pd} >
                    <Card style={{ width: '18rem', background: '#eee' }} >
                        <Card.Img variant="top" style={{height: '85%'}} src={pd.imageURL} />
                        <Card.Body>
                            <Card.Title>{pd.name}</Card.Title>
                            <Card.Text>
                                {pd.price}
                            </Card.Text>
                            <Button onClick={() => handleBook(pd._id)} variant="success"><FaIcons.FaCartPlus/> BUY NOW</Button>
                        </Card.Body>
                    </Card>
                </div>)
            }
        </div>

    );
};

export default Home;