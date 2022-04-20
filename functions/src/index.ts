import * as functions from "firebase-functions";
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import router from './router';
import 'dotenv/config';

var cors = require('cors');


const app = express();
dotenv.config();
const { PORT } = process.env;

app.set('port', PORT || 3000);

//Midlewares
app.use(bodyParser.json());
app.use(cors({origin: true}));
app.disable('etag');
app.use('/api', router);
app.all('*', (req: Request, res: Response) => res.sendStatus(404));



exports.app = functions.https.onRequest(app);

