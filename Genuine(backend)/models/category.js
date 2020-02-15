const mongoose = require('mongoose');
const validator = require('validator');
//const Prd = require("./product");

const lScheema = new mongoose.Schema({
  otp:{
    type: String,
  },
  vld:{
    type: Boolean,
    defualt: true
  }
});

const lPdfScheema = new mongoose.Schema({
  d:{
    type: Date,
  },
  l:{
    type: [lScheema]
  }
});
const prodSchema = new mongoose.Schema({
	n: {
		type: String,
		required: [ true, 'Name your category!' ]
	},
	tit:{
		type: String
	},
	mfgD:{
    type: String
	},
	expD:{
		type: String
	},
	crtD:{
		type: Date
	},
	prc:{
		type: Number
	},
	wrnty:{
		type: Number
	},
	wrntyInfo:{
		type: String
	},
	status:{
		type: String
	},
  pdf:{
    type: [lPdfScheema]
  }
});

const catgSchema = new mongoose.Schema({
	n: {
		type: String,
		required: [ true, 'Name your category!' ]
	},
	pht: {
		type: String,
		default: 'default.jpg'
  },
  prd: {
		type: [prodSchema]
	},
	mfId:{
		type: String,
	}
});

const Catg = mongoose.model("Catg", catgSchema);
module.exports = Catg;