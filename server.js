import express from "express";
import mongoose from "mongoose";
import {authRouter} from "./routers/authRouter.js";
import {questionRouter} from "./routers/questionRouter.js";
import cors from "cors";
import {categoryRouter} from "./routers/categoryRouter.js";
import {itemRouter} from "./routers/itemRouter.js";
import {config} from "dotenv";

config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/public", express.static("public"));
app.use("/question", questionRouter);
app.use("/users", authRouter);
app.use("/category", categoryRouter);
app.use("/items", itemRouter);

function appStart() {
    mongoose.connect(process.env.DB)
        .then(() => console.log("DB connect OK"))
        .catch((err) => console.log("DB connect error", err));

    app.listen(PORT, () => {
        console.log("Server work OK");
    })
}

appStart();