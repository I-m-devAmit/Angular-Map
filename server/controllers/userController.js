const User = require('../models/User');
const jwt = require("jsonwebtoken");
const { request } = require('express');

const userLogin = async ( req, res) => {
        try {
            const { email, password } = req.body;
            const userlogin = await User.findOne({ email: email });
            if (userlogin) {
              const ismatch = await (password, userlogin.password);
              const token =jwt.sign({ _id: userlogin._id.toString() }, process.env.JWT_SECRET);
              if (!ismatch) {
                res.status(400).json({ 
                    success: false,
                    error: "Invalid Credentials" });
              } else {
                res.status(200).json({
                    success  : true,
                    message: "Login Successfully",
                    data: {
                        user: userlogin,
                        token: token
                    }
                 });
              }
            } else {
               const user = new User({
               ...req.body 
               })
               const newUser = await user.save()
               const token =jwt.sign({ _id: newUser._id.toString() }, process.env.JWT_SECRET)
               res.status(200).json({
                success  : true,
                message: "Login Successfully",
                data: {
                    user: userlogin,
                    token: token
                }
               })
            }
          } catch (err)
           {
            res.status(400).json({
                        success: false,
                        message: "Invalid Credentials",
                        error: err
                    });
          }
  
  }

module.exports = {userLogin}