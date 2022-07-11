const { products, carts } = require("../containers/index")

const cartController = {
    createCart: async (req, res) => {
        let idProduct = req.body.product
        let newProduct = await products.getById(idProduct)
        
        let newCart = {
            products: []
        }
        const addCart = await carts.saveCart(newCart, newProduct)
        res.json(addCart)
    },

    removeCartById: (req, res) => {
        const cartId = req.params.id
        const cartRemoved = carts.removeCart(cartId)
        res.json(cartRemoved)
    },

    getCartById: async (req, res) => {
        const id = req.params.id
        const products = await carts.cartById(id)
        res.json(products)
    },

    saveProduct: async (req, res) => {
        const id = req.params.id
        const product = req.body.product
        const newProduct = await products.getById(product)
        const addProduct = await carts.addProduct(id, newProduct)
        res.json(addProduct)
    },

    removeProductById: async (req, res) => {
        const id = req.params.id;
        const idProd = req.params.idProd;
        const removeProduct = await carts.removeProduct(id, idProd)
        res.json(removeProduct)
    }
}

module.exports = cartController;