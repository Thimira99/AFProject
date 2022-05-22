import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import logo from "../../Images/logo1.png"

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the Adventure newsletter to receive our best vacation deals
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <div className='btn--outline'> 
            <Button className='btn--outline'>Subscribe</Button>
            </div>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
          <h3>About Research</h3>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Tools</Link>
            <Link to='/'>Careers</Link>
          </div>
          <div class='footer-link-items'>
          <h3>Tasks</h3>
            <Link to='/'>User Management</Link>
            <Link to='/'>Panel Members </Link>
            <Link to='/'>Roles </Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
          <h3>Creations</h3>
            <Link to='/'>Submission Types</Link>
            <Link to='/'>Marking Schemes</Link>
            <Link to='/'>Templates</Link>
          </div>
          <div class='footer-link-items'>
          <h3>Quick Links</h3>
            <Link to='/'>Blogs</Link>
            <Link to='/'>QA</Link>
            <Link to='/'>Contact us</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
            <img  style={{width:50}} class="logo" src={logo} alt="" />
              ABC Admin Panel
               
            </Link>
          </div>
          <small class='website-rights'>ABC Admin Panel © 2022</small>
           
        </div>
      </section>
    </div>
  );
}

export default Footer;
