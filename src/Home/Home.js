import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const Home = () => {

    const [products, setProducts] = useState([]);   
    
    const [order, setOrder] = useState({});
    
    useEffect(() => {
        fetch(`http://localhost:5055/products`)
            .then(res => res.json())
            .then(data => setProducts(data))

    }, [])

    const history = useHistory();
    
     function handleBook(id){
        fetch(`http://localhost:5055/order/${id}`)
        .then(res => res.json())
        .then(data => {
            setOrder(data);
            history.push(`/order/${id}`);
        })
    }

    return (

        <div className="product-card">
            {
                products.map(pd => <div className="product-card" key={pd._id}
                    product={pd} >
                    <Card style={{ width: '18rem' }} >
                        <Card.Img variant="top" src={pd.imageURL} />
                        <Card.Body>
                            <Card.Title>{pd.name}</Card.Title>
                            <Card.Text>
                                {pd.price}
                            </Card.Text>
                            <Button onClick={() => handleBook(pd._id)} variant="success">BUY NOW</Button>
                        </Card.Body>
                    </Card>
                </div>)
            }
        </div>

    );
};

export default Home;