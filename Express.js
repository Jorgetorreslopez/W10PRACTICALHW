require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const jsxEngine = require('jsx-view-engine')
const Item = require("./models/item");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => {
  console.log("mongo!");
});

let items = [];

app.get("/items", (req, res) => {
  Item.find().then((items) => {
   res.json(items); 
  }).catch((error) => {
    res.status(500).json({ error: 'Failed to get items from database'})
  })  
  
});

// Saving Reference https://codeburst.io/hitchhikers-guide-to-back-end-development-with-examples-3f97c70e0073

app.post("/items", (req, res) => {
  const { name, price } = req.body;

  const newItemName = new Item({
    name,
    price,
  });
  newItemName
    .save()
    .then((newItem) => {
      items.push(req.body);
      res.status(201).json(newItem);
    })
    .catch((error) => {
      res.status(400).json({ error: "Failed to add item" });
    });
});

app.get("/items/:id", (req, res) => {
  const item = req.params.id;
  Item.findById(item)
    .then((item) => {
      if (!item) {
        return res.status(400).json({ error: "Item not found" });
      }
      res.json(item);
    })
    .catch((error) => {
      res.status(500).json({ error: "Item not found tho" });
    });
});

app.put("/items/:id", (req, res) => {
  const item = req.params.id;
  const { name, price } = req.body;

  Item.findByIdAndUpdate(item, { name, price }, { new: true })
    .then((item) => {
      if (!item) {
        return res.status(400).json({ error: "Item not found" });
      }
      res.json(item);
    })
    .catch((error) => {
      res.status(500).json({ error: "Item not found tho" });
    });
});

app.delete("/items/:id", (req, res) => {
  const item = req.params.id;
  Item.findByIdAndDelete(item)
    .then((item) => {
      if (!item) {
        return res.status(400).json({ error: "Item not found" });
      }
      res.json(item);
    })
    .catch((error) => {
      res.status(500).json({ error: "item not deleted" });
    });
});

app.listen(PORT, () => {
  console.log(`Andre ${PORT} da Goat!`);
});
