const Cart = require('../models/Cart');
// const jwt = require("jsonwebtoken");

const landArea = async (req,res) => {
  const owner = req.user._id;
  const dataExist = await Cart.findOne({ userID: owner});
  if(dataExist){
    Cart.findOne(owner).exec(function(err,book) {
        book.landArea.push(...req.body.landArea);
        book.save(function(err){
          // something here
        });
     });
        // Cart.updateOne(
        //     { $push: { landArea: req.body.landArea } }
        // )
        res.status(201).json({
            success  : true,
            message: "Land Added Successfully",
            data: {
                userID: req.body.userID,
                landArea: req.body.landArea
            }
        });
  }
  else{
        console.log("user id: ", owner);
        const landArea = new Cart({
        userID : req.user._id,
        landArea: req.body.landArea
    });
    const land = await landArea.save();
    console.log("land area: ", landArea);
    console.log("land area: ", land);

    res.status(201).json({
        success  : true,
        message: "Land Purchase Successfully",
        data: {
            userID: req.body.userID,
            landArea: req.body.landArea
        }
    });

  }
  
}

module.exports = {landArea}