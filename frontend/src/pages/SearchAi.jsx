import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { RiMicAiFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ai from "../assets/ai.png";
import start from "../assets/start.mp3";
import { serverUrl } from '../App';

const SearchAi = () => {

  const navigate = useNavigate();
  const startSound = new Audio(start);

  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  /* ------------------ Speech Synthesis ------------------ */
  const speak = (message) => {
    if (!message) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  /* ------------------ Speech Recognition Setup ------------------ */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  /* ------------------ Voice Search ------------------ */
  const handleSearch = () => {
    if (!recognitionRef.current) return;

    setListening(true);
    startSound.play();
    recognitionRef.current.start();

    recognitionRef.current.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      handleRecommendation(transcript);
    };
  };

  /* ------------------ API Search ------------------ */
  const handleRecommendation = async (query) => {
    if (!query?.trim()) return;

    try {
      const res = await axios.post(
        `${serverUrl}/api/course/search`,
        { input: query },
        { withCredentials: true }
      );

      const courses = res?.data?.courses ?? [];
      setRecommendations(courses);
      setListening(false);

      courses.length > 0
        ? speak("Here are some courses I found for you")
        : speak("Sorry, I couldn't find any courses for you");

    } catch (err) {
      console.error(err);
      setListening(false);
    }
  };

  /* ------------------ JSX ------------------ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-16">

      {/* Search Card */}
      <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative">

        <FaArrowLeft
          className="text-black w-5 h-5 cursor-pointer absolute left-6 top-6"
          onClick={() => navigate(-1)}
        />

        <h1 className="text-xl sm:text-3xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2">
          <img src={ai} className="w-8 h-8" alt="AI" />
          Search with <span className="text-[#CB99C7]">AI</span>
        </h1>

        <div className="flex items-center bg-gray-700 rounded-full overflow-hidden shadow-lg relative w-full">

          <input
            type="text"
            className="flex-grow px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            placeholder="What do you want to learn? (AI, MERN...)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {input && (
            <button
              className="absolute right-14 bg-white rounded-full"
              onClick={() => handleRecommendation(input)}
            >
              <img src={ai} className="w-10 h-10 p-2" alt="Search" />
            </button>
          )}

          <button
            className="absolute right-2 bg-white rounded-full w-10 h-10 flex items-center justify-center"
            onClick={handleSearch}
          >
            <RiMicAiFill className="w-5 h-5 text-[#cb87c5]" />
          </button>
        </div>
      </div>

      {/* Results Section */}
      {recommendations.length > 0 ? (
        <div className="w-full max-w-6xl mt-12 px-2 sm:px-4">

          <h2 className="text-center text-xl sm:text-2xl mb-8 text-gray-300">
            Recommended Courses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendations.map((course) => (
              <div
                key={course._id}
                onClick={() => navigate(`/viewcourse/${course._id}`)}
                className="bg-white text-black p-5 rounded-2xl shadow-md border border-gray-200 cursor-pointer 
                           hover:bg-gray-100 hover:shadow-indigo-500/30 transition-all duration-200"
              >
                <h3 className="text-lg font-bold sm:text-xl line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {course.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : listening ? (
        <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">
          Listening...
        </h1>
      ) : (
        <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">
          No courses found yet
        </h1>
      )}
    </div>
  );
};

export default SearchAi;
