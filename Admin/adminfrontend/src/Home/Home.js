import React, { Component } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';



function Home() {

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
                        <div className='homeMain'>
                            <h1>Welcome Admin</h1>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;