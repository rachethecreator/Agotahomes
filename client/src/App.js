import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import locationsArray from './locationsArray';
import categoriesArray from './categoriesArray';

function App() {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState({ results: [] });

  const handleSubmit = e => {
    e.preventDefault();
    if (!location || !category)
      alert('Please provide both location and category selections');
    axios
      .get(
        `http://localhost:3000/api?location=${location}&category=${category}`
      )
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  return (
    <React.Fragment>
      <Select
        options={locationsArray}
        onChange={value => setLocation(value.label)}
        placeholder="Select a location..."
      />
      <Select
        options={categoriesArray}
        onChange={value => setCategory(value.label)}
        placeholder="Select a category..."
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <ul>
        {data.results.map((result, i) => (
          <li key={i}>{result.Name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default App;
