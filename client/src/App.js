import React, { useEffect, useState } from 'react';
import firebase from './firebase.config';
import { Router } from '@reach/router';
import { AppContext, FirebaseContext, UserContext, UsersContext } from './AppContext';
// CSS, Bootstrap
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// Components
import { BackButton } from './components/Buttons';
import Redirect from './components/Redirect';
import Home from './components/Home';
import LoginRes from './components/LoginRes';
import ItemView from './components/ItemView';
import AddItemView from './components/AddItemView';

const App = () => {
  const [href, setHref] = useState(AppContext);
  const [users, setUsers] = useState(UsersContext);
  const [user, setUser] = useState(UserContext);

  useEffect(() => {
    const locationStr = window.location.href.split('/');
    setHref(locationStr[locationStr.length - 1]);

    const db = firebase.firestore();
    const fetchUser = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection('users').onSnapshot(snapshot => {
          const uids = snapshot.docs.map(doc => doc.id);
          if (uids.includes(user.uid)) {
            setUser(user);
          } else {
            db.collection('users').doc(user.uid).set({ displayName: user.displayName, email: user.email, photoURL: user.photoURL });
          }
        });
      }
    });

    const extractData = snap => setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    const fetchUsers = db.collection('users').onSnapshot(extractData);

    return () => {
      fetchUser();
      fetchUsers();
    }
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={{ setHref }}>
        <FirebaseContext.Provider value={{ firebase }}>
          <UsersContext.Provider value={{ users }}>
            <UserContext.Provider value={{ user }}>
              <Navbar style={{ borderBottom: '0.5px solid rgb(240, 240, 240)', margin: '0px 24px' }} className="px-4 pt-5 pb-3">
                <h1 className="font-weight-bold mr-4">HungryNinjas!</h1>
                {href !== 'home' ? <BackButton /> : <></>}
              </Navbar>
              <Router>
                <Redirect path="/" to="/home" />

                <Home path="/home" />
                <LoginRes path="/welcome" />

                <AddItemView path="/add" />
                <AddItemView path="/request" request />

                <ItemView path="/items/:id" />
                <ItemView path="/requested/:id" />
              </Router>
            </UserContext.Provider>
          </UsersContext.Provider>
        </FirebaseContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;