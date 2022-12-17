import './App.css';
import React, { useState, useEffect } from 'react';

const ACCESS_KEY = '2NlASwtkygJ8s5FmT-mEjzhldJgZh61Yr0I726I2Ohk';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function searchImages() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`
        );
        const data = await response.json();
        setImages(data.results);
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
            <img src={image.urls.small} alt={image.alt_description} key={image.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
