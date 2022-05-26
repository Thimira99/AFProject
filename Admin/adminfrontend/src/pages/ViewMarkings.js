import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";
import './Markings.css';


function ViewMarkings() {
    const [markings, setMarkings] = useState([])

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
          axios.delete(`/marking/${id}`)
          .then(res => alert(res.data))
          setMarkings(markings.filter(elem => elem._id !==id))
      } 
      

    return(
        <div>
        
                {/* {
                    markings.map(marking => 
                    <li key={marking.markingId}>{marking.title}</li>)    
                } */}

                                <div > 
                                    <Link to="/addMarking" 
                                    className="btn btn-success">
                                        Add New Marking Scheme
                                    </Link>
                                </div>
                {
                    markings.map((marking, key) => 
                        <div className='containerA' key={key}> 
                            <h2>{marking.title}</h2>
                            <p>{marking.description}</p>
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
                                    <button onClick={() => deleteMarking(marking._id)}  className="btn btn-danger">
                                        Delete Marking Scheme
                                    </button>
                                </div>
                            </div>

                                
                            <hr/>

                        </div>  
                         )
                }

             
        </div>
    )
} 


export default ViewMarkings;

 