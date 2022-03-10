const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/Payment")
.then(()=>console.log("connection succcess"))
.catch((err)=>console.log(err));