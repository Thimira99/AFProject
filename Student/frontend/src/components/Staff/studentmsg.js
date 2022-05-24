import React, { Component } from 'react';
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import axios from 'axios';


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
            "sennder": "stu20390",
            "reciver": "sf201020",
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
            <div>
                <div style={{ "marginTop": "50px", "minHeight": "100vh", "width": "600px", "marginBottom": "50px","backgroundColor":"cadetblue", "boxShadow": "0px 3px 3px -2px rgb(0 0 0/20%), 0px 3px 4px 0px rgb(0 0 0/14%), 0px 1px 8px 0px rgb(0 0 0/12%)" }} className="container ">
                    <Table >
                        <thead>
                            <tr>

                            </tr>
                        </thead>
                        <tbody  style={{'height': '650px', 'overflow':'auto', 'display': 'block'}}>
                            {this.state.msgData &&

                                this.state.msgData.map(
                                    msgObject =>
                                    
                                    <><tr>
                                        <td style={{"border":"none","textalign": "end","paddingBottom":"0",}}>{msgObject.sennder == 'stu20390' ? msgObject.msg : null}</td>

                                    </tr><tr>
                                    <td style={{"border":"none"}}></td>
                                                {/* <td style={{"border":"none"}}></td> */}
                                                <td style={{"border":"none","padding":"300"}}></td>
                                                <td style={{"border":"none","textAlign":"end","paddingTop":"0"}} >{msgObject.sennder != 'stu20390' ? msgObject.msg : null }</td>

                                        </tr></>
                                        
                                )
                            }


                        </tbody>
                    </Table>

                    <div style={{ "marginTop": "20px", "minHeight": "30vh" }} className="container p-3 my-80 bg-secondary text-gradient bg-opacity-50 fw-bold" >
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" />
                            </Form.Group>
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