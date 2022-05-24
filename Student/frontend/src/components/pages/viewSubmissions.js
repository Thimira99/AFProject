import React, { Component, useState } from 'react';
import axios from 'axios'
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/header';
import './viewSubmissions.css'

export default class viewSubmissions extends Component {

    
    constructor(props){
        super(props);

        this.state={
            submissions:[]
        }; 
        this.onClickId=this.onClickId.bind(this)
    }

    componentDidMount(){
        this.retrieveSubmissions();
    }

    retrieveSubmissions(){
        axios.get("http://localhost:8000/api/student/student/submissions/").then(res=>{
            if(res.data.success){
                this.setState({
                    submissions:res.data.existingSubmissions
                });
                console.log(this.state.submissions)
            }
        });
    }

          //Search bar
  filterData(submissions, searchKey) {
    const result = submissions.filter(
      (item) =>
        item.submissionId.toLowerCase().includes(searchKey) || //toLowerCase() helps to filter the data using the lowercase letters.
        item.submissionId.toUpperCase().includes(searchKey) || //toUpperCase() helps to filter the data using the Uppercase letters.
        item.type.toUpperCase().includes(searchKey) ||
        item.type.toLowerCase().includes(searchKey)
    );

    this.setState({ submissions: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/api/student/student/submissions/").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingSubmissions, searchKey);
      }
    });
  };

  onClickId(data){
    // this.props.history.push('/addSubmissions')
    // this.props.history.push('/dashboard')
    if(data=='Form'|| data=='form'){
        this.props.history.push('/addSubmissions')
    }else{
    this.props.history.push('/uploadSubmissions')
    }
    console.log(data)
  }


  render() {
      //const status = true;

    return (
        <>
         <div className='app-header'>
                <Header />
            </div>
            <div className='app-body'>
                <div className='body-wrapper'>
                    <div className='app-sidebar'>
                        <Sidebar />
                    </div>
                    <div className='app-content'>
                          
       <div className="container"
       
       style={{
    //    width: "auto",
       borderRadius: "0px",
       // marginTop: "-200px",
       background: "#D3D3D3",
       }}>

   <div className="col-lg-9 mt-2">
<br />
        <div>
        <h4
            style={{
                color: 'rgba(6, 21, 117)',
                fontSize: "48px",
                fontWeight: "bold",
                textAlign: "center",
                marginLeft:"150px",
                // marginTop:'-100px'
            }}
        >
        Submissions
        </h4></div>

</div>
    <div className="col-lg-9 mt-2 "><br/>

        <input
        className="form-control"
        type="search"
        placeholder="Search"
        name="searchQuery"
        onChange={this.handleSearchArea}
            style={{
                width: "250px",
                marginLeft: "10px",
                
                borderColor: "rgba(6, 21, 117,0.5)",
            }}
        ></input>
    </div>
<br /><br/>

<div className='test1'>
 <br/><br/><br/>
   <table className="table table-hover"
        style={{
            marginLeft:'0px',
            backgroundColor: "#ffff",
            borderRadius: "5px",
            width: "500px",
            marginTop:'-80px',
            marginLeft:'0px'
            //border: "none",
        }}> 
       <thead>
           <tr>
               <th scope='col'>#</th>
               <th scope='col'>SUBMISSION ID</th>
               <th scope='col'>TOPIC</th>
               <th scope='col'>TYPE</th>
               <th scope='col'>DUE DATE</th>
               <th scope='col'>DUE TIME</th>
               <th scope='col'>DESCRIPTION</th>
           </tr>
       </thead>
       <tbody>
           {this.state.submissions.map((submissions,index)=>(
               <tr>
                   <th scope='row'>{index+1}</th>
                   <td onClick={()=>this.onClickId(submissions.type)}> {submissions.submissionId}
                   </td>
                   <td>{submissions.topic}</td>
                   <td>{submissions.type}</td>
                   <td>{submissions.dueDate}</td>
                   <td>{submissions.dueTime}</td>
                   <td>{submissions.description}</td>
               </tr>
           ))}
       </tbody>
       </table>
       <br/>
      </div>
      
</div>
                    </div>
                </div>
            </div>
       
                            
   </>
    )
  }
}
