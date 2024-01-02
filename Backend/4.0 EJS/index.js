import express from "express";

const app = express();
const port = 3000;

let date=new Date("June 24, 2023 11:13:00").getDay();
let renderpart={};

if (date>0&&date<6) {
    renderpart={day:"weekday",thing:"work harder"};
} else {
    renderpart={day:"weekend",thing:"have fun"}
}
app.get("/",(req,res)=>{
    res.render("index.ejs",renderpart);
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });