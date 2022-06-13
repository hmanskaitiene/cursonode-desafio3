const express = require('express')
const app = express()

const Contenedor = require('./models/contenedor')
const port = 8080

const main = async () => {
    const contenedor = new Contenedor();
    await contenedor.initFile();
    app.get('/productos', async function (req, res) {
        const productos = await contenedor.getAll();
        res.send(productos);
    })

    app.get('/productoRandom', async function (req, res) {
        const productos = await contenedor.getAll();
        const random = Math.floor(Math.random() * productos.length) + 1;
        const producto = await contenedor.getById(random);
        res.send(JSON.stringify(producto));
    })

    app.listen(port, () => {
        console.log(`Escuchando el puerto ${port}`)
    })
};

main();