import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "web_development",
  password: "mpw930913",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    let visitedCountries = [];
    let result = await db.query("SELECT country_code FROM visited_countries");
    result.rows.forEach((code) => visitedCountries.push(code.country_code));
    res.render("index.ejs", { countries: visitedCountries, total: visitedCountries.length, error: req.query.error });
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).render("index.ejs", { error: "Error fetching data" });
  }
});

app.post("/add", async (req, res) => {
  try {
    let input = req.body.country;
    let result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%'||$1||'%'", [input.toLowerCase()]);

    if (result.rows.length > 0) {
      let countryCode = result.rows[0].country_code;
        await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);    
      res.redirect("/");}
     else {
      res.redirect("/?error=Country does not exist, try again.");
    }}
  catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).redirect("/?error=Country has already been added,try again.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
