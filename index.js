import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import "express-async-errors";
import buildings from "./routes/buildings.js";
import floors from "./routes/floors.js";
import images from "./routes/images.js";
import nodes from "./routes/nodes.js";
import links from "./routes/links.js";
// import wifiNodes from "./routes/wifiNodes.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());


app.use("/buildings", buildings);
app.use("/floors", floors);
app.use("/images" , images);

app.use("/nodes", nodes);
app.use("/links", links);



// Global error handling
app.use((err, _req, res, next) => {
	console.log(err);
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});