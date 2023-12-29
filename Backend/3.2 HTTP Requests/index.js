import express from 'express';
const app=express();
const port=3000;

app.get('/',(req,res)=>{
    res.send("<h1>hello</h1>");
});
app.get('/info',(req,res)=>{
    res.send("<h1>what do you want to know</h1>");
});
 app.listen(port,()=>{
    console.log(`Server started on port ${port}. `)
 });