import React, { Component } from 'react';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'

export default class viewResearchTopics extends Component {

    constructor(props){
        super(props);

        this.state={
            topics:[]
        };
    }

    componentDidMount(){
        this.retrieveTopics();
    }

    retrieveTopics(){
        axios.get("http://localhost:8000/api/admin/topics/get").then(res=>{
            if(res.data.success){
                this.setState({
                    topics:res.data.existingTopics
                });
                console.log(this.state.topics)
            }
        });
    }

    onDelete = (id) => {
        if (window.confirm("Do you want to remove this topic?")) {
          axios.delete(`http://localhost:8000/api/admin/topics/delete/${id}`).then((res) => {
            alert("Topic removed Successfully!");
            this.retrieveTopics();
          });
        }
      };

       //Search bar
  filterData(submissions, searchKey) {
    const result = submissions.filter(
      (item) =>
        item.researchField.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.researchField.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.topic.toUpperCase().includes(searchKey) ||
        item.topic.toLowerCase().includes(searchKey)
    );

    this.setState({ topics: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/api/admin/topics/get").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingTopics, searchKey);
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
                    marginTop: "-90px",
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
              All Topics
            </h4>
     

          <div>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
              style={{
                width: "250px",
                marginLeft: "10px",
                marginTop: "30px",
                borderColor: "rgba(6, 21, 117,0.5)",
              }}
            ></input>
          </div>
          <br />
         
          <button className='btn btn-success' style={{width:'200px',marginLeft:'350px',marginTop:'-65px'}}><a href='/createTopics' style={{textDecoration:'none',color:'white'}}>
                        Add Research topics
          </a></button>

          
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
                       
                            <th scope='col'>TOPIC</th>
                            <th scope='col'>RESEARCH FIELD</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.topics.map((topics,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>
                               
                                <td>{topics.topic}</td>
                                <td>{topics.researchField}</td>
                                
                                <td>
                                    <a className='btn btn-warning' href={`/topics/edit/${topics._id}`} style={{color:'black'}}>
                                        <i className='fas fa-edit'></i>
                                        &nbsp;EDIT
                                    </a>
                                    &nbsp;
                                    <a className ="btn btn-danger" href="#" onClick={() => this.onDelete(topics._id)} style={{ textDecoration: "none", color: "white" }}
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


