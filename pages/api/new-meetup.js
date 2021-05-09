// /api/new-meetup
// POST /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // client connect db mongodb
    const client = await MongoClient.connect(
      "mongodb+srv://admin_meetup:admin@cluster0.fifrw.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    // chon props db
    const db = client.db();

    // tim db 'ten' ra
    const meetupCollection = db.collection("meetups");

    // them vao db do
    const result = await meetupCollection.insertOne(data);

    console.log(result);

    // client close connect
    client.close();
    res.status(201).json({ message: "MeetUp Inserted !" });
  }
}

export default handler;
