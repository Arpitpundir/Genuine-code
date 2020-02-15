const express = require("express");
const distrController = require("./../controllers/distrController");
const router = express.Router();

const manfController = require("./../controllers/manfController");

router.route("/state").get(distrController.isLoggedIn);
router.route("/login").post(distrController.login);
router.route("/logout").post(distrController.logout);
router.route("/signup").post(distrController.signup);
router.route("/:distrId/requests").post(distrController.addRequests);
router.route("/:distrId/requests").get(distrController.getAllRequests);
router.route("/:distrId/requests").delete(distrController.deleteRequest);
router
  .route("/:distrId/partners")
  .post(distrController.addPartner, manfController.distrReqAcceptHandler);
router.route("/:distrId/manfs").get(distrController.getManfs);
router.route("/:distrId/partners/:partnerId").get(distrController.getPartner);
//router.route("/distrId/partners/:partnerId/products/:productId").post(distrController.addProduct)
router
  .route("/:distrId/partners/:partnerId/products/:productId")
  .get(distrController.getProduct);
router
  .route("/:distrId/partners/:partnerId/products/:productId/labels/requests")
  .post(distrController.makeLabelRequest, manfController.addLabelRequest);
router.route("/:id").get(distrController.getOne);

module.exports = router;
