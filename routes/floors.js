import express from "express";
import { ObjectId } from "mongodb";
import {db} from "../db/conn.js";

const router = express.Router();

// Get all floors
router.get("/", async (req, res) => {
  let collection = await db.collection("floors");
  let Result = await collection.find({}).toArray();
  res.send(Result).status(200);
});


//floors with id

router.get("/id", async (req, res) => {
  console.log(req.body.id)
  let collection = await db.collection("floors");
  let Result = await collection.findOne({_id : new ObjectId(req.body.id)});
  console.log(Result)
  res.send(Result).status(200);
});

//get all floors of a building
router.get("/building" , async (req , res) => {
	let collection = await db.collection("floors");
  let Result = await collection.find({buildingId: req.body.buildingId}).toArray();
  res.send(Result).status(200);
})


//Create the floor

let isBuilding = async (id) => {
	let buildingCollection = await db.collection("buildings");
	let building = await buildingCollection.findOne({_id : new ObjectId(id)});

	return (building) ? true : false;
}

let isLevelAlredyExist = async (id , level) => {
	let collection = await db.collection("floors");
	let floor = await collection.findOne({
		buildingId : id ,
		level : level
	});

	return (floor) ? true : false;
}

router.post("/" , async (req , res) => {
  
  let floorCollection = await db.collection("floors");
  let newDocument= req.body;
  let building = await isBuilding(req.body.buildingId);

  if(!building){
	res.send({error : "Invalid Building ID"}).status(400);
  } else {
	let level = await isLevelAlredyExist(req.body.buildingId , req.body.level);
	if(level){
		res.send({error : "level already exist"}).status(403);

	} else {
		let result = await floorCollection.insertOne(newDocument);
  		res.send(result).status(204);
  }
	}
	
  
});

//delete the floor
router.delete("/id" , async (req , res) => {

  //TODO: delete all floors and nodes
  let collection = await db.collection("floors");
  let result = await collection.deleteOne({_id : new ObjectId(req.body.id)});

  res.send(result).status(200);
});

router.patch("/id", async (req , res) => {

	//todo : add check for buildinga and floor
  const query = {_id : new ObjectId(req.body.id)};
  const updates = {"$set" : req.body.update};

  let collection = await db.collection("floors");
  let result = await collection.updateOne(query , updates);

  res.send(result).status(200);
});






export default router;