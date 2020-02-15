const mongoose = require("mongoose");

const prItemScheema = mongoose.Schema({
  _id:{
    type: Number

  },
  status:{
    type: Boolean,
    default: false
  },
  pid:{
    type: Number
    //many to one relation with product
  }
});

const PrItem = mongoose.model("pItem", prItemScheema);

export default PrItem;