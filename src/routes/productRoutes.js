const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController")
const { isAdmin } = require("../middlewares/middlewares")

// Devuelve todos los productos
router.get("/", productsController.getProducts)

// Devuelve un producto por su id
router.get("/:id", productsController.getProductById)

// Devuelve productos por
router.get("/categoria/:category", productsController.getByCategory);

// Recibe y guarda un nuevo producto
router.post("/", isAdmin, productsController.saveProduct)

// Actualiza un producto por su id
router.put("/:id", isAdmin, productsController.updateProduct)

// Elimina un producto por su id
router.delete("/:id", isAdmin, productsController.deleteProduct)

module.exports = router;