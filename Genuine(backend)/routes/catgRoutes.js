const express = require("express");
const catgController = require("../controllers1/catgController");
const authController = require("../controllers1/authController");
const router = express.Router();

router.route("/").post(catgController.createNewCatg);
router.route("/:id/product").get(authController.protect, catgController.getCatgPrd).post(authController.protect, catgController.makeCatgPrd);
router.route("/:id").get(authController.protect, catgController.getManfCatg);
module.exports = router;