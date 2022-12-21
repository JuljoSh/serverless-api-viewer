import './App.css';
import React, { useState, useEffect } from 'react';

const ACCESS_KEY = '563492ad6f917000010000016317442ff2d442cd903a6beee3202204';

function ImageSearch() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function searchImages() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&per_page=50`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_KEY}`
            }
          }
        );
        const data = await response.json();
        setImages(data.photos);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }

    if (query) {
      searchImages();
    }
  }, [query]);

  function handleChange(event) {
    setQuery(event.target.value);
  }

  return (
    <div>
      <form>
    <h1>test</h1>
        <label>
          Search:
          <input type="text" value={query} onChange={handleChange} />
        </label>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>An error occurred: {error.message}</div>
      ) : (
        <div>
          {images.map(image => (
            <img src={image.src.small} alt={image.alt_description} key={image.id} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return <ImageSearch />;
}

export default App;
