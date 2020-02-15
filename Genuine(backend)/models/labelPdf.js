const mongoose  = require("mongoose");
const validator  = require( "validator");
const Label = require("./label");

const lPdfScheema = mongoose.Schema({
  d:{
    type: Date,
  },
  l:{
    type: [Label]
  }
});

const LPdf = mongoose.model("Lpdf", lPdfScheema);

module.exports = Lpdf;
