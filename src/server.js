require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.set('json spaces', 40);

const port = process.env.PORT || 5500;

//connecting mongo database
/**
 * Connects to the MongoDB database.
 * 
 * @async
 * @returns {Promise<void>} - A promise that resolves when the connection is established.
 */
const contectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    const db = await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: false,
      //useUnifiedTopology: true,
      //strictQuery: false,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log("Connected to mongo database");
  } catch (err) {
    console.log(err);
  }
};

const { main, drop, router, update } = require("./main/main.js");

// const {notifyUserCardapioDeHojeMudou} = require("./firebase/push-notification");
// notifyUserCardapioDeHojeMudou();

main();

// cron.schedule(
//   "* 1 * * *",
//   () => {
//     console.log("hi");
//     update();
//   },
//   {
//     scheduled: true,
//     timezone: "America/Sao_Paulo",
//   }
// );

// cron.schedule(
//   "0 23 * * 0",
//   function () {
//     drop();
//     console.log("This runs every 5 minutes");
//   },
//   {
//     scheduled: true,
//     timezone: "America/Sao_Paulo",
//   }
// );

//const db = mongoose.connection;

app.use("/", router);
contectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
