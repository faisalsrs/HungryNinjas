import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
    return (
        <div>
            <Navbar className="p-4 my-1">
                <h1 className="font-weight-bold mx-3">HungryNinjas</h1>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="mx-3 my-auto" href="#">Inventory</Nav.Link>
                        <Nav.Link className="mx-3 my-auto" href="#">Request New Item</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link className="mx-3 my-auto" href="#">Sign In</Nav.Link>
                        <Nav.Link className="mx-3 my-auto" href="#">Create an account.</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;