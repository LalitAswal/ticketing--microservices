import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json())

app.listen(()=>{
    console.log(`port is Listen at 3000!!!!!!!`)
})