import React from 'react';

// App
const AppContext = React.createContext(null);
// Database
const FirebaseContext = React.createContext(null);
const UserContext = React.createContext(null);
const UsersContext = React.createContext(null);

export { AppContext, FirebaseContext, UserContext, UsersContext };