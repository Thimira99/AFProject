
import React, { useEffect, useState } from 'react';
import './Markings.css';
import axios from "axios"

const EditMarking = props =>{
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

        axios.put(`http://localhost:8000/api/admin/marking/update/${props.match.params.id}`, markings)
            .then(res => console.log(res.data))
            .catch(err =>{
                console.log(err);
            });
        };

    useEffect(() =>{
        axios
        .get(`http://localhost:8000/api/admin/marking/get/${props.match.params.id}`)
        .then(res => [
            setMarkingId(res.data.marking.markingId),
            setTitle(res.data.marking.title),
            setCategory(res.data.marking.category),
            setDescription(res.data.marking.description),
            setUpdatedDate(res.data.marking.updatedDate)
        ])
        .catch(error => console.log(error));
    }, []);



    return (
        <div className='containerA'> 
        <h2>Update Marking Scheme</h2>
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

export default EditMarking;