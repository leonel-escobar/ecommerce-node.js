require("dotenv").config();

let port;
let mongoUrl;
if (process.env.NODE_ENV === "prod") {
    mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.p1uvb.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
} else {
    mongoUrl = `mongodb://localhost:27017/${process.env.MONGO_DBNAME}`
}

if (process.env.NODE_ENV === "prod") {
    port = 80
} else {
    port = 8080
}

module.exports = {port, mongoUrl};