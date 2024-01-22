import express from "express";
import session from 'express-session';
import router from "./router.js";

const app = express();

//app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
	secret: 'tototototototo',
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 3600000}
}));


app.use("/", router);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
