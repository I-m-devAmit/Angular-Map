const User = require('../models/User');
const jwt = require("jsonwebtoken");


const JWT_SECRET= "ecommercewebapi"

const userLogin = async ( req, res) => {
        try {
            const { email, password } = req.body;
            const userlogin = await User.findOne({ email: email });
            if (userlogin) {
              const ismatch = await (password, userlogin.password);
              console.log("Process env : " , JWT_SECRET);
              const token =jwt.sign({ _id: userlogin._id.toString() }, JWT_SECRET);
              console.log("Token 1: " , token);
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
               const newUser = await user.save();
               console.log("newuser: " , newUser);
               const token =jwt.sign({ _id: newUser._id.toString() }, JWT_SECRET)
               console.log("Token 2 : " , token);
               res.status(200).json({
                success  : true,
                message: "Login Successfully",
                data: {
                    user: newUser,
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