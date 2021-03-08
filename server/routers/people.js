const router= require('express').Router()
const Person = require("../models/person")

router.get("/",(req,res)=>{
      res.send("Server Up")
})


module.exports = router