import { getInitialData } from '../utils/api'
import { receiveTweets } from './tweets'
import { receiveUsers } from './users'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = "adithya_nr"

//using redux thunk middleware to return a function to request initial data from the api.
export default function handleInitialData(){
    return (dispatch) => {
        dispatch(showLoading())
        //get users & tweets and save them as states in our redux store.
        return getInitialData()
        .then(( { users,tweets } ) => {
            dispatch(receiveTweets(tweets))
            dispatch(receiveUsers(users))
            dispatch(setAuthedUser(AUTHED_ID))
            dispatch(hideLoading())
        })
    }
}