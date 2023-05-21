import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Courses.css'; 

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses data from the server
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="available-courses"> {/* Apply CSS class */}
      <h3>Available Courses</h3>
      {courses.map((course) => (
        <div key={course.id} className="course"> {/* Apply CSS class */}
          <h4>{course.name}</h4>
          <p>Instructor: {course.instructor}</p>
          <p className="course-description">Description: {course.description}</p> {/* Apply CSS class */}
        </div>
      ))}
    </div>
  );
};

export default Courses;
