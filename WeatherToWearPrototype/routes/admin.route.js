"use strict";
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

router.get("/admin", adminController.commentsPage);
router.get("/bannedUsers", adminController.bannedUsersPage);
router.get("/manageAds", adminController.adsPage);

router.post("/dismissComment", adminController.dismissComment);
router.post("/deleteComment", adminController.deleteComment);
router.post("/banUser", adminController.banUser);
router.post("/unbanUser", adminController.unbanUser);
router.post("/deleteAd", adminController.deleteAd);
router.post("/approveAd", adminController.approveAd);

module.exports = router;