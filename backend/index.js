import express from 'express';
import dotenv from 'dotenv';
import './Models/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { AuthRouter } from './Routes/AuthRouter.js';
import { MiniAdminRouter } from './Routes/MiniAdminRouter.js';
import { ClientRouter } from './Routes/ClientRouter.js';

// Load environment variables from .env file
dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/miniAdmin', MiniAdminRouter);
app.use('/client', ClientRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
}) 