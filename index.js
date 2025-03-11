const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bjzga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const campaignCollection = client.db("campaingDB").collection("campaing");
    const donationCollection = client.db("campaingDB").collection("donation");


app.get("/", (req, res) => {
  res.send("All Campaign");
});

app.get("/campaign", async (req, res) => {
  const cursor = campaignCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

app.get("/donation", async (req, res) => {
  const cursor = donationCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Crowd Funding server is running on port: ${port}`);
});
