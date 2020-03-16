import React, { useState, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';
import { AppContext, FirebaseContext } from '../AppContext';
import { Navbar, Nav } from 'react-bootstrap';

const NavMenu = () => {
    const { setHref } = useContext(AppContext);
    const { firebase } = useContext(FirebaseContext);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });
    }, [firebase]);

    const signOutOnClick = () => {
        firebase.auth().signOut();
        setHref('welcome');
        navigate('/welcome');
    }

    return (
        <Navbar style={{ borderBottom: '0.5px solid rgb(240, 240, 240)', margin: '0px 24px' }} className="px-4 py-4">
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="p-0 pr-4" href="/home">Our Inventory</Nav.Link>
                    {loading ? <span className="text-secondary">Loading...</span> : <>
                        {user ? <>
                            <Nav.Link className="p-0 pr-4" href="/add">[+] Add Item(s)</Nav.Link>
                            <Nav.Link className="p-0 pr-4" href="/request">Request New Stuffs</Nav.Link>
                        </> : <></>}
                    </>}
                </Nav>
                <Nav className="ml-auto">
                    {loading ? <span className="text-secondary">Loading...</span> : <>
                        {user ? <>
                            <Nav.Link className="p-0 pl-4" disabled>
                                Signed in as <img className="ml-3 mr-2 rounded-circle bg-light" style={{ width: 32, height: 32 }} src={user.photoURL} alt="userProfileImage" /><span className="text-dark">{user.displayName}</span>
                            </Nav.Link>
                            <Nav.Link onClick={signOutOnClick} className="p-0 pl-4 my-auto">Sign Out</Nav.Link>
                        </> : <>
                                <Nav.Link className="p-0 pl-4" href="/welcome">Sign In</Nav.Link>
                                <Nav.Link className="p-0 pl-4" href="/welcome">Create an account</Nav.Link>
                            </>}
                    </>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavMenu;