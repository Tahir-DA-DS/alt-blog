const express = require('express')
const post = require("../model/post");
const adminLayout = "../views/layouts/admin";

const dasboard =  async (req, res) => {
    try {
      const locals = {
        title: "dashboard",
      };
      const data = await post.find();
      res.render("admin/dashboard", { locals, data, layout: adminLayout });
    } catch (error) {
      console.log(error);
    }
}


const loadPost = async (req, res) => {
    try {
      const locals = {
        title: "Add post",
      };
      const data = await post.find();
      res.render("admin/add-post", { locals, data, layout: adminLayout });
    } catch (error) { console.log(error);}
   
  }

const createPost = async (req, res) => {
    try {
       try {
        const newPost = new post({title:req.body.title, body:req.body.body})
        await post.create(newPost)
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
       }
      
    } catch (error) {console.log(error);}

    

  }

 const postUpdate = async (req, res)=>{
    try {
        await post.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            body:req.body.body,
            updatedAt:Date.now()
        })
        res.redirect(`/edit-post/$(req.params.id)`)
    } catch (error) {
        console.log(error);
    }
  }

  const getOnepost = async (req, res)=>{ 
    try {
        const locals = {
            title:'edit post'
        }
      const data = await post.findOne({_id:req.params.id})
        res.render(`admin/edit-post`, {data, layout:adminLayout, locals})
    } catch (error) {
        console.log(error);
    }
  }


  const deletePost = async (req, res)=>{
    try {
        await post.deleteOne({_id: req.params.id})
        res.redirect('/dashboard')
    } catch (error) {

        console.log(error);
        
    }
}
function insertPostData () {
    post.insertMany([{
        title:"building a blog",
        body:"this is the body text"
    },
    {
        title:"making a dress",
        body:"dress making time"
    },
    {
        title:"learning soccer sport",
        body:"learning use to be fun"
    },
    {
      title:"improving",
      body:"improving is key to human nature"
  }])
}

insertPostData()

module.exports = {dasboard, loadPost, getOnepost, createPost, postUpdate, deletePost}

