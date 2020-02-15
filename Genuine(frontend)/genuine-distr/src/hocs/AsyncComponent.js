import React, {Component} from "react"

const AsyncComponent = (importComponent) => {
  return class extends Component{
    state = {
      component: null
    }
    componentDidMount(){
      importComponent().then(cmp => {
        this.setState({
          component: cmp.default
        })
      })
    }
    render(){
      const C = this.state.component
      if(C){
        return <C {...this.props}/>
      }
      return(
        null
      )
    }
  }
}