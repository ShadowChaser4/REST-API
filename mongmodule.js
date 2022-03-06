const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wikiDB')


const articleSchema =
{
  title : String,
  content: String
}

module.exports = mongoose.model("artilce", articleSchema)
