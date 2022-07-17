const OrdersDaoMongoDB = require("../daos/orders/ordersDaoMongoDB");
const orders = new OrdersDaoMongoDB();
const sendEmail = require("../utils/email")

const orderController = {
    sendOrder: async (req, res) => {
        const newOrder = {
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            tel: req.body.tel,
            products: req.body.products
        }
        await orders.save(newOrder)
        sendEmail(process.env.ADMIN_EMAIL, `Nuevo pedido de: ${req.body.username}, ${req.body.email}`, JSON.stringify(req.body.products))
        res.send(newOrder)
    }
}

module.exports = orderController;