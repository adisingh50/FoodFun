import React, {useState} from 'react';
import '.././stylesheets/FoodBlurb.css';

const FoodBlurb = (props) => {
    const getCalories = () => {
        var cal = props.foodItem.recipe.calories;

    }

    const getIngredients = () => {
        var ingArr = props.foodItem.recipe.ingredientLines;
        ingArr.map(ing => {
            return <li>{ing}</li>
        });
    }

    const getHealthLabels = () => {
        var healthList = props.foodItem.recipe.healthLabels;
        healthList.map(h => {
            return <li className="health-list-item">{h}</li>
        })
    }

    return(
        <div className="food-item-container">
            <h1 className="food-title">{props.foodItem.recipe.label}</h1>

            <div className="calorie-fat-container">
                <p>Calories: {getCalories()}</p>
                <p>Fat: {props.foodItem.recipe.totalNutrients.FAT}g</p>
            </div>

            <div className="image-container">
                <img src={props.foodItem.recipe.image} 
                    alt="food image here"
                    className="food-image"></img>
            </div>

            <div className="ingredients-container">
                <h4>Ingredients:</h4>
                <ul>
                    {getIngredients()}
                </ul>
            </div>

            <div className="click-here-link">
                <a href={props.foodItem.recipe.url}
                    target="_blank">Click Here for Full Recipe!</a>
            </div>

            <div className="health-label-container">
                <ul>
                    {getHealthLabels()}
                </ul>
            </div>
        </div>
    )
}

export default FoodBlurb;