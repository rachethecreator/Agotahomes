import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import ResultsTable from './ResultsTable';
import locationsArray from './locationsArray';
import categoriesArray from './categoriesArray';

function App() {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState({ results: [] });
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookmark, setBookmark] = useState({ favs: [] });

  // useEffect(() => {
  //   function handleClick(e) {
  //     // e.preventDefault();
  //     //not logged in? alert login
  //     // if (!isLoggedIn) {
  //     //   alert('Please Sign Up / Log In');
  //     //   return;
  //     // }
  //     const id = e.target.id;
  //     setBookmark(data.results[id]);
  //     console.log('this is the data.results at id', data.results[id]);
  //     console.log('this is the bookmark', bookmark);
  //     // console.log('selected data here', data.results[id]);
  //     //logged in? axios.post to add user favs and then display the favs page/component
  //     // axios.post('/favs');
  //   }
  // }, []);

  const handleSaveClick = e => {
    e.preventDefault();
    //not logged in? alert login
    // if (!isLoggedIn) {
    //   alert('Please Sign Up / Log In');
    //   return;
    // }
    const id = e.target.id;
    setBookmark(data.results[id]);
    console.log('this is the data.results at id', data.results[id]);
    console.log('this is the bookmark', bookmark);
    // console.log('selected data here', data.results[id]);
    //logged in? axios.post to add user favs and then display the favs page/component
    // axios.post('/favs');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!location || !category) {
      alert('Please provide both location and category selections');
      return;
    }
    axios
      .get(
        `http://localhost:3000/api?location=${location}&category=${category}`
      )
      .then(res => setData(res.data))
      .catch(err => console.log(err));
    setIsSubmitted(true);
  };

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

  const rows = data.results.map((result, i) => {
    return (
      <tr id={i}>
        <td id={i} key={i}>
          {result.Name}
        </td>
        <td id={i} key={i}>
          {result.description}
        </td>
        <td id={i} key={i}>
          {result.addrln1}
        </td>
        <td id={i} key={i}>
          {result.city}
        </td>
        <td id={i} key={i}>
          {result.zip}
        </td>
        <td id={i} key={i}>
          {result.hours}
        </td>
        <td id={i} key={i}>
          {result.phones}
        </td>
        <td id={i} key={i}>
          {result.url}
        </td>
        <button id={i} key={i} onClick={handleSaveClick}>
          Add
        </button>
      </tr>
    );
  });

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
      {isSubmitted && <ResultsTable headings={headings} rows={rows} />}
      {/* {!isLoggedIn && <LogInPage handleClick={handleClick}/>}
      {isLoggedIn && <FavsPage />} */}
    </React.Fragment>
  );
}

export default App;
