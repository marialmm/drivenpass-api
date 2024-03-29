import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import { router } from "./routers/index.js";
import { handleError } from "./middlewares/handleErrorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleError);


const PORT = + process.env.PORT || 4000;

app.listen(PORT, ()=> console.log("Server running on port " + PORT));