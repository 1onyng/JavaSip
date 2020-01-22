const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');
const router = express.Router();
const accessKeyID = require("../config/keys").AWSAccessKeyID;
const secretAccessKey = require("../config/keys").AWSSecretAccessKey;
const region = require("../config/keys").AWSRegion;
const bucket = require("../config/keys").AWSBucket;

const s3 = new aws.S3({
  accessKeyId: accessKeyID,
  secretAccessKey:secretAccessKey,
  region:region
 });

async function uploadToS3(folderName, file) {
  
  var params = {
    Bucket: bucket,
    Key: folderName + "/" + Date.now() +"-" + file.name ,
    Body: file.data,
  };
  

  // return await s3.createBucket(params, async function (err, data) {
  //   if(err){
  //     console.log(err)
  //     return err
  //   }else{
  //     console.log(data)
  //     return data
  //   }
    return await s3.upload(params, function (err, data) {
      if (err) {
      console.log('error in callback');
      console.log(err);
      return err
      }else{
      console.log('success');
      console.log(data);
      return data;
    }
    });
}

function checkFileType( file, cb ){
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
  const mimetype = filetypes.test( file.mimetype );
 if( mimetype && extname ){
   return cb( null, true );
  } else {
   cb( 'Error: Images Only!' );
  }
 }


const uploadMultiple = (folderName, req, res)=>{
  return new Promise((res, rej)=> {
    if( req.files === undefined ){
      return;
    }

   

    const values = Object.values(req.files);
    for ( let i = 0; i < values.length; i++ ) {
      const file = values[i];
      const params = {
        Bucket: bucket,
        Key: folderName + "/" + Date.now() + "-" + file.name ,
        Body: file.data,
      };

      s3.upload(params, (err, data)=>{
        if(err){
          rej(err)
        }else{
          if(i === values.length - 1){
            res(data)
          }
        }
      });
    }

  
    // const file = Object.values(req.files)[0];
    
    
  })
  
  // return await s3.upload(params, function (err, data) {
  //   if (err) {
  //   console.log('error in callback');
  //   console.log(err);
  //   return err
  //   }else{
  //     console.log('success');
  //     console.log(data);
  //     return getImages(review._id);
  // }
  // });

  // let values = Object.values(req.files);
  // for ( let i = 0; i < values.length; i++ ) {
  //   const result = await uploadToS3(folderName, values[i]);
  // }
}

function getImages(prefix) {
   return new Promise((res, rej)=>{
   const params = {
     Bucket: bucket,
     Prefix: prefix,
    };
    return s3.listObjects(params, function(err, data) {
      if(err){
        rej(err);
      }else{
        const imagesURLs = [];
        for (let i = 0; i < data.Contents.length; i++) {
          const image = data.Contents[i]['Key'];
          const params = {Bucket: bucket, Key: image};
          const url = s3.getSignedUrl('getObject', params);
          imagesURLs.push(url)
        }
        res(imagesURLs);
      }
  });
   })
}

module.exports = {
  getImages,
  uploadMultiple
}