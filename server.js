const express = require('express');
const app = express();
const fs = require('file-system');
const connectDataBase = require('./config/db')
const multer  = require('multer');
const path = require('path')
const ObjectId = require('mongodb').ObjectId;
connectDataBase();
const storage = multer.diskStorage({
   destination: function(req,file,cb){
    cb(null, 'uploads')
   } ,
   filename: function(req, file, cb){
    cb(null, file.fieldname + "-" + Date.now())
   }

})
const upload = multer({storage: storage})
app.post('/profile', upload.single('file'), function (req, res, next) {
   
    const img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    var finalImg = {
        contentType: req.file.mimetype,
        image: Buffer.from(encode_image, 'base64')
    };
   db.collection('myCollection').insertOne(finalImg, (err, result) =>  {
        console.log(result)
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })

    const file = req.file
    if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
    }
    res.send(file)
  })
  app.get('/photos', (req, res) => {
    db.collection('myCollection').find().toArray((err, result) => {
        const imgArray = result.map(element => element._id);
        console.log(imgArray);
        if (err) return console.log(err)
        res.send(imgArray)
    })
});
app.get('/photo/:id', (req, res) => {
    var filename = req.params.id;
    db.collection('myCollection').findOne({ '_id': ObjectId(filename) }, (err, result) => {
        if (err) return console.log(err)
        res.contentType('image/jpeg');
        res.send(result.image.buffer)
    })
})

app.listen( 6000, ()=>{
    console.log(`listening on port ${6000}`)
})