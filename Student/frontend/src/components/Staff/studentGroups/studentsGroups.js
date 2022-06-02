import React, { createRef, Component } from 'react';
import Sidebar from '../../sidebar/Sidebar';
import Header from '../../header/header';
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import axios from 'axios';
import ScrollableFeed from 'react-scrollable-feed'



class studentsGroups extends Component {

    constructor(props) {
        super(props)

        this.state = {

            logUserId: '',
            topics: [],
            approvedTopics:[]

        }
        this.getreserchtopic = this.getreserchtopic.bind(this);

    }


    getreserchtopic(loguser) {

        const data = {
            "name": loguser,
            "resStatus": "Pending"
        }

        const url = 'http://localhost:8000/api/reserchTpoic/getbySup'
        axios.post(url, data).then((res) => {

            console.log(res.data.data)

            this.setState({
                topics: res.data.data
            }, () => {
                console.log("...", this.state.topics)
            })

        })
    }

    getAssignedreserchtopic(logUser){

        const url = 'http://localhost:8000/api/reserchTpoic/getbySup'
        const data = {
            "name": logUser,
            "resStatus": "approved"
        }

        axios.post(url, data).then((res) => {

            console.log(res.data.data)

            this.setState({
                approvedTopics: res.data.data
            }, () => {
                console.log("...", this.state.approvedTopics)
            })

        })


    }


    componentDidMount() {

        const logUser = sessionStorage.getItem('LogUserId')
        const LogUserName = sessionStorage.getItem('LogUserName')

        this.setState({
            logUserId: logUser

        });

        this.getreserchtopic(LogUserName)

        this.getAssignedreserchtopic(LogUserName)






    }


    render() {
        return (
            <div className='main-wrapper'>
                <div className='app-header'>
                    <Header />
                </div>
                <div className='app-body'>
                    <div className='body-wrapper' style={{ "backgroundColor": "#f8f9fa" }}>
                        <div className='app-sidebar'>
                            <Sidebar />
                        </div>
                        <div className='app-content'>

                            <div className='container' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "800px", "position": "absolute", "marginLeft": "470px", "height": "550px", "float": "right", "minHeight": "85vh", "borderRadius": "10px" }}>
                            </div>
                            <div className='container' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "460px", "position": "absolute", "height": "250px", "float": "left", "minHeight": "35vh", "borderRadius": "10px" }}>

                                <div className='container' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "700", "WebkitTextStroke": "thin", "marginBottom": "10px" }}><span >PENDING GROUPS</span></div>


                                <ScrollableFeed>

                                    {

                                        this.state.topics &&

                                        this.state.topics.map((obj, index) =>


                                            <p style={{ "backgroundColor": "rgb(184 202 228)", "padding": "20px", "fontWeight": "700", "WebkitTextStroke": "thin" }}>
                                                {index + 1}{". "}Group Name:{" "}&nbsp;{"  "}{obj.groupName} <br />{" "}<span style={{ "marginLeft": "18px" }}>Leader Name:{ }&nbsp;{" "}{obj.researchTopic}</span> </p>



                                        )

                                    }



                                </ScrollableFeed>

                            </div>

                            <div className='container' style={{ "backgroundColor": "rgb(210 220 228)", "minWidth": "460px", "position": "absolute", "height": "370px", "float": "left", "minHeight": "35vh", "borderRadius": "10px", "marginTop": "270px" }}>
                            <div className='container' style={{ "backgroundColor": "rgb(210 220 228)", "padding": "10px", "fontWeight": "700", "WebkitTextStroke": "thin", "marginBottom": "10px" }}><span >ASSIGNED GROUPS</span></div>

                                <ScrollableFeed>

                                    {

                                        this.state.topics &&

                                        this.state.topics.map((obj, index) =>


                                            <p style={{ "backgroundColor": "rgb(184 202 228)", "padding": "20px", "fontWeight": "700", "WebkitTextStroke": "thin" }}>
                                                {index + 1}{". "}Group Name:{" "}&nbsp;{"  "}{obj.groupName} <br />{" "}<span style={{ "marginLeft": "18px" }}>Leader Name:{ }&nbsp;{" "}{obj.researchTopic}</span> </p>



                                        )

                                    }



                                </ScrollableFeed>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default studentsGroups;