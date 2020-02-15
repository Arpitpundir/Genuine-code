import React from "react"

const AuthContext = React.createContext({
  isAuthenticated: false,
  manfId: null,
  token: null,
  formType: null,
  authHandler: ()=>{}
})

export default AuthContext