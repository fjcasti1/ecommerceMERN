import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';
import axios from 'axios';

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      name,
      email,
      password,
    };

    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });

    localStorage.setItem('userInfo', JSON.stringify(res.data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      email,
      password,
    };

    const res = await axios.post('/api/users/login', body, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });

    localStorage.setItem('userInfo', JSON.stringify(res.data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};
