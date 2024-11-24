const express=require("express")
const app=express()

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

const requestLogger= (request, response, next)=> {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] ${request.method} request to ${request.path}`);
    console.log('Request body:', request.body);
    next()
}
app.use(requestLogger)
app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });