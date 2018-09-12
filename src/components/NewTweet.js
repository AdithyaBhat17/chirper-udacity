import React from 'react'
import { handleAddTweet } from '../actions/tweets';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class NewTweet extends React.Component{
    state = {
        text : '',
        toHome: false
    }

    handleChange = (e) => {
        const text = e.target.value
        this.setState(() => ({
            text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { text } = this.state
        const { dispatch, id } = this.props
        dispatch(handleAddTweet(text, id)) 
        // console.log('new tweet :',this.state.text)
        this.setState(() => ({
            text : '',
            toHome : id ? false : true
        }))
    }

    render(){
        const { text, toHome } = this.state
        if(toHome === true){
            return <Redirect to='/' />
        }
        const tweetLength = 280 - text.length
        return(
            <div className="container">
                <h3 className="center">Compose new tweet</h3>
                <form className="new-tweet" onSubmit={this.handleSubmit}>
                    <textarea 
                    className="textarea"
                    placeholder="What's happening?"
                    value={text}
                    maxLength={280}
                    onChange = {this.handleChange}
                    />
                    {tweetLength <= 100 && (
                        <div className="tweet-length">
                            {tweetLength}
                        </div>
                    )}
                    <button
                    className="btn"
                    type="submit"
                    disabled={text === ''}>
                        Submit
                    </button>
                </form>
            </div>            
        )
    }
}

export default connect()(NewTweet)