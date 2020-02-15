const handleFactory = require("./handlerFactory")
const manfModel = require("../models/manfModel")
const qrcode = require("qrcode")
const distrModel = require("./../models/distrModel")
const labelModel = require("./../models/label")

exports.login = handleFactory.login(manfModel)
exports.signup = handleFactory.signup(manfModel)
exports.getOne = handleFactory.getOne(manfModel)
exports.logout = handleFactory.logout(manfModel)
exports.isLoggedIn = handleFactory.isLoggedIn(manfModel)

exports.getAllRequests = async(req, res, next) => {
  try{
    const query = manfModel.findById(req.params.manfId).select("requests")
    const data = await query
    res.status(200).json({
      status: "success",
      item: data
    })
    return next()
  }catch(error){
    console.log(error)
  }
}

exports.deleteRequest = async(req, res, next) => {
  try{
    let docs = await manfModel.findById(req.params.manfId).select("requests")
    console.log(docs)
    let requests = docs.requests
    const manfId = req.query.manfId
    const index = requests.findIndex( element => manfId === element.id)
    requests.splice(index, 1)
    await manfModel.findByIdAndUpdate(req.params.manfId, {requests: requests})
    res.status(204).json({
      status: "success"
    })
    return next()
  }catch(error){
    console.log(error)
    return next(error)
  }
}

exports.addPartner = async(req, res, next) => {
  try{
    const docs = await manfModel.findById(req.params.manfId).select("partners")
    let partners = docs.partners
    let newPartner = {}
    newPartner.profile = req.body
    newPartner.products = []
    newPartner.sdate = new Date()

    partners.push(newPartner)
    console.log(partners)
    const items = await manfModel.findByIdAndUpdate(req.params.manfId, {partners: partners})
    console.log(items)
    res.status(200).json({
      status: "success",
      items
    })
  }catch(error){
    console.log(error)
  }
}

exports.getPartner = async (req, res, next) => {
  console.log(req.params)
  const docs = await manfModel.findById(req.params.manfId).select("partners notifications")
  let partners = docs.partners
  let notifications = docs.notifications
  let index = partners.findIndex(element => element.profile._id == req.params.partnerId)
  const items = partners[index]
  console.log(items)
  res.status(200).json({
    status: "success",
    items
  })
  let partner = partners[index]
  let oldReqCount = partner.newLabelReq
  partner.newLabelReq = 0
  notifications -= oldReqCount
  partners[index] = partner
  await manfModel.findByIdAndUpdate(req.params.manfId, {partners: partners, notifications : notifications})
  next()
}

exports.makeLabelRequest = async(req, res, next) => {
  let newLabelReq = req.body
  newLabelReq.sdate = new Date()
  newLabelReq.gdate = new Date()
  newLabelReq.status = "Requested"
  const docs = await manfModel.findById(req.params.manfId).select("partners notifications")
  let partners = docs.partners
  let notifications = docs.notifications
  notifications+=1
  let partnerInd = partners.findIndex(element => element.profile._id == req.params.partnerId)
  let products = partners[partnerInd].products
  let productInd = products.findIndex(element => element.profile._id == req.params.productId)
  partners[partnerInd].products[productInd].labels.push(newLabelReq)
  partners[partnerInd].newLabelReq+=1
  await manfModel.findByIdAndUpdate(req.params.manfId, {partners: partners, notifications: notifications})
  res.status(200).json({
    status: "success"
  })
}

exports.addRequests = async (req, res, next) => {
  let newReq = req.body
  newReq.adate = new Date()
  let docs = await manfModel.findById(req.params.manfId).select("requests")
  let requests = docs.requests
  requests.push(newReq)
  console.log(newReq, requests)
  await manfModel.findByIdAndUpdate(req.params.manfId, {requests: requests})
  res.status(200).json({
    status: "success"
  })
}

