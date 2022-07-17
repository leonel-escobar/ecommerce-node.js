const mongoose = require("mongoose");
const logger = require("./winston")
const url = require("./config")

class MongoDBClient {
    constructor() {
        this.client = mongoose;
    }

    async connect() {
        try {
            await this.client.connect(url)
        } catch (err) {
            logger.warn("Error al conectar con la base de datos");
        }
    }
}

module.exports = MongoDBClient;