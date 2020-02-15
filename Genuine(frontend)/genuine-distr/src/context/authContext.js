import React from "react"

const AuthContext = React.createContext({
  isAuthenticated: false,
  distrId: null,
  token: null,
  formType: null,
  authHandler: ()=>{}
})

export default AuthContext