import React from 'react';
import './Dashboard.css'; // Import your CSS file here
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faList, faImages, faTasks, faUser, faEnvelope, faSitemap, faUserPlus, faCog, faQuestionCircle, faSignOutAlt, faUserCog, faPrint, faPalette } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);

function Dashboard() {
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <a href="#" className="logo">
              <img src="/logo.jpg" alt="" />
              <span className="nav-item">DashBoard</span>
            </a>
          </li>
          <li><a href="#"><FontAwesomeIcon icon={faHome} /><span className="nav-item">Home</span></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faChartBar} /><span className="nav-item">Analytics</span></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faList} /><span className="nav-item">Data List</span></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faImages} /><span className="nav-item">Image List</span></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faTasks} /><span className="nav-item">To-do List</span></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faUser} /><span className="nav-item">Profile</span></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faEnvelope} /><span className="nav-item">Ticket</span></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faSitemap} /><span className="nav-item">Manage Team</span></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faUserPlus} /><span className="nav-item">New User</span></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faCog} /><span className="nav-item">Settings</span></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faQuestionCircle} /><span className="nav-item">Help</span></a></li>
          <li><a href="#" className="logout"><FontAwesomeIcon icon={faSignOutAlt} /><span className="nav-item">Log out</span></a></li>
        </ul>
      </nav>

      <section className="main">
        <div className="main-top">
          <h1>Lorem</h1>
          <FontAwesomeIcon icon={faUserCog} />
        </div>
        <div className="main-skills">
          <div className="card">
            <FontAwesomeIcon icon={faPrint} />
            <h3>Nostrud labore.</h3>
            <p>Laborum Lorem quis do laboris tempor duis in non ea irure.</p>
            <button>lorem ipsum</button>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faPrint} />
            <h3>Nostrud labore.</h3>
            <p>Laborum Lorem quis do laboris tempor duis in non ea irure.</p>
            <button>lorem ipsum</button>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faPalette} />
            <h3>Nostrud labore.</h3>
            <p>Laborum Lorem quis do laboris tempor duis in non ea irure.</p>
            <button>lorem ipsum</button>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faPrint} />
            <h3>Nostrud labore.</h3>
            <p>Laborum Lorem quis do laboris tempor duis in non ea irure.</p>
            <button>lorem ipsum</button>
          </div>
        </div>

        <section className="main-course">
          <h1>Lorem ipsum</h1>
          <div className="course-box">
            <ul>
              <li className="active">Lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
            <div className="course">
              <div className="box">
                <h3>Lorem</h3>
                <p>lorem ipsum</p>
                <button>Lorem</button>
                <FontAwesomeIcon icon={['fab', 'html5']} className="html" />
              </div>
              <div className="box">
                <h3>Lorem</h3>
                <p>lorem ipsum</p>
                <button>Lorem</button>
                <FontAwesomeIcon icon={['fab', 'html5']} className="html" />
              </div>
              <div className="box">
                <h3>Lorem</h3>
                <p>lorem ipsum</p>
                <button>Lorem</button>
                <FontAwesomeIcon icon={['fab', 'html5']} className="html" />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Dashboard;
