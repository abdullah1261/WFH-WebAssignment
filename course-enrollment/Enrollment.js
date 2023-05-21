import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Enrollment.css';

const Enrollment = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Fetch enrolled courses data from the server
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get('/api/enrollments');
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div className="enrolled-courses"> {/* Apply CSS class */}
      <h3>Enrolled Courses</h3>
      {enrolledCourses.map((course) => (
        <div key={course.id} className="course"> {/* Apply CSS class */}
          <h4>{course.name}</h4>
          <p>Instructor: {course.instructor}</p>
          <p className="enrollment-date">Enrollment Date: {course.enrollmentDate}</p> {/* Apply CSS class */}
        </div>
      ))}
    </div>
  );
};

export default Enrollment;
