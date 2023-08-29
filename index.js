const express = require("express");
const app = express();
const productRouter = require("./router/productRouter");
const userRouter = require("./router/userRouter");
const db = require("./config/db");
const cors = require("cors");

app.use(cors());
app.use(express.json());

function syncDB() {
  try {
    db.sync();
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
}

syncDB();

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(5000, () => {
  console.log("the server is running");
});
