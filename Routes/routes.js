const express = require("express");
const { signup, login, logout, checkuser } = require("../controllers/authcontroller");
const { verifyToken } = require("../middleware/verifytoken");
const { addToFavourites, getFavourites, removeFromFavourites } = require("../controllers/featureController");
const router = express.Router();


router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)
router.get("/checkuser", verifyToken, checkuser);
router.post("/addToFavourites/:id", addToFavourites)
router.post("/removeFromFavourites/:id", removeFromFavourites)
router.get("/getFavourite/:id", getFavourites);

module.exports = router