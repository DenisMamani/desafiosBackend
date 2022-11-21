import { Router } from "express";
import Contenedor from "../Contenedor/contenedor.js";
import uploader from "../services/upload.js";

const router = Router();
const productsService = new Contenedor()
let admin = true;
router.get('/', async (request, response) => {
    const productos = await productsService.getAll()
    if (productos.products.length != 0) {
        response.send({
            productos: productos.products
        })
    } else {
        response.send({
            productos: {
                message: "No hay productos agregados"
            }
        })
    }

})
router.get('/:pid', async (request, response) => {
    const id = parseInt(request.params.pid)
    let result = await productsService.getById(id)
    response.send(result)
})
router.post("/",async(req,res)=>{
    if (admin===true) {
        const {title,description,thumbnail,price,stock}= req.body;
    if(!title||!description||!thumbnail||!price||!stock) return res.status(400).send({status:"error",error:"Incomplete values"})
    let timestamp = Date.now();
    let code = Math.random().toString(16).slice(2)
    const productToInsert ={
        timestamp,
        title,
        description,
        code,
        thumbnail,
        price,
        stock
    }
    const result = await productsService.save(productToInsert);
    res.send({status:"success",payload:result})
    } else {
        res.send({status:"error",error:"Admin only"})
    }
})
router.put('/:pid', async (request, response) => {
    if (admin===true) {
        const id = parseInt(request.params.pid)
        const productNew = request.body
        let result = await productsService.update(productNew, id)
        response.send(result)
    } else {
        response.send({ status: "error", description: "admin only" })
    }

})
router.delete('/:pid', async (request, response) => {
    if (admin===true) {
        const id = parseInt(request.params.pid)
        let result = await productsService.deleteById(id)
        response.send(result)
    } else {
        response.send({ status: "error", description: "admin only" })
    }

})

export default router;
