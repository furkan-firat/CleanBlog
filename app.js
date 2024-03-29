import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";

import bodyParser from "body-parser";
import multer from "multer";
const upload = multer(); // for parsing multipart/form-data
import dotenv from "dotenv";
dotenv.config();

import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "./controllers/postController.js";
import {
  getAboutPage,
  getAddPostPage,
  getEditPage,
} from "./controllers/pageController.js";

const app = express();

//Template Engine
app.set("view engine", "ejs");

//MW
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  }),
);
app.use(express.static("public"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Connect DB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB CONNECTED SUCCESFULLY!");
  })
  .catch((err) => {
    console.log(err);
  });

//ROUTES
app.get("/", getAllPosts);

app.get("/posts/:id", getPost);

app.post("/posts", upload.array(), createPost);

app.put("/posts/:id", updatePost);

app.delete("/posts/:id", deletePost);

app.get("/about", getAboutPage);

app.get("/addPost", getAddPostPage);

app.get("/posts/edit/:id", getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
