import React, { Component, useState } from 'react'
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import Button from 'react-bootstrap/Button';

function createPanel () {
  const[memberName,setmemberName] = useState([ {memberName:""}]);
  const [panelId, setPanelId] = useState('');
  const [studentGroup,setStudentGroup]=useState('')

const handleMemberAdd = () =>{
  setmemberName([...memberName,{memberName:""}])
  console.log("message 1",memberName)
}

const handleMemberRemove = (index)=>{
  const array = [...memberName];
  array.splice(index,1);
  setmemberName(array);
};

const handleMemberChange = (e,index)=>{
  const {name,value} = e.target
  const array = [...memberName];
  array[index][name] = value;
  setmemberName(array);
}




function sendData(e) {
  e.preventDefault();
 

      const newPanel= {
        panelId,
        memberName,
        studentGroup
        
      }

      axios.post("http://localhost:8000/api/admin/panels/create", newPanel).then(() => {
          alert("Panel added successfully");
          window.location.href='/viewPanels';
      }).catch((err) => {
          alert("Unable to add" + err);
      })
  }


  return(
    <div>
    <AdminNavbar/>
    <div className='card' style={{marginLeft:'300px', background: "#D3D3D3",height:'auto'}}>
    <br/>
      <h1 style={{color: 'rgba(6, 21, 117)'}}>CREATE A PANEL</h1>
      <br/>
    <form autoComplete='off' onSubmit={sendData} style={{marginLeft:'100px'}}>
      <div className='form-field'>
        <label htmlFor='memberName' style={{fontWeight:'bold'}}>MEMBER(S)</label>
          {memberName.map((singleMember,index)=>(
            <div key={index} >
                <div>
                  <input name="memberName" type="text" id="memberName"
                    className="form-control"
                    value={singleMember.memberName}
                    onChange={(e)=>handleMemberChange(e,index)}
                    style={{width:'300px'}}
                    required
                  />
                  
                  {memberName.length-1===index && memberName.length<4 && (
                    <button onClick={handleMemberAdd}
                      style={{marginLeft:'350px',marginTop:'-38px'}}
                      className="btn btn-secondary"
                    >
                      <span>+</span>
                    </button>
                  )}
                </div>
               
                <div>
                {memberName.length>1 && (
                  <button onClick={()=>handleMemberRemove(index)}
                      className="btn btn-danger"
                      style={{padding:'10px',marginTop:'20px',marginBottom:'20px'}}
                  >
                    <span>Remove</span>
                  </button>
                  )}
                </div>
                
            </div>
            
          ))}
      </div>
         <br/>
      <div>
        <label style={{fontWeight:'bold'}}>PANEL ID</label>
        <input
          type="text"
          onChange={(e) => {
            setPanelId(e.target.value);
          }}
          className="form-control"
          style={{width:'300px'}}
          required
        />
        
      </div>
      <br/>
      <div>
        <label style={{fontWeight:'bold'}}>STUDENT GROUP</label>
        <input
          type="text"
          onChange={(e) => {
            setStudentGroup(e.target.value);
          }}
          className="form-control"
          style={{width:'300px'}}
          required
        />
        
      </div>
        <br/>
      <Button variant="primary" type="submit" className='submitBtnForm'>
                    ADD PANEL
      </Button>
      &nbsp;
      <Button variant="primary" className='submitBtnForm'><a href="/viewPanels" style={{color:'white',textDecoration:'none'}}>
                    VIEW PANEL
      </a></Button>
    </form>
    <br/>
    
    </div>
    <Footer/>
    </div>
  )

}

export default createPanel