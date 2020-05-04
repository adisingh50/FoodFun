import React, { useState } from 'react';
import './App.css';
import axios from 'axios';


const App = () => {
  const [searchItem, setSearchItem] = useState('');
  const [foodPosts, setFoodPosts] = useState('');
  
  function onSubmit() {
    axios.get(`http://localhost:5000/search/${searchItem}`)
      .then(res => setFoodPosts(res.data))
      .catch("something went wrong bud.");

    console.log(foodPosts);
    setSearchItem('');
  }

  return(
    <div>
      <div className="input-area">
        <input type="text"
            className="food-search-bar"
            placeholder="Enter Food"
            value={searchItem}
            onChange={e=>setSearchItem(e.target.value)}/>
        <button className="search-button" onClick={onSubmit}>Search</button>
      </div>

      <div className="food-posts">
        {}
      </div>
    </div>
  )
}


export default App;
