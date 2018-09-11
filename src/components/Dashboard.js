import React from 'react'
import { connect } from 'react-redux'

class Dashboard extends React.Component{
    render(){
        console.log(this.props)
        return(            
            <div>
                <h3 className="center">Your Timeline</h3>
                <ul className="dashboard-list">
                    {this.props.tweetIds.map((id) => (
                        <li key={id}>
                            Tweet ID : {id}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

// Remember that the signature of the mapStateToProps function is:

// mapStateToProps(state, [ownProps])
// state is the state inside the store
// ownProps are the properties that have been passed to this component from a parent component
// Since we only care about the tweets part of the store, we can use destructuring to pass the 
// tweets part of the state in the store as the parameter to the mapStateToProps() function.

// The important things to note are that:

// tweets is the slice of the state that this component cares about
// tweetIds will show up as a property on this container

function mapStateToProps({tweets}){
    return{
        tweetIds: Object.keys(tweets)
        .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)

