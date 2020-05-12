import React, {Component} from 'react';
import '.././stylesheets/Comment.css';
import userIcon from '.././images/user.png';
import StarRatingComponent from 'react-star-rating-component';

const Comment = (props) => {
    const formatDate = () => {
        var d = new Date(props.comment.date);
        var stringForm = d.toString();
        var dateFinal = stringForm.substring(0, 15);
        var timeFinal = convertToStandard(stringForm.substring(16, 21));
        return dateFinal + " @ " + timeFinal;
    }

    const convertToStandard = (milHour) => {
        var hour = parseInt(milHour.substring(0,2));
        var AmPm = "AM";

        if (hour === 0) {
            hour += 12;
        } else if (hour === 12) {
            AmPm = "PM";
        } else if (hour > 12) {
            hour -= 12;
            AmPm = "PM";
        }
        return hour.toString() + ":" + milHour.substring(3,5) + AmPm;
    }

    return (
        <div className="comment-container">
            <div className="com-iconContainer">
                <img className="com-userIcon" src={userIcon} alt="user-icon"></img>
            </div>

            <div className="com-textContainer">
                <p className="com-name"><strong>{props.comment.userFirstName} {props.comment.userLastName}</strong></p>
                <StarRatingComponent 
                    className="com-stars"
                    editing={false}
                    starCount={5}
                    starColor="#FF0000"
                    value={props.comment.numStars}
                    />
                <p className="com-date">{formatDate()}</p>
                <p className="com-message">{props.comment.message}</p>
            </div>

            <hr className="hLine"/>
        </div>
    )
}

export default Comment;