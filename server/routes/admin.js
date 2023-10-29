const express = require("express");
const router = express.Router();
const adminControlller = require('../controller/admin')



router.get("/admin", adminControlller.adminPage)

router.post("/register", adminControlller.register)

router.post("/admin", adminControlller.login)

router.get('/logout', adminControlller.logout)


module.exports = router





