import express, { Application, Request, Response } from 'express';
import { urlencoded, json } from 'body-parser';

import apiV1 from './routes/v1';

import connectToDB from './db/connection';
import dotenv from "dotenv"

dotenv.config()

const PORT: string = process.env.PORT!;
const app: Application = express();
app.use(urlencoded({ extended: false }));
app.use(json());

apiV1(app);

app.use((req: Request, res: Response) => {
  res.status(404).send('NOT FOUND');
});

connectToDB().then((connected:boolean) => {
  if(connected){
    app.listen(PORT, () => {
      console.log('running on ' + PORT);
    });
  }else{
    console.log("Error mongo db")
  }
})
