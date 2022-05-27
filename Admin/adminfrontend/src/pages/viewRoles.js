import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'
import { Button, Dropdown } from 'react-bootstrap';

export default class viewRoles extends Component {

    constructor(props){
        super(props);

        this.state={
            roles:[]
        };
    }

    componentDidMount(){
        this.retrieveRoles();
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
                    marginTop: "-20px",
                    background: "#D3D3D3",
                    }}>
               
            <br />
            <div className='card'
                style={{
                    marginTop:'400px',
                    height:'auto'
                }}
            ><br/>
            <h4
              style={{
                color: 'rgba(6, 21, 117)',
                fontSize: "48px",
                fontWeight: "bold",
                textAlign: "center",
                marginLeft:'100px',
                marginTop:'-400px'
              }}
            >
              All Roles
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
          
{/* 
          <button className='btn btn-success' style={{width:'200px'}}><a href='/createSubmission' style={{textDecoration:'none',color:'white'}}>
                        Add a new Submission
          </a></button> */}
{/* 
          &nbsp;&nbsp;
          <button className='btn btn-success'><a href='/home' style={{textDecoration:'none',color:'white'}}>
                        Dashboard
          </a></button> */}
          
          
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
                            <th scope='col'>PANEL MEMBER</th>
                            <th scope='col'>USER ACTIVE</th>
                            <th scope='col'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.roles.map((roles,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>
                                <td>
                                <a href={`/hotels/${roles._id}`} style={{textDecoration:'none'}}>
                                 {roles.stfStaffId}
                                </a>
                                </td>
                                <td>{roles.stfJobRole}</td>
                                <td>{roles.stfResField}</td>
                                <td>{roles.stfPanellMember}</td>
                                <td>{roles.stfUserActive}</td>
                               
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="adds">
                                            <button type='button' className='btn btn-success'>
                                                ADD
                                            </button>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu >
                                            <Dropdown.Item href="/login">EXISTING PANEL</Dropdown.Item>
                                            <Dropdown.Item href="/loginRegister">NEW PANEL</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                   
           
        </div>
        <br/></div>
        <Footer/>
        </div>

    )
  }
}


