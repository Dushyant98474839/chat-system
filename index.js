import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/Authroutes.js";
import multer from "multer";
import path from "path";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 8757;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors({ origin: process.env.ORIGIN, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

// // Set up storage for uploaded images
// const storage = multer.diskStorage({
//   destination: './uploads/',
//   filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname)); // Rename file
//   }
// });

// const upload = multer({ storage });

// // Upload endpoint
// app.post('/api/upload', upload.single('image'), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  
//   const imageUrl = `/uploads/${req.file.filename}`;
//   res.json({ imageUrl });
// });

// // Serve images statically
// app.use('/uploads', express.static('uploads'));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const server=app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });