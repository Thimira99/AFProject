import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'
import { Button, Dropdown } from 'react-bootstrap';
//import uuid v4
import { v4 as uuid } from 'uuid';

export default class viewPanels extends Component {
    
    constructor(props){
        super(props);

        this.state={
            panels:[]
        };
    }

    componentDidMount(){
        this.retrievePanels();
    }

    retrievePanels(){
        axios.get("http://localhost:8000/api/admin/panels/get").then(res=>{
            if(res.data.success){
                this.setState({
                    panels:res.data.existingPanels
                });
                console.log(this.state.panels)
            }
        });
    }

       //Search bar
  filterData(panels, searchKey) {
    const result = panels.filter(
      (item) =>
        item.panelId.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.panelId.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.studentGroup.toLowerCase().includes(searchKey) ||
        item.studentGroup.toUpperCase().includes(searchKey)
    );

    this.setState({ panels: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/api/admin/panels/get").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPanels, searchKey);
      }
    });
  };

  onDelete = (id) => {
    if (window.confirm("Do you want to remove this panel?")) {
      axios.delete(`http://localhost:8000/api/admin/panel/delete/${id}`).then((res) => {
        alert("Panel removed Successfully!");
        this.retrievePanels();
      });
    }
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
                    marginTop:'250px',
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
                marginTop:'-200px'
              }}
            >
              All Panels
            </h4>
     
            <button
              style={{width:'200px',marginLeft:'20px'}}
              className='btn btn-success'
            ><a href="/createPanels" style={{textDecoration:'none',color:'white'}}>ADD PANEL</a></button>
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
                marginTop: "10px",
                borderColor: "rgba(6, 21, 117,0.5)",
              }}
            ></input>
          </div>
          <br />

          
              <br/><br/><br/>
              
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
                            <th scope='col'>PANEL ID</th>
                            <th scope='col'>NAME OF THE MEMBERS</th>
                            <th scope='col'>GROUP ID</th>
                       
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.panels.map((panels,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>
                                <td>
                                
                                 {panels.panelId}
                            
                                </td>
                                <td>
                                  {panels.memberName.map((singleMember,index)=>(
                                    <ul key={index}>
                                     {singleMember.memberName &&
                                     <li>
                                      {singleMember.memberName}
                                     </li>
                                     }
                                    </ul>
                                  ))}

                                </td>
                                <td>{panels.studentGroup}</td>
                                <td>
                                <a className='btn btn-warning' href={`/update/panel/${panels._id}`} style={{color:'black'}}>
                                        <i className='fas fa-edit'></i>
                                        &nbsp;EDIT
                                    </a>
                                    &nbsp;
                                    <a className ="btn btn-danger" href="#" onClick={() => this.onDelete(panels._id)} style={{ textDecoration: "none", color: "white" }}
                                        >
                                        <i className='fas fa-trash-alt'></i>
                                        &nbsp;REMOVE
                                    </a>
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
