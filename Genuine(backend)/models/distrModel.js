const mongoose = require ("mongoose")

const distrSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true
  },
  phNo:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notifications: Number,
  requests: [{
    _id: String,
    name: String,
    phNo: String,
    address: String,
    email: String,
    adate: String
  }],
  partners:[{
    _id: false,
    newLabelReq:{
      type: Number,
      default: 0
    },
    profile:{
      _id: String,
      name: String,
      phNo: String,
      address: String,
      email: String,
      sdate: String
    },
    products:[{
      _id: false,
      profile:{
        _id: String,
        name: String,
        price: String,
        category: String,
        sdate: String,
        catgId: String
      },
      labels:[{
        sdate: String,
        no: Number,
        location: {
          state: String,
          city: String
        },
        status: String,
        gDate: String
      }
    ]
    }]
  }]
})

const Distr = mongoose.model("Distr", distrSchema)

module.exports =  Distr