exports.getProduct = async (req, res, next) => {
  let docs = await manfModel.findById(req.params.manfId)
  console.log(docs)
  let manf = docs
  const partners = manf.partners
  const partner = partners.find((element) => element.profile._id === req.params.partnerId)
  const products = partner.products
  const product = products.find(element => element.profile._id === req.params.productId)
  res.status(200).json({
    product
  })
}

exports.getManfs = async (req, res, next) => {
  const docs = await manfModel.findById(req.params.manfId).select("partners")
  res.status(200).json({
    manfs: docs.partners
  })
  next()
}

exports.createNewCatg = async(req, res, next) => {
  const docs = await manfModel.findById(req.params.manfId).select("catg")
  const catg = docs.catg
  const newCatg = req.body
  newCatg.createdOn = new Date()
  newCatg.products = [],
  newCatg.prdCount = 0
  catg.push(newCatg)
  await manfModel.findByIdAndUpdate(req.params.manfId, {catg: catg})
  res.status(200).json({
    status: "success"
  })
  next()
}

exports.getAllCatgs = async(req, res, next) => {
  const docs = await manfModel.findById(req.params.manfId).select("catg")
  const catg = docs.catg
  res.status(200).json({
    status: "success",
    catg
  })
  next()
}

exports.getCatgPrd = async (req, res, next) => {
  const docs = await manfModel.findById(req.params.manfId).select("catg")
  const catgs = docs.catg
  const catg = catgs.find(catg => catg._id == req.params.catgId)
  const products = catg.products
  res.status(200).json({
    status: "success",
    products
  })
  next()
}

exports.createNewPrd = async (req, res, next) => {
  let docs = await manfModel.findById(req.params.manfId).select("catg")
  let catgs = docs.catg
  const catgInd = catgs.findIndex(catg => catg._id == req.params.catgId)
  let catg = catgs[catgInd]
  let newPrd = req.body
  if(newPrd.noWrnty){
    newPrd.wrnty = 0
  }
  newPrd.crtOn = new Date()
  newPrd.status = "Active"
  catg.products.push(newPrd)
  catgs[catgInd] = catg 
  docs = await manfModel.findByIdAndUpdate(req.params.manfId, {catg: catgs}, {new: true})
  catgs = docs.catg
  catg = catgs[catgInd]
  newPrd = catg.products[catg.products.length-1]
  const url = `http://localhost:3000/validate/product/${newPrd._id}`
  const qr = await qrcode.toDataURL(url)
  newPrd.image = qr
  catg.products[catg.products.length-1] = newPrd
  catgs[catgInd] = catg 
  await manfModel.findByIdAndUpdate(req.params.manfId, {catg: catgs}, {new: true})
  res.status(200).json({
    status: "success"
  })
  next()
}

exports.getProduct = async (req, res, next) => {
  const docs = await manfModel.findById(req.params.manfId)
  const catgs = docs.catg
  const catg = catgs.find(catg => catg._id == req.params.catgId)
  const products = catg.products
  const product = products.find(product => product._id == req.params.productId)
  const profile = {
    qr: product.image,
    title: product.title,
    name: product.name,
    price: product.price,
    manfDate: product.manfDate,
    expDate: product.expDate,
    warranty: product.warranty,
    desc: product.desc,
    crtOn: product.crtOn
  }
  const distr = product.distr
  res.status(200).json({
    status: "success",
    profile: profile,
    distr: distr
  })
  next()
}

exports.getAllDistr = async (req, res, next) => {
  const docs = await distrModel.find({}).select("_id name email address phNo")
  res.status(200).json({
    status: "success",
    docs
  })
  next()
}

exports.getMyDistr = async (req, res, next) => {
  const docs = await manfModel.findById(req.params.manfId).select("distr")
  if (docs == undefined){
    docs = []
  }
  res.status(200).json({
    status: "success",
    docs
  })
  next()
}

