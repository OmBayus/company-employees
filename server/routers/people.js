const router= require('express').Router()
const Person = require("../models/person")
const fs = require('fs')

router.get("/",(req,res)=>{
      Person.find({},(err,item)=>{
            if(!err){
                  res.json(item)
            }
      })
})


router.post("/",(req,res)=>{
      Person.findOne({no:req.body.no},(err,item)=>{
            if(!err){
                  if(!item){
                        if(req.files !== null){
                              const file = req.files.file
                              file.mv(`${__dirname}/../uploads/${req.body.no}.png`,err=>{
                                    if(err){
                                          res.json({error:"Resim Yüklenemedi"})
                                    }
                                    else{
                                          const person = new Person({
                                                name:req.body.name,
                                                unvan:req.body.unvan,
                                                no:req.body.no,
                                                imgPath:("http://localhost:4000/uploads/"+req.body.no+".png")
                                          })
                                          person.save().then(item=>{
                                                res.json(item)
                                          })
                                          .catch(err=>{
                                                res.json({error:err.message})
                                          })
                                    }
                              }) 
                        }
                        else{
                              const person = new Person({
                                    name:req.body.name,
                                    unvan:req.body.unvan,
                                    no:req.body.no,
                                    imgPath:"http://localhost:4000/uploads/default.png"
                              })
                              person.save().then(item=>{
                                    res.json(item)
                              })
                              .catch(err=>{
                                    res.json({error:err.message})
                              })
                        }
                  }
                  else{
                        res.json({
                              error:"Bu Sicil No'ya sahip bir çalışan bulunmaktadır."
                        })
                  }
            }
            else{
                  res.json({error:err.message})
            }
      })
})


router.put("/:id",(req,res)=>{
      const param = req.params.id
      Person.findOne({no:param},(err,item)=>{
            if(!err){
                  var person = {
                        name:"",
                        unvan:"",
                        no:"",
                        imgPath:""
                  }
                  if(item.imgPath ==="http://localhost:4000/uploads/default.png"){
                        person = {
                              name:req.body.name,
                              unvan:req.body.unvan,
                              no:req.body.no,
                              imgPath:item.imgPath
                        }
                  }
                  else{
                        var oldPath = `${__dirname}/../uploads/${param}.png`
                        var newPath = `${__dirname}/../uploads/${req.body.no}.png`
                        fs.rename(oldPath, newPath, function (err) {
                              if (err) throw err
                        })
                        person = {
                              name:req.body.name,
                              unvan:req.body.unvan,
                              no:req.body.no,
                              imgPath:"http://localhost:4000/uploads/"+req.body.no+".png"
                        }
                  }
                  Person.findOneAndUpdate({no:param},person, { new: true })
                        .then(updatedPerson => {
                              res.json(updatedPerson)
                        })
                        .catch(err => res.json({error:err.message}))
            }
            else{
                  res.json({error:err.message})
            }
      })
      
})


router.delete("/:id",(req,res)=>{
      const param = req.params.id
      var path = `${__dirname}/../uploads/${param}.png`
      Person.findOneAndDelete({no:param})
            .then(item=>{
                  try {
                        fs.unlinkSync(path) 
                  } catch (error) {
                        console.log(error)
                  }
                  
                  res.json(item)
            })
            .catch(err=>res.json({error:err.message}))
})


module.exports = router