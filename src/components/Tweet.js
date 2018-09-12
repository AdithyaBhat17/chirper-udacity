import React from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { handleToggleTweet } from '../actions/tweets'

import {TiArrowBackOutline} from 'react-icons/ti'
import {TiHeartOutline} from 'react-icons/ti'
import {TiHeartFullOutline} from 'react-icons/ti'

class Tweet extends React.Component{
    handleLike = (e) => {
        e.preventDefault()
        
        const {dispatch,tweet,authedUser} = this.props

        dispatch(handleToggleTweet({
            id : tweet.id,
            authedUser,
            hasLiked : tweet.hasLiked
        }))
    }
    toParent = (e,id) => {
        e.preventDefault()
        //todo : redirect to parent tweet.
    }

    render(){
        const {tweet} = this.props
        if(tweet === null)
            return (
                <p>This tweet doesnt exist</p>
            )

        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
        } = tweet
        return (          
            <div className="tweet">
                <img 
                src={avatar} 
                alt={'Avatar of ${name}'}
                className="avatar"/>
                <div className="tweet-info">
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {
                            parent && (
                                <button className="replying-to" onClick={(e) => this.toParent(e,parent.id)}>
                                    Replying to @{parent.author}
                                </button>
                            )
                        }
                        <p>{text}</p>
                    </div>
                    <div className="tweet-icons">
                        <TiArrowBackOutline className="tweet-icon"/>
                        <span>{replies !== 0 && replies}</span>
                        <button className="heart-button" onClick={this.handleLike}>
                            {hasLiked === true ?
                            <TiHeartFullOutline color="#e0245e" className="tweet-icon"/>
                            : <TiHeartOutline className="tweet-icon" />
                            }
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>                    
                </div>
            </div>

        )
    }
}
//props as second argument
// mapStateToProps accepts two arguments:

// the state of the store
// the props passed to the Tweet component

// We're destructuring both arguments. From the store, we're extracting:

// the authedUser data
// the users data
// the tweets data

function mapStateToProps({authedUser, tweets, users}, {id}){
    const tweet = tweets[id]
    //parent tweet to check if the tweet is a response to another
    //tweets at an individual id

    //what if the tweet that is being replied to doesnt exist?
    const parentTweet =  tweet ? tweets[tweet.replyingTo] : null
    return {
        authedUser,
        tweet : tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    }
}

export default connect(mapStateToProps)(Tweet)