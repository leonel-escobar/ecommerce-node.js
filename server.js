const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const numCPUs = require("os").cpus().length;
const cluster = require("cluster");
const logger = require("./src/utils/winston");
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");
const { isAuth } = require("./src/middlewares/middlewares")

// Initializations
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
require("./src/passport/auth")

// Settings
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}));
app.use(passport.initialize());
app.use(passport.session())

// Websockets
const chatController = require("./src/controllers/chatController")
const messagesSocket = (socket) => {
    chatController(io, socket)
}
io.on("connection", messagesSocket);

// Routes
const productsRouter = require("./src/routes/productRoutes");
const cartRouter = require("./src/routes/cartRoutes");
const loginRouter = require("./src/routes/loginRoutes")
const userRouter = require("./src/routes/userRoutes")
const orderRoutes = require("./src/routes/orderRoutes")

app.use("/api/productos", passport.authenticate('jwt', { session: false }), productsRouter);
app.use("/api/carrito", passport.authenticate('jwt', { session: false }), cartRouter);
app.use("/api/orden", passport.authenticate('jwt', { session: false }), orderRoutes);
app.use("/", loginRouter);
app.use("/", userRouter);

app.get('/', isAuth,(req, res) => {
    res.sendFile(path.join(__dirname, "./public", "/html/index.html"))
}); 

app.all('*', (req, res) => {
    res.status(404).send('<h1>Error 404! La ruta solicitada no es válida</h1>');
});

// Start server
const PORT = process.env.PORT || 8080;

if (process.argv[2] === "cluster" && cluster.isMaster) {

    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    };

    cluster.on("exit", (worker) => {
        logger.warn(`Worker ${worker.process.pid} died`)
    });

} else {

    const server = httpServer.listen(PORT, () => {
        logger.info(`Server listen port ${PORT}`);
    })
    server.on("Error", error => logger.error(`Error: ${error}`));
}