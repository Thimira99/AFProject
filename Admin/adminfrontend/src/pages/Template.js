import React, { useEffect, useState } from 'react';
import {Link } from "react-router-dom";

const Template = () => {
  const [templates, setTemplates] = useState();

  useEffect(() => {
    const fetchTemplates = async () => {
      const res = await fetch(`http://localhost:8000/template`);
      const data = await res.json();
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/template/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedTemplates = templates.filter((template) => template._id !== id);
        setTemplates(updatedTemplates);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div> 
    <Link to="/template/add" 
    >
        <button className="buttonAdd"> 
         Upload Templates 
       </button>
   </Link>
    <div className="row">
      {templates?.map((template) => (
        <div className="col-md-3 card me-3 mt-2 p-0" key={template._id}>
          <img src={template.avatar} alt="" width={"100%"} height={200} />
          <div className="p-2">
            <h3>{template.name}</h3>
            <div className="d-flex justify-content-between align-items-center">
              <Link to={`/template/edit/${template._id}`} style={{ textDecoration: "none" }}>
                Edit
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(template._id)}
              >
                X
              </button>
              <a href={template.avatar} download>Click to download</a>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Template;
