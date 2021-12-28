const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _=require("lodash");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const url="mongodb+srv://admin_gaurav:gk123@cluster0.e7wd6.mongodb.net"
mongoose.connect(url+"/TodoList");

const itemSchema=new mongoose.Schema({
  name:String
});

const Item=mongoose.model('Item',itemSchema);


app.get("/", function(req, res) {

    Item.find({},function(err,foundItems){
    if(foundItems.length===0)
    {
      Item.insertMany([task1,task2,task3],function(err)
      {
        if(!err)
          console.log("Data inserted sucessfully");
      })
      res.redirect("/");
    }
    else
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    });
});

app.post("/add", function(req, res){
  let x=req.body.space;
  if(x==="Today"){
    const item =new Item({
      name:req.body.newItem
    });
    item.save(); 
    res.redirect("/");
  }
  else{
    const Work=mongoose.model(x,itemSchema)
    const item =new Work({
      name:req.body.newItem
    });
    item.save(); 
    res.redirect("/"+x);
  }
});
const task1={name:"Welcome to Todo List"}
const task2={name:"list down all your list here"}
const task3={name:"<--- Delete the items from here"}

let flag=false;

app.get("/:name",function(req,res){
  let area=req.params.name;
  area=_.capitalize(area);
  const Work=mongoose.model(area,itemSchema);

  Work.find({},function(err,foundItems){
    if(foundItems.length===0)
    {
      Work.insertMany([task1,task2,task3],function(err)
      {
        if(!err){
          console.log("Data inserted sucessfully");
          res.redirect("/"+area);
        }
      })
    }
    else
    res.render("list", {listTitle: area, newListItems: foundItems});
  });
});

app.post("/delete",(req,res)=>{
  const data=req.body.checkbox;
  const x=req.body.spacecheck;
  // console.log(x);
  if(x==="Today"){
    Item.findByIdAndRemove(data,(err)=>{
      if(err)
        console.log(err);
        else
        console.log("Removed Sucessfully");
        res.redirect("/");
    });
  }
  else{
    const Work=mongoose.model(x,itemSchema);
    Work.findByIdAndRemove(data,(err)=>{
      if(err)
        console.log(err);
        else
        console.log("Removed Sucessfully");
        res.redirect("/"+x);
    });
  }
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
