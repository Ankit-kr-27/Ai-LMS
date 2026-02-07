import React, { useState, useEffect } from 'react'
import { Nav } from '../component/Nav'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import ai from "../assets/SearchAi.png"
import { useSelector } from 'react-redux';
import Card from '../component/Card';

const AllCourses = () => {
  const navigate = useNavigate();

  const { courseData } = useSelector((state) => state.course);

  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  /* ---------------- Toggle Category ---------------- */
  const toggleCategory = (e) => {
    const value = e.target.value;

    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(c => c !== value)
        : [...prev, value]
    );
  };

  /* ---------------- Apply Filter ---------------- */
  const applyFilter = () => {
    if (!courseData) {
      setFilterCourses([]);
      return;
    }

    let courseCopy = [...courseData];

    if (category.length > 0) {
      courseCopy = courseCopy.filter(course =>
        category.includes(course.category?.trim())
      );
    }

    setFilterCourses(courseCopy);
  };

  /* ---------------- Effects ---------------- */
  useEffect(() => {
    setFilterCourses(courseData || []);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category, courseData]);

  /* ---------------- JSX ---------------- */
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Nav />

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsSidebarVisible(prev => !prev)}
        className="fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black"
      >
        {isSidebarVisible ? 'Hide' : 'Show'} Filters
      </button>

      {/* Sidebar */}
      <aside
        className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] 
        border-r border-gray-200 shadow-md transition-transform duration-300 
        ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} 
        md:block md:translate-x-0`}
      >
        <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6">
          <FaArrowLeft
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
          Filter by category
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 text-sm bg-gray-600 text-white border border-white p-5 rounded-2xl"
        >
          <button
            type="button"
            className="w-full px-3 py-2 bg-black rounded-lg flex items-center justify-center gap-2"
            onClick={() => navigate("/search")}
          >
            Search with AI
            <img src={ai} alt="AI" className="w-6 h-6 rounded-full" />
          </button>

          {[
            "App Development",
            "AI/ML",
            "Web Development",
            "Data Science",
            "Data Analytics",
            "Blockchain",
            "Cyber Security",
            "Others",
          ].map(cat => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer hover:text-gray-200"
            >
              <input
                type="checkbox"
                value={cat}
                onChange={toggleCategory}
                checked={category.includes(cat)}
                className="accent-black w-4 h-4"
              />
              {cat}
            </label>
          ))}
        </form>
      </aside>

      {/* Courses */}
      <main
        className="w-full transition-all duration-300 py-[130px] 
        md:pl-[300px] flex flex-wrap gap-6 px-3 justify-center md:justify-start"
      >
        {filterCourses.length > 0 ? (
          filterCourses.map(course => (
            <Card
              key={course._id}
              id={course._id}
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              price={course.price}
              reviews={course.reviews}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg">
            No courses found
          </p>
        )}
      </main>
    </div>
  );
};

export default AllCourses;
