const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const connectDB = require("./config/db");
const logger = require("./middlewares/logger");

const userSSRRoutes = require("./routes/userSSRRouter");
const inventorySSRRouter = require("./routes/inventorySSRRouter");



const inventoryRouter = require("./routes/inventoryRouter");
const inventoryAPI = require("./controllers/inventoryAPIController");
const userAPI = require("./controllers/userAPIController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// Middleware to parse cookies
app.use(cookieParser());

app.use(logger);

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

app.use("/", inventorySSRRouter);
app.use("/user", userSSRRoutes);

//app.use("/api/inventorys", inventoryRouter);

app.get("/api/inventorys", inventoryAPI.getInventorys);
app.post("/api/inventorys", inventoryAPI.addInventory);
app.post("/api/users/signup", inventoryAPI.addInventory);

const PORT = 4000;


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
