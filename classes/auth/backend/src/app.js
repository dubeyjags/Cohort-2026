import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./modules/auth/auth.routes.js";


const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [ "http://localhost:5174", "http://localhost:5173" ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/auth", router);

app.get("/api/health", (req, res) => {
  return res.status(200).json({ message: "Server is healthy" });
});


export default app