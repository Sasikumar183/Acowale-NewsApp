import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './assets/component/Navbar';
import NewsPage from './assets/component/Home';

const App = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Handle search input globally

  return (
    <Router>
      <Navbar setSearchQuery={setSearchQuery} /> {/* Pass search query handler */}
      <Routes>
        <Route path="/" element={<NewsPage searchQuery={searchQuery} category="latest" />} />
        <Route path="/technology" element={<NewsPage searchQuery={searchQuery} category="technology" />} />
        <Route path="/entertainment" element={<NewsPage searchQuery={searchQuery} category="entertainment" />} />
        <Route path="/sports" element={<NewsPage searchQuery={searchQuery} category="sports" />} />
        <Route path="/health" element={<NewsPage searchQuery={searchQuery} category="health" />} />
        <Route path="/business" element={<NewsPage searchQuery={searchQuery} category="business" />} />
      </Routes>
    </Router>
  );
};

export default App;
