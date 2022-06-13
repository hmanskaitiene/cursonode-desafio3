const express = require('express')
const app = express()

const Contenedor = require('./models/contenedor')
const port = 8080
const contenedor = new Contenedor();

const getAll = async (req, res) => {
    const productos = await contenedor.getAll();
    res.status(200).json(productos);
};

const productoRandom = async (req, res) => {
    const productos = await contenedor.getAll();
    const random = Math.floor(Math.random() * productos.length) + 1;
    const producto = await contenedor.getById(random);
    res.status(200).json(producto);
};

app.get('/productos', getAll)
app.get('/productoRandom', productoRandom)

app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`)
})
