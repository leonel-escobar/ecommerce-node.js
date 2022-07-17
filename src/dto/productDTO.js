class ProductDTO {
    constructor(product) {
        this.id = product._id
        this.title = product.title;
        this.description = product.description;
        this.category = product.category;
        this.code = product.code;
        this.image = product.image;
        this.price = product.price;
        this.stock = product.stock;
    }

    getId() {
        return this.id
    }

    getTitle() {
        return this.title
    }

    getDescription() {
        return this.description
    }

    getCategory() {
        return this.category
    }

    getCode() {
        return this.code
    }

    getImage() {
        return this.image
    }

    getPrice() {
        return this.price;
    }

    getStock() {
        return this.stock;
    }
}

module.exports = ProductDTO;