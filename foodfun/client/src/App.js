import React, { useState, useEffect, Component } from 'react';
import './App.css';
import axios from 'axios';
import FoodBlurb from './components/FoodBlurb';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchItem: '',
      currfoodPosts: [],
    }
    this.onChangeSearchItem = this.onChangeSearchItem.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getFoodItems = this.getFoodItems.bind(this);
  }

  onChangeSearchItem(e) {
    this.setState({
      searchItem: e.target.value
    });
  }

  onSubmit(){
    var x = document.getElementById("search-results-text");
  
    if (this.state.searchItem.trim() === "") {
      x.innerHTML = "Please Type Something";
      x.style.color = "firebrick";
    } else {
      x.innerHTML ="Search Results for: " + this.state.searchItem;
      x.style.color = "black";

      //make all radio buttons unchecked with a new search
      document.getElementById('calories-option').checked = false;
      document.getElementById('fat-option').checked = false;
      document.getElementById('numIngredients-option').checked = false;

      axios.get(`http://localhost:5000/search/${this.state.searchItem}`)
        .then(res => {
          this.setState({
            currfoodPosts: res.data,
          });
        })
        .catch(err => "Error:" + err);
    }
  }

  applyFilter() {
    var e = document.getElementsByName('filter-group');
    var chosenFilter = '';

    for (var i = 0; i < e.length; i++) {
      if (e[i].checked) {
        chosenFilter = e[i].value;
      }
    }

    if (chosenFilter === 'calories') {
      var calSort = this.state.currfoodPosts;
      calSort.sort((food1,food2) => {
        var food1CPS = food1.recipe.calories / food1.recipe.yield;
        var food2CPS = food2.recipe.calories / food2.recipe.yield;
        return food1CPS - food2CPS;
      });
      this.setState({
        currfoodPosts: calSort
      });
    } else if (chosenFilter === 'fat') {
      var fatSort = this.state.currfoodPosts;
      fatSort.sort((food1, food2) => {
        var food1FPS = food1.recipe.totalNutrients.FAT.quantity / food1.recipe.yield;
        var food2FPS = food2.recipe.totalNutrients.FAT.quantity / food2.recipe.yield;
        return food1FPS - food2FPS;
      });
      this.setState({
        currfoodPosts: fatSort
      });
    } else if (chosenFilter === 'numIng') {
      var numIngSort = this.state.currfoodPosts;
      numIngSort.sort((food1, food2) => {
        var numIng1 = 0;
        var numIng2 = 0;

        food1.recipe.ingredientLines.forEach(ing => numIng1++);
        food2.recipe.ingredientLines.forEach(ing => numIng2++);

        return numIng1 - numIng2;
      });
      this.setState({
        currfoodPosts: numIngSort
      });
    } else if (chosenFilter === 'time') {
      var timeSort = this.state.currfoodPosts;
      timeSort.sort((food1, food2) => {
        return food1.recipe.totalTime - food2.recipe.totalTime;
      });
      this.setState({
        currfoodPosts: timeSort
      });
    } else {
      console.log('ERROR WITH SORT RADIO BUTTON');
    }
  }

  getFoodItems() {
    var finalFoodList = [];
    this.state.currfoodPosts.map(food => {
      finalFoodList.push(<FoodBlurb foodItem={food}/>)
    });
    return finalFoodList;
  }

  render() {
    return(
      <div>
        <div className="input-area">
          <input type="text"
              className="food-search-bar"
              placeholder="Enter Food"
              value={this.state.searchItem}
              onChange={this.onChangeSearchItem}/>
          <button className="search-button" onClick={this.onSubmit}>Search</button>
  
          <div className="filter-container">
            <div className="filter-options">
              <p>Sort By (Low - High): </p>
                <div>
                  <input type="radio" id="calories-option" name="filter-group" value="calories"></input>
                  <label className="filter-label" for="calories-option">Calories</label>
                </div>
                <div>
                  <input type="radio" id="fat-option" name="filter-group" value="fat"></input>
                  <label className="filter-label" for="fat-option">Fat</label>
                </div>
                <div>
                  <input type="radio" id="numIngredients-option" name="filter-group" value="numIng"></input>
                  <label className="filter-label" for="numIngredients-option">Number of Ingredients</label>
                </div>
                <div>
                  <input type="radio" id="time-option" name="filter-group" value="time"></input>
                  <label className="filter-label" for="time-option">Time</label>
                </div>
                <button className="filter-button" onClick={this.applyFilter}>Apply</button>
            </div>
          </div>
        </div>
  
        <label id="search-results-text" className="search-results-text"></label>
        
        <div className="food-posts">
            {this.getFoodItems()}
        </div>
      </div>
    )
  }
}



export default App;
