import React, { useState } from 'react';
import Select from 'react-select';
import locationsArray from './locationsArray';
import categoriesArray from './categoriesArray';

function App() {
  const [locations, setLocations] = useState(locationsArray);
  const [categories, setCategories] = useState(categoriesArray);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <Select options={locations} />
      <Select options={categories} />
      <button onSubmit={handleSubmit}>Submit</button>
    </React.Fragment>
  );
}

export default App;
