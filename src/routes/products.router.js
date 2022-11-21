import Contenedor from "../Contenedor/contenedor.js";
import uploader from "../services/upload.js";
import { Router } from "express"; 
const router = Router()
const productsService = new Contenedor();
router.post("/",uploader.single("thumbnail"),async (req,res)=>{
    const thumbnail = req.protocol+"://"+req.hostname+":8080/thumbnail/"+req.file.filename
    let product = req.body;
    product.thumbnail = thumbnail;
    product.price = parseInt(product.price);
    const result = await productsService.save(product);
    res.send({status:"success", message:"Product added"});
})
router.get("/",async(req,res)=>{
    let result = await productsService.getAll()
    res.send(result)
})
router.get("/:id",async(req,res)=>{
    let id = req.params.id
    if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalid type"})
    let result = await productsService.getById(id)
    res.send(result)
})
router.put("/:id",async(req,res)=>{
    let {id} = req.params;
    let product = req.body;
    await productsService.update(product, id)
    res.send("Producto actualizado")
})
router.delete("/:id",async(req,res)=>{
    let id = req.params.id;
    if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalid type"})
let result = await productsService.deleteById(id)
    res.send(result)
})
export default router
