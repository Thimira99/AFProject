import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import user from "../../Images/user.png"
import sub from "../../Images/submi.jpg"
import panel from "../../Images/panel.jpg"
import marking from "../../Images/marking.jpg"
import doc from "../../Images/doc.jpg"
import roles from "../../Images/roles.jpg"

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
              path='/'
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
              path='/'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={marking}
              text='Create Marking Schemes'
              label='Marking schemes'
              path='/'
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
              path='/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
