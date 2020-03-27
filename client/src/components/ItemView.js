import React, { useState, useEffect, useContext, useCallback } from 'react';
import { UserContext, FirebaseContext } from '../AppContext';
// CSS, Bootstrap, Components
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import like from '../like.png';
import liked from '../like-filled.png';

const ItemView = props => {
    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);
    const [item, setItem] = useState(null);

    const itemRef = useCallback(() => {
        const dbName = props.uri.split('/')[1];
        const id = props.id;
        const db = firebase.firestore();
        return db.collection(dbName).doc(id);
    }, [firebase, props]);

    useEffect(() => {
        const fetchItem = itemRef().onSnapshot(doc => setItem(doc.data()));
        return () => fetchItem();
    }, [itemRef]);

    const LoadingSpinners = () => {
        return (
            <li className="mt-5">
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="dark" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="light" />
            </li>
        );
    }

    const likeOnClick = () => itemRef().update({ liked: item.liked.includes(user.uid) ? item.liked.filter(uid => uid !== user.uid) : item.liked.concat([user.uid]) });
    const addHandler = () => itemRef().update({ quantity: item.quantity + 1 });
    const takeHandler = () => itemRef().update({ quantity: item.quantity - 1 });

    return (
        <Container style={{ height: '75vh' }} className="mx-auto pt-5">
            <Row className="h-100 w-100">
                <Col md={6}>
                    {item ? <img style={{ objectFit: 'cover' }} className="img-fluid w-100 h-100" src={item.imageURL} alt="" /> : <ul className="list-inline w-100 text-center align-items-center">{LoadingSpinners()}</ul>}
                </Col>
                <Col style={{ display: 'flex', textAlign: 'center' }} className="align-items-center" md={6}>

                    <ul className="list-inline w-100 text-center">
                        {item ? <>
                            <li className="align-bottom mb-3">
                                <h1 className="mb-1">{item ? item.name : 'Loading...'}</h1>
                                <p>{item.desc}</p>
                                <p className="my-3">Quantity: <span className={`ml-1 p-2 bg-light text-${item.quantity <= 5 ? 'danger' : 'info'}`}>{item.quantity}</span></p>
                                <p>#ID: {props.id}</p>
                            </li>
                            <li className="list-inline-item mr-3 align-bottom">
                                <p><span className="h2 m-0 mr-1">{item.liked.length}</span>Like{item.liked.length < 2 ? '' : 's'}</p>
                            </li>
                            <li className="list-inline-item align-bottom">
                                {user.displayName !== undefined ? <>
                                    <img onClick={likeOnClick} style={{ width: 44, height: 44, marginTop: 4 }} src={item.liked.includes(user.uid) ? liked : like} alt="like" />
                                </> : <></>}
                            </li>
                            <li className="align-bottom mt-5">
                                {user.displayName !== undefined ? <>
                                    <Button id="add" onClick={addHandler} variant="dark" type="submit" className="py-2 px-4 rounded-0 border-0 mr-1">+ ADD</Button>
                                    {item.quantity < 1 ? <Button disabled variant="dark" type="submit" className="py-2 px-4 rounded-0 border-0 ml-1">- TAKE</Button> : <Button id="took" onClick={takeHandler} variant="dark" type="submit" className="py-2 px-4 rounded-0 border-0 ml-1">- TAKE</Button>}
                                </> : <></>}
                            </li>
                        </> : LoadingSpinners()}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default ItemView;