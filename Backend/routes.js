const express = require("express");
const app = express();

// const middlewares = require("./middlewares");
// const cart = require("./controllers/cart");

app.get("/register", (req, res) => {
    console.log("req---", req)
    res.send("api working!!!!!!!!!")
});
// app.post("/login", user.userLogin);
// app.get("/user", user.getUser);

// app.post("/cart/:id", middlewares.verifyToken, cart.addToBag);

module.exports = app;