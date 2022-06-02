import React, { Component } from 'react';
import Sidebar from '../../sidebar/Sidebar';
import Header from '../../header/header';


class staffProfile extends Component {

    render() {
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
                       sukitha

                       <div className='container' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "800px", "position": "absolute", "marginLeft": "10px", "height": "550px","float":"left" ,"minHeight":"80vh","borderRadius":"10px" }}>






                       </div>




                       <div className='container' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "450px", "position": "absolute", "marginLeft": "830px", "height": "550px","float":"right" ,"minHeight":"80vh","borderRadius":"10px" }}></div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default staffProfile;