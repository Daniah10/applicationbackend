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
const allowCrossDomain = (request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
app.use(express.json());
app.use("/images", express.static("images"))
app.use(requestLogger)
app.get("/lessons", async(request, response) => {
    try {
        const lessons = await db.collection("Lesson").find().toArray()
        response.json(lessons) 
    } catch (error) {
        response.status(500).json({message:"Failed to Retrieve Lessons"}) 
        
    }
})

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });