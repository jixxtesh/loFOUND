

require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debug print



const express = require("express");
const dotenv = require("dotenv");
const connectDatabase=require("./database");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.enable("trust proxy");
dotenv.config();
connectDatabase();
const allowedOrigins = ['http://localhost:3000', 'https://lofound-jixx.vercel.app/'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true,
}));

app.options('*', cors());

// Routes
app.post('/login', (req, res) => {
  // Your login logic
  const { email, password } = req.body;
  // Dummy response
  res.json({ token: 'abc123', userId: '1', email });
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // Dummy response
  res.json({ message: 'User registered', userId: '1', email });
});

const user = require("./routes/userRoute.js");
const item = require("./routes/itemRoute.js");


app.use("/api/v1",user);
app.use("/api/v1",item);
app.use(errorMiddleware);


app.get("/", (req,res)=>{
    res.send("api connnected");
} )



app.listen(process.env.PORT, ()=>{
    console.log(`server is connected on port ${process.env.PORT}`);
})
