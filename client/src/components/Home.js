import React from 'react';
import NavBar from './NavBar';
import { Row } from 'react-bootstrap';

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="container-fluid">
                <Row className="px-5 text-left">
                    <h3 className="w-100 d-block mb-3">In Stock (0)</h3>
                    <ul className="list-inline">
                        <li className="list-inline-item box-item">
                            <img src="wefe" alt="" />
                            <h3>Catewewr</h3>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur voluptatem ut voluptas veniam. Iste, reprehenderit!</p>
                        </li>
                    </ul>
                </Row>
            </div>
        </>
    );
}

export default Home;   