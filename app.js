const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+'/getdate.js');

const app = express();
let itemz =["Buy Food","Cook Food","Eat Food"];
let work =[];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  let day = date.getDate();
  res.render("todolist", {kindOfDay: day, newListItemz: itemz});

});

app.post("/",function(req,res){

  let item=req.body.newItem;

  if(req.body.list === 'Work List'){
      work.push(item);
      res.redirect('/work');
  }
  else{
      itemz.push(item);
      res.redirect('/');
  }
})

app.get('/work',function(req,res){
    res.render('todolist',{kindOfDay:'Work List',newListItemz:work});
});

app.get("/about",function(req,res){
  res.render("about");
})

app.listen(3000,function(){
  console.log("server is listening on port 3000");
})
