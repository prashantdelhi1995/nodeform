const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const admiRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const contactRoutes = require("./routes/contact");
const successRoutes = require("./routes/success");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", admiRoutes);
app.use(shopRoutes);
app.use(contactRoutes);
app.use(successRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "views", "page-not-found.html"));
});

app.listen(4000);
