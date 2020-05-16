import React, {Component} from 'react';
import '.././stylesheets/FullPost.css';
import tempIMG from '.././images/foodfun_bg.jpg';
import clockImg from '.././images/clock.png';
import checkMark from ".././images/checkmark.png"
import likeButton from ".././images/likeButton.png";
import dislikeButton from ".././images/dislikeButton.png";
import backButton from ".././images/backButton.png";
import userIcon from '.././images/user.png';
import App from "./App";
import ReactDOM from 'react-dom';
import Comment from './Comment';
import axios from 'axios';
import Cookies from 'js-cookie';
import StarRatingComponent from 'react-star-rating-component';

class FullPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likes: 0,
            dislikes: 0,
            likeSelected: false,
            dislikeSelected: false, 
            comments: [],
            numStars: 0,
            commentText: ''
        }

        this.ingredientList = this.ingredientList.bind(this);
        this.healthLabelList = this.healthLabelList.bind(this);
        this.onChangeLikes = this.onChangeLikes.bind(this);
        this.onChangeDislikes = this.onChangeDislikes.bind(this);
        this.onChangeCommentText = this.onChangeCommentText.bind(this);
        this.onStarClick = this.onStarClick.bind(this);
        this.getComments = this.getComments.bind(this);
        this.addComment = this.addComment.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        const foodNameForRequest = {
            foodName: this.props.foodItem.recipe.label,
            foodCalories: this.props.foodItem.recipe.calories
        }
        axios.post('http://localhost:5000/comment/viewFoodComments', foodNameForRequest)
            .then(res => {
                this.setState({
                    comments: (res.data).reverse()
                });
            })
            .catch(err => console.log("Error: " + err));
            
        const getLikesRequest = {
            foodName: this.props.foodItem.recipe.label,
            foodCalories: this.props.foodItem.recipe.calories
        }

        axios.post('http://localhost:5000/like/viewFoodLikes', getLikesRequest)
            .then(res => {
                if (res.data) {
                    this.setState({
                        likes: res.data.numLikes
                    });
                } else {
                    this.setState({
                        likes: 0
                    });
                }
            })
            .catch(err => console.log("Error: " + err));

        axios.post('http://localhost:5000/dislike/viewFoodDislikes', getLikesRequest) 
            .then(res => {
                if (res.data) {
                    this.setState({
                        dislikes: res.data.numDislikes
                    });
                } else {
                    this.setState({
                        dislikes: 0
                    });
                }
            })
            .catch(err => console.log("Error: " + err));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.comments != this.state.comments) {
            axios.post('http://localhost:5000/comment/viewFoodComments', {foodName: this.props.foodItem.recipe.label, foodCalories: this.props.foodItem.recipe.calories})
                .then(res => {
                    this.setState({
                        comments: (res.data).reverse()
                    });
                })
                .catch(err => console.log("Error: " + err));
        }
    }

    onChangeLikes() {
        //if likes weren't already selected
        if (!this.state.likeSelected) {
            this.setState({
                likeSelected: true
            });
            var likeImgID = document.getElementById("fp-like");
            likeImgID.style.cssText = "border: 1px solid black";

            const removeDislikeRequest = {
                foodName: this.props.foodItem.recipe.label,
                foodCalories: this.props.foodItem.recipe.calories
            }

            if (this.state.dislikeSelected) {
                axios.post('http://localhost:5000/dislike/removeFoodDislike', removeDislikeRequest)
                    .then(res => {
                        var currDislikes = this.state.dislikes;
                        this.setState({
                            dislikes: currDislikes - 1
                        });
                    })
                    .catch(err => console.log("Error: " + err));

                this.setState({
                    dislikeSelected: false
                });
                var dislikeImgID = document.getElementById("fp-dislike");
                dislikeImgID.style.cssText = "";
            }

            const addLikeRequest = {
                foodName: this.props.foodItem.recipe.label,
                foodCalories: this.props.foodItem.recipe.calories,
                userFirstName: Cookies.get("user_firstName"),
                userLastName: Cookies.get("user_lastName"),
                userEmail: Cookies.get("user_email")
            }

            axios.post('http://localhost:5000/like/addFoodLike', addLikeRequest)
                .then(res => {
                    var currLikes = this.state.likes;
                    this.setState({
                        likes: currLikes + 1
                    });
                })
                .catch(err => console.log("Error: " + err));
        } else {
            //if likes were selected
            this.setState({
                likeSelected: false
            });
            var likeImgID = document.getElementById("fp-like");
            likeImgID.style.cssText = "";

            const removeLikeRequest = {
                foodName: this.props.foodItem.recipe.label,
                foodCalories: this.props.foodItem.recipe.calories
            }
            axios.post('http://localhost:5000/like/removeFoodLike', removeLikeRequest)
                .then(res => {
                    var currLikes = this.state.likes;
                    this.setState({
                        likes: currLikes - 1
                    });
                })
                .catch(err => console.log("Error: " + err));
        }
    }

    onChangeDislikes() {
        //if dislikes weren't already selected
        if (!this.state.dislikeSelected) {
            this.setState({
                dislikeSelected: true
            });
            var dislikeImgID = document.getElementById("fp-dislike");
            dislikeImgID.style.cssText = "border: 1px solid black";

            const removeLikeRequest = {
                foodName: this.props.foodItem.recipe.label,
                foodCalories: this.props.foodItem.recipe.calories
            }

            if (this.state.likeSelected) {
                axios.post('http://localhost:5000/like/removeFoodLike', removeLikeRequest)
                    .then(res => {
                        var currLikes = this.state.likes;
                        this.setState({
                            likes: currLikes - 1
                        });
                    })
                    .catch(err => console.log("Error: " + err));
                    
                this.setState({
                    likeSelected: false
                });
                var likeImgID = document.getElementById("fp-like");
                likeImgID.style.cssText = "";
            }

            const addDislikeRequest = {
                foodName: this.props.foodItem.recipe.label,
                foodCalories: this.props.foodItem.recipe.calories,
                userFirstName: Cookies.get("user_firstName"),
                userLastName: Cookies.get("user_lastName"),
                userEmail: Cookies.get("user_email")
            }

            axios.post('http://localhost:5000/dislike/addFoodDislike', addDislikeRequest)
                .then(res => {
                    var currDislikes = this.state.dislikes;
                    this.setState({
                        dislikes: currDislikes + 1
                    });
                })
                .catch(err => console.log("Error: " + err));
        } else {
            //if likes were already selected
            this.setState({
                dislikeSelected: false
            });
            var dislikeImgID = document.getElementById("fp-dislike");
            dislikeImgID.style.cssText = "";

            const removeDislikeRequest = {
                foodName: this.props.foodItem.recipe.label,
                foodCalories: this.props.foodItem.recipe.calories
            }
            axios.post('http://localhost:5000/dislike/removeFoodDislike', removeDislikeRequest)
                .then(res => {
                    var currDislikes = this.state.dislikes;
                    this.setState({
                        dislikes: currDislikes - 1
                    });
                })
                .catch(err => console.log("Error: " + err));
        }
    }

    onChangeCommentText(e) {
        this.setState({
            commentText: e.target.value
        });
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({
            numStars: nextValue
        });
    }

    addComment() {
        if (this.state.commentText.trim() === '') return;
        if (this.state.numStars === 0) return;

        const newComment = {
            userFirstName: Cookies.get("user_firstName"),
            userLastName: Cookies.get("user_lastName"),
            userEmail: Cookies.get("user_email"),
            foodName: this.props.foodItem.recipe.label,
            foodCalories: this.props.foodItem.recipe.calories,
            numStars: this.state.numStars,
            message: this.state.commentText
        }
        
        axios.post('http://localhost:5000/comment/post', newComment)
            .then(res => {
                console.log("comment posted.");
            })
            .catch(err => console.log("Error: " + err));

        this.setState({
            commentText: '',
            numStars: 0
        });
    }

    getComments() {
        var finalCommentList = [];

        this.state.comments.map(comment => {
            finalCommentList.push(<Comment comment={comment}/>);
        });
        return finalCommentList;
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
        ReactDOM.render(<App  ogSearchItem={this.props.ogSearchItem} foodItem={this.props.foodItem} userLoggedIn={this.props.userLoggedIn}/>, document.getElementById('root'));
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
                        <img id="fp-like" className="fp-like" src={likeButton} alt="like" onClick={this.onChangeLikes}></img>
                        <img id="fp-dislike" className="fp-dislike" src={dislikeButton} alt="dislike" onClick={this.onChangeDislikes}></img>

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
                        <br></br>
                    </div>

                    <div className="fp-click-here-link">
                        <a className="fp-recipe-link" href={this.props.foodItem.recipe.url}
                            target="_blank">Click Here for Full Recipe!</a>
                    </div>

                    <img className="back-button"src={backButton} alt="go back" onClick={this.goBack}></img>

                    <div className="fp-comments-container">
                        <h3>Comments:</h3>

                        <div className="comment-container">
                            <div className="fp-iconContainer">
                                <img className="com-userIcon" src={userIcon} alt="user-icon"></img>
                            </div>

                            <div className="fp-textContainer">
                                <p className="fp-name"><strong>{Cookies.get("user_firstName")} {Cookies.get("user_lastName")}</strong></p>
                                <StarRatingComponent 
                                    className="fp-stars" 
                                    starCount={5}
                                    value={this.state.numStars}
                                    onStarClick={this.onStarClick}
                                    starColor="#FF0000"
                                />
                                <textarea className="fp-comment-input" 
                                        maxLength="150"
                                        value={this.state.commentText} 
                                        onChange={this.onChangeCommentText}
                                        placeholder="Type your comment...">
                                        </textarea>
                            </div>

                            <button className="fp-postComment" onClick={this.addComment}>Comment</button>
                            <hr className="hLine"/>
                        </div>

                        {this.getComments()}
                    </div>
                </div>
            </div>
        )
    }
}

export default FullPost;