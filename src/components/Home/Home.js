import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import CoursesList from "../CoursesList/CoursesList";
import Header from "../Header/Header";
import Search from "../Search/Search";

import { Link } from "react-router-dom";

const App = () => {
  const [courses, setCourses] = useState([
    {
      id: nanoid(),
      name: "JAVA",
    },
    {
      id: nanoid(),
      name: "Python",
    },
    {
      id: nanoid(),
      name: "Math",
    },
    {
      id: nanoid(),
      name: "Adobe",
    },
  ]);

  const [searchName, setSearchName] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedCourses = JSON.parse(
      localStorage.getItem("react-courses-app-data")
    );

    if (savedCourses) {
      setCourses(savedCourses);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-courses-app-data", JSON.stringify(courses));
  }, [courses]);

  const addCourse = (name) => {
    const newCourse = {
      id: nanoid(),
      name: name,
    };
    const newcourses = [...courses, newCourse];
    setCourses(newcourses);
  };

  const deleteCourse = (id) => {
    const newcourses = courses.filter((course) => course.id !== id);
    setCourses(newcourses);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <br></br>
        <Search handleSearchCourse={setSearchName} />

        <CoursesList
          courses={courses.filter((course) =>
            course.name.toLowerCase().includes(searchName)
          )}
          handleAddCourse={addCourse}
          handleDeleteCourse={deleteCourse}
        />

        <h1 className="all">All Courses</h1>
        <Link to="AllCourses">
          <button className="btn">See All Courses</button>
        </Link>

        <br></br>
        <br></br>

        <CoursesList
          courses={courses.filter((course) =>
            course.name.toLowerCase().includes(searchName)
          )}
          handleAddCourse={addCourse}
          handleDeleteCourse={deleteCourse}
        />
      </div>
    </div>
  );
};

export default App;
