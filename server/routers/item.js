const express = require('express')
const Item = require('../models/Item')
const Auth = require('../middleware/auth')
const router = new express.Router()




//fetch all items
router.get('/items', async(req, res) => {
   try {
     const items = await Item.find({})
   //   const items = await Item.find({title: req.query.title})
     res.status(200).json({
      success: true,
      message: "Items fetched successfully",
      items: items
   })
   } catch (error) {
     res.status(400).json
      ({
      success: false,
      message: "Error fetching items",
      error: error
      })
   }
})                                       
   

// //fetch an item
//    router.get('/items/:id', async(req, res) => {
//       try{
//          console.log("hello gugu");
//          const item = await Item.findOne({_id: req.params.id});
//          console.log("Item found", item)
//       if(!item) {
//          console.log("Item not found");
//          res.status(404).json({
//             success: false,
//             message:"Product not found"
//          })
//       } else {
        
//       }
//       } catch (error) {
//          res.status(400).json
//          ({
//             success: false,
//             error: error,
//             message: "Error fetching product"
//          })
//       }
//    })



//fetch an item
router.get('/items/:id', async(req, res) => {
   try{
      // console.log("hello gugu", req.params.id);
      const item = await Item.findOne({_id: req.params.id});
      // console.log("Item found", item)
   if(item) {
      res.status(200).json({
         success: true,
         message: "Product fetched successfully",
         item: item
      })
   }else{
         res.status(400).json({
         success: false,
         message:"Product id not found"
      })
   }
   } catch (error) {
      console.log(error);
      res.status(400).json
      ({
         success: false,
         error: error,
         message: "Product not found"
      })
   }
})



//create a new item

router.post('/items',Auth, async(req, res) => {
   try {
   const newItem = new Item({
       ...req.body,
       owner: req.user._id
   })
      const newProdu =await newItem.save();
      res.status(201).json({
         success: true,
         message: "Item created successfully",
         item: newProdu
      });
   } catch (error) {
   res.status(400).send({
      success: false,
      message: "Error creating item",
      error: error
   })
   }
})

router.post('/cart' , async(req, res) => {
   try {
      console.log("Does new cart make ?")
      const newItem = new Item({
          ...req.body,
      })
         const newProdu = await newItem.save();
         res.status(200).json({
            success: true,
            message: "Cart processed successfully",
            item: newProdu
         });
      } catch (error) {
      res.status(400).send({
         success: false,
         message: "Error creating cart",
         error: error
      })
      }      
});






//update an item 
router.patch('/items/:id', Auth, async(req, res) => {
   const updates = Object.keys(req.body)
   const allowedUpdates = ['name', 'description', 'category', 'price']
   const isValidOperation = updates.every((update) =>              allowedUpdates.includes(update))
      if(!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates'})
   }
   try {
     const item = await Item.findOne({ _id: req.params.id})
     if(!item){
         return res.status(404).send()
     }
     updates.forEach((update) => item[update] = req.body[update])
     await item.save()
     res.send(item)
   } catch (error) {
   res.status(400).send(error)
   }
   })

   //Delete an item

   router.delete('/items/:id', Auth, async(req, res) => {
      try {
      const deletedItem = await Item.findOneAndDelete( {_id: req.params.id} )
         if(!deletedItem) {
          res.status(404).send({error: "Item not found"})
      }
         res.send(deletedItem)
      } catch (error) {
         res.status(400).send(error)
      }
      })

      module.exports = router