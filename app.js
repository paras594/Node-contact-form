require("dotenv").config();
const path = require("path");
const express = require("express");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const expressLayouts = require("express-ejs-layouts");
const helmet = require("helmet");
const csrf = require("csurf");
const emailRoutes = require("./routes/email-routes");

const app = express();

// MIDDLEWARES
app.use(helmet());
app.use(cookieParser());
app.use(
	session({
		secret: "secret-key",
		key: "secret-cookie",
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 60000 }
	})
);
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// always set csrf after parsing and other things to avoid invalid err
app.use(csrf({ cookie: true }));

app.use(express.static("./public"));

// VIEW ENGINE SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

// ROUTES SETUP
app.use("/email", emailRoutes);

app.get("/", (req, res) => {
	res.render("index", { errors: {}, data: {}, csrfToken: req.csrfToken() });
});

const port = 3000;
app.listen(port, () => {
	console.log(`listening on localhost:${port}`);
});
