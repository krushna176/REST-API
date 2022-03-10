const mongoose=require('mongoose');
const sampleData = new mongoose.Schema({
        name:String,
        email:String,
        RefferedUser:String,
        isPayment:{
            type:Boolean,
            default:false
        },
        TotalEarning:Number
    })
    const Sample = new mongoose.model("Sample",sampleData);
    module.exports=Sample;