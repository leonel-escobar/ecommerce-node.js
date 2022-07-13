const MongodbContainer = require("../../containers/mongodbContainer");
const messageSchema = require("../../models/messageSchema")
const MessageDTO = require("../../dto/messageDTO.js")

class MessagesDaoMongoDB extends MongodbContainer {
    constructor() {
        super("messages", messageSchema)
    }

    async save(obj) {
        try {
            return await this.collection.create(obj);
        } catch (err) {
            console.log(err);
        }
    }

    async getAll() {
        try {
            const messages = await this.collection.find();
            return messages.map(el => new MessageDTO(el))
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = MessagesDaoMongoDB;