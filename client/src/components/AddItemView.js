import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext, UserContext } from '../AppContext';
import { Form, Button } from 'react-bootstrap';
import { navigate } from '@reach/router';

const AddItemView = props => {
    const [item, setItem] = useState({ liked: [] });
    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        const isNameValid = item.hasOwnProperty('name') && item.name.length > 0;
        const isDescValid = item.hasOwnProperty('desc') && item.desc.length > 0;
        const isQuantityValid = item.hasOwnProperty('quantity') && item.quantity.length > 0;
        const isImageURLValid = item.hasOwnProperty('imageURL') && item.imageURL.length > 0;
        const isFormValid = isNameValid && isDescValid && isQuantityValid && isImageURLValid;
        setValid(isFormValid);
    }, [item]);

    const formOnSubmit = event => {
        event.preventDefault();
        const db = firebase.firestore();
        db.collection(request() ? 'requested' : 'items').add({ ...item, requestedUID: user.uid });
        navigate('/home');
    }

    const request = () => props.request !== undefined && props.request;

    return (
        <div className="container text-left m-5">
            <h3>{request() ? 'Request new stuffs to add to our kitchen.' : 'Add new item(s) to existing inventory.'}</h3>
            <Form onSubmit={formOnSubmit} className="mt-5">
                <Form.Control onChange={event => setItem({ ...item, name: event.target.value })} type="text" placeholder="Item(s) Name" className="p-4 bg-light rounded-0 border-0" required />
                <Form.Control onChange={event => setItem({ ...item, desc: event.target.value })} type="text" placeholder="Description - Item's Description" className="p-4 bg-light rounded-0 border-0 my-2" required />
                <Form.Control onChange={event => setItem({ ...item, quantity: event.target.value })} type="number" placeholder="Quantity - 1 bags, 2 bags" className="p-4 bg-light rounded-0 border-0 my-2" required />
                <Form.Control onChange={event => setItem({ ...item, imageURL: event.target.value })} type="text" placeholder="ImageURL - Paste in an actual image url for your item(s)" className="p-4 bg-light rounded-0 border-0 my-2" required />
                {valid ? <Button variant="warning" type="submit" className="py-2 px-5 rounded-0 border-0 mt-4">{request() ? '[•] Make a request' : '[+] Add'}</Button> : <Button variant="warning" type="submit" className="py-2 px-5 rounded-0 border-0 mt-4" disabled>{request() ? '[•] Make a request' : '[+] Add'}</Button>}
            </Form>
        </div>
    );
}

export default AddItemView;