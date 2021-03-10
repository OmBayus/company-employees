const router= require('express').Router()
const Person = require("../models/person")

router.get("/",(req,res)=>{
      Person.find({},(err,item)=>{
            if(!err){
                  res.json(item)
            }
      })
})


router.post("/",(req,res)=>{
      // Person.findOne({no:req.body.no},(err,item)=>{
      //       if(!err){
      //             if(!item){
      //                   const person = new Person({
      //                         name:req.body.name,
      //                         unvan:req.body.unvan,
      //                         no:req.body.no
      //                   })
                  
      //                   person.save().then(item=>{
      //                         res.json(item)
      //                   })
      //                   .catch(err=>{
      //                         res.json({error:err.message})
      //                   })
      //             }
      //             else{
      //                   res.json({
      //                         error:"Bu Sicil No'ya sahip bir çalışan bulunmaktadır."
      //                   })
      //             }
      //       }
      //       else{
      //             res.json({error:err.message}) 
      //       }
      // })
      console.log(req.files.file)
      console.log(req.body)
      res.json(req.body)
})


router.delete("/",(req,res)=>{
      Person.deleteOne({_id:"6047db50d893850c9cbff94e"}).then(item=>{res.json(item)})
})


module.exports = router