import React, { Fragment,useState } from 'react'
import axios from 'axios';
import Progress from './progress'
import Message from './message'
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/header';


const Submissions = () =>{

    /*submissions */
    const status = true;
    const [file,setFile] = useState('');
    const [fileName,setFileName] = useState('Choose File');
    const[uploadedFile,setUploadedFile] = useState({});
    const [message,setMessage] = useState('');
    const [uploadPercentage,setUploadPercentage] = useState(0)
    const onChange = e =>{
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }
    const onSubmit = async e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);

        try{
            const res = await axios.post('http://localhost:8000/uploads',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                onUploadProgress:ProgressEvent=>{
                    setUploadPercentage(parseInt(Math.round((ProgressEvent.loaded*100)/ProgressEvent.total)));
                    //clear percentage
                setTimeout(()=>setUploadPercentage(0), 1000)
                }
                
            });
            const {fileName,filePath} = res.data;
            setUploadedFile({fileName,filePath});
            setMessage('File Uploaded!')
        } catch(err){
            if(err.response.status === 500 ){
               alert('There was a problem with the server')
            }else{
               alert(err.response.data)
               document.location.reload();
            }
        }
    }
    return(
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
    <div className='card' style={{marginLeft:'250px',marginTop:'50px',width:'100%'}}>
    
     <Fragment>
     <br/>
     <div>
           <h4 style={{marginLeft:'200px'}}>Add your submission! </h4>
        </div><br/> 
       
        {message ? <Message msg={message}/>:null}
            <form onSubmit={onSubmit}>
            <Progress percentage={uploadPercentage}/><br/>
            <div style={{marginLeft:'300px'}}>
            {/* <label for="formFile" class="form-label">{fileName}</label> */}
            <input className="form-control" type="file" id="customFile" onChange={onChange} style={{marginLeft:'-150px',backgroundColor:'grey',width:'auto'}}/>
            </div>
           
            <input type="submit" value="upload" className='btn btn-primary btn-block mt-4' style={{marginLeft:'100px'}}/>
            </form>
            {uploadedFile ? (
                <div className='row mt-5'>
               
                <div className='col-md-6 m-auto'>
                    <p className='text-center' style={{marginTop:'-100px'}}><h6>Submitted:</h6>{uploadedFile.fileName}</p>
                    {/* <img src={`/${uploadedFile.filePath}`} alt=""/> */}
                </div>
            </div> ):null }
        </Fragment>

        
    </div>
                </div>
                </div>
                </div>
    </>
    )
}

export default Submissions;