import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router"; 

export default class editRoles extends Component {

    constructor(props){
        super(props);
        this.state={
            
            stfStaffId:"",
            stfJobRole:"",
            stfResField:"",
            stfUserActive:""
        }
    }

    handleInputChange=(e)=>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit=(e)=> {
        e.preventDefault();
        /** */
            const id = this.props.match.params.id;

            const {stfStaffId, stfJobRole, stfResField, stfUserActive} = this.state;

            const data = {
                
                stfStaffId: stfStaffId,
                stfJobRole:stfJobRole,
                stfResField:stfResField,
                stfUserActive:stfUserActive
            }

            console.log(data);

            axios.put(`http://localhost:8000/api/admin/role/update/${id}`, data).then((res) => {
                if (res.data.success) {
                    alert("Role Details Updated Successfully!");
                    window.location.href='/viewRoles';
                    this.setState(
                        {
                            stfStaffId: "",
                            stfJobRole:"",
                            stfResField:"",
                            stfUserActive:""
                        }
                    )
                }
            })
        }
    
        componentDidMount(){
            const id=this.props.match.params.id;
    
            axios.get(`http://localhost:8000/api/admin/role/get/${id}`).then((res) =>{
                if(res.data.success){
                    this.setState({

                        stfStaffId:res.data.role.stfStaffId,
                        stfJobRole:res.data.role.stfJobRole,
                        stfResField:res.data.role.stfResField,
                        stfUserActive:res.data.role.stfUserActive
                        
                    });
    
                    console.log(this.state.stfStaffId);
                }
            });
        }

  render() {
    return (
        <div className='container'>
        <div style={{width:'100%',margin:'40px',borderRadius:'0px',backgroundColor: '#D3D3D3',marginTop:'-30px',marginLeft:'0px'}}>
        <div className="col-md-8 mt-4 mx-auto"><br/><br/><br/>
        <button className="btn btn-danger" style={{width:'160px'}}>
        <a href="/viewRoles" style={{textDecoration:'none',color:'white',fontWeight:'bold'}}>
          View Roles
        </a></button><br/><br/>

    <h1 className="h3 mb-3 font-weight-normal" style={{color:'#B91717',fontWeight:'bolder'}}>Edit the Role details</h1>
            <form className="needs-validation" noValidate>
               
                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>STAFF ID</label>
                    <input type="text" className="form-control" name="stfStaffId" placeholder="Enter stfStaffId" value={this.state.stfStaffId} onChange={this.handleInputChange}/>
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>JOB ROLE</label>
                    <input type="text" className="form-control" name="stfJobRole" placeholder="Enter stfJobRole" value={this.state.stfJobRole} onChange={this.handleInputChange}/>
                    
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>RESEARCH FIELD</label>
                    <input type="text" className="form-control" name="stfResField" placeholder="Enter stfResField" value={this.state.stfResField} onChange={this.handleInputChange}/>
                    
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight:'bold',color:'black',fontSize:'20px'}}>ACTIVE/INACTIVE STATUS</label>
                    <input type="text" className="form-control" name="stfUserActive" placeholder="Enter stfUserActive" value={this.state.stfUserActive} onChange={this.handleInputChange}/>
                    
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
