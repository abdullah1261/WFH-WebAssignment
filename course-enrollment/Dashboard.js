import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Courses from './Courses';
import Enrollment from './Enrollment';
import './Dashboard.css';


const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="header">
        <h1>Student Dashboard</h1>
      </header>
      <div className="container">
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/dashboard/courses">Courses</Link>
            </li>
            <li>
              <Link to="/dashboard/enrollment">Enrollment</Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Switch>
            <Route path="/dashboard/courses" component={Courses} />
            <Route path="/dashboard/enrollment" component={Enrollment} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
