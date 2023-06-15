import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import notFound from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import authRouter from './routes/auth';
import travelRouter from './routes/travel';
import dotenv from 'dotenv';
const fileUpload = require('express-fileupload');
const app = express();
app.set('trust proxy', 1);
dotenv.config();


import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// JSON
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));


// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/travel', travelRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);


export default app