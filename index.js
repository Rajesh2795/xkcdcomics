const express = require("express");
const comicRouter = require("./src/Routes/comicRoutes");
const path = require("path");

const app = express();

app.use(express.static("static_files"));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/comics", comicRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
})

const port = 3000 || process.env.PORT;

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

//https://xkcd.com/json.html