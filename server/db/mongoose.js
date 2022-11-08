const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://googleAmit:Amit1234@cluster0.lgec1nb.mongodb.net/googleMap?retryWrites=true&w=majority")
.then(()=> console.log("Connection Established Successfully of google map"))
.catch(err => console.log("Error"));

 

// "mongodb+srv://amitecomweb:Amit2106@cluster0.crv3c.mongodb.net/ecommerce?retryWrites=true&w=majority"