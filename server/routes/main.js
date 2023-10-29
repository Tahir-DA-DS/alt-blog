const express = require('express')
const router = express.Router()
const mainController = require('../controller/main')


router.get('', mainController.pagination)

//GET post:id

router.get('/post/:id', mainController.postbyId) 

router.post('/search', mainController.search)
  

router.get('/about', mainController.about)



module.exports = router

// function insertPostData () {
//     post.insertMany([{
//         title:"building a blog",
//         body:"this is the body text"
//     },
//     {
//         title:"making a dress",
//         body:"dress making time"
//     },
//     {
//         title:"learning soccer sport",
//         body:"learning use to be fun"
//     }])
// }

