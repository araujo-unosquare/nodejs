const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
