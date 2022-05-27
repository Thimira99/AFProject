import React, { Component } from 'react';
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { BsFillPersonFill ,BsCheckAll,BsCheck ,BsChatLeftTextFill} from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Header from '../header/header'
import Sidebar from '../sidebar/Sidebar'
import '../Staff/StaffHome/Home.module.css';





class staffMsg extends Component {

    constructor(props) {
        super(props)

        this.state = {

            message: '',
            sendmessage: '',
            msgData: '',
            convertedDate:{},
            seenStatus:false,
            logUserId:'',
            sennderId : 'it20045326s',
            msgHistory:'',
            studentData:'',
            allstudents:{},
            statuss : true,
            selectChatStatus : true,
            selectAllStatus : false,

        }

        this.addMessage = this.addMessage.bind(this);
        this.changeMessageHandler = this.changeMessageHandler.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.dateConverter = this.dateConverter.bind(this);
        this.addMsgHistory = this.addMsgHistory.bind(this);
        this.getMsgListByUserId = this.getMsgListByUserId.bind(this);
        this.getStudentName = this.getStudentName.bind(this);
        this.getAllStudents = this.getAllStudents.bind(this);
        this.selectChat = this.selectChat.bind(this);
        this.selectAll = this.selectAll.bind(this);
    }

    changeMessageHandler = (event) => {
        this.setState({ message: event.target.value }, () => {
            console.log(this.state.message)
        });
    }



    addMsgHistory(){
       

      const data = { 
        "personOne" : this.state.logUserId+"9",
        "personTwo" : this.state.sennderId

        // "personOne" : "it20045326",
        // "personTwo" : "sf204090"
       }

       try {
        const url = 'http://localhost:8000/api/msgHistory/get';
        axios.post(url, data).then((res) => {
            

            if (res.data.data.length == 0) {
              
                const url =' http://localhost:8000/api/msgHistory/post';
                axios.post(url,data).then((res) => {
                console.log("ch",res)

                if (res.status == 200){

                    // this.getMsgListByUserId();
                   
                }

                })

            }else{
                console.log(" else check")

            }

        })


    } catch {

    }


    }


    getMsgListByUserId(loguser){

        const data = {

            "personOne" : loguser

        }
        const url ='http://localhost:8000/api/msgHistory/getbySennder';
        axios.post(url,data).then((res) =>{

            this.setState({
                msgHistory:res.data.data
            })
            console.log("ssv",res.data.data)
        })

    }


    selectChat = (e) =>{
        e.preventDefault()

        this.setState({
            selectAllStatus : false,
            selectChatStatus : true
        })
    }

    selectAll = (e) =>{
        e.preventDefault()

        this.setState({

            selectChatStatus : false,
            selectAllStatus : true
            
 
        })
    }

