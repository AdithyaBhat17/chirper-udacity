import logger from './logger'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export default applyMiddleware(
    thunk,
    logger
)

// source code for thunk middlware

// function createThunkMiddleware(extraArgument) {
//     return ({ dispatch, getState }) => next => action => {
//       if (typeof action === 'function') {
//         return action(dispatch, getState, extraArgument);
//       }
//       return next(action);
//     };
//   }
  
//   const thunk = createThunkMiddleware();
//   thunk.withExtraArgument = createThunkMiddleware;
  
// export default thunk;