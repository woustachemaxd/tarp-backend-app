import express from "express";
import { ObjectId } from "mongodb";
import {db} from "../db/conn.js";

const router = express.Router();

// Get all buildings
router.get("/", async (req, res) => {
  let collection = await db.collection("buildings");
  let Result = await collection.find({}).toArray();
  res.send(Result).status(200);
});

//building with id

router.get("/id", async (req, res) => {
  let collection = await db.collection("buildings");
  let Result = await collection.findOne({_id: new ObjectId(req.body.id)}) ;
  res.send(Result).status(200);
});

//Create the building

router.post("/" , async (req , res) => {
  let collection = await db.collection("buildings");
  
  let newDocument= req.body;
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

//delete the building
router.delete("/id" , async (req , res) => {

  //TODO: delete all floors and nodes
  let collection = await db.collection("buildings");
  let result = await collection.deleteOne({_id : new ObjectId(req.body.id)});

  res.send(result).status(200);
});

router.patch("/id", async (req , res) => {

  const query = {_id : new ObjectId(req.body.id)};
  const updates = {"$set" : req.body.update};

  let collection = await db.collection("buildings");
  let result = await collection.updateOne(query , updates);

  res.send(result).status(200);
});






export default router;