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
    if (!location || !category) {
      alert('Please provide both location and category selections');
      return;
    }
    axios
      .get(
        `http://localhost:3000/api/home?location=${location}&category=${category}`
      )
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };
  // console.log('data.results is an array of objects', data.results);

  const headings = [
    'Name',
    'Description',
    'Address',
    'City',
    'Zip',
    'Hours',
    'Phones',
    'Website'
  ];

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
          <ResultsTable key={i} headings={headings} rows={result} />
        ))}
      </ul>
    </React.Fragment>
  );
}

function ResultsTable({ headings, rows }) {
  // console.log('rows are objects', rows);

  const { Name, description, addrln1, city, zip, hours, phones, url } = rows;

  // console.log('destructured here', [
  //   Name,
  //   description,
  //   addrln1,
  //   city,
  //   zip,
  //   hours,
  //   phones,
  //   url
  // ]);

  return (
    <table>
      <thead>
        {headings.map((heading, i) => {
          <th key={i}>{heading}</th>;
        })}
      </thead>
      <tbody>
        {[Name, description, addrln1, city, zip, hours, phones, url].map(
          (cell, i) => {
            <tr>
              <td key={i}>{cell}</td>
            </tr>;
          }
        )}
      </tbody>
    </table>
  );
}

export default App;
