import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '.././stylesheets/FoodBlurb.css';
import checkMark from ".././images/checkmark.png"
import clockImg from "../images/clock.png";
import FullPost from './FullPost';
import likeButton from '.././images/likeButton.png';
import dislikeButton from '.././images/dislikeButton.png';
import axios from 'axios';

class FoodBlurb extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tempNumLikes: 0,
            tempNumDislikes: 0
        }

        this.ingredientList = this.ingredientList.bind(this);
        this.viewFullPost = this.viewFullPost.bind(this);
        this.getFoodLikes = this.getFoodLikes.bind(this);
        this.getFoodDislikes = this.getFoodDislikes.bind(this);
    }

    getFoodLikes() {
        const customFoodLikeRequest = {
            foodName: this.props.foodItem.recipe.label,
            foodCalories: this.props.foodItem.recipe.calories
        }

        axios.post('http://localhost:5000/like/viewFoodLikes', customFoodLikeRequest)
            .then(res => {
                if (res.data) {
                    this.setState({
                        tempNumLikes: res.data.numLikes
                    });
                } else {
                    this.setState({
                        tempNumLikes: 0
                    })
                }
            })
            .catch(err => console.log("Error: " + err));
        return this.state.tempNumLikes;
    }

    getFoodDislikes() {
        const customFoodDislikeRequest = {
            foodName: this.props.foodItem.recipe.label,
            foodCalories: this.props.foodItem.recipe.calories
        }

        axios.post('http://localhost:5000/dislike/viewFoodDislikes', customFoodDislikeRequest)
            .then(res => {
                if (res.data) {
                    this.setState({
                        tempNumDislikes: res.data.numDislikes
                    });
                } else {
                    this.setState({
                        tempNumDislikes: 0
                    })
                }
            })
            .catch(err => console.log("Error: " + err));
        return this.state.tempNumDislikes;
    }

    ingredientList() {
        var charCount = 0;
        var bulletCount = 0;
        var finalList = [];
        var keepRunning = true;

        this.props.foodItem.recipe.ingredientLines.map(ing => {
            charCount += ing.length;
            bulletCount++;

            if (keepRunning) {
                if (charCount <= 450 && bulletCount < 10) {
                    finalList.push(<li className="ing-item">{ing}</li>)
                } else {
                    finalList.push(<li className="ing-etc-item">etc...</li>);
                    keepRunning = false;
                }
            }
        });
        return finalList;
    }

    viewFullPost() {
        ReactDOM.render(<FullPost ogSearchItem={this.props.ogSearchItem} foodItem={this.props.foodItem} userLoggedIn={this.props.userLoggedIn}/>, document.getElementById('root'));
    }

    render() {
        return(
            <div className="food-item-container">
                <div className="food-title-container">
                    <h1 className="food-title">{this.props.foodItem.recipe.label}</h1>
                </div>

                <div className="time-container">
                    <img  className="time-image" src={clockImg} alt="clock-icon"/>
                    <p>{this.props.foodItem.recipe.totalTime} mins</p>
                </div>
                
                <div className="calorie-fat-container">
                    <p className="cal-label">Calories: {Math.round(this.props.foodItem.recipe.calories / this.props.foodItem.recipe.yield)}</p>
                    <p className="fat-label">Fat: {Math.round(this.props.foodItem.recipe.totalNutrients.FAT.quantity / this.props.foodItem.recipe.yield)}g</p>
                    <p className="ps-label">per serving</p>
                </div>
    
                <div className="image-container">
                    <img src={this.props.foodItem.recipe.image} 
                        alt="food image here"
                        className="food-image"></img>
                </div>
    
                <div className="ingredients-container">
                    <h4>Ingredients:</h4>
                    <ul>
                        {this.ingredientList()}
                    </ul>
                </div>
    
                <div className="click-here-link">
                    <button className="view-full-button"onClick={this.viewFullPost}>View Full Food Post</button>
                    <a className="recipe-link" href={this.props.foodItem.recipe.url}
                        target="_blank">Click Here for Full Recipe!</a>
                </div>

                <div className="like-dislike-preview">
                    <img className="like-preview"src={likeButton} alt="like-button"/>
                    <p className="num-like-preview">{this.getFoodLikes()}</p>

                    <img className="dislike-preview" src={dislikeButton} alt="dislike-button"/>
                    <p className="num-dislike-preview">{this.getFoodDislikes()}</p>
                </div>
    
                <div className="health-label-container">
                    <ul className="health-ul">
                        {this.props.foodItem.recipe.healthLabels.map(h => {
                            return <li className="health-list-item"><img className="check-image"src={checkMark} alt="check"/>
                                        <strong>{h}</strong></li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default FoodBlurb;