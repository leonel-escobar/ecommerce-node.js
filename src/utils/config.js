require("dotenv").config();

let mongoUrl
if (process.env.NODE_ENV === "produccion") {
    mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.p1uvb.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
} else {
    mongoUrl = "mongodb://localhost:27017/ecommerce"
}

module.exports = mongoUrl;