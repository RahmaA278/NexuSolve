const express=require('express')
const cors=require('cors')
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const profileRoute = require("./routers/profiles")
const postRoute = require("./routers/posts")
const commentRoute = require("./routers/comments")

const Profile = require("./models/Profiles");
const Token = require("./models/Tokens");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

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
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get("/", (req, res) => {
  res.json({
    name: "Secure",
    description: "Make posts and comments securely."
  })
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'uploads.html'));
});

app.post("/upload", upload.single("image"), async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  console.log("File uploaded:", req.file);
  const image = req.file.json

  res.status(201).send(`Image uploaded: ${image}`);

  console.log('headers',req.headers.authorization)

  const token = req.headers.authorization.split(' ')[1];
  const tokenData = await Token.getOneByToken(token);
  const id = tokenData.account_id

  const data = { image_path: `${req.file.destination}/${req.file.filename}` }
  const profile = await Profile.getOneById(id);
  const result = await profile.update(data);

});

module.exports=app