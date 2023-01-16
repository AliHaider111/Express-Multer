// const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
// const myurl = 'mongodb://localhost:27017/Test';

const connectDataBase = ()=>{
    MongoClient.connect('mongodb+srv://haider:Arhamsoft1@cluster0.cwcsr8j.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4
    }, (err, client) => {
        db = client.db('test') 
        console.log("Database connected successfully")
      })
} 
  module.exports = connectDataBase