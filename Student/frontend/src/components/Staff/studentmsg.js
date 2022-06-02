import React, { Component } from 'react';
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { BsFillPersonFill, BsCheckAll, BsCheck, BsChatLeftTextFill, BsPersonSquare } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Header from '../header/header'
import Sidebar from '../sidebar/Sidebar'
import '../Staff/StaffHome/Home.module.css';
import ScrollableFeed from 'react-scrollable-feed';



class studentmsg extends Component {


    constructor(props) {
        super(props)

        this.state = {

            message: '',
            sendmessage: '',
            msgData: '',
            itnum: '',
            msgHistory: '',
            selectChatStatus: true,
            selectAllStatus: false,
            msgSennderNames: [],
            staffId: '',
            selectStafftName: '',
            allStaff: '',
            unseenUsers: ''

        }

        this.addMessage = this.addMessage.bind(this);
        this.changeMessageHandler = this.changeMessageHandler.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.selectedChatUser = this.selectedChatUser.bind(this);
        this.selectChat = this.selectChat.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.getAllStaffMemebers = this.getAllStaffMemebers.bind(this);
        this.addMsgHistory = this.addMsgHistory.bind(this);
        this.getUserBySeen = this.getUserBySeen.bind(this);
        this.getByUnseen = this.getByUnseen.bind(this);
        this.unseenCount = this.unseenCount.bind(this);
        this.handleSearchArea = this.handleSearchArea.bind(this);

    }

    changeMessageHandler = (event) => {
        this.setState({ message: event.target.value }, () => {
            console.log(this.state.message)
        });
    }



    getUserBySeen() {


        // const logUser = sessionStorage.getItem('LogUserId')
        const data = {

            "seenStatus": "false",
            "reciver": this.state.itnum
        }

        const url = 'http://localhost:8000/api/msgHistory/getUsersBySeen';
        axios.post(url, data).then((res) => {

            this.setState({
                unseenUsers: res.data.data
            }, () => {
                console.log("seen 22", this.state.unseenUsers)
            })


            console.log("seen", res)
        })

    }


    addMsgHistory() {


        const data = {

            "personOne": this.state.itnum,
            "personTwo": this.state.staffId

            // "personOne" : "it20045326",
            // "personTwo" : "sf204090"
        }

        try {
            const url = 'http://localhost:8000/api/msgHistory/get';
            axios.post(url, data).then((res) => {


                if (res.data.data.length == 0) {

                    const url = ' http://localhost:8000/api/msgHistory/post';
                    axios.post(url, data).then((res) => {
                        console.log("ch", res)

                        if (res.status == 200) {

                            // this.getMsgListByUserId();

                        }

                    })

                } else {
                    console.log(" else check")

                }

            })


        } catch {

        }


    }





    dateConverter(e) {

        console.log("eeeeeeeeeeeee", e)



        const current = new Date();
        var date = current.getDate();
        var month = current.getMonth();
        var year = current.getFullYear();
        var my2 = date + "/" + month + "/" + year
        console.log("sukith", my2)


        var myDate = new Date(e);



        var date = myDate.getDate();
        var month = myDate.getMonth();
        var year = myDate.getFullYear();
        console.log("date", date)
        var hour = myDate.getHours();
        var minute = myDate.getMinutes();
        var second = myDate.getSeconds();
        var ap = "AM";
        if (hour > 11) { ap = "PM"; }
        if (hour > 12) { hour = hour - 12; }
        if (hour == 0) { hour = 12; }
        if (hour < 10) { hour = "0" + hour; }
        if (minute < 10) { minute = "0" + minute; }
        if (second < 10) { second = "0" + second; }
        var timeString = (hour + ':' + minute + " " + ap);
        var yearStrinig = date + "/" + month + "/" + year



        var dilDate = ((yearStrinig == my2 ? "" : yearStrinig) + " " + " " + timeString)
        return dilDate;
    }


