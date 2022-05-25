import React, { Component } from 'react';
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { BsFillPersonFill ,BsCheckAll,BsCheck} from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Header from '../header/header'
import Sidebar from '../sidebar/Sidebar'
import '../Staff/StaffHome/Home.module.css';





class studentmsg extends Component {

    constructor(props) {
        super(props)

        this.state = {

            message: '',
            sendmessage: '',
            msgData: '',
            convertedDate:{},
            seenStatus:false

        }

        this.addMessage = this.addMessage.bind(this);
        this.changeMessageHandler = this.changeMessageHandler.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.dateConverter = this.dateConverter.bind(this);
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
            "msg": this.state.message,
            "seenStatus" : false,
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

    dateConverter(e){

        console.log("eeeeeeeeeeeee",e)

       

            const current = new Date();
            var date = current.getDate();
            var month =current.getMonth();
            var year =current.getFullYear();
            var my2 = date + "/" + month + "/" + year
            console.log("sukith",my2)


            var myDate = new Date(e);
           


            var date = myDate.getDate();
            var month = myDate.getMonth();
            var year = myDate.getFullYear();
            console.log("date",date)
            var hour = myDate.getHours();
            var minute = myDate.getMinutes();
            var second = myDate.getSeconds();
            var ap = "AM";
            if (hour   > 11) { ap = "PM";             }
            if (hour   > 12) { hour = hour - 12;      }
            if (hour   == 0) { hour = 12;             }
            if (hour   < 10) { hour   = "0" + hour;   }
            if (minute < 10) { minute = "0" + minute; }
            if (second < 10) { second = "0" + second; }
            var timeString = (hour + ':' + minute +" " + ap);
            var yearStrinig = date + "/" + month + "/" + year



           var dilDate = ((yearStrinig == my2 ? "" : yearStrinig ) +" "+" " + timeString)
            return dilDate;
    }

    getMessages() {


        const data = { 'staffId': 'sf201020', 'studentId': 'stu20390' }
        console.log(data);

        try {
            const url = 'http://localhost:8080/api/message/get';
            axios.post(url, data).then((res) => {

               
                this.setState({
                    msgData: res.data.data
                },() => {

                    console.log("inside resss")
                    const len = (this.state.msgData.length)-1
                    // console.log("xcxc",(this.state.msgData[len].seenStatus))
                    // const id = (this.state.msgData[len]._id)

                    // if(this.state.msgData[len].seenStatus == "true"){
                    //     console.log("superman 111111111")
                        
                    //     this.setState({
                    //         seenStatus : true
                    //     })
                       
                    // }


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
        clearInterval(this.interval)
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
                    <div className='app-content' style={{"backgroundColor":"hsl(0deg 0% 97%)"}}>

                        <div className='homeMain'>
                           
                        <div style={{  "minHeight": "50vh", "width": "1300px","backgroundColor":"hsl(0deg 0% 97%)", "boxShadow": "0px 3px 3px -2px rgb(0 0 0/20%), 0px 3px 4px 0px rgb(0 0 0/14%), 0px 1px 8px 0px rgb(0 0 0/12%)" }} className="container ">
                    
                         <div style={{ "minHeight": "20vh","width":"900px",'height': '485px', 'overflow':'auto', 'display': 'block',"marginLeft":"400px","backgroundColor":"rgb(255 255 255)" }} className="container " >
                        
                        {
                            this.state.msgData &&

                            this.state.msgData.map( muBobject => (

                                console.log("ccccccxxxxxxxxxxsssssssss",muBobject),
                               

                               <><h5 style={{ "textAlign": "left", "width": "280px", "display": "inline-block", "overflow": "hidden", "wordBreak": "break-all","marginLeft":"5px" }}><span 
                               style={{"backgroundColor":" #c7e0f4","fontSize":"17px"}}><div style={{"fontSize":"small","marginBottom":"5"}}>{muBobject.sennder == 'sf201020' &&  <BsFillPersonFill/>}</div>{muBobject.sennder == 'sf201020' ? muBobject.msg :""}
                               <div style={{"fontSize":"small","marginBottom":"5"}}>{muBobject.sennder == 'sf201020' && muBobject.seenStatus == 'true' ? <BsCheckAll/> :muBobject.sennder == 'sf201020' && <BsCheck/>}</div></span></h5><h5 
                               style={{ "textAlign": "right", "width": "270px","position":"inline-block", "overflow": "hidden", "wordBreak": "break-all", "marginLeft": "auto" }}><span 
                               style={{"backgroundColor":"rgb(243 241 241)","fontSize":"17px"}}><div style={{"fontSize":"small","marginBottom":"5"}}>{muBobject.sennder != 'sf201020' && this.dateConverter(muBobject.createdAt)}</div>{muBobject.sennder != 'sf201020' && muBobject.msg}</span></h5></>
                            ))
                        
                        
                        
                        }


                    </div>

                    <div style={{  "minHeight": "10vh","marginLeft":"400px" ,"width":"880px","backgroundColor":"rgb(255 255 255)" }} className="container" >
                        <Form style={{"marginTop":"20px"}}>
                            
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label></Form.Label>
                                <Form.Control onChange={this.changeMessageHandler} value={this.state.message} as="textarea" rows={2} />
                            </Form.Group>
                            
                            <Button style={{"marginBottom":"10px","backgroundColor":"#e8e5e5"}}  className="btn " variant="addDel" type="submit" onClick={this.addMessage}>
                            <IoMdSend style={{"siz":"10px"}}/>
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