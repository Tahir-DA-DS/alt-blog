const express = require("express");
const User = require('../model/USer')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET;
const adminLayout = "../views/layouts/main";



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


  const register = async (req, res) => {
    try {
      const { email, firstname, lastname, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      try {
        const user = await User.create({ email, firstname, lastname, password: hashedPassword });
        res.status(201).redirect('/admin');
      } catch (error) {
        if (error.code === 11000) {
          res.status(409).json({ message: `User already in use.`, error: error });
        } else {
          res.status(500).json({ message: "Internal server error.", error: error });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error.", error: error });
    }
  };
  

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
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
  
  

