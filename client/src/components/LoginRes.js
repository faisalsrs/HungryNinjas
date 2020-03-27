import React, { useState, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';
import { Container, Row, Col } from 'react-bootstrap';
import { AppContext, FirebaseContext } from '../AppContext';
import { StyledFirebaseAuth } from 'react-firebaseui';
import './LoginRes.css';

// Components
import { SignOutButton } from './Buttons';

const LoginRes = () => {
    const { setHref } = useContext(AppContext);
    const { firebase } = useContext(FirebaseContext);
    const [signedIn, setSignedIn] = useState(false);

    const UIConfig = {
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.GithubAuthProvider.PROVIDER_ID],
        callbacks: {
            signInSuccessWithAuthResult: () => {
                setHref('home');
                navigate('/');
            }
        }
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => setSignedIn(!!user));
    }, [firebase]);

    return (
        <Container fluid className="pt-5 mx-auto">
            <Row className="my-5">
                <Col>
                    <h1>What's up hungryninjas?</h1>
                    <h1 className="mb-3">Looking for some food?</h1>
                    <h2 className="mb-5">Let's get started!</h2>
                    {signedIn ? <>
                        <p className="mb-2">You've already in.</p>
                        <SignOutButton />
                    </> : <div className="signInArea"><StyledFirebaseAuth uiConfig={UIConfig} firebaseAuth={firebase.auth()} /></div>}
                </Col>
            </Row>
        </Container>
    );
}

export default LoginRes;