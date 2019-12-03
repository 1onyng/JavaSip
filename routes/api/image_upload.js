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

const uploadReviewImages = multer({
  storage: multerS3({
   s3: s3,
   bucket: bucket,
   acl: 'public-read',
   key: function (req, file, cb) {
    cb( null, "5dddc3e6431fcc46f76cbf9d/" + path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
   }
  }),
  limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function( req, file, cb ){
   checkFileType( file, cb );
  }
 }).array( 'reviewImages', 4 );

 router.post('/upload',(req, res) => {
 uploadReviewImages( req, res, (error) => {
   if(error){
    res.json( { error: error } );
   } else {
    if( req.files === undefined ){
     res.json( 'Error: No File Selected' );
    } else {
     // If Success
     let fileArray = req.files,
      fileLocation;
      const reviewImagesArray = [];
     for ( let i = 0; i < fileArray.length; i++ ) {
      fileLocation = fileArray[i].location;
      console.log( 'file name', fileLocation );
      reviewImagesArray.push( fileLocation )
     }

     // Save the file name into database
     res.json( {
      filesArray: fileArray,
      locationArray: reviewImagesArray
     } );
    }
   }
  });
 });


 module.exports = router;