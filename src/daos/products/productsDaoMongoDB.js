const MongodbContainer = require("../../containers/mongodbContainer");
const productSchema = require("../../models/productSchema");
const ProductDTO = require("../../dto/productDTO")

class ProductsDaoMongoDB extends MongodbContainer {
    constructor() {
        super("products", productSchema)
    }

    async getAll() {
        try {
            const products = await this.collection.find();
            return products.map(el => new ProductDTO(el));
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = ProductsDaoMongoDB;