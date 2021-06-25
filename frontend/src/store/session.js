// This file will contain all the actions specific to the session user's information and the session user's Redux reducer.
// Define Action Types as Constants
// Define Action Creators
// Define Thunks
// Define an initial state
// Define a reducer
// Export a reducer
import { csrfFetch } from './csrf';

// Define Action Types as Constants
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// Define Action Creators
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

// remove user
const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// Define Thunks - data returned in Thunks need to be parsed into readable data

// restore user session
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json(); // backend .json. sequelize.findall returns an array
  dispatch(setUser(data.user));
  return response;
};

// login user
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// logout user action
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};


// Define an initial state
const initialState = { user: null };

// Define a reducer
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};


// Export the reducer
export default sessionReducer;
