const config = require("./config");
const { sequelize, Kitten } = require("./db");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const startServer = async () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser());

  app.get("/", async (req, res, next) => {
    try {
      const kittens = await Kitten.findAll();
      res.json({ kittens });
    } catch (e) {
      next(e);
    }
  });

  app.post("/", async (req, res, next) => {
    try {
      const kitten = await Kitten.create({
        name: req.body.name,
        age: req.body.age,
      });
      res.json({ kitten });
    } catch (e) {
      next(e);
    }
  });

  app.use((req, res, next) => {
    res.status(404).send("Not found");
  });

  app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
  });

  await sequelize.authenticate();

  console.log("Database connected.");

  app.listen(config.port, () =>
    console.log(`Simple backend listening at http://localhost:${config.port}`)
  );
};

startServer();
