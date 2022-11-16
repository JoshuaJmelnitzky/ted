import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import methodOverride from "method-override";
import passport from "passport";
import MongoStore from "connect-mongo";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { MONGODB_URI, PORT } from "./src/config/config.js";

import indexRoutes from "./src/routes/index.routes.js"; 
import notesRoutes from "./src/routes/notes.routes.js";
import userRoutes from "./src/routes/auth.routes.js";
import "./src/config/passport.js";

// Initializations
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// settings
app.set("views", join(__dirname, "/src/views"));

// config view engine
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(notesRoutes);


// static files
app.use(express.static("public"));

app.use((req, res, next) => {
  return res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", {
    error,
  });
});

const serverOn = app.listen(process.env.PORT || 4001, () => {
  console.log(`Servidor corriendo en puerto ${serverOn.address().port}`);
});


