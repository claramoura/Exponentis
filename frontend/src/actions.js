import axios from 'axios';

export const signIn = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'signIn/request'
    })
    
    const { data } = await axios.post(
      '/api/user/signin',
      { 'username': username, 'password': password }
    )

    dispatch({
      type: 'signIn/success',
      payload: data
    })
    
    localStorage.setItem('userData', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: 'signIn/fail',
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


export const signOut = () => (dispatch) => {
  localStorage.removeItem('userData')
  dispatch({ type: 'signOut' })
}


export const signUp = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'signUp/request'
    })

    const { data } = await axios.post(
      '/api/user/signup',
      { 'username': username, 'password': password },
    )

    dispatch({
      type: 'signUp/success',
      payload: data
    })

    dispatch({
      type: 'signIn/success',
      payload: data
    })

    localStorage.setItem('userData', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: 'signUp/fail',
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


export const submitPractice = (practiceId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'submitPractice/request'
    })

    const user = getState().signInReducer.user

    const config = {
      headers: {
        Authorization: `Bearer ${user.token.access}`,
      }
    }

    const { data } = await axios.put(
      '/api/user/submissions',
      { 'submission': practiceId },
      config,
    )

    dispatch({
      type: 'submitPractice/success',
      payload: data
    })

    // Updates only the user's progress -- tokens, username, and id remain the same.
    const userData = {...JSON.parse(localStorage['userData']), ...data}
  
    localStorage.setItem('userData', JSON.stringify(userData))

    dispatch({
      type: 'signIn/success',
      payload: userData
    })
    
  } catch (error) {
    dispatch({
      type: 'submitPractice/fail',
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


export const checkAnswerButton = (feedback) => (dispatch) => {
  
  if (feedback === 'reset') {
    dispatch({
      type: 'resetButton'
    })
  
  } else if (feedback === 'correct') {
    dispatch({
      type: 'correctAnswer'
    })
  
  } else if (feedback === 'incorrect') {
    dispatch({
      type: 'incorrectAnswer'
    })

  }
}


export const addModel = (modelName, modelData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'addModel/request'
    })

    const user = getState().signInReducer.user

    if (modelName === 'image') {
      
      const config = {
        headers: {
          Authorization: `Bearer ${user.token.access}`,
          'Content-Type': 'multipart/form-data',
        }
      }
  
      const { data } = await axios.post(
        `/api/${modelName}s`,
        modelData,
        config,
      )
  
      dispatch({
        type: 'addModel/success',
        payload: data
      })

    } else {
      
      const config = {
        headers: {
          Authorization: `Bearer ${user.token.access}`,
        }
      }
  
      const { data } = await axios.post(
        `/api/${modelName}s`,
        modelData,
        config,
      )
  
      dispatch({
        type: 'addModel/success',
        payload: data
      })
    }
    
  } catch (error) {
    dispatch({
      type: 'addModel/fail',
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


export const editModel = (modelName, modelId, modelData) => async (dispatch, getState) => {
  try {
    
    dispatch({
      type: 'editModel/request'
    })

    const user = getState().signInReducer.user

    if (modelName === 'image') {
      
      const config = {
        headers: {
          Authorization: `Bearer ${user.token.access}`,
          'Content-Type': 'multipart/form-data',
        }
      }
  
      const { data } = await axios.put(
        `/api/${modelName}/${modelId}`,
        modelData,
        config,
      )
  
      dispatch({
        type: 'editModel/success',
        payload: data
      })

    } else {
      
      const config = {
        headers: {
          Authorization: `Bearer ${user.token.access}`,
        }
      }
  
      const { data } = await axios.put(
        `/api/${modelName}/${modelId}`,
        modelData,
        config,
      )
  
      dispatch({
        type: 'editModel/success',
        payload: data
      })
    }
    
  } catch (error) {
    dispatch({
      type: 'editModel/fail',
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


export const deleteModel = (modelName, modelId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'deleteModel/request'
    })

    const user = getState().signInReducer.user

    const config = {
      headers: {
        Authorization: `Bearer ${user.token.access}`,
      }
    }

    await axios.delete(
      `/api/${modelName}/${modelId}`,
      config,
    )

    dispatch({
      type: 'deleteModel/success'
    })
    
  } catch (error) {
    dispatch({
      type: 'deleteModel/fail',
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}