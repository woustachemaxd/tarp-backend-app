import express from "express";
import { ObjectId , Binary } from "mongodb";
import {imageDB} from "../db/conn.js";
// import multer from "multer";

// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

let router = express.Router();

router.get("/" , async (req , res) => {
	let collection = imageDB.collection("images");
  
  let result = await collection.find({}).toArray();

  res.send(result).status(200);
});

router.get("/id" , async (req , res) => {
	let collection = imageDB.collection("images");
  
  let result = await collection.findOne({_id : new ObjectId(req.body.id)});

  res.send(result).status(200);
});
// upload.single('file') , 
router.post("/" , async (req , res , next) =>  {
  
  let collection = imageDB.collection("images");
  
  let result = await collection.insertOne({
	image : req.body.image ,
	name : req.body.name,
	mime_type : req.body.mime_type || ""
  });

  res.send(result).status(204);
});

export default router;