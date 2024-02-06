import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import './Courses.css';
import { AuthContext } from '../AuthContext';

function Courses() {
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(userResponse.data);
    
        const courseResponse = await axios.get(`http://localhost:5000/courses/${id}`);
        const courseDetails = courseResponse.data;
    
        const songIds = Array.isArray(courseDetails.songIds)
          ? courseDetails.songIds
          : [courseDetails.songIds];
    
        const songs = await Promise.all(
          songIds.map(async (songId) => {
            const songResponse = await axios.get(`http://localhost:5000/songs/songs/${songId}`);
            return songResponse.data;
          })
        );
    
        const taskIds = Array.isArray(courseDetails.taskIds)
          ? courseDetails.taskIds
          : [courseDetails.taskIds];
    
        const tasks = await Promise.all(
          taskIds.map(async (taskId) => {
            const taskResponse = await axios.get(`http://localhost:5000/tasks/${taskId}`);
            return taskResponse.data;
          })
        );
    
        setCourse({
          ...courseDetails,
          songs: songs,
          tasks: tasks,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, token]);

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

  const completeSong = async (songId) => {
    try {
      await axios.post(
        `http://localhost:5000/users/completeSong`,
        { songId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const updatedUserResponse = await axios.get(`http://localhost:5000/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(updatedUserResponse.data);
  
      const isCourseCompleted = checkIfCourseCompleted(updatedUserResponse.data, course);
      
      if (isCourseCompleted) {
        markCourseAsCompleted();
      }
  
    } catch (error) {
      console.error('Error completing song:', error);
    }
  };
  
  const completeTask = async (taskId) => {
    try {
      await axios.post(
        `http://localhost:5000/users/completeTask`,
        { taskId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUserResponse = await axios.get(`http://localhost:5000/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(updatedUserResponse.data);
      const isCourseCompleted = checkIfCourseCompleted(updatedUserResponse.data, course);
  
      if (isCourseCompleted) {
        markCourseAsCompleted();
      }
  
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };
  
  const checkIfCourseCompleted = (user, currentCourse) => {
    const completedSongs = user.completedSongs || [];
    const completedTasks = user.completedTasks || [];
    const courseSongIds = currentCourse.songs.map(song => song._id);
    const courseTaskIds = currentCourse.tasks.map(task => task._id);
  
    return courseSongIds.every(songId => completedSongs.includes(songId)) &&
           courseTaskIds.every(taskId => completedTasks.includes(taskId));
  };
  const markCourseAsCompleted = async () => {
    try {
      await axios.post(
        `http://localhost:5000/users/completeCourse`,
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      
      const updatedUserResponse = await axios.get(`http://localhost:5000/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(updatedUserResponse.data);
  
    } catch (error) {
      console.error('Error marking course as completed:', error);
    }
  };
  return (
    <div className="course-container">
      {course && user ? (
        <>
          <div className="course-header">
            <div className="header-left">
              <h1 className="course-title">{course.courseName}</h1>
            </div>
            <div className="header-right">
              <h3>Difficulty: </h3>
              {renderStars(course.difficultyLevel)}
            </div>
          </div>
          {course.songs.length > 0 && (
            <div className="section">
              <h2>Songs</h2>
              <div className="list">
                {course.songs.map((song, index) => (
                  <div className="list-item" key={index}>
                    <div className="item-title">
                      <Link to={`/songs/${song._id}`}>{song.title}</Link>
                    </div>
                    {user.completedSongs && user.completedSongs.includes(String(song._id)) ? (
                      <button className="complete-button" disabled>
                        Song Complete!
                      </button>
                    ) : (
                      <button className="complete-button" onClick={() => completeSong(song._id)}>
                        Complete Song
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="section">
            <h2>Tasks</h2>
            <div className="list">
              {course.tasks.map((task, index) => (
                <div className="list-item" key={index}>
                  <div className="item-title">
                    <strong>{task.taskName}</strong>
                    <p>{task.body}</p>
                  </div>
                  {user.completedTasks && user.completedTasks.includes(String(task._id)) ? (
                    <button className="complete-button" disabled>
                      Task Complete!
                    </button>
                  ) : (
                    <button className="complete-button" onClick={() => completeTask(task._id)}>
                      Complete Task
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Courses;
