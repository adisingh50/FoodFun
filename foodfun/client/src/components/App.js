import React, { useState, useEffect, Component } from 'react';
import '.././stylesheets/App.css';
import axios from 'axios';
import FoodBlurb from './FoodBlurb';
import edamam from ".././images/edamam.png";
import user from ".././images/user.png";
import Cookies from "js-cookie";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Login from './Login';
import ReactDOM from 'react-dom';
import logo from '.././images/foodfun_logo.png';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchItem: '',
      currfoodPosts: [],
      minCalEntry: '',
      maxCalEntry: '',
      minTimeEntry: '',
      maxTimeEntry: ''
    }
    this.onChangeSearchItem = this.onChangeSearchItem.bind(this);
    this.onChangeMinCalEntry = this.onChangeMinCalEntry.bind(this);
    this.onChangeMaxCalEntry = this.onChangeMaxCalEntry.bind(this);
    this.onChangeMinTimeEntry = this.onChangeMinTimeEntry.bind(this);
    this.onChangeMaxTimeEntry = this.onChangeMaxTimeEntry.bind(this);
    this.applySort = this.applySort.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getFoodItems = this.getFoodItems.bind(this);
    this.isInputNumber = this.isInputNumber.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
  }

  componentDidMount() {
    if (this.props.ogSearchItem) { //only when we hit the back button from FullPost.js
      var s = document.getElementById('food-search-bar');
      s.value = this.props.ogSearchItem

      axios.get(`http://localhost:5000/search/${this.props.ogSearchItem}`)
        .then(res => {
          this.setState({
            currfoodPosts: res.data
          });
        })
        .catch(err => "Error: " + err);
    }
  }

  onChangeMinCalEntry(e) {
    this.setState({
      minCalEntry: e.target.value
    });
  }

  onChangeMaxCalEntry(e) {
    this.setState({
      maxCalEntry: e.target.value
    });
  }

  onChangeMinTimeEntry(e) {
    this.setState({
      minTimeEntry: e.target.value
    });
  }

  onChangeMaxTimeEntry(e) {
    this.setState({
      maxTimeEntry: e.target.value
    });
  }

  onChangeSearchItem(e) {
    this.setState({
      searchItem: e.target.value
    });
  }

  isInputNumber(e) {
    var char = String.fromCharCode(e.which);
    if (!(/[0-9]/.test(char))) {
      e.preventDefault();
    }
  }

  onLogOut() {
    Cookies.set("login", "false")
    Cookies.set("user_firstName", "");
    Cookies.set("user_lastName", "");
    Cookies.set("user_email", "");
    ReactDOM.render(<Login/>, document.getElementById('root'));
  }

  onSubmit(){
    var x = document.getElementById("search-results-text");
  
    if (this.state.searchItem.trim() === "") {
      x.innerHTML = "Please Type Something";
      x.style.color = "firebrick";
    } else {
      //make all radio buttons unchecked with a new search
      document.getElementById('calories-option').checked = false;
      document.getElementById('fat-option').checked = false;
      document.getElementById('numIngredients-option').checked = false;

      var calMinClient = "";
      var calMaxClient = "";
      var mealTypeClient = "";
      var timeMinClient = "";
      var timeMaxClient = "";

      var f = document.getElementsByName('filter-group');
      const fw = document.getElementById('filter-warning');

      //reading the inputted filters from the user      
      if (f[0].checked) { //calories entry logic
        calMinClient = this.state.minCalEntry.trim();
        calMaxClient = this.state.maxCalEntry.trim();

        if (calMaxClient.trim() === "") {
          fw.innerHTML = "You Must Select a Max Calorie Limit";
          return;
        } else if (parseInt(calMinClient) > parseInt(calMaxClient)) {
          fw.innerHTML = "Min Calories Can't Be Greater Than Max Calories";
          return;
        }
      }
      if (f[1].checked) { //meal type entry logic
        var m = document.getElementById('mealTypeSelector');

        if (m.options[m.selectedIndex].value != 'None') {
          mealTypeClient = m.options[m.selectedIndex].value;
        }
      }
      if (f[2].checked) { // time entry logic
        timeMinClient = this.state.minTimeEntry;
        timeMaxClient = this.state.maxTimeEntry;

        if (timeMaxClient.trim() === "") {
          fw.innerHTML = "You Must Select a Max Time Limit";
          return;
        } else if (parseInt(timeMinClient) > parseInt(timeMaxClient)) {
          fw.innerHTML = "Min Time Can't Be Greater Than Max Time";
          return;
        }
      }
      fw.innerHTML = "";
      x.innerHTML ="Search Results for: " + this.state.searchItem;
      x.style.color = "black";

      const filterRequest = {
        foodName: this.state.searchItem,
        calMin: calMinClient,
        calMax: calMaxClient,
        mealType: mealTypeClient,
        timeMin: timeMinClient,
        timeMax: timeMaxClient
      }
      axios.post(`http://localhost:5000/search/filter`, filterRequest)
        .then(res => {
          this.setState({
            currfoodPosts: res.data
          });
        })
        .catch(err => "Error: " + err);
    }
  }

  applySort() {
    var e = document.getElementsByName('sortby-group');
    var chosenSort = '';

    for (var i = 0; i < e.length; i++) {
      if (e[i].checked) {
        chosenSort = e[i].value;
      }
    }

    if (chosenSort === 'calories') {
      var calSort = this.state.currfoodPosts;
      calSort.sort((food1,food2) => {
        var food1CPS = food1.recipe.calories / food1.recipe.yield;
        var food2CPS = food2.recipe.calories / food2.recipe.yield;
        return food1CPS - food2CPS;
      });
      this.setState({
        currfoodPosts: calSort
      });
    } else if (chosenSort === 'fat') {
      var fatSort = this.state.currfoodPosts;
      fatSort.sort((food1, food2) => {
        var food1FPS = food1.recipe.totalNutrients.FAT.quantity / food1.recipe.yield;
        var food2FPS = food2.recipe.totalNutrients.FAT.quantity / food2.recipe.yield;
        return food1FPS - food2FPS;
      });
      this.setState({
        currfoodPosts: fatSort
      });
    } else if (chosenSort === 'numIng') {
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
    } else if (chosenSort === 'time') {
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
      finalFoodList.push(<FoodBlurb ogSearchItem={this.state.searchItem} foodItem={food} userLoggedIn={this.props.userLoggedIn}/>)
    });
    return finalFoodList;
  }

  render() {
    return(
      <div className="big-body">
        <div className="food-fun-header">
          <h1 className="food-fun-title"><img className="main-image" src={logo} alt="foodfun logo"/>FoodFun</h1>
          <h3 className="food-fun-description">Discover, Share, and Review new Recipes!</h3>

          <div className="user-bar">
            <img className="user-icon" src={user} alt="user-icon"/>
            <p className="name-txt"><strong>{Cookies.get("user_firstName")}</strong></p>
          </div>
          <img className="edamam" src={edamam} alt="edamam badge"/>

          <Router>
            <Link to="/">
              <button className="log-out-button" onClick={this.onLogOut}>Log Out</button>
            </Link>
          </Router>
        </div>

        <div className="input-area">
          <input type="text"
              id="food-search-bar"
              className="food-search-bar"
              placeholder="Enter Food"
              value={this.state.searchItem}
              onChange={this.onChangeSearchItem}/>
          <button className="search-button" onClick={this.onSubmit}>Search</button>
  
          <div className="sortby-container">
            <div className="sortby-options">
              <p className="sort-txt">Sort By (Low - High): </p>
                <div>
                  <input type="radio" id="calories-option" name="sortby-group" value="calories"></input>
                  <label className="sortby-label" for="calories-option">Calories</label>
                </div>
                <div>
                  <input type="radio" id="fat-option" name="sortby-group" value="fat"></input>
                  <label className="sortby-label" for="fat-option">Fat</label>
                </div>
                <div>
                  <input type="radio" id="numIngredients-option" name="sortby-group" value="numIng"></input>
                  <label className="sortby-label" for="numIngredients-option">Number of Ingredients</label>
                </div>
                <div>
                  <input type="radio" id="time-option" name="sortby-group" value="time"></input>
                  <label className="sortby-label" for="time-option">Time</label>
                </div>
                <button className="sortby-button" onClick={this.applySort}>Apply</button>
            </div>
          </div>

          <div className="filter-container">
            <div className="filter-options">
              <p className="filter-txt">Filter: </p>
                <div>
                  <input type="checkbox" id="calories" name="filter-group"></input>
                  <label className="filter-label"for="calories">Calories: MIN
                    <input className="minCalEntry" onChange={this.onChangeMinCalEntry} onKeyPress={e => this.isInputNumber(e)}/>
                     - MAX <input className="maxCalEntry" onChange={this.onChangeMaxCalEntry} onKeyPress={e => this.isInputNumber(e)}/>
                    </label>
                </div>
                <div className="meal-spacing">
                  <input type="checkbox" id="mealType" name="filter-group"></input>
                  <label className="filter-label"for="mealType">Meal Type:
                    <select id="mealTypeSelector" className="mealTypeSelector">
                      <option value="none" selected>None</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="snack">Snack</option>
                      <option value="dinner">Dinner</option>
                    </select>
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="time" name="filter-group"></input>
                  <label className="filter-label"for="time">Time: MIN
                  <input className="minTimeEntry" onChange={this.onChangeMinTimeEntry} onKeyPress={e => this.isInputNumber(e)}/>
                  - MAX <input className="maxTimeEntry" onChange={this.onChangeMaxTimeEntry} onKeyPress={e => this.isInputNumber(e)}/>
                  </label>
                </div>
            </div>
            <p className="filter-warning" id="filter-warning"></p>
          </div>
        </div>
        <br></br>
        <br></br>
        <label id="search-results-text" className="search-results-text"></label>
        
        <div className="food-posts">
            {this.getFoodItems()}
        </div>
      </div>
    )
  }
}

export default App;
