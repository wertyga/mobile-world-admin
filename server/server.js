import express from 'express';
import next from 'next';
import cookieSession from 'cookie-session'
import bodyParser from 'body-parser'
import cors from 'cors';
import './common/mongoose'

import { adminAuthMiddleware } from './middlewares'

const { setEnvies } = require('assets/envs/envs');
import api from './api'
import { config } from './common/config';
import { generateToken } from './common/credentialHandle';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const whitelist = ['http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
};

app.prepare().then(() => {
  const server = express();

  setEnvies();
  generateToken();

  server.use(bodyParser.json());
  server.use(cookieSession(config.session))
  server.use(express.static(config.uploadPath.articleImagesPath));

  server.use('/api', cors(corsOptions), api);
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(config.PORT, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${config.PORT}`)
  })
}).catch((e) => {
  console.error(e.stack)
  process.exit(1)
})