import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Progress.css';

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={i <= rating ? 'star-filled' : 'star-empty'}
        style={{ opacity: i > rating ? 0.3 : 1 }}
      >
        &#9733;
      </span>
    );
  }
  return stars;
};

function Progress() {
  const [courses, setCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/courses');
        setCourses(response.data);
        const completedResponse = await axios.get('http://localhost:5000/users/completedCourses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCompletedCourses(completedResponse.data.completedCourses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCourses();
  }, [token, showCompleted]);

  const filteredCourses = showCompleted ? completedCourses : courses;

  return (
    <div className="progress-container">
      <div className="song-titles">
        <span>Course Title</span>
        <span>Difficulty</span>
      </div>
      {filteredCourses.length === 0 ? (
        <p>No courses to show</p>
      ) : (
        <ul className="course-list">
          {filteredCourses.map(course => (
            <li key={course._id} className="course-details">
              <Link to={`/courses/${course._id}`} className="course-link">
                {course.courseName}
                {completedCourses.includes(course._id) ? ' (Completed)' : ''}
              </Link>
              <span>{renderStars(course.difficultyLevel)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Progress;
