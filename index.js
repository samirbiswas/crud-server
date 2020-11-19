const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb');

const port = 5000

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Well come to mongo and node!');
})


const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://samir:bJFUcLzwUcQihu1C@cluster0.xaiaa.mongodb.net/agencydb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
client.connect(err => {
  
const productStoreCollection = client.db("agencydb").collection("productStore");
  console.log("database connected");

// data store in database

  app.post('/productStore', (req, res)=>{
    const order = req.body;
     //console.log(order);
    productStoreCollection.insertOne(order)
    .then( result=>{
      console.log(result.insertedCount)
      res.send(result.insertedCount>0);
      
       })

      }); 


      // product show on ui

      app.get('/productShow', (req, res) => {
        productStoreCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
      });


      // data delete in database and ui

      app.delete('/delete/:id',(req, res)=>{
  
        productStoreCollection.deleteOne({_id: ObjectId(req.params.id)})
        .then( result=>{
            res.send(result.deletedCount>0);
        })

// update data started

      
      app.get('/product/:id',(req, res) =>{
        productStoreCollection.find({_id: ObjectId(req.params.id)})
        .toArray ((err, documents)=>{
          res.send(documents[0]);
        })
      })



      
      } )


    })

// app.listen(process.env.PORT || port)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })