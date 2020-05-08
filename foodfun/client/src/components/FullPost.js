import React, {Component} from 'react';
import '.././stylesheets/FullPost.css';
import tempIMG from '.././images/foodfun_bg.jpg';
import clockImg from '.././images/clock.png';
import checkMark from ".././images/checkmark.png"
import likeButton from ".././images/likeButton.jpg";
import dislikeButton from ".././images/dislikeButton.jpg";
import backButton from ".././images/backButton.png";
import App from ".././App";
import ReactDOM from 'react-dom';


class FullPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likes: 0,
            dislikes: 0,
            comments: []
        }

        this.ingredientList = this.ingredientList.bind(this);
        this.healthLabelList = this.healthLabelList.bind(this);
        this.onChangeLikes = this.onChangeLikes.bind(this);
        this.onChangeDislikes = this.onChangeDislikes.bind(this);
        this.onChangeComments = this.onChangeComments.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    onChangeLikes() {

    }

    onChangeDislikes() {

    }

    onChangeComments() {

    }

    ingredientList() {
        var finalList = [];
        this.props.foodItem.recipe.ingredientLines.map(ing => {
             finalList.push(<li>{ing}</li>)
        });
        return finalList;
    }

    healthLabelList() {
        var finalList = [];
        this.props.foodItem.recipe.healthLabels.map(h => {
            finalList.push(<li className="health-list-item"><img className="check-image"src={checkMark} alt="check"/>
                        <strong>{h}</strong></li>)
        });
        return finalList;
    }

    goBack() {
        ReactDOM.render(<App foodItem={this.props.foodItem}/>, document.getElementById('root'));
    }

    render() {
        return(
            <div>
                <div className="food-fun-header">
                    <h1 className="food-fun-title">FoodFun</h1>
                    <h3 className="food-fun-description">Discover, Share, and Review new Recipes!</h3>
                </div>

                <div className="full-post-body">
                    <h2>{this.props.foodItem.recipe.label}</h2>
                    <img className="fp-image"src={this.props.foodItem.recipe.image} alt="food img here"></img>

                    <div className="fp-like-container">
                        <img className="fp-like" src={likeButton} alt="like" onClick={this.onChangeLikes}></img>
                        <img className="fp-dislike" src={dislikeButton} alt="dislike" onClick={this.onChangeDislikes}></img>

                        <p className="numLikes">{this.state.likes}</p>
                        <p className="numDislikes">{this.state.dislikes}</p>
                    </div>

                    <div className="fp-time-container">
                        <img  className="fp-time-image" src={clockImg} alt="clock-icon"/>
                        <p className="fp-time-label"><strong>{this.props.foodItem.recipe.totalTime} mins</strong></p>
                    </div>

                    <div className="fp-cal-fat-info">
                        <p className="fp-cal-label"><strong>Calories: {Math.round(this.props.foodItem.recipe.calories / this.props.foodItem.recipe.yield)}</strong></p>
                        <p className="fp-fat-label"><strong>Fat: {Math.round(this.props.foodItem.recipe.totalNutrients.FAT.quantity / this.props.foodItem.recipe.yield)}g</strong></p>
                        <p className="fp-ps-label"><strong>per serving</strong></p>
                    </div>

                    <div className="fp-health-label-container">
                        <ul className="fp-health-ul">
                            {this.healthLabelList()}
                        </ul>
                    </div>

                    <div className="fp-ingredient-list">
                        <h3>Ingredients: </h3>
                        <ul className="fp-health-ul">
                            {this.ingredientList()}
                        </ul>
                    </div>

                    <div className="fp-click-here-link">
                        <a className="fp-recipe-link" href={this.props.foodItem.recipe.url}
                            target="_blank">Click Here for Full Recipe!</a>
                    </div>

                    <img className="back-button"src={backButton} alt="go back" onClick={this.goBack}></img>

                    <div className="fp-comments-container">
                        <h3>Comments:</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default FullPost;