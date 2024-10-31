const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require("path")
const cookieParser = require('cookie-parser')
const Food = require('./Models/Food')
const imageDownloader = require('image-downloader')
const app = express();
const jwt = require('jsonwebtoken')
require('dotenv').config();
const multer = require('multer')
const authController = require('./Route/auth')
const foodController = require('./Route/places')
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const bucket = 'foodreview'
const fs = require('fs')
const mime = require('mime-types');
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads') )

const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));


async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
}


async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split('.');
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + '.' + ext;
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body: fs.readFileSync(path),
    Key: newFilename,
    ContentType: mimetype,
    ACL: 'public-read',
  }));
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}


app.use(cookieParser())

  const DB = "mongodb+srv://vaqsi24:juventus1990@shop.31bo5lw.mongodb.net/foodrecipe?w=majority";

  app.use(authController)
  app.use(foodController)
  app.post('/upload-by-link', async(req, res, next) => {
    const {link} = req.body
    const newName = Date.now() + ".jpg"
   await imageDownloader.image({
      url:link,
      dest:__dirname + '/uploads/' + newName
    })
    res.json(newName)
  })
  

  const photosMiddleware = multer({dest:'/tmp'});
  app.post('/upload', photosMiddleware.array('photos', 100),  async(req, res, next) => {
    const uploadedFile = []
    for( let i = 0; i < req.files.length; i ++ ) {
      const {path, originalname, mimetype} = req.files[i]
      const url = await uploadToS3(path, originalname, mimetype)
      uploadedFile.push(url);
    }
  
    res.json(uploadedFile)
  })

  
  app.post('/food',  (req, res) => {
    const { token } = req.cookies;
    const {
      title,ingredients,addedPhotos,instructions,time,category, difficulty, calories, carbs, protein, fat
      
    } = req.body;
    jwt.verify(token, "ILOVEANNA", {}, async (err, userData) => {
  const FoodDoc =  await  Food.create({
        owner: userData.id,
        title,ingredients,instructions,time,photos:addedPhotos,category, difficulty, calories, carbs, protein, fat
      })
  
      res.json(FoodDoc)
    });
  })

  




mongoose
.connect(DB)
.then(result => {
  app.listen(4500);
  console.log('working');
})
.catch(err => {
  console.log(err);
});