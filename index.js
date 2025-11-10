const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 3000;
const serviceAccount = require("./react-trade-shift-firebase-adminsdk-key.json");
app.use(cors());
app.use(express.json())
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


app.get('/', (req, res) => {
    res.send('Smart server is running')
})
// simple-trade-shift
// iepGV7lt0g2IXwDc
const uri = "mongodb+srv://simple-trade-shift:iepGV7lt0g2IXwDc@cluster0.dw7x2dn.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const verifyToken = async (req, res, next) => {
    const authorization = req.headers.authorization;



    if (!authorization) {
        return res.status(401).send({
            message: "unauthorized access. Token not found!",
        });
    }

    const token = authorization.split(" ")[1];
    console.log(token);

    try {
        const decord = await admin.auth().verifyIdToken(token);
        req.token_email = decord.email;


        next();
    } catch (error) {
        res.status(401).send({
            message: "unauthorized access.",
        });
    }
};

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)

        const db = client.db('smart_trade_db');
        const productsCollection = db.collection('products');
        const importsCollection = db.collection('imports');


        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const email = req.body.email;
            const query = { email: email }
            const existingUser = await usersCollection.findOne(query);

            if (existingUser) {
                res.send({ message: 'user already exits. do not need to insert again' })
            }
            else {
                const result = await usersCollection.insertOne(newUser);
                res.send(result);
            }
        })
        app.get('/products', async (req, res) => {
            // const projectFields = { title: 1, price_min: 1, price_max: 1, image: 1 }
            // const cursor = productsCollection.find().sort({ price_min: -1 }).skip(2).limit(2).project(projectFields)

            const cursor = productsCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        });
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: new ObjectId(id) }
            const result = await productsCollection.findOne(query);
            res.send(result);
        })

        app.post('/products', verifyToken, async (req, res) => {
            const newProduct = req.body;
      

            const result = await productsCollection.insertOne(newProduct);
            res.send(result);
        })
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        })
        app.delete('/imports/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);

            const query = { _id: new ObjectId(id) }
            const result = await importsCollection.deleteOne(query);
            res.send(result);
        })
        app.post('/imports', async (req, res) => {
            const newBid = req.body;
            const result = await importsCollection.insertOne(newBid);
            res.send(result);
        })
        app.get("/latest-products", async (req, res) => {
            const result = await productsCollection
                .find()
                .sort({ createdAt: "desc" })
                .limit(6)
                .toArray();

            console.log(result);

            res.send(result);
        });



        app.patch('/products/:id', async (req, res) => {
            const id = req.params.id;
            const updatedProduct = req.body;
            const query = { _id: new ObjectId(id) }
            const update = {
                $set: {
                    name: updatedProduct.name,
                    price: updatedProduct.price
                }
            }

            const result = await productsCollection.updateOne(query, update)
            res.send(result)
        })
        app.get('/imports', async (req, res) => {


            const cursor = importsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log(`Smart server is running on port: ${port}`)
})
