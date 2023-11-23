import express from "express";
import { ObjectId } from "mongodb";
import {db} from "../db/conn.js";

const router = express.Router();

// Get all nodes
router.get("/", async (req, res) => {
  let collection = await db.collection("nodes");
  let Result = await collection.find({}).toArray();
  res.send(Result).status(200);
});


//nodes with id

router.get("/id", async (req, res) => {
  let collection = await db.collection("nodes");
  let Result = await collection.find({_id: new ObjectId(req.body.id)}).toArray();
  res.send(Result).status(200);
});

//get all nodes of a floor
router.get("/floor" , async (req , res) => {
	let collection = await db.collection("nodes");
  let Result = await collection.find({floorId: req.body.floorId}).toArray();
  res.send(Result).status(200);
})


//Create the node

let isFloor = async (id) => {
	let floorCollection = await db.collection("floors");
	let floor = await floorCollection.findOne({_id : new ObjectId(id)});

	return (floor) ? true : false;
}


router.get("/search" , async (req , res) => {
	let collection = await db.collection("nodes");
  let out = []
  let query = req.body.query
  let Result = await collection.find({}).toArray();
  for(let node of Result){
    console.log(node)
    if(node.label.includes(query) || node.desc.includes(query)) {
      if(node.type !== "path" )
      out.push(node)
    }
  }
  res.send(out).status(200);
})

router.post("/" , async (req , res) => {
  
  let Collection = await db.collection("nodes");
  let newDocument= req.body;
  console.log(req.body);
  let floor = await isFloor(req.body.floorId);

  if(!floor){
	res.send({error : "Invalid Floor ID"}).status(400);
  } else {
	
		let result = await Collection.insertOne(newDocument);
  		res.send(result).status(204);
  
	}
	
  
});





//delete the node
router.delete("/id" , async (req , res) => {

  //TODO: delete all connection
  let collection = await db.collection("nodes");
  let result = await collection.deleteOne({_id : new ObjectId(req.body.id)});

  res.send(result).status(200);
});

router.patch("/id", async (req , res) => {

	//todo : add check for buildings and floor
  const query = {_id : new ObjectId(req.body.id)};
  const updates = {"$set" : req.body.update};

  let collection = await db.collection("nodes");
  let result = await collection.updateOne(query , updates);

  res.send(result).status(200);
});






export default router;