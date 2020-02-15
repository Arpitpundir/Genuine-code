import * as actionsTypes from "./../actions/actionTypes";
import axios from "axios";
//in here we would first create action creators these will return actions in proper form

export const authStart = () => {
  return {
    type: actionsTypes.AUTH_START
  }; 
};

export const authSuccess = (token, manfId) => {
  return {
    type: actionsTypes.AUTH_SUCCESS,
    idToken: token,
    manfId: userId
  }; 
};

export const authFail = (error) => {
  return {
    type: actionsTypes.AUTH_FAIL,
    error: error
  }; 
};

export const auth = async (email, password, name, address, phone, photo, formType) => {
  return dispatch => {
    //we would need to pass dispatch because we will call action from inside of this '
    //function
    let authData, url = null;
    if(formType == "SignUp"){
      authData = {
        email: email,
        name: name,
        password: password,
        address: address,
        phone: phone,
        photo: photo
      };
      url = 'http://127.0.0.1:3000/api/v1/manufacturer/signup';
    }else{
      authData = {
        email: email,
        password: password
      };
      url = 'http://127.0.0.1:3000/api/v1/manufacturer/login';
    }
    const res = await axios({
      method: 'POST',
      url: url,
      authData
  });
  if(res.data.status == "success"){
    dispatch(authSuccess(res.data.token, res.data.manf._id));
    props.changeMainSection(2, res.data.manf, res.data.manf._id);
  }else{
    console.log(err);
    dispatch(authFail(err));
  }
  }; 
};