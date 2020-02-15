import React, { Component } from "react";
import CenterFlexbox from "../Flexbox/centerFlexbox";
import { axiosInstance } from "../../hocs/AxiosInstance";
import AuthContext from "../../context/authContext";
import VertFlexbox from "../Flexbox/vertFlexbox";
import Profile from "../Profile/profile";
import DistrTable from "./distrTable";
import SecHeader from "../secHeader/secHeader";
import Aux from "../../hocs/Aux";
import styles from "./prodCont.module.scss";
import LabelTable from "./labelTable";
import Spinner from "../UI/Spinner/spinner";
import jsPDF from 'jspdf';

export default class ProductCont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: null,
      productsInfo: null
    };
  }

  static contextType = AuthContext;

  componentDidMount() {
    axiosInstance({
      url: `/manf/${this.context.manfId}/catg/${this.props.location.state.data.catgId}/product/${this.props.location.state.data.productId}`, //${this.props.location.state.manfId}`,
      method: "GET",
      withCredentials: true
    }).then(res => {
      console.log(res.data)
      this.setState({
        profileInfo: res.data.profile,
        distrInfo: res.data.distr
      });
    });
  }

  generateLabels = (labelInfo) => {
    console.log(labelInfo)
    axiosInstance({
      url: `/manf/${this.context.manfId}/catg/${this.props.location.state.data.catgId}/product/${this.props.location.state.data.productId}`,
      method: "POST",
      data: labelInfo,
      withCredentials: true
    }).then(res => {

      let doc = new jsPDF()
      let codes = res.data.labels
      console.log(res.data)
      /*labelCodes.forEach(labelCode => {
        labels.text(10, 10, labelCode);
        labels.addImage(this.state.profileInfo.qr, 'PNG', 10, 30, 150, 76);
        //console.log(this.profileInfo.qr)
        console.log(labelCode)
      })*/

      var columns = columns || 9;
      var scale = scale || 0.9;
      var paper_width = paper_width || 210.0;
      var paper_height = paper_height || 297.0;
      var margin_left = margin_left || 10.0;
      var margin_top = margin_top || 10.0;
      //initial setting for the page
      var ratio = 8.0/parseFloat(columns);
      var x_0 = 3.125*ratio, y_0 = 3.125*ratio, dx = 6.25*ratio, dy = 6.25*ratio, qr_width = 20.0*ratio;
      var code_margin_top = 5.15*ratio, code_margin_between = 1.0*ratio;
      var font_size_1 = 8.0*ratio, 
          font_size_2 = 8.0*ratio;    

      x_0*=scale;
      y_0*=scale;
      dx*=scale;
      dy*=scale;
      qr_width*=scale;
      code_margin_top*=scale;
      code_margin_between*=scale;
      font_size_1*=scale;
      font_size_2*=scale;

      var options = {
        render      : "canvas",
        width       : qr_width,
        height      : qr_width,
        typeNumber  : -1,
                    background      : "#ffffff",
                    foreground      : "#000000"
    };


      x_0 += margin_left;
      y_0 += margin_top;
      //setting starting x and y coordinate

      var codes_per_page = columns*columns;


      for(var k = 0; k < codes.length; k++){
        var code_name = codes[k];

        if(k != 0 && k%codes_per_page == 0){
            doc.addPage();
        }

        if(k%codes_per_page == 0){
            for(var i = 0; i < columns+1; i++){
                doc.setDrawColor(200,200,200); // draw red lines
                doc.setLineWidth(0.2);
                doc.line(margin_left + scale*paper_width/columns*i, margin_top, margin_left + scale*paper_width/columns*i, margin_top + scale*paper_height); // vertical line
            }
            for(var i = 0; i < columns+1; i++){
                doc.setDrawColor(200,200,200); // draw red lines
                doc.setLineWidth(0.2);
                doc.line(margin_left, margin_top + scale*paper_height/columns*i, margin_left + scale*paper_width, margin_top + scale*paper_height/columns*i); // horizontal line
            }
        }

        var x   = x_0 + (k%columns)*(options.width+dx)
        var y_1 = y_0 + ((k%codes_per_page-k%columns)/columns)*(options.height+code_margin_top+code_margin_between+(parseFloat(font_size_1)+parseFloat(font_size_2))/17.0*4.0+dy)
  
        // create the qrcode itself
        //var qrcode  = new QRCode(options.typeNumber, options.correctLevel);
        //qrcode.addData(code_name);
        //qrcode.make();

        // compute tileW/tileH based on options.width/options.height
        //var tileW   = options.width  / qrcode.getModuleCount();
        //var tileH   = options.height / qrcode.getModuleCount();

        // draw in the canvas
        //var black_line = 0;
        //doc.setDrawColor(0);
        ///doc.setFillColor(0,0,0);

        /*for( var row = 0; row < qrcode.getModuleCount(); row++ ){
            black_line = 0;
            for( var col = 0; col < qrcode.getModuleCount(); col++ ){
                //QR CODE (v3) using SQUARES OPTIMIZED
                if(qrcode.isDark(row, col)){
                    black_line = black_line+1;
                    if(col == qrcode.getModuleCount()-1){
                        doc.rect(x + tileW*(col-black_line+1), y_1 + tileH*row, tileW*black_line, tileH, 'F'); 
                    }
                } else {
                    if(black_line != 0){
                        doc.rect(x + tileW*(col-black_line), y_1 + tileH*row, tileW*black_line, tileH, 'F'); 
                        black_line = 0;
                    }
                }
            }   
        }*/
        doc.addImage(this.state.profileInfo.qr, 'PNG', x, y_1, qr_width, qr_width);

        //var code_name_post = code_name.substring(16,32);

        var y_text_line_1 = y_1 + options.height + parseFloat(font_size_1)/17.0*4.0 + code_margin_top;
        //var y_text_line_2 = y_text_line_1 + parseFloat(font_size_2)/17.0*4.0 + code_margin_between;

        doc.setFontSize(font_size_1);
        doc.text(x, y_text_line_1, code_name);
        //doc.setFontSize(font_size_2);
        //doc.text(x, y_text_line_2, code_name_post);
    }

    doc.output('save', 'qr_codes.pdf');
      
    })
  }

  render() {
    let labelTableKeys = [],
      labelTableData = [];
    let labelTable;
    if (this.state.distrInfo) {
      labelTableKeys.push("Distr Name");
      labelTableKeys.push("Date");
      labelTableKeys.push("No. of Labels");
      labelTableKeys.push("State");
      labelTableKeys.push("City");
      labelTableKeys.push("Status");

      this.state.distrInfo.forEach(distr => {

        let rows = distr.labels.map(labelInfo => {
          let tempRow = {
            date: null,
            distrId: null,
            distrName: null,
            no: null,
            state: null,
            city: null,
            status: null
          }; //I need to declare this object because I want fields in certain order
          tempRow.distrName = distr.profile.name;
          tempRow.date = labelInfo.sdate;
          tempRow.no = labelInfo.no;
          tempRow.state = labelInfo.location.state;
          tempRow.city = labelInfo.location.city;
          tempRow.statusManf = labelInfo.status;
          console.log(tempRow);
          return tempRow;
        });
        labelTableData = labelTableData.concat(rows);
      });
      labelTable = (
        <LabelTable
          labelTableKeys={labelTableKeys}
          labelTableData={labelTableData}
          labelsGenerateHandler = {this.generateLabels}
        ></LabelTable>
      );
    }
    console.log(labelTableKeys);
    console.log(labelTableData);
    return (
      <CenterFlexbox>
        {this.state.profileInfo ? (
          <Aux>
            <SecHeader>
              <div>Product - {this.state.profileInfo.name}</div>
            </SecHeader>
            <VertFlexbox>
              <Profile
                productName={this.state.profileInfo.name}
                price={this.state.profileInfo.price}
                title={this.state.profileInfo.title}
                desc={this.state.profileInfo.desc}
                status={this.state.profileInfo.status}
                qr={this.state.profileInfo.qr}
                id={this.state.profileInfo._id}
                manfDate={this.state.profileInfo.manfDate}
                expDate={this.state.profileInfo.expDate}
                createdOn={this.state.profileInfo.crtOn}
              />
            </VertFlexbox>
          </Aux>
        ) : (
          <Spinner />
        )}
        <VertFlexbox>
          {this.state.distrsInfo ? (
            <Aux>
              <SecHeader classes={["GreyHeader"]}>
                <div>Products in business</div>
              </SecHeader>
              <DistrTable
                distrs={this.state.distrInfo}
                match={this.props.match}
              ></DistrTable>
            </Aux>
          ) : (
            <Spinner />
          )}
        </VertFlexbox>
        {this.state.distrInfo ? labelTable : <Spinner />}
      </CenterFlexbox>
    );
  }
}
