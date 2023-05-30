import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import imageDownloader from "image-downloader";
import multer from "multer";
import fs from "fs";
import filePath, { dirname as __dirname } from "path";

// there was no __dirname defined at pre code
// test and choose one of these two options(UP/DOWN)

// const __dirname = path.resolve();

import userRoutes from "./routes/user.js";
import placesRoutes from "./routes/places.js";
import bookingRoutes from "./routes/booking.js";

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(cookieParser());
dotenv.config();

app.get("/", (req, res) => res.send("Welcome to my server"));
app.use("/user", userRoutes);
app.use("/places", placesRoutes);
app.use("/booking", bookingRoutes);



// --------------------------------------------------------------------------
// i did not change any of this two routes
// cuz i could not test them after change(move)
// these are same as before but other routes all moved to new file structure
// you can take a look at others and do same with these
app.use('/uploads', express.static(__dirname + '/uploads'));
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body
    let newName = Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    })
    res.json(newName)
})

// //install multer
const photosMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]
        //add extension to file name
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + "." + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(filePath.basename(newPath))
        console.log(path)
    }
    res.json(uploadedFiles)
});
// --------------------------------------------------------------------------


const PORT = process.env.PORT || 1313;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
.catch((error) => console.log(`${error} did not connect`));

