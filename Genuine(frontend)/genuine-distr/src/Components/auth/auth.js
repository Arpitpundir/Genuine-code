import React, {useContext} from "react"
import SignupForm from "./../FormsContainer/DistrSignupFormContainer"
import LoginForm from "./../FormsContainer/DistrLoginFormContainer"
import AuthContext from "./../../context/authContext"

const Auth = (props) => {
  let auth = useContext(AuthContext)
  if(auth.formType == "login"){
    return <LoginForm/>
  }else{
    return <SignupForm/>
  }
}

export default Auth