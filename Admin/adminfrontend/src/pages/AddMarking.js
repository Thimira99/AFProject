
import React, { useEffect, useState } from 'react';
import './Markings.css';
import axios from "axios"

const AddMarking =() =>{
    const [markingId, setMarkingId] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');

    const changeOnClick = e => {
        e.preventDefault();

        const markings = {
            markingId,
            title,
            category,
            description,
            updatedDate

        };

        setMarkingId("");
        setTitle("");
        setCategory("");
        setDescription("");
        setUpdatedDate("");

        axios.post("http://localhost:8000/api/admin/marking/create", markings)
            .then(res => console.log(res.data))
            .catch(err =>{
                console.log(err);
            });
        }

    return (
        <div className='containerA'> 
        <h2>Add New Marking Scheme</h2>
        <form onSubmit={changeOnClick} encType="multipart/form-data">
    <div className="form-group">
    <label htmlFor="markingId">ID</label>
    <input 
        type="text" 
        value={markingId}
        onChange={e => setMarkingId(e.target.value)}
        className="form-control" 
        placeholder="Enter title"/>
  </div>


  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input 
        type="text" 
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="form-control" 
        placeholder="Enter title"/>
  </div>

  <div className="form-group">
    <label htmlFor="category">Category</label>
    <input 
    type="text" 
    value={category}
    onChange={e => setCategory(e.target.value)}
    className="form-control" 
    placeholder="Enter title"/>
  </div>

  <div className="form-group">
    <label htmlFor="description">Description</label>
    <textarea 
      value={description}
    className="form-control" 
    onChange={e => setDescription(e.target.value)}
    rows="3"></textarea>
  </div>

  <div className="form-group">
    <label htmlFor="updatedDate">Updated Date</label>
    <input 
    type="date" 
    value={updatedDate}
    className="form-control"
    onChange={e => setUpdatedDate(e.target.value)} 
    placeholder="Enter title"/>
  </div>
   
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    )
};

export default AddMarking;