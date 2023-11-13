const express = require('express')
const router = express.Router()
const blogController =require('../controller/blog')
const authuser = require('../middleware/Auth')


router.get('/dashboard', authuser, blogController.dasboard)

router.get("/add-post", authuser,blogController.loadPost)

router.post("/add-post", authuser,  blogController.createPost)

router.put('/edit-post/:id', authuser, blogController.postUpdate)

router.get('/edit-post/:id', authuser, blogController.getOnepost)

router.delete('/delete-post/:id', authuser, blogController.deletePost)
router.get('/tags/:tag', blogController.tagpost)


module.exports = router

