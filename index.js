const {MongoClient}= require("mongodb")
const dotenv = require("dotenv")
dotenv.config()
const mongoClient = new MongoClient(process.env.MONGODB_CONNECTION_STRING)
let db
const startconnection = async () => {
  try{  await mongoClient.connect()
    db = mongoClient.db("Coursework")
    console.log("connection database established")}
    catch(error){console.log(error)}
}
startconnection()