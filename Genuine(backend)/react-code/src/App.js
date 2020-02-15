import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import AppBar from "./../src/components/header/appBar";
import Sidebar from "./../src/containers/sidebarContainer";
import Auth from "./../src/containers/Auth/Auth";
import MainSection2 from "./../src/containers/mainSection2";
import MainSection3 from "./../src/containers/mainSection3";
import MainSection4 from "./../src/containers/mainSection4";
import MainSection5 from "./../src/containers/mainSection5";
import MainSection6 from "./../src/containers/mainSection6";
import MainSection7 from "./../src/containers/mainSection7";

const styles = {
  mainHeader: {
      height: "14%"
  },
  sideBar: {
      height: "96%",
      width: "20%"
  },
  initialSettings: {
      width: "100%",
      height: "100%"
  },
  mainSection: {
      width: "80%",
      height: "100%"
  }
};

class App extends Component{
    state = {
      type: 1,
      data: null,
      mfId: null,
      catgId: null
    };

    changeMainSection = (type, data, mfId, catgId) => {
      console.log(type, mfId)
        this.setState({type, data, mfId, catgId});
        console.log(this.state.mfId);
    };

    render(){
        const { classes } = this.props;
        var mainSection = null;
        if(this.state.type == 1){
          mainSection = (<Auth changeMainSection = {this.changeMainSection} mainSectionData = {this.state.data} mfId = {this.state.mfId}></Auth>)
        }else if(this.state.type == 2){
          mainSection = (<MainSection2 changeMainSection = {this.changeMainSection} mainSectionData = {this.state.data} mfId = {this.state.mfId}></MainSection2>)
        }else if(this.state.type == 3){
          mainSection = (<MainSection3 changeMainSection = {this.changeMainSection} mainSectionData = {this.state.data} mfId = {this.state.mfId}></MainSection3>)
        }else if(this.state.type == 4){
          mainSection = (<MainSection4 changeMainSection = {this.changeMainSection} mainSectionData = {this.state.data} mfId = {this.state.mfId}></MainSection4>)
        }else if(this.state.type == 5){
          mainSection = (<MainSection5 changeMainSection = {this.changeMainSection} mainSectionData = {this.state.data} mfId = {this.state.mfId} catg = {this.state.catgId}></MainSection5>)
        }else if(this.state.type == 6){
          mainSection = (<MainSection6 changeMainSection = {this.changeMainSection} mainSectionData = {this.state.data} mfId = {this.state.mfId} catg = {this.state.catgId}></MainSection6>)
        }else if(this.state.type == 7){
          mainSection = (<MainSection7 changeMainSection = {this.changeMainSection} mainSectionData = {this.state.data} mfId = {this.state.mfId}></MainSection7>)
        }
    return (
        <Grid container  className = {classes.initialSettings} spacing = {0}>
            <Grid item xs={12} className = {classes.mainHeader}>
                <AppBar></AppBar>
            </Grid>
            <Grid item className = {classes.sideBar}>
                <Sidebar changeMainSection = {this.changeMainSection} mainSectionData = {this.state.data} mfId = {this.state.mfId}></Sidebar>
            </Grid>
            <Grid item className = {classes.mainSection}>
                {mainSection}
            </Grid>
        </Grid>
    );
  }
}

export default withStyles(styles)(App);
