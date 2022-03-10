const express = require('express');
const { status } = require('express/lib/response');
const app = express();
app.use(express.json())
require("./DB/conn");
const Data= require("./DB/schema");

app.post('/',async(req, res)=>{
    try{
        const user=new Data(req.body);
        const createUser = await user.save(user);
        res.status(201).send(user)
    }catch(e){res.status(400).send(e);}
})

app.get('/:id',async(req,res)=>{
    try{
        var id=req.params.id
        const showUser= await Data.findById({_id:id});
        res.send(showUser);

    }catch(e){res.send(e);}
})
app.patch('/:id',async(req,res)=>{
    try{
        const _id=req.params.id;
        const update= await Data.findByIdAndUpdate(_id,{isPayment:true},{new:true});
        if(!update){return res.status(400).send();}
        // else{res.send(update);}

        const find=await Data.findOne({_id:_id},{RefferedUser:1,_id:0});
        // res.send(find);
        if(find.RefferedUser==null){return res.status(400).send("Reffered Name not Available");}
        else{
            const set=await Data.findOneAndUpdate({name:find.RefferedUser},{
            $inc: { TotalEarning: 10 }} , {new: true });
            if(!set){return res.status(400).send("Reffered Name not Available");}
            else{res.send(set);}
        }
        

        // res.send(showUser);

    }catch(e){res.send(e);}
})
app.listen(8000)