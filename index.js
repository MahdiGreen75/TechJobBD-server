const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
// const jwt = require("jsonwebtoken");
// const cookieParser = require('cookie-parser');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// //middleware
// app.use(cors({
//     origin: ['http://localhost:5173'],
//     credentials: true
// }));
app.use(express.json());
// app.use(cookieParser())

//made-up middlewares
// const logger = async (req, res, next) => {
//     console.log('Log info: ', req.method, req.hostname, req.originalUrl);
//     next();
// }

// const verifyToken = async (req, res, next) => {
//     const token = req.cookies?.token;
//     console.log("value of token from middlware", token);
//     if (!token) {
//         return res.status(401).send({ message: "not authorized" });
//     }
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         //it error happens.
//         if (err) {
//             //if any error happens, it will be shown below
//             console.log(err)
//             return res.status(401).send({ message: "unauthorized" })
//         }
//         //if token is valid, then it would be decoded.
//         console.log("Value in the token", decoded);
//         req.user = decoded;
//         next();
//     })
// }


// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// mongodb 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.geunt7i.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db("TechJobBDDB");
        app.get("/on-site", async (req, res) => {
            const onSiteJobCollection = database.collection("onSiteJobCollection");
            const cursor = onSiteJobCollection.find();
            const onSiteJobs = await cursor.toArray();
            res.send(onSiteJobs);
        })

        app.get("/remote", async (req, res) => {
            const remoteJobCollection = database.collection("remoteJobCollection");
            const cursor = remoteJobCollection.find();
            const Jobs = await cursor.toArray();
            res.send(Jobs);
        })

        app.get("/hybrid", async (req, res) => {
            const hybridJobCollection = database.collection("hybridJobCollection");
            const cursor = hybridJobCollection.find();
            const hybridJobs = await cursor.toArray();
            res.send(hybridJobs);
        })

        app.get("/part-time", async (req, res) => {
            const partTimeJobCollection = database.collection("partTimeJobCollection");
            const cursor = partTimeJobCollection.find();
            const partTimeJobs = await cursor.toArray();
            res.send(partTimeJobs);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Hey, I am TechJobBD server. I am still alive.")
})

app.listen(port, () => {
    console.log(`TechJobBD server is running on port: ${port}`);
})