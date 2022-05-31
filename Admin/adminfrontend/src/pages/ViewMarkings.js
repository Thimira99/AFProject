import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";
import './Markings.css';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';


toast.configure()
function ViewMarkings() {
    const [markings, setMarkings] = useState([])

    const notifyDel = () =>{
        toast.success('Marking Scheme is deleted !', {position: toast.POSITION.TOP_CENTER})
    };


    useEffect(() =>{
        axios.get('http://localhost:8000/api/admin/marking/get')
            .then(res => {
                console.log(res)  
                setMarkings(res.data.existingMarkings) 
            })
            .catch(err =>{
                console.log(err)
            })
    }, [])

    //Delete Marking Scheme by ID
      const deleteMarking = id => {
          axios.delete(`http://localhost:8000/api/admin/marking/delete/${id}`)
          .then(res => 
            console.log(res.data),
            notifyDel(""))
          setMarkings(markings.filter(elem => elem._id !==id))
      } 

      

    return(
        <div>
             <div>
             <AdminNavbar/> 
             </div>
             <br></br>
                {/* {
                    markings.map(marking => 
                    <li key={marking.markingId}>{marking.title}</li>)    
                } */}
                                  
                                <div className='markings__container'> 
                                <br></br>
                                <h1> Marking Schemes</h1>
                                <br></br>
                                     
                                    <Link to="/createMarking" 
                                     >
                                         <button className="buttonAdd"> 
                                        Create New Marking Scheme
                                        </button>
                                    </Link>
                                     
                                </div>
                                 
                                
                {
                    markings.map((marking, key) => 
                    
                        <div className='containerA' key={key}> 
                            <h2><b>Marking Scheme:</b>  {marking.title}</h2>
                            <h5>CATEGORY: {marking.category}</h5>
                            <div className='containerB'>
                            <p>{marking.description}</p>
                            </div>
                            <br></br>
                            <div  className='dateBox'>
                            <span >{marking.updatedDate}</span>
                            </div>

                            <div className="row my-5">
                                <div className="col-sm-2"> 
                                    <Link to={`/edit/markings/${marking._id}`} 
                                    className="btn btn-success">
                                        Update Marking Scheme
                                    </Link>
                                </div>

                                <div className="col-sm-2"> 
                                    <button onClick={() => deleteMarking(marking._id)} className="btn btn-danger">
                                        Delete Marking Scheme
                                    </button>
                                </div>
                            </div>

                                
                            <hr/>

                        </div>  
                         
                         )
                         
                }

             <div>
             <Footer/> 
             </div>
             
        </div>
    )
            
} 


export default ViewMarkings;

 