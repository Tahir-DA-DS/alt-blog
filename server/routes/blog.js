const express = require('express')
const router = express.Router()
const blogController = require('../controller/blog')


router.get('/dashboard', blogController.dasboard)

router.get("/add-post", blogController.loadPost)

router.post("/add-post", blogController.createPost)

router.put('/edit-post/:id', blogController.postUpdate)

router.get('/edit-post/:id', blogController.getOnepost)

router.delete('/delete.post/:id', blogController.deletePost)



module.exports = router

