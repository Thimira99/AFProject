import assert from 'assert';
import axios from 'axios';
import React, { Component, Fragment, useEffect, useState } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import jsPdf from 'jspdf';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import uploadCss from './uploads.module.css';


function UploadFile() {

    const [file, setFile] = useState('');
    const [allFiles, setAllFiles] = useState([]);
    const [singleProgressBar, setsingleProgressBar] = useState(0);

    const fileUpload = (e) => {
        setFile(e.target.files[0]);
    }

    const singleFileOption = {
        onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setsingleProgressBar(percentage)
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/student/submissions/get").then((res) => {
            setAllFiles(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const uploadFileSub = async () => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post("http://localhost:8000/api/student/submissions/add", formData, singleFileOption).then((res) => {
            alert(res.data)
            // window.location.reload();
        }).catch((err) => {
            console.log(err)
        })
        console.log(file)
    }



    return (
        <div>
            <div>


                <div className='app-header'>
                    <Header />
                </div>
                <div className='app-body'>
                    <div className='body-wrapper'>
                        <div className='app-sidebar'>
                            <Sidebar />
                        </div>
                        <div className='app-content'>
                            <div className={uploadCss.main}>
                                <div className={uploadCss.form}>
                                    <label>Select Your File</label>
                                    <input type='file' className='form-control' onChange={(e) => fileUpload(e)} />

                                    <button className='btn btn-danger' onClick={() => uploadFileSub()}>Upload</button>
                                    <div className='col-2'>
                                        <CircularProgressbar
                                            value={singleProgressBar}
                                            text={`${singleProgressBar}%`}
                                            styles={buildStyles({
                                                rotation: 0.25,
                                                strokeLinecap: 'butt',
                                                pathTransitionDuration: 0.5,
                                                pathColor: `rgba(255,136,136,${singleProgressBar / 100})`,
                                                textColor: '#f88',
                                                trailColor: '#d6d6d6',
                                                backgroundColor: '#3e98c7'

                                            })}
                                        />
                                    </div>
                                </div>
                                <div className='files'>
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">File Name</th>
                                                <th scope="col">File Type</th>
                                                <th scope="col">File Size</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allFiles.map((file, index) => (
                                                <tr>
                                                    <th scope="row">{++index}</th>
                                                    <td>{file.fileName}</td>
                                                    <td>{file.fileType}</td>
                                                    <td>{file.fileSize}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadFile;