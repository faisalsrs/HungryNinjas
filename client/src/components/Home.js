import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../AppContext';
// Components
import NavMenu from './NavMenu';
import ItemList from './ItemList';

const Home = () => {
    const { firebase } = useContext(FirebaseContext);
    const [items, setItems] = useState([])
    const [requested, setRequested] = useState([]);

    useEffect(() => {
        const db = firebase.firestore();

        const itemsHandler = snap => setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        const getItems = db.collection('items').onSnapshot(itemsHandler);

        const requestedHandler = snap => setRequested(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        const getRequested = db.collection('requested').onSnapshot(requestedHandler);

        return () => {
            getItems();
            getRequested();
        };
    }, [firebase]);

    const inStock = () => items.filter(item => item.quantity > 0);
    const outOfStock = () => items.filter(item => item.quantity < 1);

    return (
        <>
            <NavMenu />
            <div className="container-fluid m-0 pt-3 pb-5">
                <ItemList items={inStock()} title='In Stock' />
                <ItemList items={requested} title='Requested' />
                <ItemList items={outOfStock()} title='Out Of Stock' />
            </div>
        </>
    );
}

export default Home;   