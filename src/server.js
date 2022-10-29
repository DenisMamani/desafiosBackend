import express from 'express';
import fs from 'fs';
const app = express()
const server = app.listen(8080, () => console.log("Listening on Express"))

const returnProducts = (route) => {
    if (fs.existsSync(route)) {
        let data = fs.readFileSync(route, 'utf-8')
        let products = JSON.parse(data)
        return products;
    } else {
        return {
            status: "Error",
            message: "No route found"
        }
    }
}

app.get('/productos', (request, response) => {              //all the products
    response.send(returnProducts('./productos.json'))
})
app.get('/productoRandom', (request, response) => {         //random products
    let products = returnProducts('./productos.json')
    let productRandom = products[parseInt(products.length*Math.random())]
    response.send(productRandom)
})
app.get('/producto/:idProduct', (request, response) => {    //according to id entered
    const id = request.params.idProduct
    let products = returnProducts('./productos.json')
    let product = products.find((product) => product.id == id);
    if (product) {
        return {
            status: "Success",
            product: response.send(product)
        }
    } else {
        response.send({
            status: "Error",
            message: "Product not fount"
        })
    }
})
/* rutas
http://localhost:8080/productos
http://localhost:8080/productoRandom
http://localhost:8080/producto/1
 */

