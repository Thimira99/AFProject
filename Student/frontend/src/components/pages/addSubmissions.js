import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/header';

export default class addSubmissions extends Component {

    constructor(props){
      super(props);
      this.state={
        groupId:"",
        topic:"",
        researchField:"",
        type:"",
        supervisorName:"",
           /** */
          errors:{},
          errorsN:{},
          error:{},
          errorS:{}
  
      }
    }
      handleInputChange=(e)=>{
        const {name,value} = e.target;
  
        this.setState({
            ...this.state,
            [name]:value
        })
    }
  
  /** */
  formValidation = () =>{
    const{groupId,topic,researchField,supervisorName}=this.state;
    let isValid = true;
    const errors ={};
    const error = {};
    const errorsN = {};
    const errorS= {};
  
    if(groupId.trim().length<3){
        error["groupIdLength"] = "Invalid Group ID";
        isValid=false;
    }
  
    
    if(!groupId){
        error["groupIdInput"] = "group Id Field is EMPTY!";
        isValid=false;
    }
  
    if(!topic){
        errorsN["topicInput"] = "topic Field is EMPTY!";
        isValid=false;
    }
  
    if(!researchField){
        errors["researchFieldInput"] = "research field Field is EMPTY!";
        isValid=false;
    }
    if(!supervisorName){
      errorS["supervisorNameInput"]= "Supervisor name field Field is EMPTY!";
      isValid=false;
    }
  
    this.setState({errors:errors,error:error,errorsN:errorsN,errorS:errorS});
    return isValid;
  }
  /** */
  
    onSubmit=(e)=>{
      e.preventDefault();
  
      /** */
      const isValid = this.formValidation();
      if(isValid){
  
  
      const{groupId,topic,researchField,supervisorName}= this.state;
  
      const data={
          groupId:groupId,
          topic:topic,
          researchField:researchField,
          supervisorName:supervisorName
      }
          
      console.log(data);
  
      axios.post("http://localhost:8000/api/student/student/submissions/add",data).then((res)=>{
        if(res.data.success){
          alert("Topic registered Successfully!")
          this.setState(
            {
              groupId:"",
              topic:"",
              researchField:"",
              supervisorName:""
            }
          )
        }
      })
  }
  }
     
  render() {
        const{errors}=this.state;
        const{error}=this.state;
        const{errorsN}=this.state;
        const{errorS}=this.state;

        const status = this.state;
    return (
        <div>
        
        <div className='app-header'>
                <Header />
            </div>
            <div className='app-body'>
                <div className='body-wrapper'>
                    <div className='app-sidebar'>
                        <Sidebar />
                    </div>
                    <div className='app-content'>
                          
      <div className='container' 
         style={{width: '100%',marginTop:'-20px', marginLeft:'200px', backgroundColor:'rgba(0, 0, 0, 0.6)',borderRadius:'none',border:'none',borderColor:'none',
        }}
      >
      <div style={{width:'100%',borderRadius:'0px'}}>
      <div className='col-md-8 mt-4 mx-auto'>
      <br/>
      <br/>
      
        <h1 className='h3 mb-3 font-weight-normal' style={{color:'black'}}> Register your research topic</h1>
        <form className='needs-validation' noValidate onSubmit={this.onSubmit}>
          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px',color:'white'}}>GROUP ID</label>
            <input 
              type="text"
              className="form-control"
              name="groupId"
              placeholder="Enter groupId"
              value={this.state.groupId}
              onChange={this.handleInputChange}
              
            />
            {Object.keys(error).map((key)=>{
             return <div style={{color:'red'}} key={key}>{error[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px',color:'white'}}>TOPIC</label>
            <input 
              type="text"
              className="form-control"
              name="topic"
              placeholder="Enter topic"
              value={this.state.topic}
              onChange={this.handleInputChange}
            />
             {Object.keys(errorsN).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorsN[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px',color:'white'}}>RESEARCH FIELD</label>
            <input 
              type="text"
              className="form-control"
              name="researchField"
              placeholder="Enter hotel researchField"
              value={this.state.researchField}
              onChange={this.handleInputChange}
            />
            {Object.keys(errors).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errors[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px',color:'white'}}>SUPERVISOR NAME</label>
            <input 
              type="text"
              className="form-control"
              name="supervisorName"
              placeholder="Enter hotel Supervisor Name"
              value={this.state.supervisorName}
              onChange={this.handleInputChange}
            />
            {Object.keys(errorS).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorS[key]}</div> })}
          </div>

          <button className="btn btn-success" type="submit" style={{marginTop:'15px',marginBottom:'150px'}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
             &nbsp;Save
          </button>
          <br/>
        </form>

      </div>
      </div>
      </div>
      </div>
      </div>
  
     </div>
      </div>
    )
    
   }
    
}
