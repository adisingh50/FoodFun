import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import FoodBlurb from './components/FoodBlurb';

const App = () => {
  const [searchItem, setSearchItem] = useState('');
  const [foodPosts, setFoodPosts] = useState([]);

  useEffect(() => {
    updateFoodPosts(foodPosts);
  }, [foodPosts]);

  const onSubmit = () => {
    var x = document.getElementById("search-results-text");
  
    if (searchItem.trim() === "") {
      x.innerHTML = "Please Type Something";
      x.style.color = "firebrick";
    } else {
      x.innerHTML ="Search Results for: " + searchItem;
      x.style.color = "black";
      axios.get(`http://localhost:5000/search/${searchItem}`)
        .then(res => {
          setFoodPosts(res.data)
        })
        .catch(err => "Error:" + err);
    }
  }
  
  const updateFoodPosts = (foodPosts) => {
    // foodPosts.map(food => {
    //   return <FoodBlurb foodItem={food}/>
    // });
    console.log(foodPosts);
  }

  return(
    <div>
      <div className="input-area">
        <input type="text"
            className="food-search-bar"
            placeholder="Enter Food"
            value={searchItem}
            onChange={e => setSearchItem(e.target.value)}/>
        <button className="search-button" onClick={onSubmit}>Search</button>
      </div>
      <label id="search-results-text" className="search-results-text"></label>
      <div className="food-posts">
      </div>
    </div>
  )
}



export default App;
