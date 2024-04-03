require("dotenv").config();
const express=require('express')
const cors=require('cors')
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const crypto = require('crypto')
const sharp = require('sharp')

const profileRoute = require("./routers/profiles")
const postRoute = require("./routers/posts")
const commentRoute = require("./routers/comments")

const Profile = require("./models/Profiles");
const Token = require("./models/Tokens");

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion
})

const uniqueImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const app=express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use("/profiles", profileRoute)
app.use("/posts", postRoute)
app.use("/comments", commentRoute)
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.json({
    name: "Secure",
    description: "Make posts and comments securely."
  })
});

app.get("/upload", async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokenData = await Token.getOneByToken(token);
  const id = tokenData.account_id
  const profile = await Profile.getOneById(id);
  
  const getObjectParams = {
    Bucket: bucketName,
    Key: profile.image_name,
  }
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  profile.image_url = url

  const data = { image_url: url }
  const result = await profile.update(data);

  res.sendFile(path.join(__dirname, 'views', 'uploads.html'));
});

app.post("/upload", upload.single("image"), async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  console.log(req.file)

  const buffer = await sharp(req.file.buffer).resize({ height: 512, width: 512, fit: 'contain' }).toBuffer()

  const imageName = uniqueImageName()
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: buffer,
    ContentType: req.file.mimetype,
  }
  const command = new PutObjectCommand(params)

  await s3.send(command)

  res.send({})

  console.log('headers',req.headers.authorization)

  const token = req.headers.authorization.split(' ')[1];
  const tokenData = await Token.getOneByToken(token);
  const id = tokenData.account_id

  const data = { image_name: imageName }
  const profile = await Profile.getOneById(id);
  const result = await profile.update(data);

});

module.exports=app