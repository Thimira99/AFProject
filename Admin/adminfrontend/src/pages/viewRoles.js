import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'
import { Button, Dropdown } from 'react-bootstrap';
import "./ToggleSwitch.css"; 

export default class viewRoles extends Component {

    constructor(props){
        super(props);

        this.state={
            roles:[],
            isToggled:true
        };
        this.onToggle = this.onToggle.bind(this)
    }

    componentDidMount(){
        this.retrieveRoles();
    }

    onToggle=(data)=>{
      console.log("toogle1",data)
      const value=this.state.data ? false: true
      this.setState({isToggled:value})
      console.log("toggle",this.state.isToggled)
    }

    retrieveRoles(){
        axios.get("http://localhost:8000/api/admin/roles/get").then(res=>{
            if(res.data.success){
                this.setState({
                    roles:res.data.existingRoles

                    
                });
                console.log(this.state.roles)
            }
        });
    }


    onClickDisabled = (data,id) =>{
      if (data=='N' || data=='n'){
       
          if (window.confirm("Do you want to remove this Role?")) {
              axios.delete(`http://localhost:8000/api/admin/role/delete/${id}`).then((res) => {
              alert("Role removed Successfully!");
              this.retrieveRoles();
            });
          
        };
            
      }
      console.log(data)
    }

    

       //Search bar
  filterData(roles, searchKey) {
    const result = roles.filter(
      (item) =>
        item.stfStaffId.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.stfStaffId.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.stfResField.toUpperCase().includes(searchKey) ||
        item.stfResField.toLowerCase().includes(searchKey)
    );

    this.setState({ roles: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/api/admin/roles/get").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingRoles, searchKey);
      }
    });
  };

  render() {
    return (
        <div>
            <AdminNavbar/>
            {/* <Sidebar /> */}
            <div className="container"
                    style={{
                    // margin: "40px",
                    // marginLeft: "0px",
                    width: "100%",
                    borderRadius: "0px",
                   
                    background: "#D3D3D3",
                    }}>

            <br /><br/>
            <div className='card'>            
          <br/>
            <h4
              style={{
                color: 'rgba(6, 21, 117)',
                fontSize: "48px",
                fontWeight: "bold",
                textAlign: "center",
                marginLeft:'100px',
                marginTop:'0px',
                

              }}
            >
              All Staff Members
            </h4>
     

          <div>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
              style={{
                width: "350px",
                marginLeft: "10px",
                marginTop: "30px",
                borderColor: "rgba(6, 21, 117,0.5)",
              }}
            ></input>
          </div>
          <br />
          

          
              <br/><br/>
                <table className="table table-hover"
                style={{
                    marginLeft:'0px',
                    backgroundColor: "#ffff",
                    borderRadius: "5px",
                    width: "100%",
                    
                    //border: "none",
                }}>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>STAFF ID</th>
                            <th scope='col'>STAFF JOB ROLE</th>
                            <th scope='col'>RESEARCH FIELD</th>

                            <th scope='col'>NAME</th>
                            <th scope='col'>ACTIVE/INACTIVE STATUS</th>
                            <th scope='col'>EMAIL</th>

                            <th scope='col'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.roles.map((roles,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>

                                <td onClick={()=>this.onClickDisabled(roles.stfUserActive,roles._id)}>
                                
                                 {roles.stfStaffId}
                                
                                </td>
                                <td>{roles.stfJobRole}</td>
                                <td>{roles.stfResField}</td>
                                <td>{roles.stfName}</td>
                                
                                <td>
                               {/* {roles.stfUserActive} */}
                                <label className="toggle-switch"> 
                                  <input type="checkbox" checked={this.state.isToggled} onChange={()=>this.onToggle(roles.stfUserActive)} /> 
                                  <span className="switch" /> </label>
                              
                                

                                </td>
                                <td>{roles.stfEmail}</td>
                                
                                <td>
                                   <button className='btn btn-warning'><a href={`/edit/roles/${roles._id}`} style={{color:'white',textDecoration:'none'}}>
                                      EDIT
                                   </a>

                                   </button>
                                
                      </td>
                               
                                
                            </tr>
                        ))}
                    </tbody>

                </table>
                   
           
        </div>
        </div>
        <Footer/>
        </div>

    )
  }
}
