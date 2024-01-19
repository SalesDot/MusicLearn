import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

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
        
        const songsResponse = await axios.get(
          `http://localhost:5000/songs/songs/${songIds.join(",")}`
        );
        const songs = Array.isArray(songsResponse.data)
          ? songsResponse.data
          : [songsResponse.data];

        const taskIds = Array.isArray(courseDetails.taskIds)
          ? courseDetails.taskIds
          : [courseDetails.taskIds];

        const tasksResponse = await axios.get(
          `http://localhost:5000/tasks/${taskIds.join(",")}`
        );
        const tasks = Array.isArray(tasksResponse.data)
          ? tasksResponse.data
          : [tasksResponse.data];

        setCourse({
          ...courseDetails,
          songs: songs,
          tasks: tasks,
        });
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [id]);

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
  return (
    <div className="course-details">
      {course ? (
        <>
          <div>
            <h1>{course.courseName}</h1>
            <p>{renderStars(course.difficultyLevel)}</p>
          </div>
          <div>
            <h2>Songs:</h2>
            <ul>
              {course.songs.map((song, index) => (
                <ul key={index}>
                  <Link to={`/songs/${song._id}`}>{song.title}</Link>
                </ul>
              ))}
            </ul>
          </div>
          <div>
            <h2>Tasks:</h2>
            <ul>
              {course.tasks.map((task, index) => (
                <ul key={index}>
                  <strong>{task.taskName}</strong>
                  <p>{task.body}</p>
                </ul>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Courses;
