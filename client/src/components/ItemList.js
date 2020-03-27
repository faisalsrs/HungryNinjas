import React, { useContext } from 'react';
import { AppContext, FirebaseContext, UsersContext, UserContext } from '../AppContext';
import { navigate } from '@reach/router';
import like from '../like.png';
import liked from '../like-filled.png';

const ItemList = ({ items, title }) => {
    const { firebase } = useContext(FirebaseContext);
    const { setHref } = useContext(AppContext);
    const { users } = useContext(UsersContext);
    const { user } = useContext(UserContext);

    const itemOnClick = (event, idx) => {
        const item = items[idx];

        if (event.target.id !== 'like') {
            setHref('items');
            navigate(`/${title === 'Requested' ? 'requested' : 'items'}/${item.id}`);
        } else {
            const collection = (title === 'Requested') ? 'requested' : 'items';
            const itemRef = firebase.firestore().collection(collection).doc(item.id);
            const updated = (item.liked.includes(user.uid)) ? item.liked.filter(uid => uid !== user.uid) : item.liked.concat([user.uid]);
            itemRef.update({ liked: updated });
        }
    }

    const getUser = uid => {
        let foundUser = user;
        for (let i = 0; i < users.length; i++) {
            const currentUser = users[i];
            if (currentUser.id === uid) {
                foundUser = currentUser;
            }
        }
        return foundUser;
    };

    return (
        <>
            <div className="row text-left px-5 my-3">
                <h4>{title} ({items.length})</h4>
            </div>
            <div style={{ overflowX: 'auto' }} className="row py-1">
                <table>
                    <tbody>
                        <tr>
                            <td><div style={{ width: 32 }}></div></td>
                            {items.map((item, idx) => (
                                <td onClick={event => itemOnClick(event, idx)} key={idx} className="text-left">
                                    <div className="content">
                                        <img className="mb-3 bg-light" src={item.imageURL} alt="" />
                                        <div className="float-right text-right mt-1">
                                            <p><span className="h5 mr-1">{item.liked.length}</span>Likes</p>
                                            {user.displayName !== undefined ? <>
                                                <img id="like" style={{ width: 44, height: 44, marginTop: 4 }} className="float-right" src={item.liked.includes(user.uid) ? liked : like} alt="like" />
                                            </> : <></>}
                                        </div>
                                        <h1>{item.name}</h1>
                                        <p>{title === 'Requested' ? `Requested by ${getUser(item.requestedUID).displayName}` : <>
                                            Quantity: <span className={`text-${item.quantity <= 5 ? 'danger' : 'info'}`}>{item.quantity}</span>
                                        </>}</p>
                                    </div>
                                </td>
                            ))}
                            <td><div style={{ width: 32 }}></div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ItemList;