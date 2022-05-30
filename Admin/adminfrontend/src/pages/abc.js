import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router"; 
import panel from '../../../admin_backend/models/panel';
import { Form, Button, Table, Row, Col } from "react-bootstrap";
export default class abc extends Component {

    constructor(props){
        super(props);
        this.state={
            
            panelId:"",
            memberName:[{}],
            studentGroup:"",
            memberName1:"",
            memberName2:"",
            memberName3:"",
            memberName4:""
        }
    }

    handleInputChange=(e)=>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    handleMemberChange = (e)=>{
        console.log("test",e.target.name)
        const {name,value,index} = e.target;

        switch (e.target.name) {
            case 'memberName1' :
                this.setState({
                    memberName1:e.target.value
                })
                break;
            case 'memberName2' :
                this.setState({
                    memberName2:e.target.value
                })
                break;
            case 'memberName3' :
                this.setState({
                    memberName3:e.target.value
                })
                break;
            case 'memberName4' :
            this.setState({
                memberName4:e.target.value
            })
            break;

        }
        this.setState({
        ...this.state.memberName,
        [[index][name]] : value
    })
        //memberName(array);
      }

    onSubmit=(e)=> {
        e.preventDefault();
        /** */
            const id = this.props.match.params.id;

            const {panelId, studentGroup} = this.state;

            const data = {
                
                panelId: panelId,
                studentGroup:studentGroup,
                
                "memberName":[
                    {"memberName":this.state.memberName1},
                    {"memberName":this.state.memberName2},
                    {"memberName":this.state.memberName3},
                    {"memberName":this.state.memberName4}        
            ],
               
            }

            console.log(data);

            axios.put(`http://localhost:8000/api/admin/panel/update/${id}`, data).then((res) => {
                if (res.data.success) {
                    alert("Panel Details Updated Successfully!");
                    window.location.href='/viewPanels';
                    this.setState(
                        {
                            panelId: "",
                            studentGroup:"",
                            memberName:"",
                            
                        }
                    )
                }
            })
        }
    
        componentDidMount(){
            const id=this.props.match.params.id;
            
            axios.get(`http://localhost:8000/api/admin/panel/get/${id}`).then((res) =>{
                if(res.data.success){
                    
                    this.setState({

                        panelId:res.data.panel.panelId,
                        studentGroup:res.data.panel.studentGroup,
                        memberName:res.data.panel.memberName,
                        memberName1:res.data.panel.memberName[0].memberName,
                        memberName2:res.data.panel.memberName[1].memberName,
                        memberName3:res.data.panel.memberName[2].memberName,
                        memberName4:res.data.panel.memberName[3].memberName
                        
                    },()=>{
                        console.log("member name",res.data.panel.memberName[1].memberName)

                    });
                            // const mmName=res.data.panel.memberName
                            // let {memberName} = this.state
                            // if(memberName.indexOf(mmName) === -1)
                            // {
                            //     memberName.push(mmName)
                            // }

                            //  this.setState({memberName})
                            // console.log("Meassage",res.data.panel.memberName)          
                }
            });
        }

  render() {
    return (
        <div className='container'>
        <div style={{width:'100%',margin:'40px',borderRadius:'0px',backgroundColor: '#D3D3D3',marginTop:'-30px',marginLeft:'0px'}}>
        <div className="col-md-8 mt-4 mx-auto"><br/><br/><br/>
        <button className="btn btn-danger" style={{width:'160px'}}>
        <a href="/viewPanels" style={{textDecoration:'none',color:'white',fontWeight:'bold'}}>
          View Panels
        </a></button><br/><br/>

    <h1 className="h3 mb-3 font-weight-normal" style={{color:'#B91717',fontWeight:'bolder'}}>Edit the Role details</h1>
            <form className="needs-validation" noValidate>
               
                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>PANEL ID</label>
                    <input type="text" className="form-control" name="panelId" placeholder="Enter panelId" value={this.state.panelId} onChange={this.handleInputChange}/>
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>STUDENT GROUP</label>
                    <input type="text" className="form-control" name="studentGroup" placeholder="Enter studentGroup" value={this.state.studentGroup} onChange={this.handleInputChange}/>
                    
                </div>
               

                {console.log("console Input",this.state.memberName)}
                
                <div className="form-group" style={{marginBottom:'15px'}}>

                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>MEMBER NAMES(S)</label>
                    
           {/* {this.state.memberName[0] && this.state.memberName[1] && this.state.memberName[2] && this.state.memberName[3] && */}
                <Row>
               
                    <Col><input 
                        type="text" className="form-control" name="memberName1" placeholder="Enter memberName" value={this.state.memberName1} onChange={this.handleMemberChange}/>
                    </Col>
                    

                    <Col><input 
                        type="text" className="form-control" name="memberName2" placeholder="Enter memberName" value={this.state.memberName2} onChange={this.handleMemberChange}/>
                    </Col>
                   

                    <Col><input 
                        type="text" className="form-control" name="memberName3" placeholder="Enter memberName" value={this.state.memberName3} onChange={this.handleMemberChange}/>
                    </Col>
                   
                  
                    <Col><input 
                        type="text" className="form-control" name="memberName4" placeholder="Enter memberName" value={this.state.memberName4}  onChange={this.handleMemberChange}/>
                    </Col>
                    
                </Row>
            {/* } */}
                </div>


                <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                    <i className="far fa-check-square"></i>
                        &nbsp;Update
                </button>
                <br/><br/>
            </form>


    </div>
    </div> 
    </div>
    )
  }
}
