import React, { Component } from 'react';
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { BsPersonCircle,BsFillCaretRightFill } from "react-icons/bs";
import Header from '../header/header'
import Sidebar from '../sidebar/Sidebar'
import '../Staff/StaffHome/Home.module.css';





class studentmsg extends Component {

    constructor(props) {
        super(props)

        this.state = {

            message: '',
            sendmessage: '',
            msgData: ''

        }

        this.addMessage = this.addMessage.bind(this);
        this.changeMessageHandler = this.changeMessageHandler.bind(this);
        this.getMessages = this.getMessages.bind(this);
    }

    changeMessageHandler = (event) => {
        this.setState({ message: event.target.value }, () => {
            console.log(this.state.message)
        });
    }


    addMessage = (e) => {

        e.preventDefault()
        console.log("inside add")


        const postData = {
            "staffId": "sf201020",
            "studentId": "stu20390",
            "sennder": "sf201020",
            "reciver": "stu20390",
            "msg": this.state.message
        }

        try {
            const url = 'http://localhost:8080/api/message/post';
            axios.post(url, postData).then((res) => {
                if (res) {
                    console.log(res)
                }

            })


        } catch {

        }

    }


    getMessages() {


        const data = { 'staffId': 'sf201020', 'studentId': 'stu20390' }
        console.log(data);

        try {
            const url = 'http://localhost:8080/api/message/get';
            axios.post(url, data).then((res) => {

                this.setState({
                    msgData: res.data.data
                }, () => {
                    console.log(this.state.msgData)
                })

                console.log(res);
            }).catch((err) => {
                console.log(err)
            });

            console.log(res.message);
        } catch (error) {

        }

    }


    componentDidMount() {

        this.getMessages();
        this.interval = setInterval(()=>{
            this.getMessages()
        },10000);

    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }


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
                        <div className='homeMain'>
                           
                        <div style={{ "marginTop": "50px", "minHeight": "50vh", "width": "650px", "marginBottom": "50px","backgroundColor":"cadetblue", "boxShadow": "0px 3px 3px -2px rgb(0 0 0/20%), 0px 3px 4px 0px rgb(0 0 0/14%), 0px 1px 8px 0px rgb(0 0 0/12%)" }} className="container ">
                    
                    <div style={{ "marginTop": "50px", "minHeight": "30vh",'height': '650px', 'overflow':'auto', 'display': 'block' }} className="container p-3 my-80 bg-secondary text-gradient bg-opacity-50 fw-bold" >
                        
                        {
                            this.state.msgData &&

                            this.state.msgData.map( muBobject => (
                               

                               <><h5 style={{ "textAlign": "left", "width": "280px", "display": "inline-block", "overflow": "hidden", "wordBreak": "break-all" }}><span 
                               style={{"backgroundColor":"rgb(12 109 253 / 50%)"}}>{muBobject.sennder == 'sf201020' ? muBobject.msg : null}</span></h5><h5 
                               style={{ "textAlign": "right", "width": "270px","position":"inline-block", "overflow": "hidden", "wordBreak": "break-all", "marginLeft": "auto" }}><span 
                               style={{"backgroundColor":"white"}}><div style={{"fontSize":"small","marginBottom":"5"}}>{muBobject.sennder != 'sf201020' && muBobject.reciver}</div>{muBobject.sennder != 'sf201020' && muBobject.msg}</span></h5></>
                            ))
                        
                        
                        
                        }


                    </div>

                    <div style={{  "minHeight": "30vh","marginBottom":"20vh" }} className="container p-3 my-80 bg-secondary text-gradient bg-opacity-50 fw-bold" >
                        <Form>
                            
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control onChange={this.changeMessageHandler} value={this.state.message} as="textarea" rows={3} />
                            </Form.Group>
                            <Button size="sm" className="btn btn-secondary" variant="addDel" type="submit" onClick={this.addMessage}>
                                Add
                            </Button>
                        </Form>
                    </div>
                </div>





                        </div>

                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default studentmsg;


// {this.state.msgData &&

//     this.state.msgData.map(
//         msgObject =>
//             <><tr>
//                 <td>{msgObject.msg}</td>

//             </tr><tr>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td>{msgObject.msg}</td>

//                 </tr></>
            
//     )
// }