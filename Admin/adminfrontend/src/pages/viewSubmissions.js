import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'

export default class viewSubmissions extends Component {

    constructor(props){
        super(props);

        this.state={
            submissions:[]
        };
    }

    componentDidMount(){
        this.retrieveSubmissions();
    }

    retrieveSubmissions(){
        axios.get("http://localhost:8000/api/admin/submission/get").then(res=>{
            if(res.data.success){
                this.setState({
                    submissions:res.data.existingSubmissions
                });
                console.log(this.state.submissions)
            }
        });
    }

    onDelete = (id) => {
        if (window.confirm("Do you want to remove this submission?")) {
          axios.delete(`http://localhost:8000/api/admin/submission/delete/${id}`).then((res) => {
            alert("Submission removed Successfully!");
            this.retrieveSubmissions();
          });
        }
      };

       //Search bar
  filterData(submissions, searchKey) {
    const result = submissions.filter(
      (item) =>
        item.submissionId.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.submissionId.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.topic.toUpperCase().includes(searchKey) ||
        item.topic.toLowerCase().includes(searchKey)
    );

    this.setState({ submissions: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/api/admin/submission/get").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingSubmissions, searchKey);
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
              All Submissions
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
          

          <button className='btn btn-success' style={{width:'200px'}}><a href='/createSubmission' style={{textDecoration:'none',color:'white'}}>
                        Add a new Submission
          </a></button>

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
                            <th scope='col'>SUBMISSION ID</th>
                            <th scope='col'>TOPIC</th>
                            <th scope='col'>DESCRIPTION</th>
                            <th scope='col'>DUE DATE</th>
                            <th scope='col'>DUE TIME</th>
                            <th scope='col'>TYPE</th>
                            <th scope='col'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.submissions.map((submissions,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>
                                <td>
                                <a href={`/hotels/${submissions._id}`} style={{textDecoration:'none'}}>
                                 {submissions.submissionId}
                                </a>
                                </td>
                                <td>{submissions.topic}</td>
                                <td>{submissions.description}</td>
                                <td>{submissions.dueDate}</td>
                                <td>{submissions.dueTime}</td>
                                <td>{submissions.type}</td>
                                <td>
                                    <a className='btn btn-warning' href={`/edit/submissions/${submissions._id}`} style={{color:'black'}}>
                                        <i className='fas fa-edit'></i>
                                        &nbsp;EDIT
                                    </a>
                                    &nbsp;
                                    <a className ="btn btn-danger" href="#" onClick={() => this.onDelete(submissions._id)} style={{ textDecoration: "none", color: "white" }}
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
