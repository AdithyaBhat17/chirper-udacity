import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

// Redux applications have a single store. We have to pass the Root Reducer to our createStore() function 
// in order for the store to know what pieces of state it should have. The point of creating a store is to allow components 
// to be able to access it without having to pass the data down through multiple components.

const store = createStore(reducer, middleware)


// The Provider component (which comes from the react-redux package) makes it possible for all components to access 
// the store via the connect() function.

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)