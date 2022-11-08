const User = require('../models/User')
const verifyEmail = async(req,res,next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(user){
            if(user.isVerified){
                next()
            }else{
                res.status(400).json({
                    success: false,
                    error: "Please verify your email Id"
                })
            }
        }
        // else{
        //     res.status(400).json({
        //         success: false,
        //         error: "User Doesn't exist"
        //     })
        // }
      } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
        // console.log(err);
      }
}

module.exports = verifyEmail;