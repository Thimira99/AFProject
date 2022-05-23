import React, { Component } from 'react';
import Header from '../../header/header';
import Sidebar from '../../sidebar/Sidebar';
import profile from '../../images/profile.png';
import { Card, Body, Img, Button, Title, Text } from 'react-bootstrap';

import groupStyles from './Group.module.css';

function Group() {

    return (
        <div className='main-wrapper'>
            <div className='app-header'>
                <Header />
            </div>
            <div className='app-body'>
                <div className='body-wrapper'>
                    <div className='app-sidebar'>
                        <Sidebar />
                    </div>
                    <div className='app-content'>
                        <div className={groupStyles.header}>
                            <h1>Group</h1>
                        </div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={profile} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Group;