exports.getRequests = async (req, res, next) => {
  const docs = await manfModel.findById(req.params.manfId).select("requests")
  if (docs == undefined){
    docs = []
  }
  res.status(200).json({
    status: "success",
    docs
  })
  next()
}

exports.makeRequest = async(req, res, next) => {
  let distr = req.body
  //adding a new entry to req send by this manf
  const manf = await manfModel.findById(req.params.manfId)
  let requests = manf.requests
  requests.push(distr)
  await manfModel.findByIdAndUpdate(req.params.manfId, {requests: requests})
  //sending a req to the distr
  distr = await distrModel.findById(distr._id).select("requests")
  let reqBody = {}
  reqBody.name = manf.name
  reqBody._id = manf._id
  reqBody.address = manf.address
  reqBody.phNo = manf.phNo
  reqBody.email = manf.email

  requests = distr.requests
  requests.push(reqBody)
  await distrModel.findByIdAndUpdate(distr._id, {requests: requests})
  res.status(200).json({
    status: "success"
  })
  next()
}

exports.distrReqAcceptHandler = async (req, res, next) => {
  console.log("distrAcceptHandler here and I am running.")
  const manf = await manfModel.findById(req.body._id).select("requests distr catg")
  let distrArr = manf.distr
  const distr = await distrModel.findById(req.params.distrId).select("name email phNo _id address")
  distrArr.push({_id:distr._id,
  name: distr.name,
  email: distr.email,
  phNo: distr.phNo,
  address: distr.address})

  let reqArr = manf.requests
  const index = reqArr.findIndex(req => req._id == distr._id)
  reqArr = reqArr.slice(0, index) + reqArr.slice(index+1, reqArr.length)

  let catgs = manf.catg
  catgs = catgs.map(catg => {
    catg.products = catg.products.map(product => {
      let newDistr = {}
      newDistr.profile = {_id:distr._id,
        name: distr.name,
        email: distr.email,
        phNo: distr.phNo,
        address: distr.address}
      product.distr.push(newDistr)
        return product
    })
    console.log("hey I am a catg",catg)
    return catg
  })
  await manfModel.findByIdAndUpdate(req.body._id, {catg: catgs, requests: reqArr, distr: distrArr})
  res.status(200).json({
    status: "success"
  })
  next()
}

exports.addLabelRequest = async(req, res, next) => {

  const manf = await manfModel.findById(req.params.partnerId).select("catg")
  let catgs = manf.catg
  let catgInd = catgs.findIndex(catg => catg._id == req.body.catgId)
  let catg = catgs[catgInd]
  let products = catg.products
  let productInd = products.findIndex(product => product._id == req.params.productId)
  let product = products[productInd]
  let distrs = product.distr
  let distrInd = distrs.findIndex(distr => distr._id == req.params.distrid)
  let distr = distrs[distrInd]
  let newLabelReq = {}
  newLabelReq.location = req.body.location
  newLabelReq.no = req.body.no
  newLabelReq.sdate = new Date()
  newLabelReq.gdate = "No Actions",
  newLabelReq.status = "Requested"
  distr.labels.push(newLabelReq)

  distrs[distrInd] = distr
  product.distr = distrs
  products[productInd] = product
  catg.products = products
  catgs[catgInd] = catg

  await manfModel.findByIdAndUpdate(req.params.partnerId, {catg: catgs})

  res.status(200).json({
    status: "success"
  })
}

exports.generateLabelCodes = async (req, res, next) => {
  const labelsInfo = req.body
  const noOfLabels = labelsInfo.no
  let labels = []
  for(var i = 0; i < noOfLabels; i++){
    const temp = new labelModel()
    temp.save((err, label) => {
      if(err){
        console.log(err)
      }else{
        //console.log(label)
        labels.push(label._id)
        if(labels.length == noOfLabels){
          res.status(200).json({
            status: "success",
            labels
          })
          next()
        }
      }
    })
  }
  
  
}