import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import nedb from 'nedb'
import { connect } from 'camo'

import router from './routes';
import logger from './config/winston'

dotenv.config();

const app = express();
const BASE_URI = '/api/v1';

const URI = 'nedb://Users\ASUS\Desktop\Repos\Event-Tracker-API\server\db'
connect(URI).then(function(db) {
  logger.info(`Now connected to the database ${db}`)
});

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ 
  limit: '50mb',
  extended: true
}));
app.use(BASE_URI, router);

app.get('/', (req, res) => {
  res.json({
    message: 'app now live',   
  });
});

app.use((err, req, res, next) => {
 logger.info(`${err}`)
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  });
});

export default app
