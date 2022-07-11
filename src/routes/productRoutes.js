const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController")

// Devuelve todos los productos
router.get("/", productsController.getProducts)

// Devuelve un producto por su id
router.get("/:id", productsController.getProductById)

// Recibe y guarda un nuevo producto
router.post("/", productsController.saveProduct)

// Actualiza un producto por su id
router.put("/:id", productsController.updateProduct)

// Elimina un producto por su id
router.delete("/:id", productsController.deleteProduct)

module.exports = router;