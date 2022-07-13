let products;
let carts;
let messages;

const ProductsDaoMongoDB = require("../daos/products/productsDaoMongoDB");
const CartsDaoMongoDB = require("../daos/carts/cartsDaoMongoDB");
const MessagesDaoMongoDB = require("../daos/messages/messagesDAOMongoDB");
products = new ProductsDaoMongoDB()
carts = new CartsDaoMongoDB()
messages = new MessagesDaoMongoDB()
    
module.exports = {
    products, 
    carts,
    messages
}