import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json())


app.get('/api/user/currentUser',(req, res)=>{
    res.send('Hi there!!')
})

app.listen(3000,()=>{
    console.log(`port is Listen at 3000!!!!!!!`)
})