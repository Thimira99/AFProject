import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Footer from '../components/Footer/Footer';
import pdf from "../Images/pdf.png"

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
      <div>
        <AdminNavbar/> 
       </div>
        <br></br>
        <div className='markings__container'> 
                                <br></br>
                                <h1> Document/Presentation templates </h1>
                                <br></br>
      <div>
      <Link to="/template/add"
      >
        <button className="buttonAdd">
          Upload Template
        </button>
      </Link>
      <div className='containerTemp' >
      <div className="row">
        {templates?.map((template) => (
          <div className='cards__item' key={template._id}>
            {/* className="col-md-1 card me-3 mt-2 p-0" */}
            <ul> 
            <img src={pdf} alt="" width={200} height={200} />
            </ul>
            <div className="p-2">
              <ul> 
              <h3>{template.name}</h3>
              <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-success btn-sm"> 
              <a href={template.avatar} style={{ textDecoration: "none", color: "white" }} download>VIEW & DOWNLOAD </a>
              </button>
                <button
                  className="btn btn-warning btn-sm"
                >
                  <Link to={`/template/edit/${template._id}`} style={{ textDecoration: "none", color: "white" }}>
                    EDIT TEMPLATE
                  </Link>
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(template._id)}
                >
                  DELETE TEMPLATE
                </button>
    
              </div>
              </ul>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
        </div>
        <div>
             <Footer/> 
        </div>
             
    </div>
  );
};

export default Template;
