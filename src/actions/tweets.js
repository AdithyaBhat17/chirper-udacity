import { saveLikeToggle ,saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const ADD_TWEET = 'ADD_TWEET'

function addTweet(tweet){
    return {
        type : ADD_TWEET,
        tweet
    }
}

export function receiveTweets(tweets){
    return { 
        type: RECEIVE_TWEETS,
        tweets
    }
}

function toggleTweet({id, authedUser, hasLiked}){
    return {
        type : TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

export function handleAddTweet(text, replyingTo){
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveTweet({
            text,
            author : authedUser,
            replyingTo
        })
        .then((tweet) => dispatch(addTweet(tweet)))
        .then(dispatch(hideLoading()))
    }
}

//async action creator to handle toggle of tweet from the database.
export function handleToggleTweet(info){
    return(dispatch) => {
        dispatch(toggleTweet(info))

        return saveLikeToggle(info)
        .catch((e) =>{
            console.warn("error in handling toggle tweet",e)
            dispatch(toggleTweet(info))
            alert('error Liking tweet, try again')
        })
    }
}