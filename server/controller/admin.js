const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const adminLayout = "../views/layouts/admin";


const adminPage = async (req, res) => {
    try {
      const locals = {
        title: "Admin",
      };
      res.render("admin/index", { locals, layout: adminLayout });
    } catch (error) {
      console.log(error);
    }
  };

  // const registerPage = async (req, res) => {
  //   try {
  //     const locals = {
  //       title: "Admin",
  //     };
  //     res.render("admin/register", { locals, layout: adminLayout });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const registerPage = ('/register', (req, res)=>{
  //   try {
  //     const locals = {
  //       title: "register",
  //     };
  //     res.render("admin/register", {layout:adminLayout, locals})
  //   } catch (error) {
      
  //   }
  // })

  const register = async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: `user created`, user });
      } catch (error) {
        if (error.code === 11000) {
          res.status(409).json({ message: `user already in use` });
        }
        res.status(500).json({ message: "internal server error" });
      }
    } catch (error) {
      console.log(error);
    }
  };


  const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: `invalid credential` });
      }
      const isPasswordvalid = await bcrypt.compare(password, user.password);
      if (!isPasswordvalid) {
        return res.status(401).json({ message: `invalid credential` });
      }
      const token = jwt.sign({ userId: user._id }, jwtSecret);
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };


  const logout = (req, res)=>{
    res.clearCookie('token')
    res.redirect('/')
  }


  module.exports = {adminPage, register, login, logout}
  
  
