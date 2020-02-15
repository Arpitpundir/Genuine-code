const handleFactory = require("./handlerFactory")
const DistrModel = require("../models/distrModel")
const manfModel = require("./../models/manfModel")
exports.login = handleFactory.login(DistrModel)
exports.signup = handleFactory.signup(DistrModel)
exports.getOne = handleFactory.getOne(DistrModel)
exports.logout = handleFactory.logout(DistrModel)
exports.isLoggedIn = handleFactory.isLoggedIn(DistrModel)

exports.getAllRequests = async(req, res, next) => {
  try{
    const query = DistrModel.findById(req.params.distrId).select("requests")
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
    let docs = await DistrModel.findById(req.params.distrId).select("requests")
    console.log(docs)
    let requests = docs.requests
    const manfId = req.query.manfId
    const index = requests.findIndex( element => manfId === element.id)
    requests.splice(index, 1)
    await DistrModel.findByIdAndUpdate(req.params.distrId, {requests: requests})
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
    const docs = await DistrModel.findById(req.params.distrId).select("partners")
    const manf = await manfModel.findById(req.body._id).select("catg")
    let partners = docs.partners
    let newPartner = {}
    let products = []
    const catgs = manf.catg
    catgs.forEach(catg => {
      catg.products.forEach(product => {
        const tempProduct = {}
        tempProduct.profile = {}
        tempProduct.profile.name = product.name
        tempProduct.profile.category = catg.name
        tempProduct.profile.catgId = catg._id
        tempProduct.profile.price = product.price
        tempProduct.profile._id = product._id
        tempProduct.profile.sdate = new Date()
        products.push(tempProduct)
      })
    })
    newPartner.profile = req.body
    newPartner.products = products
    newPartner.sdate = new Date()
    partners.push(newPartner)
    console.log(partners)
    const items = await DistrModel.findByIdAndUpdate(req.params.distrId, {partners: partners})
    console.log(items)
    next()
  }catch(error){
    console.log(error)
  }
}

exports.getPartner = async (req, res, next) => {
  console.log(req.params)
  const docs = await DistrModel.findById(req.params.distrId).select("partners notifications")
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
  await DistrModel.findByIdAndUpdate(req.params.distrId, {partners: partners, notifications : notifications})
  next()
}

exports.makeLabelRequest = async(req, res, next) => {
  let newLabelReq = req.body
  newLabelReq.sdate = new Date()
  newLabelReq.gdate = new Date()
  newLabelReq.status = "Requested"
  const docs = await DistrModel.findById(req.params.distrId).select("partners notifications")
  let partners = docs.partners
  let notifications = docs.notifications
  notifications+=1
  let partnerInd = partners.findIndex(element => element.profile._id == req.params.partnerId)
  let products = partners[partnerInd].products
  let productInd = products.findIndex(element => element.profile._id == req.params.productId)
  partners[partnerInd].products[productInd].labels.push(newLabelReq)
  partners[partnerInd].newLabelReq+=1
  await DistrModel.findByIdAndUpdate(req.params.distrId, {partners: partners, notifications: notifications})
  next()
}

exports.addRequests = async (req, res, next) => {
  let newReq = req.body
  newReq.adate = new Date()
  let docs = await DistrModel.findById(req.params.distrId).select("requests")
  let requests = docs.requests
  requests.push(newReq)
  console.log(newReq, requests)
  await DistrModel.findByIdAndUpdate(req.params.distrId, {requests: requests})
  res.status(200).json({
    status: "success"
  })
}

exports.getProduct = async (req, res, next) => {
  let docs = await DistrModel.findById(req.params.distrId)
  console.log(docs)
  let distr = docs
  const partners = distr.partners
  const partner = partners.find((element) => element.profile._id === req.params.partnerId)
  const products = partner.products
  const product = products.find(element => element.profile._id === req.params.productId)
  res.status(200).json({
    product
  })
}

exports.getManfs = async (req, res, next) => {
  const docs = await DistrModel.findById(req.params.distrId).select("partners")
  res.status(200).json({
    manfs: docs.partners
  })
  next()
}