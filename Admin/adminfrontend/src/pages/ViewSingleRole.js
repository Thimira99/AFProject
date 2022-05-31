import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ViewSingleRole = props => {
    const [stfStaffId, setStaffId] = useState('')
    const [stfName, setName] = useState('')
    const [stfEmail, setEmail] = useState('')
    const [stfPhonenNmber, setPhone] = useState('')
    const [stfJobRole, setJob] = useState('')
    const [stfPanellMember, setPanel] = useState('')


    useEffect(() => {
        axios.get(`http://localhost:8000/api/admin/role/get/${props.match.params.id}`)
            .then(res => {
                console.log(res)[
                    setStaffId(res.data.role.stfStaffId),
                    setName(res.data.role.stfName),
                    setEmail(res.data.role.stfEmail),
                    setPhone(res.data.role.stfPhonenNmber),
                    setJob(res.data.role.stfJobRole),
                    setPanel(res.data.role.stfPanellMember)
                ]
            })
            .catch(error => {
                console.log(error)
                console.log("No")
            });
    }, [props]);

    return (
        // <div>
        //     <h2>View Roles</h2>
        //     <h2>{stfStaffId}</h2>
        //     <h2>{stfName}</h2>
        //     <h2>{stfEmail}</h2>
        //     <h2>{stfPhonenNmber}</h2>
        //     <h2>{stfJobRole}</h2>
        //     <h2>{stfPanellMember}</h2>  
        // </div>
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
                <div class=" image d-flex flex-column justify-content-center align-items-center">
                    <button className="btn btn-secondary">
                        <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
                    </button>
                    <span class="name mt-3">Eleanor Pena
                    </span>
                    <span class="idd">@eleanorpena
                    </span>
                    <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                        <span class="idd1">Oxc4c16a645_b21a
                        </span>
                        <span>
                            <i class="fa fa-copy">
                            </i>
                        </span>
                    </div>
                    <div class="d-flex flex-row justify-content-center align-items-center mt-3">
                        <span class="number">1069
                            <span class="follow">Followers
                            </span>
                        </span>
                    </div>
                    <div class=" d-flex mt-2">
                        <button class="btn1 btn-dark">My Profile
                        </button>
                         
                    </div>
                    <div class=" d-flex mt-2">
                         
                        <button class="btn1 btn-info">Back to List
                        </button>
                        
                    </div>
                </div>
                
            </div>

        </div>


            )
}

            export default ViewSingleRole