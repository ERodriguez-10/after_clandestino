import express from "express";

// import { ProductManager } from "./ProductManager.js";

const server = express();
const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const ProductManagerOnline = new ProductManager(""); // Url del archivo con los productos

server.get("/products", (req, res) => {
  const { limit } = req.query;

  const products = ProductManagerOnline.getProducts();

  if (limit) {
    const productLimit = products.slice(0, limit);
    return res.json(productLimit);
  }

  return res.json(products);
});

server.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const productSelected = ProductManagerOnline.getProductById(Number(id));

  if (productSelected) return res.json(productSelected);

  return res.json({ error: "Error equipo no encontrado" });
});

server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
