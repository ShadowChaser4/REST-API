const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const article = require(__dirname+'/mongmodule.js');


app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static("public"));

//listen to
app.listen(2000, ()=>{
  console.log('Sever is listening in port 2000')
})

//connect to database
mongoose.connect('mongodb://localhost:27017/wikiDB')

//////////////request targeting articles//////////////////////////////////////////
app.route('/articles')
  .get((req, res)=>{
  article.find({}, (err, docs)=>{
    (!err)? res.send(docs): res.send(err)
  })
})
.post((req, res)=>{
  const title = req.body.title;
  const content = req.body.content;
  article.create({title: title, content: content}, (err, docs)=>{
    res.send(err) || res.send(docs)
  })

})
.delete((req, res)=>{
  article.deleteMany({}, (err, info)=>{
    (!err)? res.send(info): res.send(err);

  })
})

/////////////////////////////request targeting specific articles/////////////////////////////////////

app.route('/articles/:articleName')
   .get((req, res)=>{
     articleName = req.params.articleName;
     console.log(req.params.articleName)
     article.find({title:articleName}, (err, foundlist)=>{
      (!err)?res.send(foundlist): res.send(err)

     })
   })

   .put((req, res)=>{
     article.updateOne(
       {title: req.params.articleName},
       {title: req.body.title, content: req.body.content},
       (err, count)=>{console.log(err)
       console.log(count)}

     )
   })

   .patch((req, res)=>{
     article.updateOne({
       title: req.params.articleName
     },
   {
     $set:req.body
   }
 , (err, ack)=>{
   console.log(err)
   console.log(ack)
 })
   })

  .delete((req, res)=>{
    article.deleteOne(
      {title: req.params.articleName},
      (err, count)=>{
        if(!err){res.send(count)}
        else{res.send(err)}
      }
    )
  })
