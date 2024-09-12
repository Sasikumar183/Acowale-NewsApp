import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';

const NewsPage = ({ category }) => {
  const [allNews, setAllNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const API_KEY2 = 'd59cfabad8a3326397498aba8eccb801';
  const BASE_URL = `https://gnews.io/api/v4/search?apikey=${API_KEY2}`;

  // Function to remove duplicate articles
  const removeDuplicates = (articles) => {
    const seen = new Set();
    return articles.filter((article) => {
      const isDuplicate = seen.has(article.url);
      seen.add(article.url);
      return !isDuplicate;
    });
  };

  // Fetch all news by category or search term
  const fetchNews = async (query = '') => {
    setLoading(true);
    try {
      const queryToFetch = query.trim() !== '' ? query : (category || 'latest');
      const response = await axios.get(`${BASE_URL}&q=${queryToFetch}&max=100`);
      console.log(response.data)
      const uniqueArticles = removeDuplicates(response.data.articles);
      setAllNews(uniqueArticles);
      setDisplayedNews(uniqueArticles.slice(0, 15)); // Show first 15 articles initially

      // Update the title based on the query or category
      if (query.trim() !== '') {
        setTitle(`${query} Related News`);
      } else if (category) {
        setTitle(`${category} News`);
      } else {
        setTitle('Latest News');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(); // Fetch news when the component mounts or when the category changes
  }, [category]);

  const handleSearch = () => {
    fetchNews(searchTerm); // Trigger search based on the search term
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Search Bar */}
      <div className="flex justify-end p-6 ">
        <div className="relative flex items-center w-full max-w-md">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search query
            onKeyDown={handleKeyDown} // Trigger search on "Enter" key press
            className="px-4 py-2 rounded-l-lg bg-gray-400 focus:outline-none w-full placeholder-gray-950"
            placeholder="Search..."
          />

          <button
            onClick={handleSearch} // Trigger search on search icon click
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2.5 rounded-r-lg flex items-center"
          >
            <FiSearch className="text-xl" />
          </button>
        </div>
      </div>

      {/* News Display Section */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center capitalize animate__animated animate__fadeIn animate__delay-1s">
          {title}
        </h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedNews.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 animate__animated animate__fadeIn"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-sm text-gray-700 mb-4">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
