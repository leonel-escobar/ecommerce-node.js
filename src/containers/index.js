let products;
let carts;

const ProductsDaoMongoDB = require("../daos/products/productsDaoMongoDB");
const CartsDaoMongoDB = require("../daos/carts/cartsDaoMongoDB");
products = new ProductsDaoMongoDB()
carts = new CartsDaoMongoDB()
    
module.exports = {
    products, 
    carts
}