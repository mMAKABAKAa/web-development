import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "web_development",
  password: "12345",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function allUser(){
  const result=await db.query("SELECT * FROM users");
  let users = [];
  result.rows.forEach((user)=>{
    users.push(user);
  });
  return users;
}
async function checkColor(userId){
  const result=await db.query("SELECT color FROM users where id=($1)",[userId]);
  return result.rows[0].color;
}


async function checkVisisted(userId) {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id=($1)",[userId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function indexConfig(userId){
  const countries = await checkVisisted(userId);
  const users=await allUser();
  const color=await checkColor(userId);
  let config= {
    countries: countries,
    total: countries.length,
    users: users,
    color: color,
  }
  return config;
}

app.get("/", async (req, res) => {
  const userId = currentUserId || 1;
  let config=await indexConfig(userId);
  //console.log(config);
  res.render("index.ejs",config);
});

app.post("/add", async (req, res) => {
  const userId = currentUserId;
  //console.log(userId);
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
        [countryCode,userId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  //console.log(req.body);
  if (req.body.add) {
    res.render("new.ejs")
  } else {
    currentUserId =req.body.user;
    res.redirect("/")
  }
});
app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const name=req.body.name;
  const color=req.body.color;
  await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id",[name,color]);
  // const newUser={id:result.rows[0].id,name:name,color:color}
  // users.push(newUser);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
