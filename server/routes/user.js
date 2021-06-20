const router = require("express").Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const { database } = require("firebase-admin");


const userController = require("../controllers/user");



router.post("/",ensureAuthenticated, userController.createUser);

module.exports = router;
