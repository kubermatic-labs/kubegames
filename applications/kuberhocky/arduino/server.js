import  express from "express"
import path from "path"


const app = express();
const port = process.env.PORT || "8000";


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });


app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
  });


  








const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.set('view engine', 'pug');