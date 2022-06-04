import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import user from "../../Images/staff.jpg"
import sub from "../../Images/submi.jpg"
import panel from "../../Images/panel.jpg"
import marking from "../../Images/marking.jpg"
import doc from "../../Images/doc.jpg"
import roles from "../../Images/roles.jpg"
import student from "../../Images/stud.jpg"
import research from "../../Images/research.jpg"
import evaluation from "../../Images/eval.png"

function Cards() {
  return (
    <div data-testid="cards" className='cards'>
      <h1>DASHBOARD</h1>
      <br/>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem 
              src={user}
              text='Staff Management'
              label='Staff Management'
              path='/viewRoles'
            />
            <CardItem
              src={student}
              text='Student Management'
              label='Student Management'
              path='/getStudentGroups'
            />
            <CardItem
              src={panel}
              text='Allocate panel members to student groups'
              label='Panel Members Allocation'
              path='/viewPanels'
            />
          </ul>
          <ul className='cards__items'>
          <CardItem
              src={sub}
              text='Create Submission Types'
              label='Submission Types'
              path='/viewSubmissions'
            />
            <CardItem
                src={research}
                text='Research Topics'
                label='Research Topics'
                path='/getTopics'
              />
            <CardItem
              src={marking}
              text='Create Marking Schemes'
              label='Marking schemes'
              path='/viewMarkings'
            />
            </ul>
            <ul className='cards__items'> 
            <CardItem
              src={doc}
              text='Upload doc/presentation templates'
              label='Document/Presentation Templates'
              path='/viewTemplates'
            />
            <CardItem
              src={roles}
              text='View Roles'
              label='View Roles'
              path='/listRoles'
            />
            <CardItem
              src={evaluation}
              text='Supervisor Evaluation'
              label='Supervisor Evaluation'
              path='/viewEvaluation'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