    addMessage = (e) => {


        e.preventDefault()

        this.addMsgHistory();
        
        console.log("inside add")


        const postData = {
            "staffId": this.state.logUserId,
            "studentId": "it20045326",
            "sennder": this.state.logUserId,
            "reciver": "it20045326",
            "msg": this.state.message,
            "seenStatus" : false,
        }

        this.setState({
            message : ""
        })

        try {
            const url = 'http://localhost:8000/api/message/post';
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


        const data = { 'staffId': this.state.logUserId, 'studentId': 'it20045326' }
        console.log(data);

        try {
            const url = 'http://localhost:8000/api/message/get';
            axios.post(url, data).then((res) => {

               
                this.setState({
                    msgData: res.data.data
                }, () => {

                    console.log("sukii",this.state.msgData);
                    // const len = (this.state.msgData.length)-1
                  
                    // const id = (this.state.msgData[len]._id)

                    this.state.msgData.map((msgObject) =>{
                     
                        if(msgObject.seenStatus == "false" && msgObject.sennder != this.state.logUserId){
                            console.log("superman 111111111")
    
                            const obj = {
                                seenStatus : true
                            }
                            
                            axios.put(`http://localhost:8000/api/message/update/${msgObject._id}`,obj).then((res) => {
                                if(res){
                                    console.log("superman",res)
                                }
                            })
                        }

                    })

                   

                })

                console.log(res);
            }).catch((err) => {
                console.log(err)
            });

            console.log(res.message);
        } catch (error) {

        }


    }

    getStudentName(data){


        this.setState({
            statuss : false
        })

      

       

        if(this.state.allstudents){
            
            this.state.allstudents.map((obj) =>{
                if(data == obj.studentId){
                    console.log("per",obj.studentName)
                    this.setState({
                        statuss : true
                    },()=>{

                        return obj.studentName;

                    })
               
                 
                }
                
            })
        }
      
        
       "return this.state.studentData;"
        
    }


    getAllStudents(){

        const url = 'http://localhost:8000/api/student/get'

        axios.get(url).then((res) =>{

            if(res.status == 200){

                this.setState({
                    allstudents : res.data
                })
            }
           
        })

    }



    componentDidMount() {


        // this.getAllStudents()

        const logUser = sessionStorage.getItem('LogUserId')
        this.getMsgListByUserId(logUser);
        this.setState({
            logUserId:logUser
            
        });


       

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

                        <div className='container' style={{"backgroundColor":"rgb(142 164 184)","width":"400px","position":"absolute"}}>
                            <Row style={{"height":"55px"}}>

                              <Col>   
                        <Button style={{"backgroundColor":"#e8e5e5"}}  className="btn " variant="addDel" type="submit" onClick={this.selectChat}>
                            <BsChatLeftTextFill style={{"siz":"10px",}}/>
                            
                        </Button>
                        <p>Chat</p>

                        </Col>

                        <Col>
                        <Button style={{"marginBottom":"5px","backgroundColor":"#e8e5e5"}}  className="btn " variant="addDel" type="submit" onClick={this.selectAll}>
                            <IoMdSend style={{"siz":"10px"}}/>
                        </Button>
                        <p>All</p>
                        </Col>

                        <Col></Col><Col></Col><Col></Col>

                        </Row>
                        </div>



                       { this.state.selectChatStatus &&
                       
                       <><div className='container' style={{ "backgroundColor": "rgb(144 169 206 / 25%)", "width": "400px", "position": "absolute", "marginTop": "75px" }}>

                                                {this.state.msgHistory &&

                                                    this.state.msgHistory.map(obj => (


                                                        <p style={{ "backgroundColor": "#b8cae4", "padding": "inherit" }}>{(obj.personOne != this.state.logUserId ? obj.personOne : obj.personTwo)}</p>

                                                        // <p>{this.getStudentName(obj.personOne)}</p>
                                                    ))}
                                            </div></>}


                          {/*   this is for all students */}
 
                           
                           { this.state.selectAllStatus && <div className='container' style={{"backgroundColor":"rgb(144 169 206 / 25%)","width":"400px","position":"absolute","marginTop":"75px"}}>

                                {
                                    this.state.msgHistory &&
                                
                                    this.state.msgHistory.map( obj => (


                                //   <p style={{"backgroundColor":"#b8cae4","padding":"inherit"}}>{(obj.personOne != this.state.logUserId ? obj.personOne : obj.personTwo)}</p> 

                                <p style={{ "backgroundColor": "#b8cae4", "padding": "inherit" }}>test</p>

                                    // <p>{this.getStudentName(obj.personOne)}</p>
                                ))}
                            </div>}
                    
                    
                         <div style={{ "minHeight": "20vh","width":"880px",'height': '485px', 'overflow':'auto', 'display': 'block',"marginLeft":"399px","backgroundColor":"rgb(255 255 255)" }} className="container " >
                        
                        {
                            this.state.msgData &&

                            this.state.msgData.map( muBobject => (

                                console.log("ccccccxxxxxxxxxxsssssssss",muBobject),
                               

                               <><h5 style={{ "textAlign": "left", "width": "280px", "display": "inline-block", "overflow": "hidden", "wordBreak": "break-all","marginLeft":"5px" }}><span 
                               style={{"backgroundColor":" #c7e0f4","fontSize":"17px"}}><div style={{"fontSize":"12px","marginBottom":"5"}}>{muBobject.sennder == this.state.logUserId &&  <BsFillPersonFill/>}{" "}{muBobject.sennder == this.state.logUserId && this.dateConverter(muBobject.createdAt)}</div>{muBobject.sennder == this.state.logUserId ? muBobject.msg :""}
                               <div style={{"fontSize":"small","marginBottom":"5"}}>{muBobject.sennder == this.state.logUserId && muBobject.seenStatus == 'true' ? <BsCheckAll/> :muBobject.sennder == this.state.logUserId && <BsCheck/>}</div></span></h5><h5 
                               style={{ "textAlign": "right", "width": "270px","position":"inline-block", "overflow": "hidden", "wordBreak": "break-all", "marginLeft": "auto" }}><span 
                               style={{"backgroundColor":"rgb(243 241 241)","fontSize":"17px"}}><div style={{"fontSize":"small","marginBottom":"5"}}>{muBobject.sennder != this.state.logUserId && this.dateConverter(muBobject.createdAt)}</div>{muBobject.sennder != this.state.logUserId && muBobject.msg}</span></h5></>
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

export default staffMsg;


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