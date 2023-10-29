const express = require('express')
const post = require('../model/post')


const pagination = async (req, res)=>{
    const locals ={
        tittle:'my blog',
        description: 'my simple blog app'
    }

    let perPage = 10
    let page = req.query.page || 1; 
    const data = await post.aggregate([{$sort: {createdAt: -1}}])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec()

    const count = await post.count()
    const nextPage = parseInt(page) + 1
    const hastNextPage = nextPage <= Math.ceil(count/perPage)
    try {
    
        res.render('index', {
            locals, 
            data,
            current:page,
            nextPage: hastNextPage ? nextPage : null 
        })
        
    } catch (error) {
        console.log(error);
    }
}

const postbyId = async (req, res)=>{
    try {
        
        let slug = req.params.id;
        const data = await post.findById({_id: slug})
        const locals ={
            tittle:data.title,
            description: 'my simple blog app'
        }
        res.render('post', {locals, data})
    } catch (error) {
        
    }
}

const search =  async (req, res) => {
    try {
      const locals = {
        title: "Seach",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
  
      const data = await post.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
          { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
        ]
      });
  
      res.render("search", {
        data,
        locals,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  }
 

  const about = (req, res)=>{
    res.render('about')
}

module.exports = {about, search, pagination, postbyId}
