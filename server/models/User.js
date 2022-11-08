const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const userSchema =  new mongoose.Schema({

  // userName: {
  //   type: String,
  //   // required: true,
  //   trim: true,
  // },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is not valid");
      }
    }
  },
    password: {
      type: String,
      required: true,
      minLength: 7,
      trim : true,
      validate(value){
        if(value.toLowerCase().includes("pasword")){
          throw new Error("password must not contain password")
        }
      }
    },
    // landArea: []
  
})
// const mongoose = require('mongoose');   
// const validator = require('validator');
// const bcrypt = require('bcrypt');  
// const jwt = require('jsonwebtoken');

// const userSchema = new mongoose.Schema({
//     name: {
//        type: String,
//        required: true,
//        trim: true,
//      },
//     email: {
//        type: String,
//        required: true,
//        unique: true,
//        lowercase: true,
//          validate( value ) {
//                if( !validator.isEmail( value )) {
//                     throw new Error("Email is not valid");
//                      }
//                 }
//       },
//     password: {
//         type: String,
//         required: true,
//         minLength: 7,
//         trim: true,
//         validate(value) {
//            if( value.toLowerCase().includes("password")) {
//            throw new Error("password must not contain password");
//           }
//        }
//     },
//     mobileno: {
//         type: String,
//         required: true,
//         maxLength: 10,
//         validate(value) {
//           const pattern = /^((\\+91-?)|0)?[0-9]{10}$/;
//           if(!pattern.test(value)) {
//           // console.log({message:"Invalid Mobile Number. Try Again."})
//           throw new Error("Invalid Mobile Number");

//          }
//       }
//       },
//     address: {
//         type: String,
//         required: true,
//       },
//     isVerified: {
//       type: Boolean
//     }
//     ,
//     tokens: [{
//       token: {
//       type: String,
//       required: true
//         }
//       }]
//     }, {
//     timestamps: true
//     })

// //Generate auth token
//     userSchema.methods.generateAuthToken = async function () {
//         const user = this
//         // res.cookie("JWT", token )
//         // console.log("This is login token", token)
//         user.tokens = user.tokens.concat({token})
//         await user.save()
//         return token
//     }

//     //login in users 
//     userSchema.statics.findByCredentials = async (email , password) => {
//         const user = await User.findOne({email})
//         if(!user) {
//             throw new Error("Unable to log in")
//         }
//         const isMatch = await bcrypt.compare(password, user.password)
//         console.log(isMatch)
//         if(!isMatch) {
//             throw new Error("Unable to log in")
//         }
//         return user
//     }
  
//     //Hash plain password before saving 
//     userSchema.pre('save', async function(next){
//         const user = this
//         if(user.isModified('password')){
//             user.password = await bcrypt.hash(user.password, 8)
//         }
//         next()

//     })


    const User = mongoose.model('User', userSchema)
    module.exports = User



