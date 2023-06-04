const express = require("express");
const app = express();
const authRoute = require("./routers/auth");
const PORT = 8080;
// Node.jsでenvファイルを使用できるようにする
require("dotenv").config();

app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));