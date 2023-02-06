import { combineReducers } from "redux";

const dataFromLocalStorage = localStorage.getItem('userData') ?
    JSON.parse(localStorage.getItem('userData')) : null;


const usersInitialState = { user: dataFromLocalStorage }

const signInReducer = (state=usersInitialState, action) => {
  switch (action.type) {
    case 'signIn/request':
      return { loading: true }
      
    case 'signIn/success':
      return { loading: false, success: true, user: action.payload }
      
    case 'signIn/fail':
      return { loading: false, error: action.payload }
    
    case 'signOut':
      return { }

    default:
      return state
  }
}


const signUpReducer = (state={ }, action) => {
  switch (action.type) {
    case 'signUp/request':
      return { loading: true }

    case 'signUp/success':
      return { loading: false, success: true, user: action.payload }

    case 'signUp/fail':
      return { loading: false, error: action.payload }
      
    case 'signOut':
      return { }

    default:
      return state
  }
}


const submitPracticeReducer = (state={}, action) => {
  switch (action.type) {
    case 'submitPractice/request':
      return { loading: true }

    case 'submitPractice/success':
      return { loading: false, success: true, data: action.payload }

    case 'submitPractice/fail':
      return { loading: false, error: action.payload }

    default:
      return state
  }
}


const buttonsInitialState = { feedback: 'Check', variant: 'primary' }

const checkAnswerButtonReducer = (state=buttonsInitialState, action) => {  
  switch (action.type) {    
    case 'correctAnswer':
      return { feedback: 'Correct', variant: 'primary' }

    case 'incorrectAnswer':
      return { feedback: 'Try again', variant: 'warning' }

    case 'resetButton':
      return buttonsInitialState

    default:
      return state
  }
}


// For admin users
const addModelReducer = (state={ }, action) => {
  switch (action.type) {
    case 'addModel/request':
      return { loading: true }
      
    case 'addModel/success':
      return { loading: false, success: true, model: action.payload }
      
    case 'addModel/fail':
      return { loading: false, error: action.payload }

    default:
      return state
  }
}


// For admin users
const editModelReducer = (state={ }, action) => {
  switch (action.type) {
    case 'editModel/request':
      return { loading: true }
      
    case 'editModel/success':
      return { loading: false, success: true, model: action.payload }
      
    case 'editModel/fail':
      return { loading: false, error: action.payload }

    default:
      return state
  }
}


// For admin users
const deleteModelReducer = (state={ }, action) => {
  switch (action.type) {
    case 'deleteModel/request':
      return { loading: true }
      
    case 'deleteModel/success':
      return { loading: false, success: true }
      
    case 'deleteModel/fail':
      return { loading: false, error: action.payload }

    default:
      return state
  }
}


export const reducers = combineReducers({
  signInReducer,
  signUpReducer,
  submitPracticeReducer,
  checkAnswerButtonReducer,
  addModelReducer,
  editModelReducer,
  deleteModelReducer,
})