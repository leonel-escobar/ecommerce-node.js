const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")

// Crea un carrito y devuelve su id
router.post("/", cartController.createCart)

// Vacía un carrito
router.delete("/:id", cartController.removeCartById)

// Muestra los productos de un carrito por id
router.get("/:id/productos", cartController.getCartById)

// Incorpora productos por su id
router.post("/:id/productos", cartController.saveProduct)

// Elimina un producto por id de carrito y producto
router.delete("/:id/productos/:idProd", cartController.removeProductById)

module.exports = router;