// Thunk is a middle ware which is used  specifically used to create Action creator
// (Async Action creator) which can return  a fucntion and that function
// recieves a dispatch method throgh which we can dispatch our normal actions

const redux = require('redux');
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleWare = require('redux-thunk').default
const axios = require ('axios');
const { default: thunk } = require('redux-thunk');

const initialState = {
  loading: "false",
  user: [],
  error: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSucess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialState , action) => {
   switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading : true
            }
        case FETCH_USERS_SUCCESS:
            return{
                loading : false,
                users :action.payload,
                error : ''
            }
        case FETCH_USERS_FAILURE:
            return{
                loading : false,
                users : [],
                error : action.payload
            }
   }
}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response =>{
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSucess(users))
        })
        .catch(error => {
            dispatch(fetchUsersFailure(error))
        })
    }
}

const store = createStore(reducer , applyMiddleware(thunkMiddleWare))
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())