    addMessage = (e) => {

        e.preventDefault()

        this.addMsgHistory();

        const postData = {
            "staffId": this.state.staffId,
            "studentId": this.state.itnum,
            "sennder": this.state.itnum,
            "reciver": this.state.staffId,
            "msg": this.state.message,
            "seenStatus": false
        }

        this.setState({
            message: ""
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



    filterData(staff, searchKey) {
        const result = staff.filter(
            (item) =>
                item.stfStaffId.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
                item.stfStaffId.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
                item.stfName.toLowerCase().includes(searchKey) ||
                item.stfName.toUpperCase().includes(searchKey)
        );

        this.setState({ allStaff: result });
    }



    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
        console.log("change 2", searchKey)

        axios.get("http://localhost:8000/api/staffRegister/get").then((res) => {
            console.log("change", res.data.data)
            if (res.data) {
                this.filterData(res.data.data, searchKey);
            }
        });
    };



    getMessages() {



        this.getMsgListByUserId(this.state.itnum);

        const datas = {

            "seenStatus": "false",
            "reciver": this.state.itnum
        }

        const url = 'http://localhost:8000/api/msgHistory/getUsersBySeen';
        axios.post(url, datas).then((res) => {

            this.setState({
                unseenUsers: res.data.data
            }, () => {
                console.log("seen 22", this.state.unseenUsers)
            })


            console.log("seen", res)
        })


        const data = { 'staffId': this.state.staffId, 'studentId': this.state.itnum }
        console.log(data);

        try {
            const url = 'http://localhost:8000/api/message/get';
            axios.post(url, data).then((res) => {

                this.setState({
                    msgData: res.data.data
                }, () => {

                    console.log("sukii", this.state.msgData);
                    // const len = (this.state.msgData.length)-1

                    // const id = (this.state.msgData[len]._id)

                    this.state.msgData.map((msgObject) => {

                        if (msgObject.seenStatus == "false" && msgObject.sennder != this.state.itnum) {


                            const obj = {
                                seenStatus: true
                            }

                            axios.put(`http://localhost:8000/api/message/update/${msgObject._id}`, obj).then((res) => {
                                if (res) {
                                    console.log("superman", res)
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

    getMsgListByUserId(loguser) {





        const data = {

            "personOne": loguser

        }
        const url = 'http://localhost:8000/api/msgHistory/getbySennder';
        axios.post(url, data).then((res) => {

            this.setState({
                msgHistory: res.data.data
            }, () => {


                this.state.msgHistory.map(obj => {


                    var idNum = obj.personOne != this.state.itnum ? obj.personOne : obj.personTwo

                    var data = {
                        "stfStaffId": idNum
                    }

                    const url = 'http://localhost:8000/api/msgHistory/getStaff'
                    axios.post(url, data).then((res) => {
                        console.log("index", res)

                        var nameData = res.data.data[0].stfName + "  " + res.data.data[0].stfStaffId

                        let { msgSennderNames } = this.state

                        if (msgSennderNames.indexOf(nameData) === -1) {

                            msgSennderNames.push(nameData)

                        }
                        this.setState({ msgSennderNames })



                    })


                })

            })
            // console.log("ssv",res.data.data)
        })

    }


    selectChat = (e) => {
        e.preventDefault()

        const id = this.state.itnum



        this.getMsgListByUserId(id);

        this.setState({
            selectAllStatus: false,
            selectChatStatus: true
        })
    }

    selectAll = (e) => {
        e.preventDefault()

        this.setState({

            selectChatStatus: false,
            selectAllStatus: true


        })
    }


    selectedChatUser(obj) {

        console.log("z", obj)
        const value = obj.split("  ")
        console.log("z", value)

        this.setState({
            staffId: value[1],
            selectStafftName: value[0],
            selectChat: obj
        })

    }

    selectedUser(id, name) {

        const names = name + "  " + id
        console.log("id", id)
        this.setState({
            staffId: id,
            selectStafftName: name,
            selectChat: names,
            selectAllStatus: false,
            selectChatStatus: true
        })
    }

    getAllStaffMemebers() {


        const url = 'http://localhost:8000/api/staffRegister/get'

        axios.get(url).then((res) => {


            if (res.status == 200) {

                this.setState({
                    allStaff: res.data.data
                })
                console.log("allstudents", this.state.allstudents)
            }
        })

    }




    unseenCount(obj) {
        const data = obj.split('  ')[1]
        console.log("seen data", data)


        // check the number of unseen messages
        const msgNumber = this.state.unseenUsers
        var val = msgNumber.filter(checknumbermsg).length

        function checknumbermsg(msgNumber) {
            return msgNumber.sennder == data
        }
        console.log("seen value", val)

        return val == 0 ? "" : val

    }


    getByUnseen(obj) {

        const data = obj.split('  ')[1]
        console.log("seen data", data)





        // get the status of unseen messages
        const uniqueTags = [];
        this.state.unseenUsers.map(object => {
            if (uniqueTags.indexOf(object.sennder) === -1) {
                uniqueTags.push(object.sennder)
            }
            console.log("seen 10", uniqueTags)

        })



        function checkAvailability(arr, val) {
            return arr.some(function (arrVal) {
                return val === arrVal;
            });
        }

        var value = checkAvailability(uniqueTags, data);
        console.log("seen xoxo", value)


        return value



    }



    componentDidMount() {


        this.getAllStaffMemebers();
        const itnum = localStorage.getItem('studentId');
        this.setState({
            itnum: itnum
        })

        this.getMsgListByUserId(itnum);


        this.interval = setInterval(() => {
            this.getMessages()
        }, 5000);

        this.getUserBySeen()
    }

    componentWillUnmount() {
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
                        <div className='app-content' style={{ "backgroundColor": "hsl(0deg 0% 97%)" }}>

                            <div className='homeMain'>

                                <div style={{ "minHeight": "50vh", "width": "1300px", "backgroundColor": "hsl(0deg 0% 97%)", "boxShadow": "0px 3px 3px -2px rgb(0 0 0/20%), 0px 3px 4px 0px rgb(0 0 0/14%), 0px 1px 8px 0px rgb(0 0 0/12%)" }} className="container ">

                                    <div className='container' style={{ "backgroundColor": "rgb(142 164 184)", "width": "400px", "position": "absolute" }}>
                                        <Row style={{ "height": "55px" }}>

                                            <Col>
                                                {this.state.selectAllStatus ? <Button style={{ "backgroundColor": "#e8e5e5" }} className="btn " variant="addDel" type="submit" onClick={this.selectChat}>
                                                    <BsChatLeftTextFill style={{ "siz": "10px", }} />

                                                </Button> : <Button style={{ "backgroundColor": "#afcdf9" }} className="btn " variant="addDel" type="submit" onClick={this.selectChat}>
                                                    <BsChatLeftTextFill style={{ "siz": "10px", }} />

                                                </Button>}

                                                <p>Chat</p>

                                            </Col>

                                            <Col>
                                                {this.state.selectChatStatus ? <Button style={{ "marginBottom": "5px", "backgroundColor": "#e8e5e5" }} className="btn " variant="addDel" type="submit" onClick={this.selectAll}>
                                                    <BsPersonSquare style={{ "siz": "10px" }} />
                                                </Button> : <Button style={{ "marginBottom": "5px", "backgroundColor": "#afcdf9" }} className="btn " variant="addDel" type="submit" onClick={this.selectAll}>
                                                    <BsPersonSquare style={{ "siz": "10px" }} />
                                                </Button>}

                                                <p>All</p>


                                            </Col>

                                            <Col></Col>

                                            <Col>
                                                {this.state.selectAllStatus && <div>
                                                    <input
                                                        className="form-control"
                                                        type="search"
                                                        placeholder="Search"
                                                        name="searchQuery"
                                                        onChange={this.handleSearchArea}
                                                        style={{
                                                            width: "180px",

                                                            marginRight: "18px",

                                                            borderColor: "rgba(6, 21, 117,0.5)",
                                                            float: "right"
                                                        }}
                                                    ></input>
                                                </div>}
                                            </Col>

                                        </Row>

                                    </div>



                                    {this.state.selectChatStatus &&

                                        <><div className='container' style={{ "backgroundColor": "rgb(144 169 206 / 25%)", "width": "400px", "position": "absolute", "marginTop": "75px", 'height': '600px', 'overflow': 'auto', 'display': 'block' }}>

                                            {this.state.msgSennderNames &&

                                                this.state.msgSennderNames.map(obj =>

                                                    // this.state.unseenUsers.map(unseenObj =>

                                                    //     console.log("seen x",unseenObj.sennder),







                                                    //       if((unseenUsers.sennder[0]).indexOf(data[1]) === -1)
                                                    //   {

                                                    //      msgSennderNames.push(nameData)

                                                    //    }
                                                    this.getByUnseen(obj) ? <p style={{ "backgroundColor": "rgb(184 202 228)", "padding": "inherit", "fontWeight": "700", "WebkitTextStroke": "thin" }} onClick={() => this.selectedChatUser(obj)}>

                                                        {obj}{" "}{this.getByUnseen(obj)}{"  "}{this.unseenCount(obj) ? <span style={{
                                                            "color": "rgb(255 255 255)", "marginRight": "10px", "padding": "5px", "float": "right",
                                                            "paddingLeft": "inherit", "paddingRight": "inherit", "backgroundColor": "#2e4d7a",
                                                            "borderRadius": "100px", "fontSize": "12px"
                                                        }}>{this.unseenCount(obj)}</span> : ""}</p> : this.state.selectChat == obj ? <p style={{ "backgroundColor": "rgb(109 140 186)", "padding": "inherit", "fontWeight": "400", "WebkitTextStroke": "thin" }} onClick={() => this.selectedChatUser(obj)}>

                                                            {obj}{" "}{this.getByUnseen(obj)}{"  "}</p> : <p style={{ "backgroundColor": "#b8cae4", "padding": "inherit", "fontWeight": "400", "WebkitTextStroke": "thin" }} onClick={() => this.selectedChatUser(obj)}>

                                                        {obj}{" "}{this.getByUnseen(obj)}{"  "}{this.state.selectChat == obj ? <span style={{
                                                            "color": "rgb(255 255 255)", "float": "right", "padding": "5px",
                                                            "paddingLeft": "inherit", "paddingRight": "inherit", "backgroundColor": "#2e4d7a",
                                                            "borderRadius": "100px", "fontSize": "12px"
                                                        }}>"xoxaaaa"</span> : ""}</p>








                                                )}

                                        </div></>

                                    }


                                    {/*   this is for all students */}


                                    {this.state.selectAllStatus && <div className='container' style={{ "backgroundColor": "rgb(144 169 206 / 25%)", "width": "400px", "position": "absolute", "marginTop": "75px", 'height': '600px', 'overflow': 'auto', 'display': 'block' }}>

                                        {
                                            this.state.allStaff &&

                                            this.state.allStaff.map(obj => (

                                                console.log("inside all", obj),



                                                <p style={{ "backgroundColor": "#b8cae4", "padding": "inherit", "fontWeight": "400", "WebkitTextStroke": "thin" }} onClick={() => this.selectedUser(obj.stfStaffId, obj.stfName)} >{obj.stfName}{" "}{obj.stfStaffId}</p>


                                            ))}
                                    </div>}

                                    <div className='container' style={{ "backgroundColor": "rgb(142 164 184)", "width": "890px", "position": "absolute", "marginLeft": "400px", "height": "40px" }}><span style={{ "fontWeight": "bolder", "WebkitTextStroke": "thin" }} >{this.state.selectStafftName}{" "}&nbsp;{" "}{this.state.staffId}</span></div>

                                    <div style={{ "minHeight": "20vh", "width": "880px", 'height': '485px', 'display': 'block', "marginLeft": "399px", "backgroundColor": "rgb(255 255 255)", "marginTop": "50px" }} className="container " >
                                        <ScrollableFeed>
                                            {
                                                this.state.msgData &&

                                                this.state.msgData.map(muBobject => (

                                                    console.log("vbb", muBobject),


                                                    <><h5 style={{ "textAlign": "left", "width": "300px", "display": "inline-block", "overflow": "hidden", "wordBreak": "break-all", "marginLeft": "5px" }}>{muBobject.sennder == this.state.itnum && <span
                                                        style={{ "backgroundColor": " #c7e0f4", "fontSize": "16px" }}><div style={{ "fontSize": "12px", "marginBottom": "5px" }}>{muBobject.sennder == this.state.itnum && <BsFillPersonFill />}{" "}{muBobject.sennder == this.state.itnum && this.dateConverter(muBobject.createdAt)}</div>
                                                        <span style={{ "padding": "9px", "backgroundColor": "rgb(173 206 255 / 50%)", "borderRadius": "10px", "float": "left" }}>{muBobject.sennder == this.state.itnum ? muBobject.msg : ""}
                                                        </span>
                                                    </span>}</h5> <div style={{ "fontSize": "small", "marginBottom": "12px", "marginTop": "-5px", "marginLeft": "5px", "marginRight": "10px" }}>{muBobject.sennder == this.state.itnum && muBobject.seenStatus == 'true' ? <BsCheckAll /> : muBobject.sennder == this.state.itnum && <BsCheck />}</div><h5
                                                        style={{ "textAlign": "right", "width": "310px", "position": "inline-block", "overflow": "hidden", "wordBreak": "break-all", "marginLeft": "auto" }}>{muBobject.sennder != this.state.itnum && <span
                                                            style={{ "fontSize": "16px" }}><div style={{ "fontSize": "small", "marginBottom": "5", "marginRight": "10px" }}>{muBobject.sennder != this.state.itnum && muBobject.sennder}{"  "}&nbsp;{" "}{muBobject.sennder != this.state.itnum && this.dateConverter(muBobject.createdAt)}</div>
                                                            <span style={{ "padding": "9px", "backgroundColor": "rgb(240 240 241)", "borderRadius": "10px", "float": "right", "marginRight": "10px" }} >{muBobject.sennder != this.state.itnum && muBobject.msg}</span></span>}</h5><div ref={this.messagesEndRef} /></>

                                                ))



                                            }
                                        </ScrollableFeed>

                                    </div>

                                    <div style={{ "minHeight": "10vh", "marginLeft": "400px", "width": "880px", "backgroundColor": "rgb(255 255 255)" }} className="container" >
                                        <Form style={{ "marginTop": "20px" }}>

                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label></Form.Label>
                                                <Form.Control onChange={this.changeMessageHandler} value={this.state.message} as="textarea" rows={2} />
                                            </Form.Group>

                                            <Button style={{ "marginBottom": "10px", "backgroundColor": "#e8e5e5" }} className="btn " variant="addDel" type="submit" onClick={this.addMessage}>
                                                <IoMdSend style={{ "siz": "10px" }} />
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


