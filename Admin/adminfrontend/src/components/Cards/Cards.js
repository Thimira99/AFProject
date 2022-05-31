import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import user from "../../Images/user.png"
import sub from "../../Images/submi.jpg"
import panel from "../../Images/panel.jpg"
import marking from "../../Images/marking.jpg"
import doc from "../../Images/doc.jpg"
import roles from "../../Images/roles.jpg"
import student from "../../Images/student.jpg"
import research from "../../Images/research.jpg"

function Cards() {
  return (
    <div className='cards'>
      <h1>DASHBOARD</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem 
              src={user}
              text='Students & Staff Members'
              label='User Management'
              path='/viewRoles'
            />
            <CardItem
              src={sub}
              text='Create Submission Types'
              label='Submission Types'
              path='/viewSubmissions'
            />

            <CardItem
              src={panel}
              text='Allocate panel members to student groups'
              label='Panel Members Allocation'
              path='/viewPanels'
            />
            <CardItem
              src={research}
              text='Research Topics'
              label='Research Topics'
              path='/getTopics'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={marking}
              text='Create Marking Schemes'
              label='Marking schemes'
              path='/viewMarkings'
            />
            <CardItem
              src={doc}
              text='Upload document/presentation templates'
              label='Document/Presentation Templates'
              path='/'
            />
            <CardItem
              src={roles}
              text='View Roles'
              label='View Roles'
              path='/listRoles'
            />
            <CardItem
              src={student}
              text='Student Management'
              label='Student Management'
              path='/getStudentGroups'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
