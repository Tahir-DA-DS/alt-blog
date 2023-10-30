const express = require("express");
const router = express.Router();
const adminControlller = require('../controller/admin')
const adminLayout = "../views/layouts/main";


router.get("/admin", adminControlller.adminPage)

router.post("/register", adminControlller.register)

router.post("/admin", adminControlller.login)

router.get('/logout', adminControlller.logout)

router.get('/register', (req, res)=>{
    res.render('admin/register', {layout:adminLayout})
} )


module.exports = router





