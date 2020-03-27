import React, { useContext } from 'react';
import { navigate } from '@reach/router';
import { AppContext, FirebaseContext } from '../AppContext';
import Button from 'react-bootstrap/Button';

const BackButton = () => {
    const { setHref } = useContext(AppContext);

    const backButtonOnClick = () => {
        setHref('home');
        navigate("/home");
    }

    return (<Button onClick={backButtonOnClick} variant="light" className="py-2 px-5 rounded-0 border-0">&#8814; Back</Button>);
}

const SignOutButton = () => {
    const { firebase } = useContext(FirebaseContext);

    const buttonOnClick = () => firebase.auth().signOut();

    return (<Button onClick={buttonOnClick} variant="light" className="px-4 py-2 rounded-0">Sign Out</Button>);
}

export { BackButton, SignOutButton };