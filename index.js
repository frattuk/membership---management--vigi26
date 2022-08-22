const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;
const uri = process.env.CONNECTION;
const client = new MongoClient(uri);
const DB = "membership_management";

// const usersCollection = "users";
const membershipsCollection = "memberships";
const userManagementCollection = "user_management";

app.get("/memberships", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db(DB)
      .collection(membershipsCollection)
      .find()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post("/memberships", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db(DB)
      .collection(membershipsCollection)
      .insertOne(req.body);

    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete("/memberships/:id", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db(DB)
      .collection(membershipsCollection)
      .deleteOne({ _id: ObjectId(req.params.id) });

    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/user_management", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db(DB)
      .collection(userManagementCollection)
      .find()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post("/user_management", async (req, res) => {
  try {
    const con = await client.connect();

    const data = await con
      .db(DB)
      .collection(userManagementCollection)
      .insertOne(req.body);

    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
