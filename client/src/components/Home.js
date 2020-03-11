import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Home = () => {
    return (
        <Navbar className="p-4">
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link className="mx-3 my-auto" href="#">Inventory</Nav.Link>
                    <Nav.Link className="mx-3 my-auto" href="#">Request New Item</Nav.Link>
                    <h1 className="font-weight-bold mx-3">HungryNinjas</h1>
                    <Nav.Link className="mx-3 my-auto" href="#">Sign In</Nav.Link>
                    <Nav.Link className="mx-3 my-auto" href="#">Create an account.</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Home;