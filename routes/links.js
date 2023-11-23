import express from "express";
import { ObjectId } from "mongodb";
import {db} from "../db/conn.js";

const router = express.Router();

// Get all floors
router.get("/", async (req, res) => {
  let collection = await db.collection("links");
  let Result = await collection.find({}).toArray();
  res.send(Result).status(200);
});


//floors with id

router.get("/id", async (req, res) => {
  let collection = await db.collection("links");
  let Result = await collection.find({_id: new ObjectId(req.body.id)}).toArray();
  res.send(Result).status(200);
});

//get all links of a Floor
router.get("/floor" , async (req , res) => {
	let collection = await db.collection("links");
  let Result = await collection.find({floorId: req.body.floorId}).toArray();
  console.log("nice")
  res.send(Result).status(200);
})


//Create the floor


router.post("/" , async (req , res) => {
  console.log("here")
  let collection = await db.collection("links");
  let Result = await collection.insertOne(req.body);
  res.send(Result).status(200);
  
});


export default router;