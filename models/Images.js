const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');
const router = express.Router();
const accessKeyID = require("../../config/keys").AWSAccessKeyID;
const secretAccessKey = require("../../config/keys").AWSSecretAccessKey;
const region = require("../../config/keys").AWSRegion;
const bucket = require("../../config/keys").AWSBucket;


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

const s3 = new aws.S3({
  accessKeyId: accessKeyID,
  secretAccessKey:secretAccessKey,
  region:region
 });

 // folderNme: reviewId 123456dd7897bd
 // imagesCount: number of images to upload
const uploadMultiple =(folderName,imagesCount, req, res)=>{
  if( req.files === undefined ){
    return;
  }
  let upload =  multer({
    storage: multerS3({
     s3: s3,
     bucket: bucket,
     acl: 'public-read',
     key: function (req, file, cb) {
      cb( null, folderName + "/" + path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
      limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
      fileFilter: function( req, file, cb ){
      checkFileType( file, cb );
      }
    }).array( 'reviewImages', imagesCount);

    upload( req, res, (error) => {
      if(error){
        res.json( { error: error } );
       } else {
          let fileArray = req.files,fileLocation;
          const reviewImagesArray = [];
          for ( let i = 0; i < fileArray.length; i++ ) {
            fileLocation = fileArray[i].location;
            reviewImagesArray.push( fileLocation )
          }
          res.json( {
            filesArray: fileArray,
            locationArray: reviewImagesArray
           } );
       }
    });
}


const getImages = (objId)=>{
  let params = { Bucket: bucket, prefix: objId };
  s3.listObjects(params, function(err, data) {
    if (err) return console.error(err);  
    return data.Contents
  });
}
module.exports = Review = mongoose.model('reviews', ReviewSchema);