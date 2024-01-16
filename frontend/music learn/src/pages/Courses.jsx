import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Courses() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/courses/${id}`);
        const courseDetails = response.data;

        const songIds = Array.isArray(courseDetails.songIds)
          ? courseDetails.songIds
          : [courseDetails.songIds];

        const songsResponse = await axios.get(`http://localhost:5000/songs/songs/${songIds.join(',')}`);
        const songs = Array.isArray(songsResponse.data)
          ? songsResponse.data
          : [songsResponse.data];

        const taskIds = Array.isArray(courseDetails.taskIds)
          ? courseDetails.taskIds
          : [courseDetails.taskIds];

        const tasksResponse = await axios.get(`http://localhost:5000/tasks/${taskIds.join(',')}`);
        const tasks = Array.isArray(tasksResponse.data)
          ? tasksResponse.data
          : [tasksResponse.data];

        setCourse({
          ...courseDetails,
          songs: songs,
          tasks: tasks,
        });
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  return (
    <div>
      {course ? (
        <div className="course-details">
          <h1>{course.courseName}</h1>
          <p>Difficulty: {course.difficultyLevel}</p>
          <div>
            <h2>Songs:</h2>
            <ul>
              {course.songs.map((song, index) => (
                <li key={index}>
                  <Link to={`/songs/${song._id}`}>{song.songName}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Tasks:</h2>
            <ul>
              {course.tasks.map((task, index) => (
                <li key={index}>
                  <strong>{task.taskName}</strong>
                  <p>{task.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Courses;
