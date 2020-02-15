const mongoose  = require("mongoose");
const validator = require("validator");
const shortId = require("shortid")

const lScheema = mongoose.Schema({
  _id: {
    'type': String,
    'default': shortId.generate
  },
  vld:{
    type: Boolean,
    defualt: true
  }
})

const Label = mongoose.model("Lablel", lScheema);
module.exports = Label;