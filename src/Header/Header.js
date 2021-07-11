import React from 'react';
import { Container, Nav, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png';

const Header = () => {

    const history = useHistory();
    const handleOrder = (id) => {
        history.push(`/ordered`);
    }

    return (

        <Navbar bg="light" variant="light" >
            <Container className="nav-bar">
                <Navbar.Brand className="d-inline-block align-top">
                    <Link to="/home">
                        <img width="150px" height="auto" className="img-responsive" src={logo} alt="logo" />
                    </Link>
                </Navbar.Brand>

                <Nav className="mr-auto">
                    <Nav.Link onClick={() => history.push('/home')}>Home</Nav.Link>
                    <Nav.Link onClick={handleOrder}>Orders</Nav.Link>
                    <Nav.Link onClick={() => history.push('/admin')}>Admin</Nav.Link>
                    <Button variant="success" onClick={() => history.push('/login')}>Login</Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;