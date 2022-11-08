
const express = require('express');
var cookieParser = require('cookie-parser');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const verifyEmail = require("../middleware/emailAuth");
const User = require('../models/User');
const Auth = require('../middleware/auth');
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.use(cookieParser());
const userController = require("../controllers/userController");



router.post("/login", userController.userLogin);

// const express = require('express');
// var cookieParser = require('cookie-parser');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const verifyEmail = require("../middleware/emailAuth");
// const User = require('../models/User');
// const Auth = require('../middleware/auth');
// const router = new express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// router.use(cookieParser());
// const userController = require("../controllers/userController");


// //transporter for sending emails
// const transporter = nodemailer.createTransport(
//     {
//         service: "gmail",
//         auth:{
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD
//         }
//     }
// );

// // verifying email address
// router.get('/users/verify_email', async(req, res) => {
//     try{
//         const token = req.query.token;
//         const verifyToken = jwt.verify(token , process.env.JWT_AUTH );
//         console.log("Verify token: " + verifyToken._id);
//         const user = await User.findOne({_id: verifyToken._id});
//         if(user){
//             user.isVerified= true;
//             await user.save();
//             console.log("This is user: " , user)
//             res.status(200).json({
//                 success  : true,
//                 message: "Email verified successfully!",
//             //     html: `
//             // <table border="0" cellpadding="0" cellspacing="0" width="100%">
//             //     <!-- start logo --> 
//             //     <tr>
//             //         <td align="center" bgcolor="#e9ecef">
//             //             <!--[if (gte mso 9)|(IE)]>
//             //             <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
//             //         <tr>
//             //         </table>
//             //   `
//              });
//         } else {
//             res.status(400).json({
//                 success : false,
//                 message: "Error in verifying email"
//             })
//         }
//     }
//     catch(err){
//          res.status(400).json({
//             success: false,
//             message: "Signup Failed",
//             error: error
//         });
//     }
// });

// //signup for user
// router.post('/users', userController.userRegister)


// //login
// router.post('/users/login', verifyEmail, async(req, res) => {
//     try {
//         const { email, password } = req.body;
//         const userlogin = await User.findOne({ email: email });
//         if (userlogin) {
//           const ismatch = await bcrypt.compare(password, userlogin.password);
//           const token =jwt.sign({ _id: userlogin._id.toString() }, process.env.JWT_SECRET)
//           res.cookie("JWT", token )
//           res.cookie("JWT Token", token, { expiresIn: '24h'})
//           res.cookie("JWT", token, {
//               expires: new Date(Date.now() + 25892000000),
//               httpOnly: true,
//             });
//           if (!ismatch) {
//             res.status(400).json({ 
//                 success: false,
//                 error: "Invalid Credentials" });
//           } else {
//             res.status(200).json({
//                 success  : true,
//                 message: "Login Successfully",
//                 data: {
//                     user: userlogin,
//                     token: token
//                 }
//              });
//           }
//         } else {
//             console.log("Login Failed")
//           res.status(400).json({success : false, error: "Invalid Credentials" });
//         }
//       } catch (err)
//        {
//         res.status(400).json({
//                     success: false,
//                     message: "Invalid Credentials",
//                     error: err
//                 });
//       }
// });


// //old practice for register user
// // try{
//     //     console.log("I'm in in", req.body);
//     //     const user= await User.findOne({ email: req.body.email , password: req.body.password });
//     //     console.log(user,"user");
//     //     // const user = await User.find(req.body.email)
//     //     if(!user){
//     //         console.log("not  a user")
//     //         res.status(404).json({
//     //             success: false,
//     //             message: "User Doesn't Exist"
//     //         })
//     //     } 
//     //     else{
//     //         const token = await user.generateAuthToken()
//     //         // res.cookie("JWT", token )
//     //         console.log("This is login token: ", token)
//     //         // res.cookie("JWT Token", token, { expiresIn: '24h'})
//     //         res.cookie("JWT", token, {
//     //             expires: new Date(Date.now() + 25892000000),
//     //             httpOnly: true,
//     //           });
//     //         res.json({
//     //             success: true,
//     //             message: "User Logged In Successfully",
//     //             data: ({
//     //                 user: user,
//     //                 token: token
//     //             })
//     //         })
//     //     }
    
//     // }catch(error){
//     //     res.status(400).json({
//     //         success: false,
//     //         message: "Invalid Credentials",
//     //         error: error
//     //     })
//     // }


// //fetch all user profile
// router.get('/alluser', async(req, res) => {
//     try {
//       const user = await User.find({})
//       res.status(200).send(user)
//     } catch (error) {
//       res.status(400).send(error)
//     }
//     }) 

// //fetch an user profile
// router.get('/users/:id', async(req, res) => {
//     try{
//        const user = await User.findOne({_id: req.params.id})
//     if(!user) {
//        res.status(404).send({error: "User not found"})
//     }
//        res.status(200).send(user)
//     } catch(error) {
//        res.status(400).send(error)
//     }
//     })

// //logout 
// router.post('users/logout', Auth, async (req,res) => {
//     try{
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token !== req.token  
//         })
//         await req.user.save()
//         res.send()
//     } catch(error){
//         res.status(500).send()
//     }
// })

// //logout all
// router.post('users/logoutAll', Auth, async(req, res) => {
//     try{
//         req.user.tokens =[]
//         await req.user.save()
//         res.send()
//     }
//     catch(error){
//         res.status(500).send()
//     }
// })

module.exports = router

