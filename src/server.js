import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

const env = dotenv.config();
expand(env);

import express from 'express';

const app = express();

const APP_PORT = process.env.APP_PORT || 5000;
const APP_URL = process.env.APP_URL;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ message: 'Service is running.' });
});

app.listen(APP_PORT, () => {
  console.log(`Server running at ${APP_URL}`);
});
