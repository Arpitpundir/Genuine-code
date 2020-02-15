const express = require("express")
const manfController = require("./../controllers/manfController")
const router = express.Router()

router.route("/state").get(manfController.isLoggedIn)
router.route("/login").post(manfController.login)
router.route("/logout").post(manfController.logout)
router.route("/signup").post(manfController.signup)
router.route("/:manfId/catg").post(manfController.createNewCatg)
router.route("/:manfId/catg").get(manfController.getAllCatgs)
router.route("/:manfId/catg/:catgId/product").get(manfController.getCatgPrd)
router.route("/:manfId/catg/:catgId/product").post(manfController.createNewPrd)
router.route("/:manfId/catg/:catgId/product/:productId").get(manfController.getProduct)
router.route("/:manfId/request").post(manfController.makeRequest)
router.route("/:manfId/request").get(manfController.getRequests)
//router.route("/:manfId/requests").delete(manfController.deleteRequest)
router.route("/:manfId/partners").post(manfController.addPartner)
router.route("/:manfId/manfs").get(manfController.getManfs)
router.route("/:manfId/partners/:partnerId").get(manfController.getPartner)
router.route("/:manfId/distr/my").get(manfController.getMyDistr)
router.route("/:manfId/distr").get(manfController.getAllDistr)
router.route("/:manfId/catg/:catgId/product/:productId").post(manfController.generateLabelCodes)

//router.route("/manfId/partners/:partnerId/products/:productId").post(manfController.addProduct)
router.route("/:manfId/partners/:partnerId/products/:productId/labels/requests").post(manfController.makeLabelRequest)
router.route("/:id").get(manfController.getOne)


module.exports = router